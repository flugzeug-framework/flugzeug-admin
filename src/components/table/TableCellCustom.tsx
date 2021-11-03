import { Box, TableCell, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { MainTableCell, mainTableStyles } from "utils/tableUtils";

interface TableCellCustomProps {
  cellData: MainTableCell;
}

export const cellStyles = makeStyles((theme: Theme) =>
  createStyles({
    alertIcon: {
      color: theme.palette.error.main,
    },
    alertIconHazard: {
      color: theme.palette.error.main,
      fontSize: "0.75rem",
    },
    missingHazard: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100px",
      backgroundColor: "white",
      top: 0,
    },
    iconWithBackground: { fontSize: "13px", color: "#002868" },
    iconBackground: {
      backgroundColor: "white",
      position: "absolute",
      bottom: "2px",
      right: "-1px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100px",
    },
    leftIconBackground: {
      backgroundColor: "white",
      position: "absolute",
      bottom: "2px",
      right: "-1px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100px",
    },
    rightIconBackground: {
      backgroundColor: "white",
      position: "absolute",
      bottom: "2px",
      right: "-10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100px",
    },
    container: {
      display: "flex",
    },
  })
);

export function TableCellCustom({ cellData }: TableCellCustomProps) {
  const cellClasses = cellStyles();
  const classes = mainTableStyles();

  const cellContent = (value: string | JSX.Element) => {
    if (typeof value === "string") {
      return (
        <Typography variant="body2" className={classes.textCell}>
          {value}
        </Typography>
      );
    }

    return value;
  };

  return (
    <TableCell>
      <Box className={cellClasses.container}>{cellContent(cellData.value)}</Box>
    </TableCell>
  );
}
