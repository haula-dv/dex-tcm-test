import { ITokenType } from '@/common';
import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainChip } from '@/components/chip/MainChip';
import { setColorThemeMode } from '@/utils/helpers';
import { Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { ModalConfirmSwap } from './modal-token/ModalConfirmSwap';
import { Item } from './SwapContainer';
import { ButtonSwapToggle } from './SwapIconToggle';

interface IProps {
	toggleSwapType: () => void;
	tokenSellSelected: ITokenType | null;
	tokenBuySelected: ITokenType | null;
}

export const ConfirmSwapContent = ({ toggleSwapType, tokenSellSelected, tokenBuySelected }: IProps) => {
	const [openModalConfirmSwap, setOpenModalConfirmSwap] = useState(false);

	// Toggle the open modal
	const handleToggleModal = () => {
		setOpenModalConfirmSwap(!openModalConfirmSwap);
	};

	return (
		<>
			<Stack spacing={1.5}>
				<MainCard backgroudColor={setColorThemeMode('white', 'primaryLight')} width="100%">
					<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
						<Typography fontSize={'18px'} fontWeight={600} lineHeight={'100%'}>
							0990.009
						</Typography>

						<MainChip
							label={tokenSellSelected && tokenSellSelected.token}
							variant="outlined"
							color={setColorThemeMode('white', 'primary')}
							fullRounded
							icon={<Image src={'/images/token.png'} height={24} width={24} alt="" />}
						/>
					</Stack>
				</MainCard>

				<ButtonSwapToggle toggleSwapType={toggleSwapType} />

				<MainCard backgroudColor={setColorThemeMode('white', 'primaryLight')} width="100%">
					<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
						<Typography fontSize={'18px'} fontWeight={600} lineHeight={'100%'}>
							0990.009
						</Typography>

						<MainChip
							label={tokenBuySelected && tokenBuySelected.token}
							variant="outlined"
							color={setColorThemeMode('white', 'primary')}
							fullRounded
							icon={<Image src={'/images/token.png'} height={24} width={24} alt="" />}
						/>
					</Stack>
				</MainCard>
			</Stack>

			<Typography pt={1}>
				Output is estimated. You will receive at least 938.5 BNB or the transaction will revert
			</Typography>

			<Stack spacing={1} py={2}>
				<Item title="Price" value="0.000527443 ETH per BNB" />

				<Item title="Minimum recevied" value="9747.969 BNB" />

				<Item
					title="Price Impact"
					value={<span style={{ color: useTheme().palette.success.main }}> {'<0.01%'}</span>}
				/>

				<Item title="Liquidity Provider Fee" value={'0.0015ETH'} />
			</Stack>

			<MainButton variant="contained" color="primary" size="large" fullWidth onClick={handleToggleModal}>
				Confirm Swap
			</MainButton>

			<ModalConfirmSwap open={openModalConfirmSwap} onClose={handleToggleModal} />
		</>
	);
};
