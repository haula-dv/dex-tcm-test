'use client';
import { themeSelectorState } from '@/common/stores/common';
import { OrderlyConfig } from '@/utils/config/orderly';
import { ConnectorProvider } from '@orderly.network/web3-onboard';
import { useStore } from 'zustand';
import OrderlyConfigProviderRoot from './OrderlyConfigProviderRoot';

export default function Web3OnboardProviderRoot({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { web3Onboard } = OrderlyConfig();
	const themeSelect = useStore(themeSelectorState, (state) => state.value);
	return (
		<ConnectorProvider
			options={
				{
					...web3Onboard,
					theme: themeSelect.activeMode,
				} as any
			}
		>
			<OrderlyConfigProviderRoot>{children}</OrderlyConfigProviderRoot>
		</ConnectorProvider>
	);
}
