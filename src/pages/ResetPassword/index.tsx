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
  Typography,
} from "@mui/material";
import { resetPassword } from "features/session/sessionActions";
import {
  selectHasError,
  selectIsAuth,
  selectIsSessionLoading,
} from "features/session/sessionSelectors";
import {
  setHasError,
  setIsForgotPasswordSuccessful,
} from "features/session/sessionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { home } from "routes/Roots";

export function ResetPassword() {
  const isAuthenticated = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const location = useLocation();

  const hasError = useSelector(selectHasError);
  const isLoading = useSelector(selectIsSessionLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    // Reset session error state on load
    dispatch(setHasError(false));
    dispatch(setIsForgotPasswordSuccessful(false));
  }, [dispatch]);

  // Handle reset link
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    if (token != null) {
      // Store token that we got from backend when it redirected here
      setToken(token);
    }
  }, [location]);

  const handleResetPasswordSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(resetPassword(token, password));
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const isValidForm = () => {
    return password.length >= 8 && password === passwordConfirm;
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
          <img alt="logo" src="/logo.svg" />
          <Box maxWidth="200px">
            <Typography variant="body2">
              To re-set your password please enter your new password and confirm
              it.
            </Typography>

            {hasError && (
              <Typography variant="caption" color="red">
                Sorry, we couldn't re-set your password; please review the
                information you typed in, or try requesting a new re-set email.
              </Typography>
            )}

            <form onSubmit={handleResetPasswordSubmit}>
              <Box display="flex" flexDirection="column">
                <Box paddingTop="8px">
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
                </Box>
                <Box paddingTop="8px">
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel htmlFor="confirm-password">
                      Confirm password
                    </InputLabel>
                    <OutlinedInput
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordConfirmChange}
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
                      label="Confirm password"
                    />
                  </FormControl>
                </Box>

                <Box paddingTop="8px">
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    type="submit"
                    disabled={!isValidForm() || isLoading}
                    fullWidth
                  >
                    Reset password
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
