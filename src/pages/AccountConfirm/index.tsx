import { Box, Button, Card, Typography } from "@mui/material";
import { selectIsAuth } from "features/session/sessionSelectors";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { home, login } from "routes/Roots";
import { authService } from "services/authService";

export function AccountConfirm() {
  const isAuthenticated = useSelector(selectIsAuth);
  const location = useLocation();
  const history = useHistory();

  const [success, setSuccess] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Handle confirm link
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const successQp = query.get("success");
    const emailQp = query.get("email");
    setSuccess(successQp === "true");
    setEmail(emailQp);
  }, [location]);

  const handleGoLogin = () => {
    history.replace(login());
  };

  const handleReConfirm = async () => {
    if (email) {
      try {
        await authService.resendConfirm(email);
        setEmailSent(true);
      } catch (err) {
        console.error(err);
        setHasError(true);
      }
    } else {
      setHasError(true);
    }
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
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            minHeight="350px"
            maxWidth="200px"
          >
            <Typography variant="body2">
              {success
                ? "Great news, your account has been confirmed. Get started collaborating"
                : "Ooops, Looks like there has been a problem with confirming your account. Let's try again."}
            </Typography>

            {hasError && (
              <Typography variant="caption" color="red">
                Sorry, we couldn't confirm your account. Please try registering
                again, or contact support.
              </Typography>
            )}
            {emailSent && (
              <Typography variant="caption">
                Email sent. Please check your inbox.
              </Typography>
            )}
            {success ? (
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleGoLogin}
              >
                Login
              </Button>
            ) : (
              !emailSent && (
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={handleReConfirm}
                >
                  Re-send the email
                </Button>
              )
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
