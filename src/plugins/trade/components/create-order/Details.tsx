import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainChip } from '@/components/chip/MainChip';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

const Details = () => {
	return (
		<MainCard width="100%" backgroudColor="primaryLight">
			<Stack spacing={'10px'}>
				<ItemRow title="Expected Price" value="_" />
				<ItemRow title="Price Impact" value="_" />
				<ItemRow title="Fee Percent" value="_" />
				<ItemRow
					title={
						<Stack direction={'row'} spacing={'6px'} alignItems={'center'}>
							<Typography>Fee</Typography>
							<MainChip disabledPadding fullRounded label={'Taker'} />
						</Stack>
					}
					value="_"
				/>
				<ItemRow title="Total" value="_" />

				<MainButton variant="contained" color="primary">
					Unavailable
				</MainButton>
			</Stack>
		</MainCard>
	);
};

export default memo(Details);
