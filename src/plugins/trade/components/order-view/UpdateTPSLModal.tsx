/* eslint-disable react-hooks/rules-of-hooks */
import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import { MainDialog } from "@/components/dialog/MainDialog";
import CurrencyInputField from "@/components/form-control/CurrencyInputField";
import { ItemRow } from "@/plugins/pool/components/TokenSelected";
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { usdFormatter } from "@/utils/formatters/number";
import { setColorThemeMode } from "@/utils/helpers";
import { Stack, Typography, useTheme } from "@mui/material";
import {
  useOrderStream,
  useSymbolsInfo,
  useTPSLOrder,
} from "@orderly.network/hooks";
import { toast } from "@orderly.network/react";
import { API } from "@orderly.network/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormContainer } from "react-hook-form-mui";

interface IProps {
  open: boolean;
  onClose: () => void;
  orderActived: API.PositionExt | any;
  positions: API.PositionTPSLExt[];
}

interface Inputs {
  tp_trigger_price: string | number | undefined;
  sl_trigger_price: string | number | undefined;
}

export const UpdateTPSLModal = ({
  onClose,
  open,
  orderActived,
  positions,
}: IProps) => {
  const symbolsInfo = useSymbolsInfo();
  const symbolInfo = symbolsInfo[orderActived.symbol]();
  const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);

  const findPositions: any = positions.find(
    (item: any) => item.symbol === orderActived.symbol
  );

  if (!findPositions) {
    return <></>;
  }

  const child_orders: any[] =
    (orderActived as any).child_orders.length > 0
      ? (orderActived as any).child_orders
      : [];

  const TAKE_PROFIT =
    child_orders.find((item) => item.algo_type === "TAKE_PROFIT") ?? null;

  const STOP_LOSS =
    child_orders.find((item) => item.algo_type === "STOP_LOSS") ?? null;

  const defaultValues: Inputs = {
    tp_trigger_price: TAKE_PROFIT?.trigger_price ?? undefined,
    sl_trigger_price: STOP_LOSS?.trigger_price ?? undefined,
  };

  // formContext
  const formContext = useForm({
    defaultValues,
  });

  // Hooks
  const [ComputedAlgoOrder, { setValue, submit, errors }] = useTPSLOrder({
    ...findPositions,
  });

  const [_, { updateTPSLOrder }] = useOrderStream({});

  // Handle Submit
  const onSubmit = async (data: Inputs) => {
    setSubmitting(true);

    const childOrders: any = [
      {
        order_id: TAKE_PROFIT.algo_order_id,
        trigger_price: data.tp_trigger_price,
      },
      {
        order_id: STOP_LOSS.algo_order_id,
        trigger_price: data.sl_trigger_price,
      },
    ];

    await updateTPSLOrder(orderActived.algo_order_id, childOrders as any)
      .then((res) => {
        toast.success("Order edited!");
      })
      .catch((err: any) => {
        toast.success(err.message);
      })
      .finally(() => {
        setSubmitting(true);
        onClose();
      });
  };

  // Watch field
  useEffect(() => {
    setValue("size", "BUY");
    if (TAKE_PROFIT) {
      setValue("tp_trigger_price", TAKE_PROFIT?.trigger_price ?? undefined);
    }

    if (STOP_LOSS) {
      setValue("sl_trigger_price", STOP_LOSS?.trigger_price ?? undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TAKE_PROFIT, STOP_LOSS]);

  return (
    <MainDialog
      open={open}
      maxWidth="xs"
      handleClose={onClose}
      title="Update TP/SL"
      isDivider
    >
      <FormContainer onSuccess={onSubmit} formContext={formContext}>
        <MainCard
          variant="outlined"
          backgroudColor={setColorThemeMode("white", "transparent")}
        >
          <Stack spacing={"10px"}>
            <CurrencyInputField
              formContext={formContext}
              name="tp_trigger_price"
              decimals={quoteDecimals}
              placeholder="0.0"
              prefix={"TP price"}
              suffix={"USDC"}
              onValueChange={(val) => setValue("tp_trigger_price", String(val))}
              rules={{
                validate: {
                  custom: (_, data) => {
                    return errors?.tp_trigger_price != null
                      ? errors?.tp_trigger_price.message
                      : true;
                  },
                },
              }}
              label={
                <ItemRow
                  title={<Typography fontSize={"11px"}>Take profit</Typography>}
                  value={
                    <Typography fontSize={"11px"}>
                      <span
                        style={{
                          color: setColorThemeMode(
                            theme.palette.grey[800],
                            theme.palette.grey[300]
                          ),
                        }}
                      >
                        Est. PnL:
                      </span>{" "}
                      <span
                        style={{
                          color: ComputedAlgoOrder.tp_pnl
                            ?.toString()
                            .startsWith("-")
                            ? theme.palette.error.main
                            : theme.palette.success.main,
                        }}
                      >
                        {formContext.watch("tp_trigger_price") ? (
                          <>
                            {ComputedAlgoOrder.tp_pnl != null
                              ? `${usdFormatter.format(
                                  ComputedAlgoOrder.tp_pnl
                                    .toString()
                                    .replace("-", "") as any
                                )} ${"USDC"}`
                              : "-"}
                          </>
                        ) : (
                          "-"
                        )}
                      </span>
                    </Typography>
                  }
                />
              }
            />
            <CurrencyInputField
              formContext={formContext}
              name="sl_trigger_price"
              decimals={quoteDecimals}
              prefix={"SL price"}
              suffix={"USDC"}
              placeholder="0.0"
              onValueChange={(val) => setValue("sl_trigger_price", String(val))}
              rules={{
                validate: {
                  custom: (_, data) => {
                    return errors?.sl_trigger_price != null
                      ? errors?.sl_trigger_price.message
                      : true;
                  },
                },
              }}
              label={
                <ItemRow
                  title={<Typography fontSize={"11px"}>Stop loss</Typography>}
                  value={
                    <Typography fontSize={"11px"}>
                      <span
                        style={{
                          color: setColorThemeMode(
                            theme.palette.grey[800],
                            theme.palette.grey[300]
                          ),
                        }}
                      >
                        Est. PnL:
                      </span>{" "}
                      <span
                        style={{
                          color: ComputedAlgoOrder.sl_pnl
                            ?.toString()
                            .startsWith("-")
                            ? theme.palette.error.main
                            : theme.palette.success.main,
                        }}
                      >
                        {formContext.watch("sl_trigger_price") ? (
                          <>
                            {ComputedAlgoOrder.sl_pnl != null
                              ? `${usdFormatter.format(
                                  ComputedAlgoOrder.sl_pnl
                                    .toString()
                                    .replace("-", "") as any
                                )} ${"USDC"}`
                              : "-"}
                          </>
                        ) : (
                          "-"
                        )}
                      </span>
                    </Typography>
                  }
                />
              }
            />
          </Stack>
        </MainCard>

        <Stack direction={"row"} spacing={"10px"} mt={"10px"}>
          <MainButton onClick={onClose} fullWidth>
            Cancel
          </MainButton>

          <MainButton
            fullWidth
            variant="contained"
            type="submit"
            disabled={!formContext.formState.isDirty}
            isLoading={submitting}
          >
            Submit
          </MainButton>
        </Stack>
      </FormContainer>
    </MainDialog>
  );
};
