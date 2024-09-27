'use client';
import { MainButton } from '@/components/button/MainButton';
import MainCard from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import { ChildHeader } from '@/components/swap/ChildHeader';
import { TokenIcon } from '@/components/token/TokenIcon';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { setColorThemeMode } from '@/utils/helpers';
import { Divider, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

interface IProps {
	open: boolean;
	onClose: () => void;
	handleToggleOpenConfirm: () => void;
	handleToggleSignatureRequest: () => void;
}

export const RemoveLiquidityModal = ({
	open,
	onClose,
	handleToggleOpenConfirm,
	handleToggleSignatureRequest,
}: IProps) => {
	const [currentSelectedPercentage, setCurrentSelectedPercentage] = useState(0);

	const handleSelectPercentage = (index: number) => {
		setCurrentSelectedPercentage(index);
	};

	return (
		<MainDialog open={open} handleClose={onClose} hiddenHeader>
			<ChildHeader onBackLink={onClose} title="Remove liquidity" />
			<Stack spacing={2}>
				<MainCard backgroudColor={'common'}>
					<Typography>
						<strong>Tips:</strong> You are the first liquidity provider You are the first liquidity provider You are the
						first liquidity provider You are the first liquidity provider You are the first liquidity provider You are
						the first liquidity provider
					</Typography>
				</MainCard>

				<MainCard
					width="100%"
					backgroudColor={setColorThemeMode('white', 'primary')}
					variant={setColorThemeMode('elevation', 'outlined')}
				>
					<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
						<Typography fontSize={'16px'} fontWeight={600}>
							Amount
						</Typography>

						<MainButton size="small" variant="contained" color={setColorThemeMode('darkGrey', 'darkPrimary')}>
							Detailed
						</MainButton>
					</Stack>

					<Typography fontSize={'28px'} py={1.5}>
						62%
					</Typography>

					<Stack direction={'row'} spacing={1.5}>
						{['25%', '50%', '75%', 'Max'].map((value, index) => (
							<MainButton
								size="small"
								variant="contained"
								onClick={() => handleSelectPercentage(index)}
								color={currentSelectedPercentage === index ? 'darkGrey' : 'greyLight'}
								key={index}
							>
								{value}
							</MainButton>
						))}
					</Stack>
				</MainCard>

				<MainCard
					width="100%"
					backgroudColor={setColorThemeMode('white', 'primary')}
					variant={setColorThemeMode('elevation', 'outlined')}
				>
					<Stack spacing={2}>
						<ItemRow
							title="09.00009998888"
							value={
								<Stack direction={'row'} alignItems={'center'} spacing={0.5}>
									<Typography fontSize={'15px'} fontWeight={700}>
										ETH
									</Typography>
									<TokenIcon url="/images/token.png" />
								</Stack>
							}
						/>
						<ItemRow
							title="99900009887"
							value={
								<Stack direction={'row'} alignItems={'center'} spacing={0.5}>
									<Typography fontSize={'15px'} fontWeight={700}>
										AMPL
									</Typography>
									<TokenIcon url="/images/token.png" />
								</Stack>
							}
						/>
						<ItemRow title="" value="Recive WETH" />
						<Divider />
						<ItemRow
							title="Price"
							value={
								<Typography
									fontSize={'15px'}
									color={setColorThemeMode(useTheme().palette.grey[300], useTheme().palette.grey[100])}
								>
									1 ETH = 981.33 BNB
								</Typography>
							}
						/>
						<ItemRow
							title=""
							value={
								<Typography
									fontSize={'15px'}
									color={setColorThemeMode(useTheme().palette.grey[300], useTheme().palette.grey[100])}
								>
									1 BNB = 0.00101903 ETH
								</Typography>
							}
						/>
					</Stack>
				</MainCard>

				<Stack spacing={2} direction={'row'}>
					<MainButton
						variant="outlined"
						color="darkGrey"
						borderWidth="2px"
						fullWidth
						onClick={handleToggleOpenConfirm}
						size="large"
					>
						Remove
					</MainButton>

					<MainButton
						variant="contained"
						color="darkGrey"
						fullWidth
						onClick={handleToggleSignatureRequest}
						size="large"
					>
						Approve
					</MainButton>
				</Stack>
			</Stack>
		</MainDialog>
	);
};
