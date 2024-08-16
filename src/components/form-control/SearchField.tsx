import { tokenParamsState, tokensState } from '@/common';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, InputBase, styled } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { debounce } from 'lodash';
import { setZustandValue } from 'nes-zustand';
import { ChangeEvent, useCallback, useState } from 'react';
import { useStore } from 'zustand';
import { MainIconButton } from '../button/MainIconButton';
import IconSearch from '../icons/search';

export const SearchField = () => {
	const [value, setValue] = useState('');
	const tokenParams = useStore(tokenParamsState, (state) => state.value);

	const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setValue(e.target.value);
		debounceFn(e.target.value);
	};

	const handleDebounceFn = async (value: string) => {
		if (value) {
			// await searchTopTokensAPI(value);
			return;
		}

		await handleClear();
	};

	const debounceFn = useCallback(debounce(handleDebounceFn, 600), []);

	const handleClear = async () => {
		setValue('');
		await setZustandValue(tokensState, []);
		// await fetchTopTokensAPI(tokenParams);
	};

	return (
		<CustomSearchField>
			<IconSearch />
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
	backgroundColor: theme.palette.grey[50],
	borderRadius: TSizes.borderRadius,
	border: `1px solid ${theme.palette.grey[100]}`,
	display: 'flex',
	alignItems: 'center',
	padding: '10px',
}));
