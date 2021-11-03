import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { sendForgotPassword } from "features/session/sessionActions";
import {
  selectHasError,
  selectIsForgotPasswordSuccessful,
  selectIsSessionLoading,
} from "features/session/sessionSelectors";
import {
  setHasError,
  setIsForgotPasswordSuccessful,
} from "features/session/sessionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "routes/Roots";

export function ForgotPassword() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const hasError = useSelector(selectHasError);
  const isLoading = useSelector(selectIsSessionLoading);
  const isSuccessful = useSelector(selectIsForgotPasswordSuccessful);

  useEffect(() => {
    // Reset session error state on load
    dispatch(setHasError(false));
    dispatch(setIsForgotPasswordSuccessful(false));
  }, [dispatch]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleGoLogin = () => {
    history.push(login());
  };

  const isValidEmail = () => {
    return !!email?.length;
  };

  const handleForgotPasswordSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(sendForgotPassword(email));
  };

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
              Forgot your password? Enter your email address below and we will
              send you the instructions to re-set it.
            </Typography>

            {hasError && (
              <Typography variant="caption" color="red">
                Sorry, we couldn't find your email; please review the
                information you typed in.
              </Typography>
            )}
            {isSuccessful && (
              <Typography variant="caption">
                Please check your inbox for instructions on how to reset your
                password.
              </Typography>
            )}
            {!isSuccessful && (
              <form onSubmit={handleForgotPasswordSubmit}>
                <Box display="flex" flexDirection="column">
                  <Box paddingTop="8px">
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
                  </Box>
                  <Box paddingTop="8px">
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={handleGoLogin}
                      fullWidth
                    >
                      Login
                    </Button>
                  </Box>
                  <Box paddingTop="8px">
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      type="submit"
                      disabled={!isValidEmail() || isLoading}
                      fullWidth
                    >
                      Send email
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
