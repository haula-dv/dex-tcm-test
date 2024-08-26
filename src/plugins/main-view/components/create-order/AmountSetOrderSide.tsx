import SwitchBase from '@/components/form-control/SwitcheBase';
import { theme } from '@/utils';
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

const AmountSetOrderSide = () => {
	return (
		<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
			<Stack direction={'row'} alignItems={'center'} spacing={1}>
				<Typography fontWeight={600} fontSize={'13px'}>
					Amount
				</Typography>
				<Typography color={theme.palette.grey[500]} fontSize={'12px'}>
					Set order size
				</Typography>
			</Stack>

			<SwitchBase label="He" />
		</Stack>
	);
};

export default memo(AmountSetOrderSide);
