import { usdFormatter } from "@/utils/formatters/number";
import { findTPnSLOrderByType } from "@/utils/helpers";
import { TableCell, TableRow, Typography, useTheme } from "@mui/material";
import { API } from "@orderly.network/types";
import dayjs from "dayjs";
import UpdatePosition from "./UpdatePosition";

interface IProps {
	item: API.PositionTPSLExt;
	symbol: string;
	refresh: import("swr/_internal").KeyedMutator<API.PositionInfo>;
	activedTPSL: any | null;
}

const PositionItem = ({ item, symbol, refresh, activedTPSL }: IProps) => {
	const theme = useTheme();
	const [_, base, quote] = item.symbol.split("_");

	const child_orders: any[] = activedTPSL
		? activedTPSL.child_orders.length > 0
			? activedTPSL.child_orders
			: []
		: [];

	const isEntriePosition = activedTPSL.algo_type == "POSITIONAL_TP_SL";

	const takeProfit = findTPnSLOrderByType("TAKE_PROFIT", child_orders);
	const stopLoss = findTPnSLOrderByType("STOP_LOSS", child_orders);

	const stopLossAndTakeProfit: any[] = takeProfit != null && stopLoss != null ? child_orders : [];

	const isTPnSL = stopLossAndTakeProfit.length == 2;

	return (
		<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
			<TableCell scope="row">
				{base} / {quote}
			</TableCell>

			<TableCell align="left">
				<Typography
					color={
						item.position_qty.toString().startsWith("-")
							? theme.palette.error.main
							: theme.palette.success.main
					}
					fontWeight={600}>
					{item["position_qty"]}
				</Typography>
			</TableCell>

			<TableCell>{usdFormatter.format(item.settle_price)}</TableCell>

			<TableCell>{usdFormatter.format(item["average_open_price"])}</TableCell>

			<TableCell>{usdFormatter.format(item.mark_price)}</TableCell>

			<TableCell sx={{ color: `${theme.palette.warning.main} !important` }}>
				{item.est_liq_price ? usdFormatter.format(item.est_liq_price) : "-"}
			</TableCell>

			<TableCell sx={{ whiteSpace: "nowrap" }}>
				<Typography
					color={
						item.unrealized_pnl.toString().startsWith("-")
							? theme.palette.error.main
							: theme.palette.success.main
					}
					fontWeight={600}>
					{usdFormatter.format(item.unrealized_pnl)} (
					{usdFormatter.format(item.unrealized_pnl_ROI * 100)}%)
				</Typography>
			</TableCell>

			<TableCell>
				{!takeProfit && !stopLoss && "--"}
				{takeProfit && (
					<Typography>
						TP -{" "}
						<span style={{ color: theme.palette.success.main }}>
							{usdFormatter.format(takeProfit.trigger_price)}
							{".00"}
						</span>
					</Typography>
				)}

				{stopLoss && (
					<Typography>
						SL -{" "}
						<span style={{ color: theme.palette.error.main }}>
							{usdFormatter.format(stopLoss.trigger_price)}
							{".00"}
						</span>
					</Typography>
				)}
			</TableCell>

			<TableCell>{usdFormatter.format(item["notional"])}</TableCell>

			{/* Margin = Position size * Mark price * MMR */}
			<TableCell>{item.cost_position ? usdFormatter.format(item["mm"]) : "-"}</TableCell>

			<TableCell>{dayjs(item.timestamp).format("YYYY-MM-DD HH:mm")}</TableCell>

			<TableCell>
				<UpdatePosition position={item} symbol={symbol} refresh={refresh} 
				takeProfit={takeProfit}
				stopLoss={stopLoss}
				/>
			</TableCell>
		</TableRow>
	);
};

export default PositionItem;

// / @orderly.network/react
// @orderly.network/react
// /
// lib
// /
// block
// /
// positions
// /
// cell.js
