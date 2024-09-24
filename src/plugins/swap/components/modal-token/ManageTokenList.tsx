import { ITab } from '@/common/types/components/tab';
import { MainIconButton } from '@/components/button/MainIconButton';
import { MainCard } from '@/components/card/MainCard';
import { SearchField } from '@/components/form-control/SearchField';
import SwitchBase from '@/components/form-control/SwitcheBase';
import { GrayTab } from '@/components/tab/GrayTab';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { IconArrowLeft, IconSettings, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { useStore } from 'zustand';
import { tokenCoingeckoListState, tokenPancakeswapBnbListState, tokenPancakeswapExtendedListState } from '../../store';

interface IProps {
	onBack: () => void;
	handleCloseModal: () => void;
}

export const ManageTokenList = ({ onBack, handleCloseModal }: IProps) => {
	const tokenCoingecko1 = useStore(tokenCoingeckoListState, (state) => state.value);
	const tokenCoingecko2 = useStore(tokenPancakeswapBnbListState, (state) => state.value);
	const tokenCoingecko3 = useStore(tokenPancakeswapExtendedListState, (state) => state.value);

	const tabs: ITab[] = [
		{ label: 'Lists', value: 1 },
		{ label: 'Tokens', value: 2 },
	];

	const lists = [
		{
			id: 'coinGecko',
			name: 'CoinGecko',
			icon: 'https://tokens.pancakeswap.finance/images/projects/coingecko.png',
			tokens: tokenCoingecko1 && tokenCoingecko1.length > 0 ? tokenCoingecko1.length : 0,
			link: 'https://tokenlists.org/token-list?url=https://tokens.pancakeswap.finance/coingecko.json',
			version: 'v1.0.68',
		},
		// {
		// 	id: 'pancakeSwap',
		// 	name: 'PancakeSwap BNB Chain MM',
		// 	icon: 'https://pancakeswap.finance/logo.png',
		// 	tokens: tokenCoingecko2 && tokenCoingecko2.length > 0 ? tokenCoingecko2.length : 0,
		// 	link: 'https://tokenlists.org/token-list?url=https://tokens.pancakeswap.finance/pancakeswap-bnb-mm.json',
		// 	version: 'v2.16.250',
		// },
		// {
		// 	id: 'pancakeSwapExtended',
		// 	name: 'PancakeSwap Extended',
		// 	icon: 'https://pancakeswap.finance/logo.png',
		// 	tokens: tokenCoingecko3 && tokenCoingecko3.length > 0 ? tokenCoingecko3.length : 0,
		// 	link: 'https://tokenlists.org/token-list?url=https://tokens.pancakeswap.finance/pancakeswap-extended.json',
		// 	version: 'v0.0.6',
		// },
	];

	return (
		<>
			<Stack direction={'row'} alignItems={'center'} pb="2px" mt="-8px !important">
				<MainIconButton isFullRounded onClick={onBack} size="small">
					<IconArrowLeft />
				</MainIconButton>

				<Typography flex={1} fontWeight={600} pl={1} fontSize={'16px'}>
					Manage
				</Typography>

				<MainIconButton isFullRounded onClick={handleCloseModal} size="small">
					<IconX />
				</MainIconButton>
			</Stack>
			<Divider />

			<Box p={TSizes.margin_xs}>
				<GrayTab tabs={tabs} />

				<Box pt={TSizes.margin_xs} />

				<SearchField placeholder="http:// or ipfs:// or ENS name" height={'48px'} />

				<Stack pt={TSizes.margin_xs} spacing={TSizes.margin_xs}>
					{lists.map((item, index) => (
						<MainCard key={index} isHover width="100%" backgroudColor="common">
							<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
								<Stack direction={'row'} spacing={1} alignItems={'center'}>
									<Image src={item.icon ? item.icon : '/images/token.png'} height={32} width={32} alt="" />

									<Stack>
										<Typography fontSize={'16px'}>{item.name}</Typography>

										<Stack direction={'row'} spacing={1}>
											<Typography fontSize={'14px'}>{item.tokens} token</Typography>

											<IconSettings size={'1.2rem'} />
										</Stack>
									</Stack>
								</Stack>

								<SwitchBase defaultChecked />
							</Stack>
						</MainCard>
					))}
				</Stack>
			</Box>
		</>
	);
};
