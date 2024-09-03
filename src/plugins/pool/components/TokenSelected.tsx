/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { TokenIcon } from '@/components/token/TokenIcon';
import { RemoveLiquidityModal } from '@/plugins/pool/liquidity/RemoveLiquidityModal';
import { Box, Collapse, Stack, Typography, useTheme } from '@mui/material';
import { IconChevronDown } from '@tabler/icons-react';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { ModalConfirmLiquidity } from '../liquidity/ModalConfirmLiquidity';
import { SignatureRequestConfirmModal } from '../liquidity/SignatureRequestConfirmModal';
import { SignatureRequestModal } from '../liquidity/SignatureRequestModal';

export const TokenSelected = () => {
	const [openRemoveLiquidityModal, setRemoveLiquidityModal] = useState(false);
	const [isOpenConfirmRemoveLiquidity, setOpenConfirmRemoveLiquidity] = useState(false);
	const [isOpenSignatureRequest, setOpenSignatureRequest] = useState(false);
	const [isOpenSignatureRequestConfirm, setIsOpenSignatureRequestConfirm] = useState(false);
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

	const handleToggleSignatureRequestConfirm = () => {
		setIsOpenSignatureRequestConfirm(!isOpenSignatureRequestConfirm);
		setOpenSignatureRequest(false);
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
						endIcon={<IconChevronDown color={useTheme().palette.common.white} />}
						color="whitePrimary"
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
								<Typography fontSize={'15px'}>0.000000230791</Typography>
								<TokenIcon url="/images/token.png" />
							</Stack>
						}
					/>
					<ItemRow
						title="Pooled AML"
						value={
							<Stack direction={'row'} spacing={0.5} alignItems={'center'}>
								<Typography fontSize={'15px'}>0.000000230791</Typography>
								<TokenIcon url="/images/token.png" />
							</Stack>
						}
					/>
					<ItemRow title="Pooled Share" value="<0.01%" />
				</Stack>

				<MainButton color="inherit" fullWidth size="large">
					View Pair Analytis
				</MainButton>

				<Stack direction={'row'} spacing={2} pt={2}>
					<MainButton
						color="darkGrey"
						variant="outlined"
						fullWidth
						borderWidth="2px"
						onClick={handleToogleModalRemoveLiquidity}
						size="large"
					>
						Remove
					</MainButton>

					<MainButton color="darkGrey" fullWidth variant="contained" size="large">
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

			<SignatureRequestModal
				open={isOpenSignatureRequest}
				onClose={handleToggleSignatureRequest}
				handleToggleSignatureRequestConfirm={handleToggleSignatureRequestConfirm}
			/>

			<SignatureRequestConfirmModal
				open={isOpenSignatureRequestConfirm}
				onClose={handleToggleSignatureRequestConfirm}
			/>
		</>
	);
};

interface IItemRow {
	title: string | ReactNode;
	value: string | ReactNode;
}

export const ItemRow = ({ title, value }: IItemRow) => {
	return (
		<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
			{typeof title == 'string' ? (
				<Typography fontSize={'15px'} color={useTheme().palette.grey[500]}>
					{title}
				</Typography>
			) : (
				<Box color={useTheme().palette.grey[500]} fontSize={'15px'}>
					{title}
				</Box>
			)}

			{typeof value == 'string' ? (
				<Typography fontWeight={600} fontSize={'15px'}>
					{value}
				</Typography>
			) : (
				<Box fontSize={'15px'}>{value}</Box>
			)}
		</Stack>
	);
};
