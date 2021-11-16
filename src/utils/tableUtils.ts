import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export interface MainTableColumn {
  field: string;
  headerName?: string;
  hasSorting?: boolean;
}

export interface MainTableRow {
  innerCells: MainTableCell[];
}

export interface MainTableCell {
  value: string | JSX.Element;
}

export const mainTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerRow: {
      backgroundColor: theme.palette.grey[100],
      "& > .MuiTableCell-body": {
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
      },
      "& > .MuiTableCell-body p": {
        color: theme.palette.grey[900],
      },
      "& .MuiTableCell-root:first-child": {
        paddingLeft: "24px",
      },
    },
    row: {
      "& > .MuiTableCell-body": {
        color: theme.palette.grey[500],
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
      },
      "& .MuiTableCell-root:first-child": {
        paddingLeft: "24px",
      },
    },
    title: {
      color: theme.palette.primary.dark,
      textTransform: "uppercase",
      fontWeight: "bold",
      width: "max-content",
    },
    header: {
      borderBottom: `2px solid ${theme.palette.grey[200]}`,
      borderTop: `2px solid ${theme.palette.grey[200]}`,
      "& .MuiTableCell-root:first-child": {
        paddingLeft: "24px",
      },
    },
    iconButton: {
      padding: "4px",
    },
    link: {
      textDecoration: "underline",
      color: theme.palette.primary.light,
    },
    textCell: {
      color: theme.palette.grey["500"],
      width: "max-content",
    },
    radio: {
      color: theme.palette.primary.dark,
      "&$checked": {
        color: theme.palette.primary.dark,
      },
    },
    checked: {},
  })
);
