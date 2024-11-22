import { IPlaceOrderValues } from "@/plugins/trade/components/create-order/CreateOrderForm";
import { Theme, useTheme } from "@mui/material";
import { useOrderEntry } from "@orderly.network/hooks";
import {
  OrderEntity,
  OrderSide,
  OrderStatus,
  OrderType,
} from "@orderly.network/types";
import { match } from "ts-pattern";

export const setColorThemeMode = (
  colorLight: string,
  colorDark: string,
  themeEx?: Theme
): any => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();

  if ((themeEx ? themeEx.palette.mode : theme.palette.mode) === "dark") {
    return colorDark;
  } else {
    return colorLight;
  }
};

// Form Create Order
export async function getValidationErrors(
  data: IPlaceOrderValues,
  symbol: string,
  validator: ReturnType<typeof useOrderEntry>["helper"]["validator"]
): Promise<
  ReturnType<ReturnType<typeof useOrderEntry>["helper"]["validator"]>
> {
  return validator(getInputPlaceOrder(data, symbol));
}

export const getInputPlaceOrder = (
  data: IPlaceOrderValues,
  symbol: string
): OrderEntity => {
  return {
    symbol,
    side: match(data.direction)
      .with("Buy", () => OrderSide.BUY)
      .with("Sell", () => OrderSide.SELL)
      .exhaustive(),
    order_type: match(data.type)
      .with("Market", () => OrderType.MARKET)
      .with("Limit", () => OrderType.LIMIT)
      .with("StopLimit", () => OrderType.STOP_LIMIT)
      .with("StopMarket", () => OrderType.STOP_MARKET)
      .exhaustive(),
    order_price: converLocalStringToNum(data.price),
    order_quantity: converLocalStringToNum(data.quantity),
    trigger_price: converLocalStringToNum(data.triggerPrice),
    total: converLocalStringToNum(data.total),
  };
};
// END

type TPSLType = "TAKE_PROFIT" | "STOP_LOSS";

export const findTPnSLOrderByType = (type: TPSLType, childOrders: any[]) => {
  return (
    childOrders.find(
      (order) =>
        order.algo_type === type && typeof order.trigger_price === "number"
    ) ?? null
  );
};

// Convert from 12,333.00 => 12333.00
export const converLocalStringToNum = (
  newValue: string | number | undefined
) => {
  return newValue != ""
    ? String(newValue).includes(",")
      ? String(newValue).replaceAll(",", "")
      : (newValue as any)
    : "";
};

// Just format num intergerPart
export const converNumToLocalString = (
  newValue: string | number | undefined
) => {
  if (newValue === "" || newValue === undefined) return "";

  // Chuyển giá trị thành chuỗi
  const value = String(newValue);

  // Tách phần nguyên và phần thập phân
  const [integerPart, decimalPart] = value.split(".");

  // Định dạng chỉ phần nguyên
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Nếu có dấu chấm mà không có phần thập phân, vẫn giữ lại dấu chấm
  if (value.endsWith(".")) {
    return `${formattedInteger}.`;
  }

  // Ghép lại phần nguyên và phần thập phân (nếu có)
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export const ORDER_STATUS: { value: OrderStatus; label: string }[] = [
  {
    label: "Canncelled",
    value: OrderStatus.CANCELLED,
  },
  {
    label: "Completed",
    value: OrderStatus.COMPLETED,
  },
  {
    label: "Open",
    value: OrderStatus.OPEN,
  },
  {
    label: "Filled",
    value: OrderStatus.FILLED,
  },
  {
    label: "Pending",
    value: OrderStatus.NEW,
  },
  {
    label: "Partial filled",
    value: OrderStatus.PARTIAL_FILLED,
  },
  {
    label: "Replaced",
    value: OrderStatus.REPLACED,
  },
  {
    label: "In-complete",
    value: OrderStatus.INCOMPLETE,
  },
  {
    label: "Rejected",
    value: OrderStatus.REJECTED,
  },
];
