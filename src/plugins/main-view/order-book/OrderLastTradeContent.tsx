import { MainCard } from '@/components/card/MainCard';
import IconLoading from '@/components/icons/loading';
import { theme } from '@/utils';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useMarketTradeStream, useSymbolsInfo } from '@orderly.network/hooks';
import dayjs from 'dayjs';
import { memo } from 'react';

interface IProps {
	symbol: string;
}

const OrderLastTradeContent = ({ symbol }: IProps) => {
	const config = useSymbolsInfo();
	const symbolInfo = config ? config[symbol] : ({} as any);
	const { data: tradeHistory, isLoading: tradeHistoryLoading } = useMarketTradeStream(symbol);

	if (tradeHistoryLoading) {
		return <IconLoading />;
	}

	return (
		<MainCard backgroudColor="primaryLight" width="100%" height="100%">
			<Box maxHeight={'calc(100vh - 240px)'} overflow={'auto'}>
				<Stack direction={'row'} pb={0.5}>
					<Typography width={'100%'} fontSize={'12px'} fontWeight={700}>
						Time
					</Typography>

					<Typography width={'100%'} fontSize={'12px'} textAlign="center" fontWeight={700}>
						Price({symbolInfo('quote')})
					</Typography>

					<Typography width={'100%'} fontSize={'12px'} fontWeight={700} textAlign="end">
						Qty({symbolInfo('base')})
					</Typography>
				</Stack>

				<Stack>
					{tradeHistory.length > 0 &&
						tradeHistory.map((item: any, index) => (
							<Grid key={index} container>
								<Grid item md={4}>
									<Typography fontSize={'12px'} color={theme.palette.grey[700]}>
										{dayjs(item.ts).format('HH:mm:ss')}
									</Typography>
								</Grid>
								<Grid item md={4}>
									<Typography
										fontSize={'12px'}
										color={item.side === 'BUY' ? theme.palette.success.main : theme.palette.error.main}
										textAlign={'center'}
									>
										{item.price}
									</Typography>
								</Grid>
								<Grid item md={4}>
									<Typography
										fontSize={'12px'}
										textAlign={'end'}
										color={item.side === 'BUY' ? theme.palette.success.main : theme.palette.error.main}
									>
										{item.size}
									</Typography>
								</Grid>
							</Grid>
						))}
				</Stack>
				{/* <TradeHistory dataSource={tradeHistory} loading={tradeHistoryLoading} /> */}
			</Box>
		</MainCard>
	);
};

export default memo(OrderLastTradeContent);
