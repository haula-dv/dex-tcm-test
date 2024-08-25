import { theme } from '@/utils';
import { usdFormatter } from '@/utils/formatters/number';
import { Box, FormControl, Stack, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useOrderbookStream, useSymbolsInfo } from '@orderly.network/hooks';
import { Select } from '@orderly.network/react';

interface IProps {
	symbol: string;
}

export const OrderBookContentCustom = ({ symbol }: IProps) => {
	const config = useSymbolsInfo();
	const symbolInfo = config ? config[symbol] : ({} as any);

	const [data, { onDepthChange, isLoading, onItemClick, depth, allDepths }] = useOrderbookStream(symbol, undefined, {
		level: 11,
	});

	if (isLoading) {
		return <></>;
	}

	const allDepthsOptions =
		Array.isArray(allDepths) &&
		allDepths.map((it) => {
			return { value: it, label: String(it) };
		});

	let firstAsk: number;
	let firstBid: number;

	const headers = [
		`Price (${symbolInfo('base')})`,
		`Qty (${symbolInfo('quote')})`,
		`Total (${symbolInfo('base')})`,
		`Total (${symbolInfo('quote')})`,
	];

	return (
		<Stack spacing={1} p={1} height={'100%'}>
			<FormControl fullWidth sx={{ width: '100px' }} className="orderly-select">
				<Select
					value={depth}
					options={allDepthsOptions as any}
					onChange={(val) => onDepthChange && onDepthChange(+val ?? 0)}
					className="orderly-select-btn"
				/>
			</FormControl>

			<Box flexShrink={0}>
				<Stack direction={'row'}>
					{headers.map((it, index) => (
						<Typography key={index} width={'100px'} fontSize={'13px'} color={theme.palette.grey[600]}>
							{it}
						</Typography>
					))}
				</Stack>

				<Stack spacing={0.5}>
					{data.asks
						?.filter(([price]) => !Number.isNaN(price))
						.map(([price, quantity, aggregated, lastTotal], index) => {
							if (firstAsk == null) {
								firstAsk = aggregated;
							}

							const gradient = (100 * aggregated) / firstAsk;

							return (
								<Stack key={index} style={{}} direction={'row'}>
									<Typography fontSize={'13px'} fontWeight={600} width={'100px'} color={pink[600]}>
										{usdFormatter.format(price)}
									</Typography>
									<Typography fontSize={'13px'} fontWeight={600} width={'100px'} color={theme.palette.grey[300]}>
										{quantity}
									</Typography>

									<Stack
										direction={'row'}
										sx={{
											background: `linear-gradient(to right, #b2283329 ${gradient}%, transparent ${gradient}%)`,
										}}
									>
										<Typography
											fontSize={'13px'}
											fontWeight={600}
											width={'100px'}
											pl={2}
											color={theme.palette.grey[300]}
										>
											{aggregated.toFixed(6)}
										</Typography>
										<Typography
											fontSize={'13px'}
											fontWeight={600}
											width={'100px'}
											color={theme.palette.grey[300]}
											textAlign={'end'}
										>
											{usdFormatter.format(lastTotal)}
										</Typography>
									</Stack>
								</Stack>
							);
						})}
				</Stack>
			</Box>
		</Stack>
	);
};
