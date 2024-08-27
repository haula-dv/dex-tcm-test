import { ITab } from '@/common/types/components/tab';
import MainTab from '@/components/tab/MainTab';
import { theme } from '@/utils';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Divider } from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';
import SymbolHeader from '../components/SymbolHeader';
import TimeLine from './TimeLine';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const TradingMainView = ({ symbol, onSymbolChange }: IProps) => {
	const [isReady, setIsReady] = useState(false);
	const [currentInterval, setCurrentInterval] = useState('1');

	useEffect(() => {
		setTimeout(() => {
			setIsReady(true);
		}, 1000);
	}, []);

	const [_, base] = symbol.split('_');

	const tabs: ITab[] = [
		{ label: 'Price', value: 'price' },
		{ label: 'Depth', value: 'depth' },
		{ label: 'Details', value: 'details' },
	];

	const container = useRef<any>(null);

	const handleChangeInterval = (val: string) => {
		setCurrentInterval(val);
	};

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
		script.type = 'text/javascript';
		script.async = true;
		script.innerHTML = `
			{
				"autosize": true,
				"symbol": "${base}",
				"interval": "${currentInterval}",
				"timezone": "Etc/UTC",
				"theme": "light",
				"style": "1",
				"locale": "en",
				"backgroundColor": "${theme.palette.primary.light}",
				"gridColor": "${theme.palette.primary.light}",
				"hide_top_toolbar": true,
          		"allow_symbol_change": false,
          		"save_image": false,
          		"calendar": false,
          		"hide_volume": true,
				"support_host": "https://www.tradingview.com"
			}`;

		if (container.current) {
			// Xóa nội dung cũ trước khi thêm mới
			container.current.innerHTML = '';
			container.current.appendChild(script);
		}
	}, [symbol, currentInterval, base]);

	return (
		<Box>
			<SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />
			<Divider />
			<Box p="10px">
				<MainTab tabs={tabs} />

				{/* {isReady && (
					<AdvancedRealTimeChart
					disabled_features={[
							'hide_left_toolbar_by_default',
							'adaptive_logo',
							'header_chart_type',
							'header_compare',
							'left_toolbar',
						]}
						locale="en"
						calendar
						hide_top_toolbar
						hide_side_toolbar
						theme="light"
						symbol={base}
						autosize
						allow_symbol_change={false}
						interval="180"
						range="12M"
						timezone="Etc/UTC"
						style="9"
						/>
						)} */}

				<TimeLine handleChangeInterval={handleChangeInterval} />

				<Box height="40vh">
					<div
						className="tradingview-widget-container"
						ref={container}
						style={{
							height: '100%',
							width: '100%',
							borderBottomLeftRadius: TSizes.borderRadius,
							borderBottomRightRadius: TSizes.borderRadius,
							overflow: 'hidden',
						}}
					>
						<div
							className="tradingview-widget-container__widget"
							style={{
								height: '100%',
								width: '100%',
								overflow: 'hidden',
								borderBottomLeftRadius: TSizes.borderRadius,
								borderBottomRightRadius: TSizes.borderRadius,
							}}
						></div>
					</div>
				</Box>
			</Box>
		</Box>
	);
};

export default memo(TradingMainView);
