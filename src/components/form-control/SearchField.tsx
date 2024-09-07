import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, InputBase, styled } from '@mui/material';
import { IconSearch, IconX } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';
import { MainIconButton } from '../button/MainIconButton';

interface IProps {
	placeholder?: string;
	onSearch?: (search: string) => void;
	height?: string;
}

export const SearchField = ({ placeholder = '', height = TSizes.fieldSearchHeight, onSearch }: IProps) => {
	const [value, setValue] = useState('');

	const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setValue(e.target.value);
		onSearch && onSearch(e.target.value);
	};

	const handleClear = () => {
		setValue('');
		onSearch && onSearch('');
	};

	return (
		<CustomSearchField height={height}>
			<Box flexShrink={0} display={'flex'} alignItems={'center'}>
				<IconSearch />
			</Box>

			<Box ml={1} />
			<InputBase placeholder={placeholder} sx={{ width: '100%' }} onChange={onChange} value={value} />

			{value && (
				<MainIconButton edge="end" size="small" onClick={handleClear}>
					<IconX size={'1.2rem'} />
				</MainIconButton>
			)}
		</CustomSearchField>
	);
};

const CustomSearchField = styled(Box)<any>(({ theme, height }) => ({
	height: height,
	backgroundColor: setColorThemeMode(theme.palette.grey[50], theme.palette.grey[900]),
	borderRadius: TSizes.borderRadius,
	display: 'flex',
	alignItems: 'center',
	padding: '10px',

	'& .MuiInputBase-root': {
		color: setColorThemeMode(theme.palette.grey[900], theme.palette.grey[100]),
	},
}));
