import { AppThunk } from "app/store";
import { authService } from "services/authService";
import { userService } from "services/userService";
import { selectSessionCredentials } from "./sessionSelectors";
import {
  confirmSession,
  getSavedCredentials,
  logOut,
  SessionStatus,
  setErrorMessage,
  setHasError,
  setIsForgotPasswordSuccessful,
  setIsLoading,
  setIsRegisterSuccessful,
  setSavedCredentials,
  TOKEN_REFRESH_CHECK_INTERVAL,
  TOKEN_REFRESH_THRESHOLD,
  updateCredentials,
  updateCurrentUser,
  updateIsAuthenticated,
  updateSessionStatus,
} from "./sessionSlice";

export const closeSession = (): AppThunk => async (dispatch) => {
  try {
    await authService.logout();
  } catch (error) {
    console.error(error);
  }
  dispatch(logOut());
};

const populateUserSession = (): AppThunk => async (dispatch, getState) => {
  const credentials = selectSessionCredentials(getState());
  if (!credentials) {
    throw new Error("No Credentials found");
  }
  try {
    const { data } = await userService.getById(credentials.user.id);
    dispatch(updateCurrentUser(data));
    dispatch(updateIsAuthenticated(true));
    dispatch(updateSessionStatus(SessionStatus.fulfilled));
  } catch (err) {
    dispatch(closeSession());
  }
};

const refreshToken = (): AppThunk => async (dispatch, getState) => {
  // Try to refresh the token, logout otherwise
  const credentials = selectSessionCredentials(getState());
  if (!credentials) {
    throw new Error("No Credentials found");
  }
  // Do the refresh and save new data
  try {
    const { data: newCredentials } = await authService.refresh(credentials);
    dispatch(updateCredentials(newCredentials));
    await dispatch(populateUserSession());
  } catch (err) {
    dispatch(closeSession());
  }
};

const checkTokenAndRefresh = (): AppThunk => async (dispatch, getState) => {
  const credentials = selectSessionCredentials(getState());
  if (!credentials) {
    return;
  }
  // credentials.expires is in seconds, we need ms
  const tokenExpires = credentials.expires * 1000;
  const now = new Date().getTime();
  if (tokenExpires < now - TOKEN_REFRESH_THRESHOLD) {
    // We are within TOKEN_REFRESH_THRESHOLD until the token expires, or it has expired
    // try to refresh the token
    try {
      await dispatch(refreshToken());
    } catch (err) {
      console.warn("Couldn't refresh token:", err);
    }
  }
};

const registerTokenRefresher = (): AppThunk => async (dispatch) => {
  setInterval(
    () => dispatch(checkTokenAndRefresh()),
    TOKEN_REFRESH_CHECK_INTERVAL,
  );
};

export const logInWithEmail =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setHasError(false));
      const { data } = await authService.login(email, password);
      setSavedCredentials(data);
    } catch (error) {
      dispatch(setHasError(true));
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
    dispatch(initSession());
  };

export const sendForgotPassword =
  (email: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setIsForgotPasswordSuccessful(false));
      dispatch(setHasError(false));
      await authService.forgot(email);
      dispatch(setIsForgotPasswordSuccessful(true));
    } catch (error) {
      dispatch(setHasError(true));
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const resetPassword =
  (token: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setIsForgotPasswordSuccessful(false));
      dispatch(setHasError(false));
      const { data } = await authService.reset(token, password);
      setSavedCredentials(data);
      dispatch(setIsForgotPasswordSuccessful(true));
    } catch (error) {
      dispatch(setHasError(true));
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
    dispatch(initSession());
  };

export const logInWithExchange =
  (token: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setHasError(false));
      const { data } = await authService.exchange(token);
      setSavedCredentials(data);
    } catch (error) {
      dispatch(setHasError(true));
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
    dispatch(initSession());
  };

export const initSession = (): AppThunk => async (dispatch) => {
  // Start token refresher
  dispatch(registerTokenRefresher());

  const credentials = getSavedCredentials();

  if (!credentials) {
    dispatch(confirmSession());
    dispatch(updateSessionStatus(SessionStatus.logOut));
    return;
  }

  try {
    dispatch(setIsLoading(true));
    dispatch(updateCredentials(credentials));
    await dispatch(populateUserSession());
  } catch (error) {
    // Try to refresh token, then logout if failed
    await dispatch(refreshToken);
  } finally {
    dispatch(confirmSession());
    dispatch(setIsLoading(false));
  }
};

const EMAIL_IN_USE_MESSAGE = "This email is already registered.";
const GENERIC_ERROR_MESSAGE = "Please review the information you typed in.";

export const registerWithemail =
  (name: string, email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setHasError(false));
      await authService.registerEmailUser(name, email, password);
      dispatch(setIsRegisterSuccessful(true));
    } catch (error) {
      const response = error.response?.data;

      switch (response?.message) {
        case "Bad Request":
          if (response?.data[0]?.error) {
            dispatch(setErrorMessage(response?.data[0]?.error));
          } else {
            dispatch(setErrorMessage(GENERIC_ERROR_MESSAGE));
          }
          break;
        case "Forbidden":
          if (response?.data === "email in use") {
            dispatch(setErrorMessage(EMAIL_IN_USE_MESSAGE));
          } else {
            dispatch(setErrorMessage(GENERIC_ERROR_MESSAGE));
          }
          break;
        default:
          dispatch(setErrorMessage(GENERIC_ERROR_MESSAGE));
          break;
      }

      dispatch(setHasError(true));
      dispatch(setIsRegisterSuccessful(false));
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
