import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, styled } from '@mui/material';

export const SearchField = () => {
	return (
		<CustomSearchField>
			{/* <IconSearch />
			<Box ml={1} />
			<InputBase placeholder="Search token or address" sx={{ width: '100%' }} onChange={onChange} value={value} />

			{value && (
				<MainIconButton edge="end" onClick={handleClear}>
					<IconX />
				</MainIconButton>
			)} */}
		</CustomSearchField>
	);
};

const CustomSearchField = styled(Box)(({ theme }) => ({
	height: TSizes.fieldSearchHeight,
	backgroundColor: theme.palette.grey[50],
	borderRadius: TSizes.borderRadius,
	border: `1px solid ${theme.palette.grey[100]}`,
	display: 'flex',
	alignItems: 'center',
	padding: '10px',
}));
