import { FC } from "react";
import { EvmProvider } from "./EvmProvider";
import { OrderlyProvider } from "./OrderlyProvider";

export const OrderlyRootProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>
        <EvmProvider>
            <OrderlyProvider>
                {children}
            </OrderlyProvider>
        </EvmProvider>
    </>
};