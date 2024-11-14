import { Box } from "@mui/material";
import { usePositionStream } from "@orderly.network/hooks";
import { PositionsView } from "@orderly.network/react";
import { DataListView } from "@orderly.network/react/esm/page/trading/desktop/sections/datalist";
import { useConnectWallet } from "@web3-onboard/react";
import { memo, useState } from "react";

interface IProps {
	symbol: string;
}

const OrderViewMobileContainer = ({ symbol }: IProps) => {
	const [open, setOpen] = useState(true);
	const [positions, _info, { refresh, loading }] = usePositionStream(open ? "" : symbol);
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	const [position, setPosition] = useState<any>(null);

	const onTPSLOrder = (position: any, order: any) => {
		setOpen(true);
		setPosition(position);
	};

	const onShowAllSymbolChange = () => {
		setOpen(!open);
	};

	const tabs = [
		{
			label: `Positions ${
				positions.rows && positions.rows?.length > 0 ? `(${positions.rows?.length})` : ""
			}`,
			value: "positions",
			children: (
				<>
					{wallet && (
						<PositionsView
							dataSource={positions.rows}
							aggregated={positions.aggregated}
							showAllSymbol={open}
							onShowAllSymbolChange={onShowAllSymbolChange}
						/>
					)}
				</>
			),
		},
		{
			label: "Pending",
			value: "pending",
			children: <></>,
		},
		{
			label: "TP/SL",
			value: "TP/SL",
			children: <></>,
		},

		{
			label: "Order history",
			value: "order_history",
			children: <></>,
		},
	];

	return (
		<Box className="data-list-view mobile" maxHeight={"400px"}>
			<DataListView />
			{/* <MainTab tabs={tabs}>
				<>
					{tabs.map((item) => (
						<TabPanel key={item.value} value={item.value} sx={{ p: 0 }}>
							{item.children}
						</TabPanel>
					))}
				</>
			</MainTab> */}

			{/* <Drawer anchor={"bottom"} open={open} onClose={() => setOpen(false)}>
				{position && open && (
					<ClosePositionPane
						side={"BUY" as any}
						onClose={() => setOpen(false)}
						position={position}
					/>
				)}
			</Drawer> */}
		</Box>
	);
};

export default memo(OrderViewMobileContainer);
