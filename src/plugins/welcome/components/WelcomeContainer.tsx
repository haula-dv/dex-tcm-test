'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import InputPasswordField from '@/components/form-control/InputPasswordField';
import IconNotchCard from '@/components/icons/notch';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormContainer, useForm } from 'react-hook-form-mui';

interface IFormValues {
	password: string;
}

export const WelcomeContainer = () => {
	const router = useRouter();
	const theme = useTheme();

	const formContext = useForm<IFormValues>({
		defaultValues: {
			password: '',
		},
	});

	const handleSubmit = (values: IFormValues) => {
		console.log(values);
		router.push('/accounts');
	};

	return (
		<Stack>
			<IconNotchCard />

			<MainCard borderRadius="0px" backgroudColor="primary">
				<Typography fontSize={'24px'} textAlign={'center'} pt={TSizes.margin_md} fontWeight={700}>
					Welcome to BAZAAR
				</Typography>

				<Typography textAlign={'center'} pb={'48px'} pt={'8px'} color={theme.palette.grey[500]}>
					The decentralized web awaits
				</Typography>

				<FormContainer formContext={formContext} onSuccess={handleSubmit}>
					<Stack spacing={TSizes.margin_sm}>
						<InputPasswordField formContext={formContext} name="password" label="Enter Your Password" />

						<MainButton
							fullWidth
							variant="contained"
							color="primary"
							disabled={!formContext.formState.isDirty}
							type="submit"
							size="large"
						>
							Unlock
						</MainButton>

						<Stack spacing={0.5}>
							<Button size="large" fullWidth variant="text" color="inherit">
								Restore Account?
							</Button>

							<Button size="large" fullWidth variant="text" color="inherit">
								Import Using Account Seedphrase
							</Button>
						</Stack>
					</Stack>
				</FormContainer>
			</MainCard>
		</Stack>
	);
};
