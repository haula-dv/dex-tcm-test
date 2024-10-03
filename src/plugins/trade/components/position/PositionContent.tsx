import { IHeadCell } from "@/common";
import MainTable from "@/components/table/MainTable";
import { usdFormatter } from "@/utils/formatters/number";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useOrderStream } from "@orderly.network/hooks";
import { AlgoOrderRootType, API, OrderStatus } from "@orderly.network/types";
import Decimal from "decimal.js-light";
import PositionItem from "./PositionItem";

const headTable: IHeadCell[] = [
	{ title: "Symbol" },
	{ title: "Quantity" },
	{ title: "Avg. open" },
	{ title: "Mark price" },
	{ title: "Liq. price" },
	{
		title: "Unreal. PnL",
		hint: `Current unrealized profit or loss on your open positions across all widgets calculated using Mark Price.`,
	},
	{ title: "TP/SL	" },
	{ title: "Est. total" },
	{ title: "Margin" },
	{ title: "Order Time", width: 100 },
	{ title: "", width: 50 },
];

interface IProps {
	positions: {
		readonly rows: API.PositionTPSLExt[] | null;
		readonly aggregated: any;
		readonly totalCollateral: Decimal;
		readonly totalValue: Decimal;
		readonly totalUnrealizedROI: number;
	};

	refresh: any;
}

const PositionContent = ({ positions, refresh }: IProps) => {
	const theme = useTheme();
	const unrealPnL: number = positions?.aggregated?.unrealPnL ?? 0;

	const [orders, { isLoading }] = useOrderStream({
		status: OrderStatus.NEW,
		includes: [AlgoOrderRootType.TP_SL, AlgoOrderRootType.POSITIONAL_TP_SL],
	}); // All

	return (
		<Box px={"10px"} pt={"10px"} pb={6} height={"100%"}>
			<Stack direction={"row"} spacing={"10px"}>
				<Stack>
					<Typography
						fontSize={"10px"}
						color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						Unreal. PnL
					</Typography>
					<Typography
						fontWeight={600}
						color={
							unrealPnL.toString().startsWith("-")
								? theme.palette.error.main
								: theme.palette.success.main
						}>
						{positions.aggregated?.unrealPnL
							? usdFormatter.format(positions.aggregated?.unrealPnL)
							: "0.00"}
					</Typography>
				</Stack>

				<Stack>
					<Typography
						fontSize={"10px"}
						color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}>
						Notional
					</Typography>
					<Typography fontWeight={600}>
						{positions.aggregated?.notional
							? usdFormatter.format(positions.aggregated?.notional)
							: "0.00"}
					</Typography>
				</Stack>
			</Stack>

			<Box my={TSizes.margin_common} />

			<MainTable
				headTable={headTable}
				isEmpty={positions.rows && positions.rows.length > 0 ? false : true}>
				{positions.rows &&
					positions.rows.length > 0 &&
					positions.rows.map((item, index) => {
						const activedTPSL =
							orders && orders?.length > 0 ? orders.find((ol) => ol.symbol === item.symbol) : null;

						return (
							<PositionItem
								key={index}
								item={item}
								refresh={refresh}
								symbol={item.symbol}
								activedTPSL={activedTPSL}
							/>
						);
					})}
			</MainTable>
		</Box>
	);
};

export default PositionContent;
