import MainTab from "@/components/tab/MainTab";
import { setColorThemeMode } from "@/utils/helpers";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { usePositionStream } from "@orderly.network/hooks";
import { PositionsView } from "@orderly.network/react";
import { OrderEntity, OrderStatus } from "@orderly.network/types";
import { useConnectWallet } from "@web3-onboard/react";
import { memo, useState } from "react";
import OrderTableMobileContainer from "./mobile/OrderTableMobileContainer";

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
        <OrderTableMobileContainer
          orderBookStatus={OrderStatus.COMPLETED}
          symbol={symbol}
        />
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

  return (
    <CardMobileOrderView className="data-list-view mobile">
      <MainTab tabs={tabs}>
        <>
          <Divider />
          {wallet
            ? tabs.map((item) => (
                <TabPanel key={item.value} value={item.value} sx={{ p: 0 }}>
                  {item.children}
                </TabPanel>
              ))
            : "Please connect wallet"}
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
    </CardMobileOrderView>
  );
};

export default memo(OrderViewMobileContainer);

const CardMobileOrderView = styled(Box)(({ theme }) => ({
  height: "400px",
  overflowY: "auto",
  "& .MuiTabPanel-root": {
    "& .orderly-border-divider": {
      display: "none",
    },
  },
  "& .orderly-data-list-filter": {
    backgroundColor: setColorThemeMode(
      theme.palette.primary.light,
      theme.palette.grey[800]
    ),
    marginBottom: "10px",
    borderRadius: "0px 0px 10px 10px",
  },
  "& .tab-header": {
    padding: "10px",
    borderRadius: "10px 10px 0px 0px",
    backgroundColor: setColorThemeMode(
      theme.palette.primary.light,
      theme.palette.grey[800]
    ),
  },

  "& .orderly-list-view-inner ": {
    "& .orderly-px-4": {
      padding: "10px",
      borderRadius: "10px",
      backgroundColor: setColorThemeMode(
        theme.palette.primary.light,
        theme.palette.grey[800]
      ),
    },

    "& .orderly-border-divider": {
      display: "none",
    },
  },
}));
