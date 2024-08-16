import { useOrderEntry } from '@orderly.network/hooks';
import { OrderSide } from '@orderly.network/types';

export const MyOrderEntry = () => {
	const formState = useOrderEntry('PERP_ETH_USDC', OrderSide.BUY, false);

	return <div className="bg-neutral-900 p-5 min-w-[360px] rounded-lg">1</div>;
};
