import { useOrderbookStream, useSymbolsInfo } from '@orderly.network/hooks';
import { OrderBook } from '@orderly.network/react';

export const OrderBookContainer = () => {
	const config = useSymbolsInfo();
	const symbolInfo = config ? config['PERP_ETH_USDC'] : ({} as any);

	const [data, { onDepthChange, isLoading, onItemClick, depth, allDepths }] = useOrderbookStream(
		'PERP_ETH_USDC',
		undefined,
		{
			level: 7,
		},
	);

	return (
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
	);
};
