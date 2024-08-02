// src/components/ClientThemeProvider.tsx
"use client";

import theme from "@/utils/themes/mui-theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

const ClientThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ClientThemeProvider;
