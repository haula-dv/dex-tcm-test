import { getImageNextwork, ITokenType } from '@/common';
import { MainButton } from '@/components/button/MainButton';
import { TokenIcon } from '@/components/token/TokenIcon';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IProps extends ListItemButtonProps {
	isImportToken?: boolean;
	item: ITokenType;
	handleSelectToken: (token: ITokenType) => void;
	isSelected: boolean;
}

export const TokenItem = ({ isImportToken, handleSelectToken, item, isSelected, ...props }: IProps) => {
	return (
		<CustomListItem {...props} onClick={() => handleSelectToken(item)} selected={isSelected}>
			<ListItemIcon>
				<TokenIcon url={getImageNextwork(item.token, 'symbol_logo')} size={30} symbol={item?.token} fontSize="7px" />
			</ListItemIcon>

			<ListItemText
				primary={item?.token}
				secondary={`${item?.token_account_id?.slice(0, 20)}${item?.token_account_id.length > 20 ? '...' : ''}`}
			/>

			{isImportToken && (
				<Box flexShrink={0}>
					<MainButton size="small" variant="contained" color="darkPrimary">
						Import
					</MainButton>
				</Box>
			)}
		</CustomListItem>
	);
};

const CustomListItem = styled(ListItemButton)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	margin: '0px 10px 10px 10px',
	borderRadius: TSizes.borderRadius,

	'&.Mui-selected': {
		backgroundColor: theme.palette.background.paper,
		border: `1px solid ${theme.palette.success.main}`,
	},

	'& .MuiListItemText-primary': {
		fontSize: '16px',
	},

	'& .MuiListItemText-secondary': {
		fontSize: '12px',
		color: setColorThemeMode(theme.palette.grey[700], theme.palette.grey[200]),
	},

	'& .MuiListItemIcon-root': {
		minWidth: '46px',
	},
}));
