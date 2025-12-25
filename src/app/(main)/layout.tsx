"use client";
import "@/styles/global.scss";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import "@orderly.network/react/dist/styles.css";
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useConnectWallet } from '@web3-onboard/react';
import React, { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [{ wallet: evmWallet }, connectWallet] = useConnectWallet();
  const { setVisible: setSolanaModalVisible } = useWalletModal();

  // Apply theme mode to the body element
  useEffect(() => {
    document.body.classList.add(theme.palette.mode);

    return () => {
      document.body.classList.remove(theme.palette.mode);
    };
  }, [theme.palette.mode]);

  const { buttonState, onConnect } = useWalletMultiButton({
    onSelectWallet() {
      setSolanaModalVisible(true);
    }
  });

  return (
    <div className={theme.palette.mode}>
      {/* {lgUp ? <Header /> : <HeaderMobile />} */}
      {/* <Header /> */}
      Heyyyyyyyyyyyyyyyyyyyyy


      <Box position={"relative"}>{children}</Box>
    </div>
  );
}
