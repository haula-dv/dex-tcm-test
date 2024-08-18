import { LayoutProps } from '@/common/types';
import { useIsTestnet } from '@/hooks/useIsTestnet';
import { OrderlyConfig } from '@/utils/config/orderly';
import { OrderlyConfigProvider } from '@orderly.network/hooks';

export const OrderlyConfigProviderRoot = ({ children }: LayoutProps) => {
	const [isTestnet, networkChanged] = useIsTestnet();

	if (networkChanged && typeof window !== 'undefined') {
		window.localStorage.setItem('networkId', isTestnet ? 'testnet' : 'mainnet');
		window.location.reload();
	}

	const { app } = OrderlyConfig();

	return (
		<OrderlyConfigProvider
			networkId={isTestnet ? 'testnet' : 'mainnet'}
			brokerId={app.brokerId}
			brokerName={app.brokerName}
			chainFilter={app.chainFilter}
		>
			{children}
		</OrderlyConfigProvider>
	);
};
