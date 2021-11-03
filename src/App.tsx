import { SideMenu } from "components/SideMenu/SideMenu";
import { initSession } from "features/session/sessionActions";
import {
  selectIsSessionConfirmed,
  selectLogInStatus,
} from "features/session/sessionSelectors";
import { Toast } from "features/toast/Toast";
import { AccountConfirm } from "pages/AccountConfirm";
import { ForgotPassword } from "pages/ForgotPassword";
import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { Profile } from "pages/Profile";
import { Register } from "pages/Register";
import { ResetPassword } from "pages/ResetPassword";
import { UserForm } from "pages/UserForm";
import { Users } from "pages/Users";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "routes/ProtectedRoute";
import {
  accountConfirm,
  forgotPassword,
  home,
  login,
  profile,
  register,
  resetPassword,
  user,
  users,
} from "routes/Roots";

function App() {
  const dispatch = useDispatch();
  const hasSessionBeenChecked = useSelector(selectIsSessionConfirmed);
  const sessionStatus = useSelector(selectLogInStatus);

  useEffect(() => {
    if (!hasSessionBeenChecked) {
      dispatch(initSession());
    }
  }, [hasSessionBeenChecked, dispatch]);

  return (
    <Fragment>
      {sessionStatus !== "initial" && (
        <Switch>
          <Route component={Login} exact path={login()} />
          <Route
            component={ForgotPassword}
            path={forgotPassword()}
            exact={true}
          />
          <Route
            component={ResetPassword}
            path={resetPassword()}
            exact={true}
          />
          <Route
            component={AccountConfirm}
            path={accountConfirm()}
            exact={true}
          />
          <Route component={Register} path={register()} exact={true} />
          <SideMenu>
            <ProtectedRoute component={Home} exact path={home()} />
            <ProtectedRoute component={UserForm} path={user(":id")} />
            <ProtectedRoute component={Users} exact path={users()} />
            <ProtectedRoute component={Profile} exact path={profile()} />
          </SideMenu>
        </Switch>
      )}
      <Toast />
    </Fragment>
  );
}

export default App;
