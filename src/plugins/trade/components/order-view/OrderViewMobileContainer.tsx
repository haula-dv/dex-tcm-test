import MainTab from "@/components/tab/MainTab";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/material";
import { useOrderStream, usePositionStream } from "@orderly.network/hooks";
import { OrdersView, PositionsView } from "@orderly.network/react";
import { API, OrderEntity, OrderStatus } from "@orderly.network/types";
import { useConnectWallet } from "@web3-onboard/react";
import { memo, useState } from "react";

interface IProps {
  symbol: string;
}

const OrderViewMobileContainer = ({ symbol }: IProps) => {
  const [open, setOpen] = useState(true);
  const [positions, _info, { refresh, loading }] = usePositionStream(
    open ? "" : symbol
  );
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const [position, setPosition] = useState<any>(null);

  const onTPSLOrder = (position: any, order: any) => {
    setOpen(true);
    setPosition(position);
  };

  const onShowAllSymbolChange = () => {
    setOpen(!open);
  };

  const [ordersUntyped, { isLoading }] = useOrderStream({
    status: OrderStatus.COMPLETED,
  });

  const orders = ordersUntyped as (API.Order | API.AlgoOrder)[];

  const cancelAlgoOrder = async (orderId: number, symbol: string) => {};
  const cancelOrder = async (orderId: number, symbol: string) => {};
  const cancelTPSLOrder = async (
    orderId: number,
    rootAlgoOrderId: number
  ) => {};
  const editAlgoOrder = async (orderId: string, order: OrderEntity) => {};
  const editOrder = async (orderId: string, order: OrderEntity) => {};
  const loadMore = async () => {};

  const tabs = [
    {
      label: `Positions ${
        positions.rows && positions.rows?.length > 0
          ? `(${positions.rows?.length})`
          : ""
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
      children: (
        <>
          <OrdersView
            cancelAlgoOrder={cancelAlgoOrder}
            cancelOrder={cancelOrder}
            cancelTPSLOrder={cancelTPSLOrder}
            dataSource={orders}
            editAlgoOrder={editAlgoOrder}
            editOrder={editOrder}
            isLoading={false}
            symbol={symbol}
            loadMore={loadMore}
          />
        </>
      ),
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

  console.log(orders);

  return (
    <Box className="data-list-view mobile" maxHeight={"400px"}>
      {/* <DataListView /> */}
      <MainTab tabs={tabs}>
        <>
          {tabs.map((item) => (
            <TabPanel key={item.value} value={item.value} sx={{ p: 0 }}>
              {item.children}
            </TabPanel>
          ))}
        </>
      </MainTab>

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
