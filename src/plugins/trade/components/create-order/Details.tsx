import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import { ItemRow } from "@/plugins/pool/components/TokenSelected";
import { Stack, Typography } from "@mui/material";
import { useMarginRatio } from "@orderly.network/hooks";
import { IconArrowRight } from "@tabler/icons-react";
import { useConnectWallet } from "@web3-onboard/react";

interface IProps {
	estLeverage: number | any | undefined;
	estLiqPrice: number | any | undefined;
	quote?: string;
	symbol: string;
	quoteDecimals: number;
	direction: any;
}

const Details = ({ estLeverage, estLiqPrice, quoteDecimals, quote, direction }: IProps) => {
	const [{ wallet, connecting }, connect] = useConnectWallet();
	const { currentLeverage, mmr } = useMarginRatio();

	// Handle connect wallet button
	const handleConnectWallet = async () => {
		await connect();
		location.reload();
	};

	const formatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: quoteDecimals });

	return (
		<MainCard width="100%" backgroudColor="primaryLight">
			<Typography pb={"10px"}>Details</Typography>

			<Stack spacing={"6px"} pb={"10px"}>
				<ItemRow
					title="Est. Liq. price"
					value={
						<>
							{estLiqPrice ? formatter.format(estLiqPrice) : "-"} {quote}
						</>
					}
				/>

				<ItemRow
					title="Account leverage"
					value={
						<Stack direction={"row"} spacing={"6px"} alignItems={"center"}>
							<Typography>{formatter.format(Math.abs(currentLeverage))}x</Typography>
							{estLeverage && <IconArrowRight size={"0.7rem"} />}
							<Typography>{estLeverage ? `${estLeverage}x` : ""}</Typography>
						</Stack>
					}
				/>

				{/* <ItemRow title="Expected Price" value={estLiqPrice ? formatter.format(estLiqPrice) : '-'} />

				<ItemRow title="Price Impact" value={priceImpact ?? '_'} />

				<ItemRow title="Account leverage:" value={estLeverage ? `⇒ ${formatter.format(estLeverage)}` : '-'} />

				<ItemRow
					title={
						<Stack direction={'row'} spacing={'6px'} alignItems={'center'}>
							<Typography fontSize={'15px'} color={setColorThemeMode(theme.palette.grey[500], theme.palette.grey[300])}>
								Fee {fee.feePercentage > 0 ? `(${usdFormatter.format(fee.feePercentage)})%` : ''}
							</Typography>

							<MainChip disabledPadding fullRounded label={'Taker'} />
						</Stack>
					}
					value={
						<Box>
							{fee.totalFee ? (Math.floor(fee.totalFee * 100) / 100).toLocaleString() : '-'}{' '}
							<span style={{ color: setColorThemeMode(theme.palette.grey[700], theme.palette.grey[300]) }}>
								{quote}
							</span>
						</Box>
					}
				/>

				<ItemRow
					title="Total ≈"
					value={
						<Box>
							{totalPrice > 0 ? (Math.floor(totalPrice * 100) / 100).toLocaleString() : '-'}{' '}
							<span style={{ color: setColorThemeMode(theme.palette.grey[700], theme.palette.grey[300]) }}>
								{quote}
							</span>
						</Box>
					}
				/> */}
			</Stack>

			<MainButton
				fullWidth
				variant="contained"
				color={direction == "Sell" ? "error" : "primary"}
				type={wallet ? "submit" : "button"}
				onClick={() => {
					return wallet ? null : handleConnectWallet();
				}}>
				{connecting ? "Connecting..." : wallet ? direction : "Connect wallet"}
			</MainButton>
		</MainCard>
	);
};

export default Details;
