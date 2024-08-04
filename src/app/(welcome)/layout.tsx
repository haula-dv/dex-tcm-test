import "@/styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

import { MainContainer } from "@/components/container/MainContainer";
import IconCryptooly from "@/components/icons/crytoly";
import { Box } from "@mui/material";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainContainer maxWidth="md">
      <Box pt={"80px"} maxWidth="586px" mx={"auto"}>
        <Box display={"flex"} justifyContent={"center"} pb={"64px"}>
          <IconCryptooly />
        </Box>
        {children}
      </Box>
    </MainContainer>
  );
}
