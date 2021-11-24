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
    smallContent: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        left: "0",
        top: "0",
        position: "absolute",
        display: "initial"
      }
    },
    backContainer: {
      display: "none",
      transition: "all .2s linear",
      [theme.breakpoints.down("sm")]: {
        width: "100vw",
        left: "0",
        top: "0",
        position: "absolute",
        height: "100vh",
        backgroundColor: "#00000085",
        zIndex: "9",
        backdropFilter: "blur(2px)",
      }
    },
    smallContainer: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "initial",
        margin: "10px",
        backgroundColor: "#FEFEFE",
        bottom: "0",
        boxShadow: "1px 1px 8px #0000003d",
        left: "0",
        position: "fixed",
        top: "0",
        zIndex: 10,
        borderRadius: "10px",
        height: "calc(100% - 20px);",
        transform: "translateX(calc(-100% - 25px))",
        transition: "all .2s linear",
      },
    },
    centerItem: {
      justifyContent: "right !important",
      position: "absolute !important" as any,
      top: "10px",
      right: "0",
    },
    hidden: {
      zIndex: 1
    },
    fadeDisplay: {
      display: "initial !important",
      animation: "$fadeIn .2s ease-in-out"
    },
    slideInDisplay: {
      transform: "translateX(0) !important"
    },
    "@keyframes fadeIn": {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      }
    },
  })
);