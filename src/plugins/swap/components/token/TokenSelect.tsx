'use client';
import { MainButton } from '@/components/button/MainButton';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconChevronDown } from '@tabler/icons-react';

import { getImageNextwork, ITokenType } from '@/common';
import { TokenIcon } from '@/components/token/TokenIcon';
import { setColorThemeMode } from '@/utils/helpers';

interface IProps {
	tokenSelected: ITokenType | null;
	handleToggle: () => void;
}

export const TokenSelect = ({ tokenSelected, handleToggle }: IProps) => {
	return (
		<Box flexShrink={0}>
			<CustomTokenSelect
				variant="contained"
				color={tokenSelected ? 'inherit' : 'primary'}
				endIcon={<IconChevronDown size={'1.2rem'} />}
				fullRounded
				onClick={handleToggle}
				isSelectedToken={tokenSelected?.token ? true : false}
			>
				{tokenSelected ? (
					<>
						<TokenIcon
							url={getImageNextwork(tokenSelected.token, 'symbol_logo')}
							size={24}
							symbol={tokenSelected?.token}
							fontSize="7px"
						/>

						<Typography pl={1} fontSize={'13px'} fontWeight={500}>
							{tokenSelected?.token}
						</Typography>
					</>
				) : (
					'Select token'
				)}
			</CustomTokenSelect>
		</Box>
	);
};

interface ITokenSelect {
	isSelectedToken?: boolean;
}

export const CustomTokenSelect = styled(MainButton, {
	shouldForwardProp: (prop) => prop !== 'isSelectedToken',
})<ITokenSelect>(({ theme, isSelectedToken }) => ({
	borderRadius: '44px !important',
	height: '34px',

	...(isSelectedToken
		? {
				minWidth: 'auto',
				minHeight: 'auto',
				padding: '4px 10px 4px 4px',
				backgroundColor: setColorThemeMode(theme.palette.primary.light, theme.palette.grey[800]),
				border: `1px solid ${setColorThemeMode(theme.palette.primary.main, theme.palette.grey[600])}`,

				'& svg': {
					color: setColorThemeMode(theme.palette.common.black, '#fff'),
				},
				'&:hover': {
					backgroundColor: setColorThemeMode(theme.palette.primary.light, theme.palette.grey[800]),
				},
		  }
		: {
				backgroundColor: theme.palette.primary.dark,
				color: '#fff',

				'& svg': {
					color: '#fff',
				},

				'&:hover': {
					backgroundColor: theme.palette.primary.dark,
					color: '#fff',
				},
		  }),
}));
