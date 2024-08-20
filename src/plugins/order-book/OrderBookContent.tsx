import IconLoading from '@/components/icons/loading';
import { Box, Stack } from '@mui/material';
import { useOrderbookStream, useSymbolsInfo } from '@orderly.network/hooks';
import { DesktopOrderBook } from '@orderly.network/react/esm/block';

interface IProps {
	symbol: string;
}

export const OrderBookContent = ({ symbol }: IProps) => {
	const config = useSymbolsInfo();
	const symbolInfo = config ? config[symbol] : ({} as any);

	const [data, { onDepthChange, isLoading, onItemClick, depth, allDepths }] = useOrderbookStream(symbol, undefined, {
		level: 11,
	});

	if (isLoading) {
		return (
			<Box>
				<IconLoading />
			</Box>
		);
	}

	return (
		<Stack spacing={1} p={1} height={'100%'}>
			<DesktopOrderBook
				depth={allDepths as any}
				level={11}
				autoSize
				asks={data.asks as any}
				bids={data.bids as any}
				markPrice={data.markPrice as any}
				lastPrice={data.middlePrice!}
				activeDepth={depth as any}
				base={symbolInfo('base')}
				quote={symbolInfo('quote')}
				isLoading={isLoading}
				onItemClick={onItemClick}
				onDepthChange={onDepthChange}
				className="tcmp-orderbook"
			/>
		</Stack>
	);
};
