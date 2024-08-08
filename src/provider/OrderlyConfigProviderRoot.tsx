import { LayoutProps } from "@/common/types";
import { useIsTestnet } from "@/hooks/useIsTestnet";
import { OrderlyConfigProvider } from "@orderly.network/hooks";

export const OrderlyConfigProviderRoot = ({ children }: LayoutProps) => {
  const [isTestnet, networkChanged] = useIsTestnet();

  if (networkChanged && typeof window !== "undefined") {
    window.localStorage.setItem("networkId", isTestnet ? "testnet" : "mainnet");
    window.location.reload();
  }

  return (
    <OrderlyConfigProvider
      networkId={isTestnet ? "testnet" : "mainnet"}
      brokerId="tcmp"
    >
      {children}
    </OrderlyConfigProvider>
  );
};
