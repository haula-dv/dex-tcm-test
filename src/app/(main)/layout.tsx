import "@/styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "@/components/layouts/Header";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
