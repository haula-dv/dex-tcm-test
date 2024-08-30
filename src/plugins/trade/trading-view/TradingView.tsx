import { theme } from '@/utils';
import { Box } from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';
import TimeLine from './TimeLine';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const TradingMainView = ({ symbol, onSymbolChange }: IProps) => {
	const [isReady, setIsReady] = useState(false);
	const [currentInterval, setCurrentInterval] = useState('1');

	const [_, base] = symbol.split('_');

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
			container.current.innerHTML = '';
			container.current.appendChild(script);
		}
	}, [symbol, currentInterval, base]);

	return (
		<Box>
			<TimeLine handleChangeInterval={handleChangeInterval} />

			<Box
				height="450px"
				bgcolor={theme.palette.primary.light}
				sx={{
					borderRadius: '18px',
					overflow: 'hidden',
				}}
				position={'relative'}
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
						pointerEvents: 'none', // Add this line to allow clicks to pass through
					}}
				></Box>

				{/* {!isReady && (
					<Box
						position={'absolute'}
						top={0}
						left={0}
						bgcolor={theme.palette.primary.light}
						width={'100%'}
						height={'100%'}
						zIndex={10}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
					>
						<IconLoading />
					</Box>
				)} */}

				<div
					className="tradingview-widget-container"
					ref={container}
					style={{
						height: '100%',
						width: '100%',
						borderRadius: '18px',
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
				</div>
			</Box>
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
