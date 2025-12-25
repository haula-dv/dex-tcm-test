import { FC, PropsWithChildren, useEffect, useState } from "react";
import { WalletConnectorContext, WalletState } from "@orderly.network/hooks";
import { ChainNamespace } from "@orderly.network/types";
import { useAppKit } from "@reown/appkit/react";
import { useAccount as useWagmiAccount } from "wagmi";
import { arbitrum, mainnet } from "viem/chains";

// Define chains (const assertion for wagmi types)
const chains = [mainnet, arbitrum] as const;

export const OrderlyWalletProvider: FC<PropsWithChildren> = ({ children }) => {
    const [wallet, setWallet] = useState<WalletState>({
        chains: chains.map((chain) => ({ namespace: ChainNamespace.evm, id: chain.id })),
        accounts: [],
        icon: "",
        label: "",
        provider: undefined as any
    });

    const { open } = useAppKit();
    const { address, isConnecting, chain, connector, status } = useWagmiAccount();

    useEffect(() => {
        const run = async () => {
            // If no connector, reset wallet state partially or return?
            if (!connector) return;

            const provider = (await connector.getProvider()) as any;
            const accounts = await connector.getAccounts().then((addresses: readonly string[]) =>
                addresses.map((addr: string) => ({ address: addr }))
            );

            let label = "";
            try {
                // getClient might be undefined on some connectors
                const client = await connector.getClient?.();
                if (client) label = client.name;
            } catch (e) {
                // ignore
            }

            setWallet({
                ...wallet,
                accounts,
                provider,
                label
            });
        };
        run();
    }, [address, connector]);

    return (
        <WalletConnectorContext.Provider
            value={{
                connect: () => {
                    return open().then(() => []);
                },
                disconnect: async () => {
                    connector?.disconnect();
                    return [];
                },
                setChain: async (options) => {
                    const chainId = options.chainId;
                    return connector?.switchChain?.({ chainId: Number(chainId) });
                },
                chains: chains.map((chain) => ({ namespace: ChainNamespace.evm, id: chain.id })),
                connectedChain: chain ? { id: chain.id, namespace: ChainNamespace.evm } : null,
                namespace: ChainNamespace.evm,
                connecting: isConnecting,
                settingChain: status === "reconnecting",
                wallet
            }}
        >
            {children}
        </WalletConnectorContext.Provider>
    );
};
