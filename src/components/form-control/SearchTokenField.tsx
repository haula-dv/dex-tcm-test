import { isTokenSearchState, ITokenType, tokenLoadingState, tokensSearchState, tokensState } from '@/common';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, InputBase, styled } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { debounce } from 'lodash';
import { setZustandValue } from 'nes-zustand';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { MainIconButton } from '../button/MainIconButton';
import IconSearch from '../icons/search';

interface IProps {
	tokens: ITokenType[];
}

export const SearchTokenField = ({ tokens }: IProps) => {
	const [value, setValue] = useState('');

	const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setValue(e.target.value);
		debounceFn(e.target.value);
	};

	const handleDebounceFn = async (value: string) => {
		if (value) {
			setZustandValue(isTokenSearchState, true);
			setZustandValue(tokenLoadingState, true);

			const filters = tokens.filter((item) => item.token.toLowerCase().includes(value.toLowerCase()));

			setZustandValue(tokensSearchState, filters);
			setZustandValue(tokenLoadingState, false);
			return;
		}

		await handleClear();
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceFn = useCallback(debounce(handleDebounceFn, 600), []);

	const handleClear = () => {
		setValue('');
		setZustandValue(isTokenSearchState, false);
		setZustandValue(tokensState, tokens);
	};

	useEffect(() => {
		return () => handleClear();
	}, []);

	return (
		<CustomSearchField>
			<IconSearch />
			<Box ml={1} />
			<InputBase
				placeholder="Search token or address"
				sx={{ width: '100%' }}
				onChange={onChange}
				value={value}
				disabled={tokens.length === 0}
			/>

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
	backgroundColor: '#fff',
	borderRadius: TSizes.borderRadius,
	display: 'flex',
	alignItems: 'center',
	padding: '10px',
	border: `1px solid ${theme.palette.primary.light}`,
	transition: '0.4s',

	'& .MuiInputBase-input': {
		fontSize: '14px',
	},

	'&:focus-within': {
		borderColor: theme.palette.primary.main,
	},
}));
