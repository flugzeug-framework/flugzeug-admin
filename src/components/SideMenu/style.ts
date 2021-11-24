import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      height: "100vh",
    },
    logoContainer: {
      margin: "0 auto",
      paddingTop: "24px",
      width: "111px",
    },
    logo: {
      maxWidth: "100%",
      height: "auto",
    },
    container: {
      backgroundColor: "#FEFEFE",
      bottom: "0",
      boxShadow: "0px 5px 25px #00000014",
      left: "0",
      position: "fixed",
      top: "0",
      zIndex: 10,
      borderRadius: "10px",
      height: "calc(100% - 60px);",
      margin: "30px 10px 10px 20px",
      [theme.breakpoints.down("sm")]: {
        display: "none"
      },
    },
  })
);