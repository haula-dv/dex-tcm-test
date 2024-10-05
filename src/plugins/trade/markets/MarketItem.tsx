import { getImageNextwork } from "@/common";
import { TokenIcon } from "@/components/token/TokenIcon";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { WSMessage } from "@orderly.network/types";
import { memo } from "react";

interface IProps {
	index: number;
	market: WSMessage.Ticker;
	onChangeSymbol: (symbol: string) => void;
}

const MarketItem = ({ index, market, onChangeSymbol }: IProps) => {
	const theme = useTheme();

	const [perp, base, quote] = market.symbol.split("_");

	return (
		<Stack
			direction={"row"}
			spacing={"18px"}
			alignItems={"center"}
			key={index}
			pl={"10px"}
			sx={{ cursor: "pointer" }}
			onClick={() => onChangeSymbol(market.symbol)}>
			<Stack direction={"row"} spacing={"8px"}>
				<TokenIcon url={getImageNextwork(base, "symbol_logo")} />

				<Typography fontWeight={600} fontSize={"14px"} whiteSpace={"nowrap"}>
					{(market as any).index_price.toFixed(2)}{" "}
					<span style={{ color: theme.palette.grey[400] }}>{quote}</span>
				</Typography>

				<Typography
					fontWeight={600}
					fontSize={"14px"}
					color={
						(market as any).change && (market as any).change.toString().startsWith("-")
							? theme.palette.error.main
							: theme.palette.success.main
					}
					whiteSpace={"nowrap"}>
					{((market as any).change * 100).toFixed(2)} %
				</Typography>
			</Stack>

			<Box
				height={"18px"}
				width={"2px"}
				bgcolor={setColorThemeMode(theme.palette.common.black, "#fff")}
			/>
		</Stack>
	);
};

export default memo(MarketItem);
