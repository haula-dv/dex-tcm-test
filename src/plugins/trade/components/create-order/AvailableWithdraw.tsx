import { MainButton } from '@/components/button/MainButton';
import MainTooltip from '@/components/MainTooltip';
import { usdFormatter } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { Stack, Typography, useTheme } from '@mui/material';
import { memo } from 'react';

interface IProps {
	balance: number;
	quote: string;
}

const AvailableWithdraw = ({ balance, quote }: IProps) => {
	const theme = useTheme();

	return (
		<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
			<Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
				<MainTooltip
					title="Free collateral for placing new orders.
Free collateral = Total balance + Total unsettlement PnL - Total position initial margin
Free collateral for placing new orders.
Free collateral = Total balance + Total unsettlement PnL - Total position initial margin
"
				>
					<Typography
						fontSize={'12px'}
						fontWeight={600}
						color={setColorThemeMode(theme.palette.grey[700], theme.palette.grey[400])}
					>
						Available
					</Typography>
				</MainTooltip>
				<Typography fontSize={'12px'}>{usdFormatter.format(balance)} </Typography>
				<Typography fontSize={'12px'} color={setColorThemeMode(theme.palette.grey[700], theme.palette.grey[400])}>
					{quote}
				</Typography>
			</Stack>

			<MainButton size="small" variant="textLink">
				Deposit
			</MainButton>
		</Stack>
	);
};

export default memo(AvailableWithdraw);
