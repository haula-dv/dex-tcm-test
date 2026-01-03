'use client'
import { useIsTestnet } from '@/hooks';
import { FC, useEffect } from 'react';

/**
 * NetworkSwitchHandler - Handles network switching logic
 * This component must be rendered INSIDE the OrderlyProvider
 * so that hooks can access the initialized providers
 */
export const NetworkSwitchHandler: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isTestnet, networkChanged] = useIsTestnet();

    useEffect(() => {
        if (networkChanged && typeof window !== 'undefined') {
            // Delay to ensure state is updated
            setTimeout(() => {
                window.localStorage.setItem('networkId', isTestnet ? 'testnet' : 'mainnet');
                window.location.reload();
            }, 1_000);
        }
    }, [isTestnet, networkChanged]);

    return <>{children}</>;
};
