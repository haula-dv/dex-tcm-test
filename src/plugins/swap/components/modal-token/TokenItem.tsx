import { getImageNextwork, ITokenType } from '@/common';
import { MainButton } from '@/components/button/MainButton';
import { TokenIcon } from '@/components/token/TokenIcon';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText } from '@mui/material';
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
				<TokenIcon url={getImageNextwork(item.token, 'symbol_logo')} size={30} symbol={item?.token} />
			</ListItemIcon>

			<ListItemText primary={item?.token} secondary={`${item?.token_account_id?.slice(0, 10)}...`} />

			{isImportToken && (
				<MainButton size="small" variant="contained" color="darkPrimary">
					Import
				</MainButton>
			)}
		</CustomListItem>
	);
};

const CustomListItem = styled(ListItemButton)(({ theme }) => ({
	backgroundColor: '#fff',
	margin: '0px 16px 10px 16px',
	borderRadius: TSizes.borderRadius,

	'&.Mui-selected': {
		backgroundColor: '#fff',
		border: `1px solid ${theme.palette.success.main}`,
	},

	'& .MuiListItemText-primary': {
		fontSize: '16px',
	},

	'& .MuiListItemText-secondary': {
		fontSize: '12px',
		color: theme.palette.grey[700],
	},

	'& .MuiListItemIcon-root': {
		minWidth: '46px',
	},
}));
