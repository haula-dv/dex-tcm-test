import "@/styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

import { MainContainer } from "@/components/container/MainContainer";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainContainer maxWidth="sm">{children}</MainContainer>;
}
