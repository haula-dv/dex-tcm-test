import { Palette, TypeBackground, TypeText } from "@mui/material";

const baselightTheme = {
  direction: "ltr",
  palette: {
    primary: {
      light: "#F7F4F0",
      main: "#E9E4DE",
      dark: "#B37350",
      contrastText: "#fff",
    },
    grey: {
      50: "#F2F2F2",
      100: "#D8D8D8",
      200: "#BFBFBF",
      300: "#A5A5A5",
      400: "#8C8C8C",
      500: "#727272",
      600: "#595959",
      700: "#3F3F3F",
      800: "#262626",
      900: "#413A36",
      A900: "#413A36",
    },
    info: {
      main: "#8C8C8C",
      light: "#C7F9F4",
      contrastText: "#fff",
    },
    blue: {
      main: "#8C8C8C",
      light: "#C7F9F4",
      contrastText: "#fff",
    },
    success: {
      main: "#00B59F",
      contrastText: "#fff",
    },
    error: {
      main: "#DE4242",
      light: "#F5C6C6",
      contrastText: "#fff",
    },
    darkPrimary: {
      main: "#413A36",
      contrastText: "#fff",
    },
    darkGrey: {
      main: "#3F3F3F",
      contrastText: "#F7F4F0",
    },
    white: {
      main: "#fff",
      contrastText: "#413A36",
    },
    whitePrimary: {
      main: "#F2F2F2",
      contrastText: "#B37350",
    },
  },
};

const baseDarkTheme = {
  direction: "ltr",
  palette: {
    primary: {
      light: "#F7F4F0",
      main: "#E9E4DE",
      dark: "#B37350",
      contrastText: "#fff",
    },
    grey: {
      50: "#F2F2F2",
      100: "#D8D8D8",
      200: "#BFBFBF",
      300: "#A5A5A5",
      400: "#8C8C8C",
      500: "#727272",
      600: "#595959",
      700: "#3F3F3F",
      800: "#262626",
      900: "#413A36",
      A900: "#413A36",
    },
    info: {
      main: "#8C8C8C",
      light: "#C7F9F4",
      contrastText: "#fff",
    },
    blue: {
      main: "#8C8C8C",
      light: "#C7F9F4",
      contrastText: "#fff",
    },
    success: {
      main: "#0BA111",
      contrastText: "#fff",
    },
    error: {
      main: "#DE4242",
      light: "#F5C6C6",
      contrastText: "#fff",
    },

    dark: {
      main: "#000000",
      contrastText: "#fff",
    },

    darkPrimary: {
      main: "#000000",
      contrastText: "#fff",
    },
    darkGrey: {
      main: "#595959",
      contrastText: "#F2F2F2",
    },
    greyLight: {
      main: "#D8D8D8",
      contrastText: "#727272",
    },
    white: {
      main: "#fff",
      contrastText: "#413A36",
    },
    whitePrimary: {
      main: "#F2F2F2",
      contrastText: "#B37350",
    },
    text: {
      primary: "#fff",
    } as TypeText,

    background: {
      default: "#262626",
      paper: "#262626",
    } as TypeBackground,
  } as unknown as Palette,
};

export { baseDarkTheme, baselightTheme };
