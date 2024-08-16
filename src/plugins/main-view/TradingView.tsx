import React from 'react'
import { TradingView } from '@orderly.network/trading-view';

interface IProps {
    symbol:string;
}

export default function TradingViewContaner({symbol}:IProps) {
  return (
   
    <div className="w-full min-h-[35rem] [&_iframe]:min-h-[35rem]">
    <TradingView
      symbol={symbol}
      libraryPath={"https://sdk-demo.orderly.network/tradingview/charting_library/bundles"}
      tradingViewScriptSrc="https://sdk-demo.orderly.network/tradingview/charting_library/charting_library.js"
      tradingViewCustomCssUrl="https://sdk-demo.orderly.network/tradingview/chart.css"
      loadingElement={<>......</>}
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
        'paneProperties.legendProperties.showSeriesTitle': 'false'
      }}
    />
  </div>
  )
}
