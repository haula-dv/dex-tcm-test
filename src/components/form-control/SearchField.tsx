import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, InputBase, styled } from '@mui/material';
import { IconSearch, IconX } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';
import { MainIconButton } from '../button/MainIconButton';

export const SearchField = () => {
	const [value, setValue] = useState('');

	const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleClear = () => {
		setValue('');
	};

	return (
		<CustomSearchField>
			<Box flexShrink={0} display={'flex'} alignItems={'center'}>
				<IconSearch />
			</Box>

			<Box ml={1} />
			<InputBase placeholder="Search token or address" sx={{ width: '100%' }} onChange={onChange} value={value} />

			{value && (
				<MainIconButton edge="end" onClick={handleClear}>
					<IconX />
				</MainIconButton>
			)}
		</CustomSearchField>
	);
};

const CustomSearchField = styled(Box)(({ theme }) => ({
	height: TSizes.fieldSearchHeight,
	backgroundColor: theme.palette.common.white,
	borderRadius: TSizes.borderRadius,
	border: `1px solid ${theme.palette.grey[100]}`,
	display: 'flex',
	alignItems: 'center',
	padding: '10px',
}));
