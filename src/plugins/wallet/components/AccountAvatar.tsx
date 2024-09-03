/* eslint-disable react-hooks/rules-of-hooks */
import { formartAddress } from '@/utils/formatters/token';
import { setColorThemeMode } from '@/utils/helpers';
import { Stack, Typography, useTheme } from '@mui/material';
import { useConnectWallet } from '@web3-onboard/react';
import Image from 'next/image';

interface IProps {
	fontSize?: string;
}

export const AccountAvatar = ({ fontSize = '14px' }: IProps) => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	return (
		<Stack direction={'row'} alignItems={'center'} spacing={1}>
			<Image src={'/images/avatar.png'} alt="" height={20} width={20} style={{ borderRadius: '50%' }} />

			{wallet && (
				<Typography
					fontSize={fontSize}
					color={setColorThemeMode(useTheme().palette.common.white, useTheme().palette.common.black)}
				>
					{formartAddress(wallet.accounts[0].address)}
				</Typography>
			)}
		</Stack>
	);
};
