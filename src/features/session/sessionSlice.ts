import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Credentials } from "models/credentialsModel";
import { UserModel } from "models/userModel";

export const TOKEN_REFRESH_CHECK_INTERVAL = 60000;
export const TOKEN_REFRESH_THRESHOLD = 3600000; // 1 hour
const LOCAL_STORAGE_CREDENTIALS_KEY = "credentials";

/*
  Credentials logic:
    - On login, the front puts credentials on a cookie (jwt)
    - The app gets those credentials and saves them to localStorage
    - On consecutive app loads, the source of truth is localStorage
    - When a token gets refreshed, the credentials are updated on localStorage
    - On log out, both localStorage and cookies should be cleared
    - On production, we cannot clear cookies using JS, we need to redirect to an 
      api endpoint so the back instructs the browser to clear it with a header in the response
*/
export const getSavedCredentials = () => {
  let credentials: Credentials | undefined = undefined;
  try {
    // Try to get from localstorage
    const localCredentials = localStorage.getItem(
      LOCAL_STORAGE_CREDENTIALS_KEY,
    );
    if (localCredentials) {
      credentials = JSON.parse(localCredentials);
    }
  } catch (err) {
    console.error("Error getting credentials:", err);
  }

  return credentials;
};

export const setSavedCredentials = (credentials: Credentials) => {
  localStorage.setItem(
    LOCAL_STORAGE_CREDENTIALS_KEY,
    JSON.stringify(credentials),
  );
};

const clearSavedCredentials = () => {
  localStorage.removeItem(LOCAL_STORAGE_CREDENTIALS_KEY);
};

export enum SessionStatus {
  initial = "initial",
  fulfilled = "fulfilled",
  logOut = "logOut",
}

interface SessionState {
  credentials?: Credentials;
  currentUser?: UserModel;
  isSessionConfirmed: boolean;
  isAuthenticated: boolean;
  status: SessionStatus;
  hasError: boolean;
  errorMessage: string;
  isLoading: boolean;
  isForgotPasswordSuccessful: boolean;
  isRegisterSuccessful: boolean;
}

const initialState: SessionState = {
  credentials: undefined,
  currentUser: undefined,
  isSessionConfirmed: false,
  isAuthenticated: false,
  status: SessionStatus.initial,
  hasError: false,
  errorMessage: "",
  isLoading: false,
  isForgotPasswordSuccessful: false,
  isRegisterSuccessful: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logOut: (state) => {
      clearSavedCredentials();
      state.isAuthenticated = false;
      state.credentials = undefined;
      state.status = SessionStatus.logOut;
    },
    confirmSession: (state) => {
      state.isSessionConfirmed = true;
    },
    updateCredentials: (state, action: PayloadAction<Credentials>) => {
      setSavedCredentials(action.payload);
      state.credentials = action.payload;
    },
    updateCurrentUser: (state, action: PayloadAction<UserModel>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    updateIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    updateSessionStatus: (state, action: PayloadAction<SessionStatus>) => {
      state.status = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setIsForgotPasswordSuccessful: (state, action: PayloadAction<boolean>) => {
      state.isForgotPasswordSuccessful = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsRegisterSuccessful: (state, action: PayloadAction<boolean>) => {
      state.isRegisterSuccessful = action.payload;
    },
  },
});

export const {
  logOut,
  confirmSession,
  updateCredentials,
  updateCurrentUser,
  updateIsAuthenticated,
  updateSessionStatus,
  setHasError,
  setErrorMessage,
  setIsForgotPasswordSuccessful,
  setIsLoading,
  setIsRegisterSuccessful,
} = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
