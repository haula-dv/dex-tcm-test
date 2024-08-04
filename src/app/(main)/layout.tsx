import "@/styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

import { MainContainer } from "@/components/container/MainContainer";
import { Header } from "@/components/layouts/Header";
import { Box } from "@mui/material";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <Box pt={"100px"}>
        <MainContainer>{children}</MainContainer>
      </Box>
    </main>
  );
}
