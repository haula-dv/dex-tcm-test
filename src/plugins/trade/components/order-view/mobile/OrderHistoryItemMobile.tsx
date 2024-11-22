import { ORDER_STATUS, ORDER_TYPE, setColorThemeMode } from "@/utils/helpers";
import { formatQty, getDecimals } from "@/utils/helpers/orderlyHelper";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import {
  Box,
  Chip,
  Grid,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { API } from "@orderly.network/types";
import { memo, ReactElement, useMemo } from "react";

interface IProps {
  order:
    | { isAlgoOrder: false; order: API.Order }
    | { isAlgoOrder: true; order: API.AlgoOrder };
}

const OrderHistoryItemMobile = ({ order }: IProps) => {
  const theme = useTheme();
  const orderDetail = order.order;

  const [base, quote, _] = (orderDetail as any).symbol.split("_");

  const { baseDecimals, quoteDecimals } = getDecimals(
    order.order.symbol as any
  );

  const renderStatus = useMemo(() => {
    let status;
    if (order.isAlgoOrder) {
      status = order.order.algo_status;
    } else {
      status = order.order.status;
    }

    return ORDER_STATUS.find((item) => item.value === status)?.label;
  }, [order]);

  const renderType = useMemo(() => {
    let type;
    if (order.isAlgoOrder) {
      type = order.order.algo_type;
    } else {
      type = order.order.type;
    }

    return ORDER_TYPE.find((item) => item.value === type)?.label;
  }, [order]);

  return (
    <Item disablePadding>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        pt={"10px"}
        px={"10px"}
      >
        <Stack direction={"row"} spacing={"6px"}>
          <Chip
            color="success"
            variant="filledTonal"
            label={orderDetail.side}
            size="small"
          />
          <Typography fontSize={"12px"}>{quote}-PERP</Typography>
        </Stack>

        <Typography fontSize={"12px"}>{renderStatus}</Typography>
      </Stack>

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        px={"10px"}
        pt="6px"
        pb={"10px"}
      >
        <Chip
          variant="filledTonal"
          size="small"
          label={renderType}
          color="info"
        />

        <Typography fontSize={"12px"} sx={{ opacity: "0.4" }}>
          2024-11-21 07:21:11
        </Typography>
      </Stack>

      <Box borderTop={1} width={"100%"} borderColor={theme.palette.divider} />

      <Grid container p={"10px"} rowSpacing={"6px"}>
        <Grid item xs={4}>
          <ItemCol
            label="Qty"
            value={
              <Typography fontSize={"12px"} color={theme.palette.success.main}>
                {formatQty(orderDetail.quantity, baseDecimals)}
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={4}>
          <ItemCol label="Filled" value="0.0000" />
        </Grid>

        <Grid item xs={4}>
          <ItemCol
            label="Trigger price"
            value={
              (orderDetail as any).trigger_price > 0
                ? formatQty((orderDetail as any).trigger_price, baseDecimals)
                : "--"
            }
            align="right"
          />
        </Grid>

        <Grid item xs={4}>
          <ItemCol label="Avg. price" value="1" />
        </Grid>

        <Grid item xs={4}>
          <ItemCol label="Order price" value="1" />
        </Grid>

        <Grid item xs={4}>
          <ItemCol
            label="Realized Pnl (USDC)"
            value={
              (orderDetail as any).realized_pnl > 0
                ? formatQty((orderDetail as any).realized_pnl, baseDecimals)
                : "--"
            }
          />
        </Grid>
      </Grid>
    </Item>
  );
};

export default memo(OrderHistoryItemMobile);

const Item = styled(ListItem)(({ theme }) => ({
  width: "100%",
  borderRadius: TSizes.borderRadius,
  flexDirection: "column",
  marginBottom: "6px",
  backgroundColor: setColorThemeMode(
    theme.palette.primary.light,
    theme.palette.grey[800]
  ),
}));

interface IItem {
  label: string;
  value: string | ReactElement;
  align?: "left" | "right";
}

const ItemCol = ({ label, value, align }: IItem) => {
  const theme = useTheme();

  return (
    <Stack textAlign={align}>
      <Typography
        fontSize={"12px"}
        color={setColorThemeMode(
          theme.palette.grey[800],
          theme.palette.grey[500]
        )}
      >
        {label}
      </Typography>

      {typeof value == "string" ? (
        <Typography
          fontSize={"12px"}
          color={setColorThemeMode(
            theme.palette.grey[800],
            theme.palette.grey[200]
          )}
        >
          {value}
        </Typography>
      ) : (
        <Box fontSize={"12px"}>{value}</Box>
      )}
    </Stack>
  );
};
