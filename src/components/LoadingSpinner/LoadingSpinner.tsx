import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressProps,
} from "@mui/material";
import React from "react";

interface LoadingSpinnerProps {
  BoxProps?: BoxProps;
  CircularProgressProps?: CircularProgressProps;
}

export function LoadingSpinner({
  BoxProps,
  CircularProgressProps,
}: LoadingSpinnerProps) {
  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      padding="64px"
      {...BoxProps}
    >
      <CircularProgress {...CircularProgressProps} />
    </Box>
  );
}
