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
  logInWithExchange,
  registerWithemail,
} from "features/session/sessionActions";
import {
  selectErrorMessage,
  selectHasError,
  selectIsAuth,
  selectIsRegisterSuccessful,
} from "features/session/sessionSelectors";
import { setHasError, setIsLoading } from "features/session/sessionSlice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { home } from "routes/Roots";
import { API_BASE_URL } from "services/baseService";

enum SSORegisterStatus {
  EmailInUse = "emailInUse",
}

export function Register() {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuth);
  const isRegsisterSuccessful = useSelector(selectIsRegisterSuccessful);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hasEmailRegisterError = useSelector(selectHasError);
  const errorMessage = useSelector(selectErrorMessage);
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
        case SSORegisterStatus.EmailInUse:
          setHasSSOError(true);
          setSsoErrorMessage(
            "Sorry, we couldn't create your account; This email is already registered."
          );
          break;
        default:
          setHasSSOError(true);
          setSsoErrorMessage(
            `Sorry, we couldn't create your account; Unknown error: ${status}`
          );
          break;
      }
    }
  }, [location]);

  const handleRegisterMs = () => {
    setHasSSOError(false);
    dispatch(setIsLoading(true));
    window.location.replace(`${API_BASE_URL}/microsoftauth/register`);
  };

  const handleRegisterGoogle = () => {
    setHasSSOError(false);
    dispatch(setIsLoading(true));
    window.location.replace(`${API_BASE_URL}/googleauth/register`);
  };

  const handleRegisterEmail = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setHasSSOError(false);
    dispatch(registerWithemail(name, email, password));
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
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
          <form onSubmit={handleRegisterEmail}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              minHeight="350px"
              maxWidth="200px"
            >
              <img alt="logo" src="/logo.svg" />
              <Typography variant="body2" color="primary">
                Please enter the details for the administrator account.
              </Typography>
              {hasEmailRegisterError && (
                <Typography
                  variant="caption"
                  color="red"
                >{`Sorry, we couldn't create your account; ${errorMessage}`}</Typography>
              )}
              {isRegsisterSuccessful && (
                <Typography variant="caption">
                  Please check your inbox for next steps.
                </Typography>
              )}
              {hasSSOError && (
                <Typography variant="caption" color="red">
                  {ssoErrorMessage}
                </Typography>
              )}

              {isRegsisterSuccessful ? (
                ""
              ) : (
                <Fragment>
                  <TextField
                    size="small"
                    label="Name"
                    placeholder="john Doe"
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={handleNameChange}
                  />
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
                    Create Account
                  </Button>

                  <Typography textAlign="center" variant="body2">
                    - or -
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleRegisterMs}
                  >
                    Register with Microsoft
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleRegisterGoogle}
                  >
                    Register with Google
                  </Button>
                </Fragment>
              )}
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
}
