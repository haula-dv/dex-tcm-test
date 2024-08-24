'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import IconCheckActived from '@/components/icons/check-actived';
import IconCheckInActived from '@/components/icons/check-inactived';
import { theme } from '@/utils';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AccountItem } from './AccountItem';

export const AccountContainer = () => {
	const router = useRouter();
	const [currentSelect, setCurrentSelect] = useState<number[]>([0]);

	const handleSelectAccount = (index: number) => {
		if (currentSelect.includes(index)) {
			setCurrentSelect(currentSelect.filter((i) => i !== index));
		} else {
			setCurrentSelect([...currentSelect, index]);
		}
	};

	// Handle connect wallet
	const handleConnect = () => {
		router.push('/swap');
	};

	return (
		<MainCard borderRadius="0px" isNotch backgroudColor="primary">
			<Stack mt={'-20px'} pb={'30px'} zIndex={99} position={'relative'}>
				<Typography variant="h3" fontWeight={700} textAlign={'center'}>
					Connect to Swaplux
				</Typography>

				<Typography textAlign={'center'} pt={'8px'} color={theme.palette.grey[500]}>
					Select the account (s)
				</Typography>
			</Stack>

			<Stack spacing={TSizes.margin_sm} pb={TSizes.margin_sm}>
				{[...Array(3)].map((item, index) => (
					<AccountItem
						key={index}
						index={index}
						isSelected={currentSelect.includes(index)}
						handleSelectAccount={handleSelectAccount}
					/>
				))}
			</Stack>

			<FormControlLabel
				control={
					<Checkbox
						defaultChecked
						color="darkPrimary"
						icon={<IconCheckInActived />}
						checkedIcon={<IconCheckActived />}
					/>
				}
				label="Allow this site View the addresses of your authorized accounts (required)"
			/>

			<Stack direction={'row'} spacing={TSizes.margin_sm} pt={'32px'}>
				<MainButton color="inherit" fullWidth size="large">
					Cancel
				</MainButton>

				<MainButton variant="contained" color="darkPrimary" fullWidth size="large" onClick={handleConnect}>
					Connect
				</MainButton>
			</Stack>
		</MainCard>
	);
};
