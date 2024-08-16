'use client';
import { OrderlyConfig } from '@/src/utils/config/orderly/config';
import { useAccount, useOrderbookStream, useOrderEntry, useSymbolsInfo } from '@orderly.network/hooks';
import { AssetsContext, TradingPage } from '@orderly.network/react';
import { OrderSide } from '@orderly.network/types';
import { useContext, useState } from 'react';

interface Props {
	onSymbolChange: (symbol: any) => void;
	symbol: string;
}
export default function MainViewContainer(props: Props) {
	const { tradingViewConfig } = OrderlyConfig();

	const { state } = useAccount();
	const { onDeposit } = useContext(AssetsContext);

	const [symbol, setSymbol] = useState(props.symbol ?? 'PERP_ETH_USDC');
	const [side, setSide] = useState(OrderSide.BUY);
	const [reduceOnly, setReduceOnly] = useState(false);
	const formState = useOrderEntry(symbol, side, reduceOnly);

	const config = useSymbolsInfo();
	const symbolInfo = config ? config[symbol] : ({} as any);

	const [data, { onDepthChange, isLoading, onItemClick, depth, allDepths }] = useOrderbookStream(symbol, undefined, {
		level: 7,
	});

	return (
		<>
			<TradingPage symbol={props.symbol} tradingViewConfig={tradingViewConfig} onSymbolChange={props.onSymbolChange} />
			{/* <Deposit />
			<Withdraw />
			<div className="bg-neutral-900 px-5 py-3 w-[300px] rounded-lg h-[480px]">
				<OrderBook
					level={7}
					asks={data.asks as any}
					bids={data.bids as any}
					markPrice={data.markPrice as any}
					lastPrice={data.middlePrice!}
					depth={allDepths}
					activeDepth={depth as any}
					base={symbolInfo('base')}
					quote={symbolInfo('quote')}
					isLoading={isLoading}
					onItemClick={onItemClick}
					onDepthChange={onDepthChange}
					cellHeight={22}
				/>
			</div>

			<AssetsProvider>
				<MyOrderEntry />
			</AssetsProvider> */}

			{/* <TradingViewContaner symbol={symbol}/> */}
		</>
	);
}
