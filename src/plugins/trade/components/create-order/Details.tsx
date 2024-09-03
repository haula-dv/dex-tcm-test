import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainChip } from '@/components/chip/MainChip';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { usdFormatter } from '@/utils/formatters/number';
import { Stack, Typography, useTheme } from '@mui/material';
import { useConnectWallet } from '@web3-onboard/react';
import { memo } from 'react';

interface IProps {
	estLiqPrice: number | null | undefined;
	freeCollateral: number | null | undefined;
	markPrice: number | null | undefined;
	quote?: string;
	direction: string;
}

const Details = ({ estLiqPrice, freeCollateral, markPrice, quote, direction }: IProps) => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	return (
		<MainCard width="100%" backgroudColor="primaryLight">
			<Stack spacing={'10px'}>
				<ItemRow title="Expected Price" value={estLiqPrice ? `${usdFormatter.format(estLiqPrice)} ${quote}` : '-'} />
				<ItemRow title="Price Impact" value={'_'} />
				<ItemRow title="Fee Percent" value={freeCollateral ? `${usdFormatter.format(freeCollateral)}` : '_'} />
				<ItemRow
					title={
						<Stack direction={'row'} spacing={'6px'} alignItems={'center'}>
							<Typography fontSize={'15px'} color={useTheme().palette.grey[500]}>
								Fee
							</Typography>
							<MainChip disabledPadding fullRounded label={'Taker'} />
						</Stack>
					}
					value="_"
				/>

				<ItemRow title="Total" value="_" />

				<MainButton variant="contained" color="primary" type="submit">
					{wallet ? direction : 'Connect wallet'}
				</MainButton>
			</Stack>
		</MainCard>
	);
};

export default memo(Details);
