import { Box, Card, Typography } from "@mui/material";
import React from "react";

export function Home() {
  return (
    <Box padding="24px">
      <Card>
        <Box padding="24px">
          <Box paddingLeft="12px" paddingBottom="32px">
            <Typography variant="h4">Home</Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
