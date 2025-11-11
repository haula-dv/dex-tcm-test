/* eslint-disable react-hooks/rules-of-hooks */
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { getInputPlaceOrder } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  useCollateral,
  useMarkPrice,
  useOrderEntry,
  useSymbolsInfo,
  useWithdraw,
} from "@orderly.network/hooks";
import { toast } from "@orderly.network/react";
import { OrderSide, OrderType } from "@orderly.network/types";
import { memo, ReactNode, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { useStore } from "zustand";
import { orderBookActivedStore } from "../../store";
import Balance from "../common/Balance";
import { Accountleverage } from "./Accountleverage";
import AvailableWithdraw from "./AvailableWithdraw";
import Details from "./Details";
import InputForm from "./InputForm";
import ModalConfirmOrder from "./ModalConfirmOrder";
import OrderDirection from "./OrderDirection";
import OrderTypeTab from "./OrderTypeTab";

interface IProps {
  symbol: string;
  isActiveTab?: "Buy" | "Sell" | any;
}

export type IPlaceOrderValues = {
  direction: "Buy" | "Sell";
  type: "Market" | "Limit" | "StopLimit" | "StopMarket";
  triggerPrice?: string;
  price?: string;
  quantity?: string;
  orderSide?: string;
  total?: string;
};

const CreateOrderForm = ({ symbol, isActiveTab = "Buy" }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [openOrderConfirm, setOpenOrderConfirm] = useState(false);

  // Orderly Hooks
  const symbolsInfo = useSymbolsInfo();
  const { wallet } = useWalletConnector();
  const { availableWithdraw } = useWithdraw();
  const collateral = useCollateral();
  const [_, base, quote] = symbol.split("_");
  const { data: markPrice } = useMarkPrice(symbol);
  const theme = useTheme();

  const symbolInfo = symbolsInfo[symbol]();
  const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);
  const mdUP = useMediaQuery(theme.breakpoints.up("md"));
  const orderBookActived = useStore(
    orderBookActivedStore,
    (state) => state.value
  );

  const defaultValues: IPlaceOrderValues = useMemo(() => {
    return {
      direction: isActiveTab,
      type: "Limit",
      triggerPrice: undefined,
      price: undefined,
      quantity: undefined,
      orderSide: undefined,
      total: undefined,
    };
  }, [isActiveTab]);

  const formContext = useForm<IPlaceOrderValues>({
    defaultValues,
    // mode: "all",
  });

  const { watch, setValue } = formContext;

  const { onSubmit, helper, maxQty, estLeverage, estLiqPrice } = useOrderEntry(
    {
      symbol,
      side: match(watch("direction", "Buy"))
        .with("Buy", () => OrderSide.BUY)
        .with("Sell", () => OrderSide.SELL)
        .exhaustive(),
      order_type: match(watch("type", "Market"))
        .with("Market", () => OrderType.MARKET)
        .with("Limit", () => OrderType.LIMIT)
        .with("StopLimit", () => OrderType.STOP_LIMIT)
        .with("StopMarket", () => OrderType.STOP_MARKET)
        .exhaustive(),
      order_quantity: watch("quantity", undefined),
      order_price: watch("price", undefined),
      total: watch("total", undefined),
    },
    { watchOrderbook: true }
  );

  // Handle show modal confirm
  const handleConfirmOrder = () => {
    setOpenOrderConfirm(true);
  };

  // Submit form
  const submitForm = async () => {
    const data = formContext.getValues();
    setLoading(true);

    if (data.type == "Market" || data.type == "StopMarket") {
      data.price = undefined;
    }

    try {
      await onSubmit(getInputPlaceOrder(data, symbol));

      if (mdUP) {
        toast.success("Order successfully created!");
      }
    } catch (err) {
      console.error(`Unhandled error in "submitForm":`, err);
    } finally {
      setLoading(false);
      setOpenOrderConfirm(false);
    }
  };

  // Watch this field when click on order book item
  useEffect(() => {
    if (orderBookActived != null) {
      setValue("price", String(orderBookActived), {
        shouldValidate: true,
        shouldDirty: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBookActived]);

  return (
    <>
      <Balance
        availableWithdraw={availableWithdraw}
        quote={quote}
        wallet={wallet}
        isFristLoading={symbolsInfo.isNil}
      />

      <Accountleverage symbol={symbol} />

      <form onSubmit={formContext.handleSubmit(handleConfirmOrder)}>
        <Stack spacing={TSizes.margin_common}>
          <OrderDirection
            isActiveTab={isActiveTab}
            formContext={formContext}
            wallet={wallet}
          />

          <AvailableWithdraw
            balance={collateral.availableBalance}
            quote={quote}
          />

          <OrderTypeTab formContext={formContext} />

          <InputForm
            formContext={formContext}
            helper={helper}
            maxQty={maxQty}
            symbol={symbol}
            symbolsInfo={symbolsInfo}
            markPrice={markPrice}
            wallet={wallet}
          />

          <Details
            estLeverage={estLeverage}
            quoteDecimals={quoteDecimals}
            quote={quote}
            symbol={symbol}
            direction={formContext.watch("direction")}
            estLiqPrice={estLiqPrice}
            openOrderConfirm={openOrderConfirm}
          />
        </Stack>

        <ModalConfirmOrder
          open={openOrderConfirm}
          handleClose={() => setOpenOrderConfirm(false)}
          submitForm={submitForm}
          symbol={symbol}
          currentValue={formContext.getValues()}
          loading={loading}
          totalPrice={formContext.watch("total") ?? ""}
        />
      </form>
    </>
  );
};

interface IItemProps {
  value: ReactNode | string;
  label: ReactNode | string;
}

export const Item = ({ value, label }: IItemProps) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography fontSize={"12px"} color={useTheme().palette.grey[600]}>
        {label}
      </Typography>

      <Typography fontSize={"14px"}>{value}</Typography>
    </Stack>
  );
};

export default memo(CreateOrderForm);
