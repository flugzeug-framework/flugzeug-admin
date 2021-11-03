import React from "react";
import { Redirect, Route } from "react-router-dom";
import { selectIsAuth } from "features/session/sessionSelectors";
import { useAppSelector } from "app/hooks";
import { login } from "./Roots";

export const ProtectedRoute = ({ children, ...props }: any) => {
  const isAuthenticated = useAppSelector(selectIsAuth);

  return isAuthenticated ? <Route {...props} /> : <Redirect to={login()} />;
};
