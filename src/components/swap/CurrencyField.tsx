'use client';
import { ITokenType } from '@/common';
import { TokenSelect } from '@/plugins/swap/components/token/TokenSelect';
import { tokenInputState, tokenOutputState } from '@/plugins/swap/store';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, InputBase, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { setZustandValue } from 'nes-zustand';
import { FocusEvent, useState } from 'react';
import { useStore } from 'zustand';
import { TokenListModal } from '../../plugins/swap/components/modal-token/TokenListModal';

export type ITypeSwap = 'input' | 'output';

interface IProps {
	currentToken: ITokenType | null;
	field: ITypeSwap;
	handleGetSwapPrice?: (value: number) => void;
}

export const CurrencyField = ({ currentToken, handleGetSwapPrice, field }: IProps) => {
	const [openTokenList, setOpenTokenList] = useState(false);

	// TOKEN
	const tokenInput = useStore(tokenInputState, (state) => state.value);
	const tokenOutput = useStore(tokenOutputState, (state) => state.value);

	const getPrice = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
		handleGetSwapPrice && handleGetSwapPrice(+e.target.value);
	};

	// Function to select a token
	const handleSelectToken = (token: ITokenType) => {
		if (token.token === 'USDC') {
			handleAddToken(token);
			return;
		}

		if (field == 'input') {
			if (token.token === tokenOutput?.token) {
				setZustandValue(tokenOutputState, null);
			}

			setZustandValue(tokenInputState, token);
		} else {
			if (token.token === tokenInput?.token) {
				setZustandValue(tokenInputState, null);
			}

			setZustandValue(tokenOutputState, token);
		}

		handleToggleModalTokenList();
	};

	// Modal show modal token
	const handleToggleModalTokenList = () => {
		setOpenTokenList(!openTokenList);
	};

	// Handle add token
	const handleAddToken = async (token: ITokenType) => {
		// try {
		//   const response = await (window as any).ethereum.request({
		//     method: "wallet_watchAsset",
		//     params: {
		//       type: "ERC20", // Loại tài sản (ở đây là token ERC20)
		//       options: {
		//         address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // Địa chỉ token
		//         symbol: token.token, // Ký hiệu token
		//         decimals: token.decimals, // Số thập phân của token
		//         image: getImageNextwork(token.token, "symbol_logo"), // Hình ảnh đại diện (có thể bỏ qua)
		//       },
		//     },
		//   });
		// } catch (error) {
		//   // console.log(error.error);
		// }
	};

	return (
		<>
			<Content>
				<Stack width={'100%'}>
					<Typography color={theme.palette.grey[600]} fontWeight={700} fontSize={'12px'}>
						{field === 'input' ? 'From' : 'To'}
					</Typography>

					<InputBase placeholder="0.0" type="number" onBlur={getPrice} />
					<Typography color={theme.palette.grey[600]}>Balance: 0.00 </Typography>
				</Stack>

				<TokenSelect handleToggleModalTokenList={handleToggleModalTokenList} tokenSelected={currentToken} />
			</Content>

			<TokenListModal
				open={openTokenList}
				onClose={handleToggleModalTokenList}
				field={field}
				handleSelectToken={handleSelectToken}
			/>
		</>
	);
};

export const Content = styled(Box)(({ theme }) => ({
	borderRadius: TSizes.borderRadius,
	// border: `1px solid #fff`,
	backgroundColor: '#fff',
	padding: theme.spacing(2),
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	transition: '0.6s',

	'&:hover': {
		// backgroundColor: theme.palette.grey[50],
		// borderColor: theme.palette.divider,
	},

	'& .MuiInputBase-input': {
		fontSize: '24px',
		fontWeight: 600,
		width: '100%',
	},
}));
