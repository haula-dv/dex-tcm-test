import { TradingView } from '@orderly.network/trading-view';

export default function AdvancedChart({ symbol }: any) {
	return (
		<div className="w-full min-h-[35rem] [&_iframe]:min-h-[35rem]">
			<TradingView
				symbol={symbol}
				libraryPath="/tradingview/charting_library/bundles"
				tradingViewScriptSrc="/tradingview/charting_library/charting_library.js"
				tradingViewCustomCssUrl="/tradingview/chart.css"
				loadingElement={<span style={{ color: '#fff' }}>.....Loading.....</span>}
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
			/>
		</div>
	);
}
