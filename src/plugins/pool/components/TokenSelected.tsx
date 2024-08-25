'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { TokenIcon } from '@/components/token/TokenIcon';
import { RemoveLiquidityModal } from '@/plugins/pool/liquidity/RemoveLiquidityModal';
import { theme } from '@/utils';
import { Box, Collapse, Stack, Typography } from '@mui/material';
import { IconChevronDown } from '@tabler/icons-react';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { ModalConfirmLiquidity } from '../liquidity/ModalConfirmLiquidity';
import { SignatureRequestModal } from '../liquidity/SignatureRequestModal';

export const TokenSelected = () => {
	const [openRemoveLiquidityModal, setRemoveLiquidityModal] = useState(false);
	const [isOpenConfirmRemoveLiquidity, setOpenConfirmRemoveLiquidity] = useState(false);
	const [isOpenSignatureRequest, setOpenSignatureRequest] = useState(false);
	const [explained, setExpanded] = useState(false);

	const handleToggleExplanation = () => {
		setExpanded(!explained);
	};

	const handleToogleModalRemoveLiquidity = () => {
		setRemoveLiquidityModal(!openRemoveLiquidityModal);
	};

	// Modal confirm remove
	const handleToggleOpenConfirm = () => {
		setRemoveLiquidityModal(false);
		setOpenConfirmRemoveLiquidity(!isOpenConfirmRemoveLiquidity);
	};

	// Signature request modal
	const handleToggleSignatureRequest = () => {
		setOpenSignatureRequest(!isOpenSignatureRequest);
	};

	return (
		<>
			<MainCard backgroudColor="darkgrey" width="100%">
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mr={'-10px'}>
					<Stack direction={'row'} spacing={1} alignItems={'center'}>
						<Image src={'/images/token.png'} height={34} width={34} alt="" />
						<Image src={'/images/token.png'} height={34} width={34} alt="" />

						<Typography color={'#fff'}>ETH/AMPL</Typography>
					</Stack>

					<MainButton
						onClick={handleToggleExplanation}
						endIcon={<IconChevronDown color={theme.palette.common.white} />}
					>
						Manage
					</MainButton>
				</Stack>
			</MainCard>

			<Collapse in={explained}>
				<Stack spacing={1} p={2} pt={1}>
					<ItemRow title="Your total tokens" value="0.0000000004302" />
					<ItemRow
						title="Pooled ETH"
						value={
							<Stack direction={'row'} spacing={0.5} alignItems={'center'}>
								<Typography>0.000000230791</Typography>
								<TokenIcon url="/images/token.png" />
							</Stack>
						}
					/>
					<ItemRow
						title="Pooled AML"
						value={
							<Stack direction={'row'} spacing={0.5} alignItems={'center'}>
								<Typography>0.000000230791</Typography>
								<TokenIcon url="/images/token.png" />
							</Stack>
						}
					/>
					<ItemRow title="Pooled Share" value="<0.01%" />
				</Stack>

				<MainButton color="inherit" fullWidth>
					View Pair Analytis
				</MainButton>

				<Stack direction={'row'} spacing={2} pt={2}>
					<MainButton
						color="darkGrey"
						variant="outlined"
						fullWidth
						borderWidth="2px"
						onClick={handleToogleModalRemoveLiquidity}
					>
						Remove
					</MainButton>

					<MainButton color="darkGrey" fullWidth variant="contained">
						Add
					</MainButton>
				</Stack>
			</Collapse>

			<RemoveLiquidityModal
				open={openRemoveLiquidityModal}
				onClose={handleToogleModalRemoveLiquidity}
				handleToggleOpenConfirm={handleToggleOpenConfirm}
				handleToggleSignatureRequest={handleToggleSignatureRequest}
			/>

			<ModalConfirmLiquidity open={isOpenConfirmRemoveLiquidity} onClose={handleToggleOpenConfirm} />

			<SignatureRequestModal open={isOpenSignatureRequest} onClose={handleToggleSignatureRequest} />
		</>
	);
};

interface IItemRow {
	title: string;
	value: string | ReactNode;
}

export const ItemRow = ({ title, value }: IItemRow) => {
	return (
		<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
			<Typography color={theme.palette.grey[500]}>{title}</Typography>

			{typeof value === 'string' ? <Typography fontWeight={600}>{value}</Typography> : <Box>{value}</Box>}
		</Stack>
	);
};
