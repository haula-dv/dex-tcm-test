import { FC, PropsWithChildren } from "react";
import { EvmProvider } from "./EvmProvider";
import { OrderlyProvider } from "./OrderlyProvider";
import { SolanaProvider } from "./SolanaProvider";

// Wrapper component with WagmiProvider
export const OrderlyConfigProviderRoot: FC<PropsWithChildren> = ({
    children,
}) => {
    return <EvmProvider>
        <SolanaProvider>
            <OrderlyProvider>{children}</OrderlyProvider>
        </SolanaProvider>
    </EvmProvider>
}