"use client";
import { HeaderLoading } from "@/components/layouts/Header";
// import { Header } from "@/components/layouts/Header";
import "@/styles/global.scss";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import "@orderly.network/react/dist/styles.css";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

const DynamicHeader = dynamic(() => import("@/components/layouts/Header").then((mod) => mod.Header), {
  ssr: false,
  loading: () => <HeaderLoading />,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  // Apply theme mode to the body element
  useEffect(() => {
    document.body.classList.add(theme.palette.mode);

    return () => {
      document.body.classList.remove(theme.palette.mode);
    };
  }, [theme.palette.mode]);


  return (
    <div className={theme.palette.mode}>
      <DynamicHeader />
      <Box position={"relative"}>{children}</Box>
    </div>
  );
}
