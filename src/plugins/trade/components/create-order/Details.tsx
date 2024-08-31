import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainChip } from '@/components/chip/MainChip';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { theme } from '@/utils';
import { usdFormatter } from '@/utils/formatters/number';
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

interface IProps {
	estLiqPrice: number | null | undefined;
	quote?: string;
}

const Details = ({ estLiqPrice, quote }: IProps) => {
	return (
		<MainCard width="100%" backgroudColor="primaryLight">
			<Stack spacing={'10px'}>
				<ItemRow title="Expected Price" value={estLiqPrice ? `${usdFormatter.format(estLiqPrice)} ${quote}` : '-'} />
				<ItemRow title="Price Impact" value="_" />
				<ItemRow title="Fee Percent" value="_" />
				<ItemRow
					title={
						<Stack direction={'row'} spacing={'6px'} alignItems={'center'}>
							<Typography fontSize={'15px'} color={theme.palette.grey[500]}>
								Fee
							</Typography>
							<MainChip disabledPadding fullRounded label={'Taker'} />
						</Stack>
					}
					value="_"
				/>

				<ItemRow title="Total" value="_" />

				<MainButton variant="contained" color="primary" type="submit">
					{/* Unavailable */}
					Create order
				</MainButton>
			</Stack>
		</MainCard>
	);
};

export default memo(Details);
