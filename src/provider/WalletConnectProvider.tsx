"use client";
import { OrderlyConfigProviderRoot } from "./OrderlyConfigProviderRoot";

/**
 * Web3OnboardProviderRoot - Wrapper for Orderly SDK v2 providers
 *
 * Structure (per Orderly docs):
 * WalletConnectorProvider (independent wallet connector)
 *   └─ OrderlyAppProvider (provides configStore)
 *       └─ children
 */
export default function Web3OnboardProviderRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OrderlyConfigProviderRoot>{children}</OrderlyConfigProviderRoot>;
}
