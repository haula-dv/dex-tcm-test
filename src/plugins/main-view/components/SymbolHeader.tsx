import { getImageNextwork } from '@/common';
import { MainButton } from '@/components/button/MainButton';
import { TokenIcon } from '@/components/token/TokenIcon';
import { theme } from '@/utils';
import { usdFormatter } from '@/utils/formatters/number';
import { spitSymbol } from '@/utils/formatters/token';
import { Divider as DividerMui, Stack, Tooltip, Typography } from '@mui/material';
import { useFundingRate, useTickerStream } from '@orderly.network/hooks';
import { Divider } from '@orderly.network/react';
import { Decimal } from '@orderly.network/utils';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { MarketsContent } from '../../Markets/components/MarketContent';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const SymbolHeader = ({ onSymbolChange, symbol }: IProps) => {
	const [marketEl, setMarketEl] = useState<null | HTMLElement>(null);
	const openMarketEl = Boolean(marketEl);

	// Get detail symbol
	const stream = useTickerStream(symbol);

	const handleClose = () => {
		setMarketEl(null);
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setMarketEl(event.currentTarget);
	};

	const data = useFundingRate(symbol);
	const quote = 'USDC';

	const openInterestValue = new Decimal(stream?.open_interest ?? 0)
		.mul(stream?.index_price ?? 0)
		.toDecimalPlaces(2)
		.valueOf();

	// Định dạng thành "K", "M", "B" (nghìn, triệu, tỷ)
	function formatNumber(value: any) {
		const num = new Decimal(value);

		if (num.gte(1e9)) {
			return `${num.div(1e9).toDecimalPlaces(2).valueOf()}B ${quote}`;
		} else if (num.gte(1e6)) {
			return `${num.div(1e6).toDecimalPlaces(2).valueOf()}K ${quote}`;
		} else if (num.gte(1e3)) {
			return `${num.div(1e3).toDecimalPlaces(2).valueOf()}K ${quote}`;
		} else {
			return `${num.toDecimalPlaces(2).valueOf()} ${quote}`;
		}
	}

	const formattedOpenInterest = formatNumber(openInterestValue);

	let dailyChange: string | undefined;
	let dailyChangePercentage: string | undefined;
	if (stream && (stream as any)['24h_change'] != null && stream.index_price != null) {
		dailyChange = String((stream as any)['24h_change'].toNumber());
		dailyChangePercentage = (stream as any)['24h_change'].div(stream.index_price).mul(100).toPrecision(4, 2);
	}

	const datas = [
		{
			label: '24h change',
			value:
				dailyChange && dailyChangePercentage ? (
					<span style={{ color: !dailyChange.startsWith('-') ? theme.palette.success.main : theme.palette.error.main }}>
						{!dailyChange.startsWith('-') ? '+' : ''}
						{usdFormatter.format(Number(dailyChange))} / {!dailyChange.startsWith('-') ? '+' : ''}
						{dailyChangePercentage}%
					</span>
				) : (
					'-'
				),
		},
		{ label: 'Mark', value: stream ? usdFormatter.format(stream.mark_price) : '_' },
		{ label: 'Index', value: stream ? usdFormatter.format(stream.index_price) : '_' },
		{ label: '24h volume', value: stream ? stream['24h_amount'].toLocaleString() : '_' },

		{
			label: 'Pred. funding rate',
			hint: 'Funding rates are payments between traders who are long and short. When positive, long positions pay short positions funding. When negative, short positions pay long positions.',
			value: (
				<>
					<span style={{ color: theme.palette.warning.main }}>{data.est_funding_rate} %</span> {`in ${data.countDown}`}
				</>
			),
		},
		{
			label: 'Open interest',
			value: formattedOpenInterest,
			hint: 'Total size of positions per side.',
		},
	];

	return (
		<>
			<Divider />

			<Stack direction={'row'}>
				<Stack
					px={1}
					py={1}
					borderLeft={1}
					borderColor={theme.palette.divider}
					direction={'row'}
					bgcolor={theme.palette.background.paper}
					spacing={1.5}
					alignItems={'center'}
					flex={1}
				>
					<MainButton
						startIcon={<TokenIcon url={getImageNextwork(symbol ? spitSymbol(symbol) : '', 'symbol_logo')} />}
						variant="textLink"
						color="white"
						id="market-button"
						aria-controls={openMarketEl ? 'market-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={openMarketEl ? 'true' : undefined}
						onClick={handleClick}
						endIcon={<IconChevronDown size="1rem" />}
					>
						{symbol.replaceAll('_', '-')}
					</MainButton>

					<DividerMui orientation="vertical" flexItem />

					<Typography fontWeight={600} fontSize={'18px'}>
						0,990
					</Typography>

					{datas.map((ite, index) => (
						<Tooltip key={index} title={ite?.hint}>
							<Stack sx={{ cursor: 'pointer' }}>
								<Typography color={theme.palette.grey[600]} fontSize={'11px'}>
									{ite.label}
								</Typography>
								<Typography fontWeight={600}>{ite.value}</Typography>
							</Stack>
						</Tooltip>
					))}
				</Stack>
				<DividerMui orientation="vertical" flexItem />

				{openMarketEl && (
					<MarketsContent
						handleClose={handleClose}
						marketEl={marketEl}
						openMarketEl={openMarketEl}
						onSymbolChange={onSymbolChange}
					/>
				)}
			</Stack>
		</>
	);
};

// /
// @orderly.network/react
// /
// esm
// /
// page
// /
// trading
// /
// desktop
// /
// sections
// /
// nav
// /
// ticker.js
