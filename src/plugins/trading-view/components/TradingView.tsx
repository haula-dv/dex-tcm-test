import { OrderlyConfig } from '@/utils/config/orderly';
import { Box } from '@mui/material';
import { memo } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

export const TradingMainView = () => {
	const { tradingViewConfig } = OrderlyConfig();

	return (
		<Box height={'600px'}>
			<AdvancedRealTimeChart
				disabled_features={['header_symbol_search']}
				locale="en"
				calendar
				theme="dark"
				symbol="ETH"
				autosize
				allow_symbol_change={false}
			></AdvancedRealTimeChart>

			{/* <TradingView
			
				symbol={symbol}
				libraryPath="/tradingview/charting_library/bundles"
				tradingViewScriptSrc="/tradingview/charting_library/charting_library.js"
				tradingViewCustomCssUrl="/tradingview/chart.css"
				loadingElement={<IconLoading />}
				overrides={{
					'mainSeriesProperties.candleStyle.borderDownColor': '#DC2140',
					'mainSeriesProperties.candleStyle.borderUpColor': '#1F8040',

					'mainSeriesProperties.candleStyle.downColor': '#DC2140',
					'mainSeriesProperties.candleStyle.upColor': '#1F8040',

					'mainSeriesProperties.candleStyle.wickDownColor': '#DC2140',
					'mainSeriesProperties.candleStyle.wickUpColor': '#1F8040',

					'paneProperties.background': '#101418',
					'paneProperties.backgroundType': 'solid',
					'paneProperties.separatorColor': '#164165',

					'paneProperties.horzGridProperties.color': '#161B22',
					'paneProperties.vertGridProperties.color': '#161B22',
					'paneProperties.legendProperties.showSeriesTitle': 'false',
				}}
			/> */}
		</Box>
	);
};

export default memo(TradingMainView);
