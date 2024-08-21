import { LayoutProps } from '@/common/types';
import { useIsTestnet } from '@/hooks/useIsTestnet';
import { CustomConfigStore, ENV_NAME } from '@/utils/config/CustomConfigStore';
import { OrderlyConfig } from '@/utils/config/orderly';
import { OrderlyAppProvider } from '@orderly.network/react';
import { PropsWithChildren } from 'react';

export type NetworkId = 'testnet' | 'mainnet';

const HostEnvMap: Record<string, ENV_NAME> = {
	'dev-sdk-demo.orderly.network': 'dev',
	'qa-sdk-demo.orderly.network': 'qa',
	'sdk-demo-iap.orderly.network': 'staging',
	localhost: 'staging',
};

type OrderlyContainerProps = PropsWithChildren<{
	symbol?: string;
}>;

export const OrderlyConfigProviderRoot = ({ children }: LayoutProps) => {
	const [isTestnet, networkChanged] = useIsTestnet();

	if (networkChanged && typeof window !== 'undefined') {
		window.localStorage.setItem('networkId', isTestnet ? 'testnet' : 'mainnet');
		window.location.reload();
	}

	const { app } = OrderlyConfig();

	const networkId = (localStorage.getItem('networkId') ?? 'mainnet') as NetworkId;
	const env = networkId === 'mainnet' ? 'prod' : HostEnvMap[window.location.hostname] || 'staging';
	const configStore = new CustomConfigStore({ networkId, env });

	return (
		<OrderlyAppProvider
			configStore={configStore}
			networkId={networkId}
			brokerId={app.brokerId}
			brokerName={app.brokerName}
			appIcons={app.appIcons}
			shareOptions={{ pnl: { backgroundImages: [] } }}
			theme={undefined}
		>
			{children}
		</OrderlyAppProvider>
	);
};
