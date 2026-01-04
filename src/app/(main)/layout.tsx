"use client";
import { HeaderLoading } from "@/components/layouts/Header";
import { OrderlyConnect } from "@/plugins/wallet/components/OrderlyConnect";
// import { Header } from "@/components/layouts/Header";
import "@/styles/global.scss";
import { Box, useTheme } from "@mui/material";
import "@orderly.network/react/dist/styles.css";
import dynamic from "next/dynamic";
import React, { createContext, useContext, useEffect } from "react";

const DynamicHeader = dynamic(() => import("@/components/layouts/Header").then((mod) => mod.Header), {
  ssr: false,
  loading: () => <HeaderLoading />,
});

// Context to share OrderlyConnect modal control
export const OrderlyConnectContext = createContext<{
  openModal: () => void;
  hasOrderlyKey: boolean;
  isRegistered: boolean;
} | null>(null);

export const useOrderlyConnectModal = () => {
  const context = useContext(OrderlyConnectContext);
  if (!context) throw new Error("useOrderlyConnectModal must be used within OrderlyConnectContext");
  return context;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();

  // Apply theme mode to the body element
  useEffect(() => {
    document.body.classList.add(theme.palette.mode);

    return () => {
      document.body.classList.remove(theme.palette.mode);
    };
  }, [theme.palette.mode]);

  const { modal, openModal, hasOrderlyKey, isRegistered } = OrderlyConnect();

  return (
    <OrderlyConnectContext.Provider value={{ openModal, hasOrderlyKey, isRegistered }}>
      <div className={theme.palette.mode}>
        <DynamicHeader />
        {modal}
        <Box position={"relative"}>{children}</Box>
      </div>
    </OrderlyConnectContext.Provider>
  );
}
