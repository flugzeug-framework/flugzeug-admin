export const ROOT_HOME = "/";
export const ROOT_LOGIN = "/login";
export const ROOT_FORGOT_PASSWORD = "/forgot";
export const ROOT_RESET_PASSWORD = "/reset";
export const ROOT_PROFILE = "/profile";
export const ROOT_ACCOUNT_CONFIRM = "/confirm";
export const ROOT_REGISTER = "/register";
export const ROOT_SETTINGS = "/settings";
export const ROOT_USER = "/user";

export const home = () => ROOT_HOME;
export const login = () => ROOT_LOGIN;
export const forgotPassword = () => ROOT_FORGOT_PASSWORD;
export const resetPassword = () => ROOT_RESET_PASSWORD;
export const profile = () => ROOT_PROFILE;
export const accountConfirm = () => ROOT_ACCOUNT_CONFIRM;
export const register = () => ROOT_REGISTER;
export const users = () => ROOT_USER;
export const settings = (section?: string) =>
  `${ROOT_SETTINGS}/${section != null ? section : ""}`;
export const user = (id?: string | number) =>
  `${ROOT_USER}/${id != null ? id : "new"}`;
