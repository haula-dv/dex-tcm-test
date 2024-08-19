import IconLoading from '@/components/icons/loading';
import { Box } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

export const TradingMainView = () => {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsReady(true);
		}, 1000);
	}, []);

	return (
		<>
			<Box height={'600px'}>
				{isReady ? (
					<AdvancedRealTimeChart
						disabled_features={['header_symbol_search']}
						locale="en"
						calendar
						theme="dark"
						symbol="ETH"
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
