import React from "react";
import { Box, Typography } from "@mui/material";
import PageWrapper from "components/PageWrapper";

export function Home() {
  return (
    <PageWrapper>
      <Box padding="24px">
        <Box paddingLeft="12px" paddingBottom="32px">
          <Typography variant="h4">Home</Typography>
        </Box>
      </Box>
    </PageWrapper>
  );
}
