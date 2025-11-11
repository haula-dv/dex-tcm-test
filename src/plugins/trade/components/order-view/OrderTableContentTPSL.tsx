import { IHeadCell } from "@/common";
import MainTable from "@/components/table/MainTable";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useAccount, useOrderStream } from "@orderly.network/hooks";
import { AlgoOrderRootType, API, OrderStatus } from "@orderly.network/types";
import Decimal from "decimal.js-light";
import { memo, useState } from "react";
import TPSLOrderItem from "./TPSLOrderItem";
import { UpdateTPSLModal } from "./UpdateTPSLModal";

interface IProps {
  orderBookStatus: OrderStatus;
  symbol: string;
  isShowAll: boolean;

  positions: {
    readonly rows: API.PositionTPSLExt[] | null;
    readonly aggregated: any;
    readonly totalCollateral: Decimal;
    readonly totalValue: Decimal;
    readonly totalUnrealizedROI: number;
  };
}

const OrderTableContentTPSL = ({
  orderBookStatus,
  symbol,
  isShowAll,
  positions,
}: IProps) => {
  const [side, setSide] = useState<any>("ALL");
  const [openModalUpdateTPSL, setOpenModalUpdateTPSL] = useState(false);
  const [orderActived, setOrderActived] = useState<API.AlgoOrder | null>(null);

  const [ordersUntyped, { isLoading }] = useOrderStream({
    symbol: isShowAll ? "" : symbol,
    status: orderBookStatus,
    side: side == "ALL" ? "" : side,
    includes: [AlgoOrderRootType.TP_SL, AlgoOrderRootType.POSITIONAL_TP_SL],
  });

  const orders = ordersUntyped as API.AlgoOrder[];
  // const { account: accountInfo } = useAccount(); // Disabled - not using Orderly account

  const handleChange = (event: SelectChangeEvent) => {
    setSide(event.target.value as string);
  };

  const headTable: IHeadCell[] = [
    { title: "Symbol" },
    { title: "Side" },
    { title: "Quantity" },
    { title: "Trigger" },
    { title: "Price" },
    { title: "Notional" },
    { title: "Order time", width: 120 },
    { title: "", width: 100 },
  ];

  const cancelTPSLOrder = async (order: any) => {};

  const handleToggleModalUpdateTPSL = () => {
    setOpenModalUpdateTPSL(!openModalUpdateTPSL);
  };

  const handleClickItem = (order: API.AlgoOrder, type: string) => {
    setOrderActived(order);
    handleToggleModalUpdateTPSL();
  };

  return (
    <Stack p={1}>
      <FormControl sx={{ maxWidth: "100px", pb: 1 }}>
        <Select
          size="small"
          labelId="side-select-label"
          id="side-select"
          value={side}
          onChange={handleChange}
        >
          <MenuItem value={"ALL"}>All</MenuItem>
          <MenuItem value={"BUY"}>Buy</MenuItem>
          <MenuItem value={"SELL"}>Sell</MenuItem>
        </Select>
      </FormControl>

      <MainTable
        headTable={headTable}
        isEmpty={orders && orders.length > 0 ? false : true}
        isLoading={isLoading}
      >
        {orders &&
          orders.length > 0 &&
          orders.map((item, index) => {
            return (
              <TPSLOrderItem
                key={index}
                order={item}
                cancelTPSLOrder={cancelTPSLOrder}
                onClickItem={handleClickItem}
              />
            );
          })}
      </MainTable>

      {orderActived && openModalUpdateTPSL && (
        <UpdateTPSLModal
          open={openModalUpdateTPSL}
          onClose={handleToggleModalUpdateTPSL}
          orderActived={orderActived}
          positions={positions.rows ?? []}
        />
      )}
    </Stack>
  );
};

export default memo(OrderTableContentTPSL);
