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
						disabled_features={['header_symbol_search', 'header_compare']}
						enabled_features={[
							'side_toolbar_in_fullscreen_mode',
							'header_settings',
							'go_to_date',
							'uppercase_instrument_names',
						]}
						locale="en"
						calendar
						theme="dark"
						symbol={base}
						autosize
						allow_symbol_change={false}
						interval="W"
						timezone="Etc/UTC"
						style="9"
					/>
				) : (
					<Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'600px'}>
						<IconLoading height="20px" width="20px" />
					</Box>
				)}
			</Box>
		</>
	);
};

export default memo(TradingMainView);
