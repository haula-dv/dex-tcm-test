import { getImageNextwork } from '@/common';
import { MainIconButton } from '@/components/button/MainIconButton';
import { TokenIcon } from '@/components/token/TokenIcon';
import { theme } from '@/utils';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Chip, ListItemButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { API } from '@orderly.network/types';
import { IconStar } from '@tabler/icons-react';

interface IProps {
	item: API.MarketInfoExt;
}

export const MarketItem = ({ item }: IProps) => {
	const spitSymbol = (symbol: string) => {
		const [_, base] = symbol.split('_');
		return base;
	};

	const formatSymbol = (symbol: string) => {
		const [base, quote] = symbol.split('_');
		return `${base}-${quote}`;
	};

	let dailyChange: string | undefined;
	let dailyChangePercentage: string | undefined;

	// if (stream && (stream as any)['24h_change'] != null && stream.index_price != null) {
	// 	dailyChange = String((stream as any)['24h_change'].toNumber());
	// 	dailyChangePercentage = (stream as any)['24h_change'].div(stream.index_price).mul(100).toPrecision(4, 2);
	// }

	return (
		<Item>
			<Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
				<Stack direction={'row'} spacing={0.5} alignItems={'center'} flex={1}>
					<MainIconButton size="small" edge="start">
						<IconStar size={'1.2rem'} />
					</MainIconButton>

					<TokenIcon size={28} url={getImageNextwork(spitSymbol(item.symbol), 'symbol_logo')} />

					<Stack>
						<Typography>{formatSymbol(item.symbol)}</Typography>

						<Stack direction={'row'} spacing={0.5}>
							<Typography fontSize={'12px'} color={theme.palette.grey[500]}>
								{spitSymbol(item.symbol)}
							</Typography>

							<Chip size="small" label={`${(item as any).leverage}x`} variant="filledTonal" color="default" />
						</Stack>
					</Stack>
				</Stack>

				<Stack>{item.change}</Stack>
			</Stack>
		</Item>
	);
};

const Item = styled(ListItemButton)(({ theme }) => ({
	borderRadius: TSizes.borderRadius,
	paddingLeft: '6px !important',
}));
