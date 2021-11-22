import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

interface BackButtonProps {
  label?: string;
  onClick: VoidFunction;
}

export function BackButton({ label = "Back", onClick }: BackButtonProps) {
  return (
    <Box margin="4px 0 4px" display="flex" alignItems="center">
      <IconButton aria-label="Edit" onClick={onClick}>
        <ArrowBack color="primary" />
      </IconButton>
      <Typography color="primary">{label}</Typography>
    </Box>
  );
}
