'use client';
import { MainButton } from '@/components/button/MainButton';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconChevronDown } from '@tabler/icons-react';

import { getImageNextwork, ITokenType } from '@/common';
import { TokenIcon } from '@/components/token/TokenIcon';

interface IProps {
	tokenSelected: ITokenType | null;
	handleToggleModalTokenList: () => void;
}

export const TokenSelect = ({ tokenSelected, handleToggleModalTokenList }: IProps) => {
	return (
		<Box flexShrink={0}>
			<CustomTokenSelect
				variant="contained"
				color={tokenSelected ? 'inherit' : 'primary'}
				endIcon={<IconChevronDown size={'1.2rem'} />}
				fullRounded
				onClick={handleToggleModalTokenList}
				isSelectedToken={tokenSelected?.token ? true : false}
			>
				{tokenSelected ? (
					<>
						<TokenIcon
							url={getImageNextwork(tokenSelected.token, 'symbol_logo')}
							size={24}
							symbol={tokenSelected?.token}
							fontSize="8px"
						/>

						<Typography pl={0.5} fontSize={'13px'} fontWeight={500}>
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
	...(isSelectedToken
		? {
				minWidth: 'auto',
				padding: '8px',
				minHeight: 'auto',
				backgroundColor: theme.palette.primary.light,
				border: `1px solid ${theme.palette.primary.main}`,
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
