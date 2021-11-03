// import { createMuiTheme } from "@material-ui/core/styles";
import { createTheme } from "@mui/material/styles";
import "fontsource-noto-sans";

const primary = "#1e326b";
const primaryDark = "#1e326b";
const primaryLight = "#1e326b";
const secondary = "#D50918";
const background = "#F0EFEF";
const errorMain = "#D50918";
const successMain = "#16B735";
const successLight = "#00E396";
const warningMain = "#57A825";
const warningLight = "#F7A60E";

const grey100 = "#F7F7F7";
const grey200 = "#F0EFEF";
const grey300 = "#E3E3E3";
const grey400 = "#C3C3C7";
const grey500 = "#838385";
const grey600 = "#646466";
const grey700 = "#384265";
const grey800 = "#161616";
const grey900 = "#3D3D3D";

const customTheme = createTheme({
  palette: {
    primary: { main: primary, dark: primaryDark, light: primaryLight },
    secondary: { main: secondary },
    background: { default: background },
    divider: "#E3E3E3",
    grey: {
      "100": grey100,
      "200": grey200,
      "300": grey300,
      "400": grey400,
      "500": grey500,
      "600": grey600,
      "700": grey700,
      "800": grey800,
      "900": grey900,
    },
    error: {
      main: errorMain,
    },
    success: {
      main: successMain,
      light: successLight,
    },
    warning: {
      main: warningMain,
      light: warningLight,
    },
  },
  typography: {
    fontFamily: "Noto Sans",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          textTransform: "none",
          padding: "12px",
          height: "32px",
          fontSize: "12px",
          fontWeight: "bold",
        },
        outlined: {
          border: `1px solid ${grey400}`,
          padding: "12px",
          color: primaryDark,
          backgroundColor: "white",
        },
        contained: {
          backgroundColor: primaryDark,
          borderRadius: "4px",
          boxShadow: "none",
          color: "white",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: { margin: "0 !important", width: "100% !important" },
        marginNormal: {
          marginBottom: "0",
          marginTop: "0",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: grey400,
          fontSize: "12px",
          transform: "translate(14px, 8px) scale(1)",
        },
        shrink: {
          transform: "translate(14px, -8px) scale(1)",
          fontsize: "8px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderRadius: 4,
          color: primaryDark,
          fontsize: "12px",
          height: "32px",
          width: "100%",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: background,
          height: "32px",
          width: "100%",
          fontsize: "12px",
          color: grey500,
          "& input::placeholder": { fontSize: "12px" },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          userSelect: "none",
        },
      },
    },
  },
});

export default customTheme;
