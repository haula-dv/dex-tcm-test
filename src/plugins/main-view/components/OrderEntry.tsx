import { useAccount, useOrderEntry } from '@orderly.network/hooks';
import { AssetsContext } from '@orderly.network/react';
import { OrderSide } from '@orderly.network/types';
import { useContext, useState } from 'react';

export default function OrderEntryContainer() {
	const { state } = useAccount();
	const { onDeposit } = useContext(AssetsContext);

	const [symbol, setSymbol] = useState('PERP_ETH_USDC');

	const [side, setSide] = useState<any>(OrderSide.BUY);
	const [reduceOnly, setReduceOnly] = useState(false);
	const formState = useOrderEntry(symbol, side, reduceOnly);

	return <div className="bg-neutral-900 p-5 min-w-[360px] rounded-lg"></div>;
}
