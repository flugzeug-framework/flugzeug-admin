import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&.Mui-selected": {
        backgroundImage: `linear-gradient(to right, #d4def8 100%, ${theme.palette.secondary.main} 0%)`,
        width: "calc(100% - 30px)",
        borderRadius: "5px",
        color: "#2d3780!important",
      },
    },
    listItem: {
      height: "64px",
      margin: "0 15px !important",
      width: "calc(100% - 32px)!important",
      color: "#777a96!important",
    },
    listItemText: {
      paddingLeft: "42px",
      fontWeight: "bold",
      fontFamily: theme.typography.fontFamily,
      lineHeight: "1.43",
      letterSpacing: "0.01071em",
      fontSize: "1rem",
      wordWrap: "break-word",
    },
  })
);