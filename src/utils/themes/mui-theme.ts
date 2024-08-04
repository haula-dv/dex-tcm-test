"use client";

import { createTheme, ThemeOptions } from "@mui/material/styles";
import components from "./custom-theme/Components";
import baselightTheme from "./custom-theme/DefaultColors";
import { shadows } from "./custom-theme/shadow";
import typography from "./custom-theme/Typography";

const baseTheme = createTheme({
  palette: {
    ...(baselightTheme as any),
  },
  shadows: shadows,
  typography: typography,
  shape: {
    borderRadius: 8,
  },
} as ThemeOptions);

// Sau khi tạo theme, thêm các components
const theme = createTheme({
  ...baseTheme,
  components: components(baseTheme) as any,
} as ThemeOptions);

export default theme;

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    filledTonal: true;
    outlinedTonal: true;
    textLink: true;
  }

  interface ButtonPropsColorOverrides {
    darkPrimary: true;
    white: true;
    dark: true;
    darkWhite: true;
    blue: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    white: true;
    cpPrimary: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    filledTonal: true;
  }
}

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsColorOverrides {
    darkPrimary: true;
  }
}
