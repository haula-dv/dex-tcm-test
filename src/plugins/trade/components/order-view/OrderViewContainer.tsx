'use client'
import { Box } from "@mui/material";
import { DataListWidget } from "@orderly.network/trading";
import { memo } from "react";

interface IProps {
  symbol: string;
}

const OrderViewContainer = ({ symbol }: IProps) => {
  // const [isShowAllInstrument, setShowAllInstrument] = useState(true);
  // const theme = useTheme();

  // const [positions, _info, { refresh, loading }] = usePositionStream(
  // 	isShowAllInstrument ? "" : symbol,
  // );

  // const tabs = [
  // 	{
  // 		label: `Positions ${
  // 			positions.rows && positions.rows?.length > 0 ? `(${positions.rows?.length})` : ""
  // 		}`,
  // 		value: "positions",
  // 		children: <PositionContent positions={positions} refresh={refresh} />,
  // 	},
  // 	{
  // 		label: "Pending",
  // 		value: "pending",
  // 		children: (
  // 			<OrderTableContentPending
  // 				orderBookStatus={OrderStatus.INCOMPLETE}
  // 				symbol={symbol}
  // 				isShowAll={isShowAllInstrument}
  // 			/>
  // 		),
  // 	},
  // 	{
  // 		label: "TP/SL",
  // 		value: "TP/SL",
  // 		children: (
  // 			<OrderTableContentTPSL
  // 				orderBookStatus={OrderStatus.NEW}
  // 				symbol={symbol}
  // 				isShowAll={isShowAllInstrument}
  // 				positions={positions}
  // 			/>
  // 		),
  // 	},
  // 	{
  // 		label: "Filled",
  // 		value: "filled",
  // 		children: (
  // 			<OrderTableContentFilled
  // 				orderBookStatus={OrderStatus.FILLED}
  // 				symbol={symbol}
  // 				isShowAll={isShowAllInstrument}
  // 			/>
  // 		),
  // 	},
  // 	{
  // 		label: "Order history",
  // 		value: "order_history",
  // 		children: (
  // 			<OrderTableContentHistory
  // 				orderBookStatus={OrderStatus.COMPLETED}
  // 				symbol={symbol}
  // 				isShowAll={isShowAllInstrument}
  // 			/>
  // 		),
  // 	},
  // ];

  // const onShowAllInstrument = (value: boolean) => {
  // 	setShowAllInstrument(value);
  // };

  return (
    <Box
      height={"32%"}
      minHeight={"300px"}
      overflow={"hidden"}
      className="data-list-view"
      mt={2}
    >
      {/* <DataListView /> */}
      <DataListWidget symbol={symbol} />

      {/* <MainTab
				tabs={tabs}
				rightSideTab={
					<Box flexShrink={0}>
						<CheckBoxBase
							label="Show all symbols"
							onChange={onShowAllInstrument}
							defaultValue={isShowAllInstrument}
						/>
					</Box>
				}>
				<MainCard
					backgroudColor="primaryLight"
					height="100%"
					width="100%"
					disablePadding
					sx={{ overflowY: "auto", height: "100%", pb: "50px" }}>
					{tabs.map((item) => (
						<TabPanel
							key={item.value}
							value={item.value}
							sx={{ p: 0, overflowY: "auto", height: "100%" }}>
							{item.children}
						</TabPanel>
					))}
				</MainCard>
			</MainTab> */}
    </Box>
  );
};

export default memo(OrderViewContainer);