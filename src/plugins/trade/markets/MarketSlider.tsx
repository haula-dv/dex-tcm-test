import { theme } from '@/utils';
import { Box, Stack, Typography } from '@mui/material';
import { useMarketsStream } from '@orderly.network/hooks';
import { memo } from 'react';

const MarketSlider = () => {
	const { data } = useMarketsStream();

	return (
		<Stack direction={'row'} height={'30px'} sx={{ overflowX: 'auto' }} spacing={'16px'}>
			{data
				? data?.length > 0 &&
				  data?.map((market, index) => (
						<Stack direction={'row'} spacing={'8px'} key={index}>
							<Stack direction={'row'} spacing={'8px'}>
								<Typography fontWeight={600} fontSize={'14px'}>
									{market.symbol}
								</Typography>
								<Typography fontWeight={600} fontSize={'14px'}>
									59,964.4
								</Typography>
								<Typography fontWeight={600} fontSize={'14px'} color={theme.palette.success.main}>
									2.11%
								</Typography>
							</Stack>

							<Box height={'18px'} width={'2px'} bgcolor={theme.palette.common.black} />
						</Stack>
				  ))
				: '__'}
		</Stack>
	);
};

export default memo(MarketSlider);
