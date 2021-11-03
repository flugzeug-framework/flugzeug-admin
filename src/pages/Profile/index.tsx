import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { closeSession } from "features/session/sessionActions";
import { selectCurrentUser } from "features/session/sessionSelectors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export function Profile() {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(closeSession());
  };

  return (
    <Box padding="24px">
      <Card>
        <Box padding="24px">
          <Box paddingLeft="12px" paddingBottom="32px">
            <Typography variant="h4">Profile</Typography>
          </Box>
          <Grid container rowSpacing={2}>
            <Grid item xs={1}>
              <Box paddingLeft="12px">
                <Typography variant="body2">Name:</Typography>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">{user?.name}</Typography>
            </Grid>
            <Grid item xs={10}></Grid>
            <Grid item xs={1}>
              <Box paddingLeft="12px">
                <Typography variant="body2">Email:</Typography>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">{user?.email}</Typography>
            </Grid>
            <Grid item xs={10}></Grid>
            <Grid item xs={1}>
              <Button onClick={handleLogout}>Log out</Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}
