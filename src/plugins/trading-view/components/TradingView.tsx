import IconLoading from '@/components/icons/loading';
import { Box } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

interface IProps {
	symbol: string;
}

export const TradingMainView = ({ symbol }: IProps) => {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsReady(true);
		}, 1000);
	}, []);

	const [_, base] = symbol.split('_');

	return (
		<>
			<Box height={'600px'}>
				{isReady ? (
					<AdvancedRealTimeChart
						disabled_features={['header_symbol_search']}
						locale="en"
						calendar
						theme="dark"
						symbol={base}
						autosize
						allow_symbol_change={false}
						interval="1"
						timezone="Etc/UTC"
					/>
				) : (
					<Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
						<IconLoading />
					</Box>
				)}
			</Box>
		</>
	);
};

export default memo(TradingMainView);
