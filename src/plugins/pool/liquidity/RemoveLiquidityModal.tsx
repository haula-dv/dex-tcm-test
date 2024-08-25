'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import { ChildHeader } from '@/components/swap/ChildHeader';
import { TokenIcon } from '@/components/token/TokenIcon';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { theme } from '@/utils';
import { Divider, Stack, Typography } from '@mui/material';
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
			<ChildHeader onBackLink="/pool" title="Remove liquidity" />

			<MainCard variant="outlined">
				<Typography>
					<strong>Tips:</strong> You are the first liquidity provider You are the first liquidity provider You are the
					first liquidity provider You are the first liquidity provider You are the first liquidity provider You are the
					first liquidity provider
				</Typography>
			</MainCard>

			<Stack pt={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<Typography fontSize={'16px'} fontWeight={600}>
					Amount
				</Typography>

				<MainButton size="small" variant="contained" color="darkGrey">
					Detailed
				</MainButton>
			</Stack>

			<Stack pt={2} spacing={1.5}>
				<Typography fontSize={'28px'}>62%</Typography>

				<Stack direction={'row'} spacing={2}>
					{['25%', '50%', '75%', 'Max'].map((value, index) => (
						<MainButton
							size="small"
							variant={currentSelectedPercentage === index ? 'contained' : 'filledTonal'}
							onClick={() => handleSelectPercentage(index)}
							color={'darkGrey'}
							key={index}
						>
							{value}
						</MainButton>
					))}
				</Stack>

				<Stack spacing={2} pt={2}>
					<ItemRow
						title="09.00009998888"
						value={
							<Stack direction={'row'} alignItems={'center'} spacing={0.5}>
								<Typography fontWeight={700}>ETH</Typography>
								<TokenIcon url="/images/token.png" />
							</Stack>
						}
					/>
					<ItemRow
						title="99900009887"
						value={
							<Stack direction={'row'} alignItems={'center'} spacing={0.5}>
								<Typography fontWeight={700}>AMPL</Typography>
								<TokenIcon url="/images/token.png" />
							</Stack>
						}
					/>
					<ItemRow title="" value="Recive WETH" />
					<Divider />
					<ItemRow
						title="Price"
						value={<Typography fontSize={theme.palette.grey[300]}>1 ETH = 981.33 BNB</Typography>}
					/>
					<ItemRow
						title=""
						value={<Typography fontSize={theme.palette.grey[300]}>1 BNB = 0.00101903 ETH</Typography>}
					/>
				</Stack>

				<Stack spacing={2} direction={'row'} pt={1}>
					<MainButton variant="outlined" color="darkGrey" borderWidth="2px" fullWidth onClick={handleToggleOpenConfirm}>
						Remove
					</MainButton>

					<MainButton variant="contained" color="darkGrey" fullWidth onClick={handleToggleSignatureRequest}>
						Approve
					</MainButton>
				</Stack>
			</Stack>
		</MainDialog>
	);
};
