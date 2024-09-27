import MainCard from '@/components/card/MainCard';
import IconLoading from '@/components/icons/loading';
import { useOrderbookStream, useSymbolsInfo } from '@orderly.network/hooks';
import { DesktopOrderBook } from '@orderly.network/react/esm/block';

interface IProps {
	symbol: string;
}

export const OrderBookContent = ({ symbol }: IProps) => {
	const config = useSymbolsInfo();
	const symbolInfo = config ? config[symbol] : ({} as any);

	const [data, { onDepthChange, isLoading, onItemClick, depth, allDepths }] = useOrderbookStream(symbol, undefined, {
		level: 15,
	});

	if (isLoading) {
		return (
			<>
				<IconLoading />
			</>
		);
	}

	return (
		<MainCard backgroudColor="primaryLight" width="100%">
			<DesktopOrderBook
				depth={[]}
				level={15}
				autoSize
				asks={data.asks as any}
				bids={data.bids as any}
				markPrice={data.markPrice as any}
				lastPrice={data.middlePrice!}
				base={symbolInfo('base')}
				quote={symbolInfo('quote')}
				isLoading={isLoading}
				onItemClick={onItemClick}
				className="tcmp-orderbook"
			/>
		</MainCard>
	);
};
