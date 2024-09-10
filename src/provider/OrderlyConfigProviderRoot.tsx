import { LayoutProps } from '@/common';
import { CustomConfigStore, ENV_NAME } from '@/utils/config/CustomConfigStore';
import { CustomContractManager } from '@/utils/config/CustomContract';
import { OrderlyConfig } from '@/utils/config/orderly';
import { OrderlyAppProvider } from '@orderly.network/react';

export type NetworkId = 'testnet' | 'mainnet';

const HostEnvMap: Record<string, ENV_NAME> = {
	'dev-sdk-demo.orderly.network': 'dev',
	'qa-sdk-demo.orderly.network': 'qa',
	'sdk-demo-iap.orderly.network': 'staging',
	localhost: 'staging',
};

const OrderlyConfigProviderRoot = ({ children }: LayoutProps) => {
	const networkId = (localStorage.getItem('networkId') ?? 'mainnet') as NetworkId;

	const { app } = OrderlyConfig();

	const env = networkId === 'mainnet' ? 'prod' : HostEnvMap[window.location.hostname] || 'staging';

	const configStore = new CustomConfigStore({ networkId, env });
	const contracts = new CustomContractManager(configStore);

	return (
		<OrderlyAppProvider
			configStore={configStore}
			networkId={networkId}
			brokerId={app.brokerId}
			brokerName={app.brokerName}
			appIcons={app.appIcons}
			shareOptions={{ pnl: { backgroundImages: [] } }}
			theme={undefined}
			// contracts={contracts}
		>
			{children}
		</OrderlyAppProvider>
	);
};

export default OrderlyConfigProviderRoot;
