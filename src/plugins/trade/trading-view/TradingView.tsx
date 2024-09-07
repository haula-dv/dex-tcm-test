/* eslint-disable react-hooks/rules-of-hooks */
import { setColorThemeMode } from '@/utils/helpers';
import { Box, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { memo, useRef, useState } from 'react';
const SymbolOverviewNoSSR = dynamic(() => import('react-ts-tradingview-widgets').then((w) => w.AdvancedRealTimeChart), {
	ssr: false,
});
interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const TradingMainView = ({ symbol, onSymbolChange }: IProps) => {
	const [currentInterval, setCurrentInterval] = useState('1');
	const [currentChartType, setCurrentChartType] = useState('1');
	const [currentSelect, setCurrentSelect] = useState<string[]>([]);
	const theme = useTheme();

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

	const background = setColorThemeMode(theme.palette.primary.light, '#322B27', theme);

	// Watch and set widget chart
	// useEffect(() => {
	// 	const script = document.createElement('script');
	// 	script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
	// 	script.type = 'text/javascript';
	// 	script.async = true;
	// 	script.innerHTML = `
	// 		{
	// 			"toolbar_bg": "#fff !important",
	// 			"autosize": true,
	// 			"symbol": "${base}",
	// 			"interval": "${currentInterval}",
	// 			"timezone": "Etc/UTC",
	// 			"theme": "${theme.palette.mode}",
	// 			"style": "${currentChartType}",
	// 			"locale": "en",
	// 			"backgroundColor": "${background}",
	// 			"gridColor": "${background}",
	// 			"allow_symbol_change": false,
	// 			"save_image": false,
	// 			"calendar": false,
	// 			"studies": ${JSON.stringify(currentSelect)},
	// 			"hide_volume": true,
	// 			"hide_top_toolbar": true,
	// 			"support_host": "https://www.tradingview.com"
	// 			}`;

	// 	if (container.current) {
	// 		container.current.innerHTML = '';
	// 		container.current.appendChild(script);
	// 	}
	// }, [symbol, currentInterval, base, currentChartType, currentSelect, background, theme]);

	return (
		<Box
			flex={'1 1 0%'}
			height={'100%'}
			minHeight={'480px'}
			borderRadius={'14px'}
			overflow={'hidden'}
			position={'relative'}
			bgcolor={setColorThemeMode('#fff', '#131722')}
		>
			<Box
				position={'absolute'}
				top={0}
				left={0}
				border={1}
				borderColor={setColorThemeMode('#fff', '#131722')}
				width={'100%'}
				height={'100%'}
				bgcolor={'transparent'}
				sx={{
					pointerEvents: 'none',
					borderRadius: '14px',
				}}
				zIndex={9}
			></Box>
			{/* <TimeLine
				handleChangeInterval={handleChangeInterval}
				handleChangeChartType={handleChangeChartType}
				handleSelectIndicator={handleSelectIndicator}
			/> */}
			{/* <Box position={'relative'} height={'100%'} width={'100%'} bgcolor={background} borderRadius={'18px'}>
				<Box
					position={'absolute'}
					top={0}
					left={0}
					border={1}
					borderColor={background}
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
			</Box> */}
			<SymbolOverviewNoSSR
				disabled_features={[
					'hide_left_toolbar_by_default',
					'adaptive_logo',
					'header_chart_type',
					'header_compare',
					'left_toolbar',
				]}
				enabled_features={['header_settings', 'header_chart_type']}
				locale="en"
				calendar
				theme={theme.palette.mode}
				symbol={base}
				autosize
				allow_symbol_change={false}
				interval="180"
				range="12M"
				timezone="Etc/UTC"
				style="9"
				toolbar_bg={theme.palette.primary.light}
			/>
		</Box>
	);
};

export default memo(TradingMainView);

{
}
