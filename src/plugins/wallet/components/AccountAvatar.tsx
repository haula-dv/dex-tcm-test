/* eslint-disable react-hooks/rules-of-hooks */
import { formartAddress } from '@/utils/formatters/token';
import { setColorThemeMode } from '@/utils/helpers';
import { Stack, Typography, useTheme } from '@mui/material';
import { useWalletConnector } from '@orderly.network/hooks';
import Image from 'next/image';

interface IProps {
	fontSize?: string;
	textColor?: string;
	avatarSize?: number;
}

export const AccountAvatar = ({ fontSize = '14px', avatarSize = 20, textColor }: IProps) => {
	const { wallet } = useWalletConnector();

	return (
		<Stack direction={'row'} alignItems={'center'} spacing={1}>
			<Image src={'/images/avatar.png'} alt="" height={avatarSize} width={avatarSize} style={{ borderRadius: '50%' }} />

			{wallet && wallet.accounts?.[0]?.address && (
				<Typography
					fontSize={fontSize}
					color={
						textColor ? textColor : setColorThemeMode(useTheme().palette.common.white, useTheme().palette.common.black)
					}
				>
					{formartAddress(wallet.accounts[0].address)}
				</Typography>
			)}
		</Stack>
	);
};
