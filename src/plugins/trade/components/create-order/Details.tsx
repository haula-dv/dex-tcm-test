import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { usdFormatter } from '@/utils/formatters/number';
import { Stack } from '@mui/material';
import { useConnectWallet } from '@web3-onboard/react';

interface IProps {
	estLiqPrice: number | null | undefined;
	estLeverage: number | null | undefined;
	quote?: string;
	direction: string;
	baseDecimals: number;
}

const Details = ({ estLiqPrice, estLeverage, baseDecimals, quote, direction }: IProps) => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	// Handle connect wallet button
	const handleConnectWallet = async () => {
		await connect();
	};

	const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: baseDecimals });

	return (
		<MainCard width="100%" backgroudColor="primaryLight">
			<Stack spacing={'10px'}>
				<ItemRow title="Est. Liq. price:" value={estLiqPrice ? `${usdFormatter.format(estLiqPrice)} ${quote}` : '-'} />
				{/* <ItemRow title="Price Impact" value={'_'} /> */}
				<ItemRow title="Account leverage:" value={estLeverage ? `⇒ ${formatter.format(estLeverage)}` : '_'} />
				{/* <ItemRow
					title={
						<Stack direction={'row'} spacing={'6px'} alignItems={'center'}>
							<Typography
								fontSize={'15px'}
								color={setColorThemeMode(useTheme().palette.grey[500], useTheme().palette.common.white)}
							>
								Fee
							</Typography>

							<MainChip disabledPadding fullRounded label={'Taker'} />
						</Stack>
					}
					value="_"
				/>

				<ItemRow title="Total" value="_" /> */}

				<MainButton
					variant="contained"
					color="primary"
					type={wallet ? 'submit' : 'button'}
					onClick={() => {
						return wallet ? null : handleConnectWallet();
					}}
				>
					{wallet ? direction : 'Connect wallet'}
				</MainButton>
			</Stack>
		</MainCard>
	);
};

export default Details;
