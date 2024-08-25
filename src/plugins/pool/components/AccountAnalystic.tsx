'use client';
import { MainIconButton } from '@/components/button/MainIconButton';
import { MainCard } from '@/components/card/MainCard';
import { theme } from '@/utils';
import { Stack, Typography } from '@mui/material';
import { IconChevronDown } from '@tabler/icons-react';

export const AccountAnalystic = () => {
	return (
		<MainCard backgroudColor="darkgrey" width="100%">
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<Typography color={'#fff'}>Account Analytics and accrued fees</Typography>

				<MainIconButton size="small">
					<IconChevronDown color={theme.palette.common.white} />
				</MainIconButton>
			</Stack>
		</MainCard>
	);
};
