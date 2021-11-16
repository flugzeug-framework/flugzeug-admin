import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import {
  logInWithEmail,
  logInWithExchange,
} from "features/session/sessionActions";
import {
  selectHasError,
  selectIsAuth,
} from "features/session/sessionSelectors";
import { setHasError, setIsLoading } from "features/session/sessionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { forgotPassword, home } from "routes/Roots";
import { API_BASE_URL } from "services/baseService";

enum SSOLoginStatus {
  NotFound = "notFound",
  Unauthorized = "unauthorized",
}

export function Login() {
  const location = useLocation();
  const history = useHistory();
  const isAuthenticated = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hasEmailLoginError = useSelector(selectHasError);
  const [hasSSOError, setHasSSOError] = useState(false);
  const [ssoErrorMessage, setSsoErrorMessage] = useState("");

  useEffect(() => {
    // Reset session error state on load
    dispatch(setHasError(false));
  }, [dispatch]);

  // Handle SSO callback success
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    if (token != null) {
      // Get correct auth credentials and redirect to dashboard
      dispatch(logInWithExchange(token));
    }
  }, [location, dispatch]);

  // Handle SSO callback failures
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("status");
    if (status != null) {
      switch (status) {
        case SSOLoginStatus.NotFound:
          setHasSSOError(true);
          setSsoErrorMessage(
            "Sorry, You are not registered in this application."
          );
          break;
        case SSOLoginStatus.Unauthorized:
          setHasSSOError(true);
          setSsoErrorMessage(
            "Sorry, You are not allowed to access this application."
          );
          break;
        default:
          setHasSSOError(true);
          setSsoErrorMessage(`Unknown error: ${status}`);
          break;
      }
    }
  }, [location]);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginMs = () => {
    setHasSSOError(false);
    dispatch(setIsLoading(true));
    window.location.replace(`${API_BASE_URL}/microsoftauth/login`);
  };

  const handleLoginGoogle = () => {
    setHasSSOError(false);
    dispatch(setIsLoading(true));
    window.location.replace(`${API_BASE_URL}/googleauth/login`);
  };

  const handleLoginEmail = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setHasSSOError(false);
    dispatch(logInWithEmail(email, password));
  };

  const handleForgotPassword = () => {
    setHasSSOError(false);
    history.push(forgotPassword());
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const isValidLogin = () => {
    return email?.length && password?.length;
  };

  if (isAuthenticated) {
    return <Redirect to={home()} />;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Card>
        <Box padding="24px">
          <form onSubmit={handleLoginEmail}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              minHeight="350px"
              maxWidth="200px"
            >
              <img alt="logo" src="/logo.svg" />
              <Typography variant="h4" color="primary" textAlign="center">
                Sign in
              </Typography>
              {hasEmailLoginError && (
                <Typography variant="caption" color="red">
                  Sorry, we couldn't login; please review the information you
                  typed in.
                </Typography>
              )}
              {hasSSOError && (
                <Typography variant="caption" color="red">
                  {ssoErrorMessage}
                </Typography>
              )}
              <TextField
                size="small"
                label="Email"
                placeholder="john.doe@example.com"
                type="email"
                name="email"
                required
                value={email}
                onChange={handleEmailChange}
              />
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleToggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                variant="outlined"
                type="submit"
                disabled={!isValidLogin()}
              >
                Login
              </Button>
              <Button size="small" type="button" onClick={handleForgotPassword}>
                Forgot your password?
              </Button>

              <Typography textAlign="center" variant="body2">
                - or -
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLoginMs}
              >
                Sign In with Microsoft
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLoginGoogle}
              >
                Sign In with Google
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
}
