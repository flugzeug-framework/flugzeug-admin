import { RootState } from "app/store";

export const selectSessionCredentials = (state: RootState) =>
  state.session.credentials;
export const selectIsSessionConfirmed = (state: RootState) =>
  state.session.isSessionConfirmed;
export const selectLogInStatus = (state: RootState) => state.session.status;
export const selectCurrentUser = (state: RootState) =>
  state.session.currentUser;
export const selectIsAuth = (state: RootState) => state.session.isAuthenticated;
export const selectHasError = (state: RootState) => state.session.hasError;
export const selectErrorMessage = (state: RootState) =>
  state.session.errorMessage;
export const selectIsSessionLoading = (state: RootState) =>
  state.session.isLoading;
export const selectIsForgotPasswordSuccessful = (state: RootState) =>
  state.session.isForgotPasswordSuccessful;
export const selectIsRegisterSuccessful = (state: RootState) =>
  state.session.isRegisterSuccessful;
