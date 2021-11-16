import { DeleteSharp, EditSharp } from "@mui/icons-material";
import { Box, IconButton, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

interface ActionIconsProps {
  itemId: string;
  onClickDelete: (id: string) => void;
  onClickEdit: (id: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.primary.main,
    },
    iconButton: {
      padding: "8px",
    },
  })
);

export function ActionIcons({
  itemId,
  onClickDelete,
  onClickEdit,
}: ActionIconsProps) {
  const classes = useStyles();

  const handleClickDelete = (id: string) => () => {
    onClickDelete(id);
  };

  const handleClickEdit = (id: string) => () => {
    onClickEdit(id);
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="flex-end"
      width="100%"
      marginLeft="-8px"
      maxWidth="120px"
    >
      <IconButton
        aria-label="Edit"
        className={classes.iconButton}
        onClick={handleClickEdit(itemId)}
      >
        <EditSharp className={classes.icon} />
      </IconButton>
      <IconButton
        aria-label="Delete"
        className={classes.iconButton}
        onClick={handleClickDelete(itemId)}
      >
        <DeleteSharp className={classes.icon} />
      </IconButton>
    </Box>
  );
}
