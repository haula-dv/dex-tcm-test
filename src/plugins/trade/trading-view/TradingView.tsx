import { theme } from '@/utils';
import { Box } from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';
import TimeLine from './TimeLine';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const TradingMainView = ({ symbol, onSymbolChange }: IProps) => {
	const [currentInterval, setCurrentInterval] = useState('1');
	const [currentChartType, setCurrentChartType] = useState('1');
	const [currentSelect, setCurrentSelect] = useState<string[]>([]);

	const [_, base] = symbol.split('_');

	const container = useRef<any>(null);

	const handleChangeInterval = (val: string) => {
		setCurrentInterval(val);
	};

	const handleChangeChartType = (style: string) => {
		setCurrentChartType(style);
	};

	const handleSelectIndicator = (value: string[]) => {
		setCurrentSelect(value);
	};

	// Watch and set widget chart
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
				"style": "${currentChartType}",
				"locale": "en",
				"backgroundColor": "${theme.palette.primary.light}",
				"gridColor": "${theme.palette.primary.light}",
				"hide_top_toolbar": true,
				  "allow_symbol_change": false,
				  "save_image": false,
				  "calendar": false,
				  "hide_volume": true,
				"studies": ${JSON.stringify(currentSelect)},
				"support_host": "https://www.tradingview.com" 
			}`;

		try {
			if (container.current) {
				container.current.innerHTML = '';
				container.current.appendChild(script);
			}
		} catch (error) {
			console.error('Failed to load TradingView widget:', error);
		}
	}, [symbol, currentInterval, base, currentChartType, currentSelect]);

	return (
		<Box flex={'1 1 0%'} height={'100%'} minHeight={'450px'}>
			<TimeLine
				handleChangeInterval={handleChangeInterval}
				handleChangeChartType={handleChangeChartType}
				handleSelectIndicator={handleSelectIndicator}
			/>

			<Box
				position={'relative'}
				height={'100%'}
				width={'100%'}
				bgcolor={theme.palette.primary.light}
				borderRadius={'18px'}
			>
				<Box
					position={'absolute'}
					top={0}
					left={0}
					border={3}
					borderColor={theme.palette.primary.light}
					width={'100%'}
					height={'100%'}
					bgcolor={'transparent'}
					sx={{
						pointerEvents: 'none',
						borderRadius: '18px',
					}}
					zIndex={9}
				></Box>

				<Box
					className="tradingview-widget-container"
					ref={container}
					sx={{
						height: '100%',
						width: '100%',
						borderRadius: '18px',
						overflow: 'hidden',
					}}
				>
					<div
						className="tradingview-widget-container__widget"
						style={{
							height: '100%',
							width: '100%',
							borderRadius: '18px',
						}}
					></div>
				</Box>
			</Box>

			{/* <Box
				bgcolor={theme.palette.primary.light}
				sx={{
					borderRadius: '18px',
					overflow: 'hidden',
				}}
				position={'relative'}
				height={'100%'}
				width={'100%'}
			>
				<Box
					position={'absolute'}
					top={0}
					left={0}
					border={3}
					borderColor={theme.palette.primary.light}
					width={'100%'}
					height={'100%'}
					bgcolor={'transparent'}
					sx={{
						pointerEvents: 'none',
					}}
				></Box>

				
			</Box> */}
		</Box>
	);
};

export default memo(TradingMainView);

{
	/* {isReady && (
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
						)} */
}
