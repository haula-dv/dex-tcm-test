import { MainButton } from "@/components/button/MainButton";
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { baseFormatter, usdFormatter } from "@/utils/formatters/number";
import { setColorThemeMode } from "@/utils/helpers";
import { totalEstPrice } from "@/utils/helpers/format";
import {
  Stack,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useSymbolsInfo } from "@orderly.network/hooks";
import { API } from "@orderly.network/types";
import dayjs from "dayjs";
import { match } from "ts-pattern";

interface IProps {
  order:
    | { isAlgoOrder: false; order: API.Order }
    | { isAlgoOrder: true; order: API.AlgoOrder };
  symbol: string;
  handleClickOrderItem: (order: any, type: string) => void;
}

const HistoryOrderItem = ({ order, symbol, handleClickOrderItem }: IProps) => {
  const [prep, base, quote] = order.order.symbol.split("_");
  const theme = useTheme();

  const symbolsInfo = useSymbolsInfo();
  const symbolInfo = symbolsInfo[order.order.symbol]();
  const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

  return (
    <TableRow
      sx={{
        backgroundColor:
          (order.order as any).status === "CANCELLED"
            ? setColorThemeMode(theme.palette.grey[100], "#3f3f3f61")
            : "" || (order.order as any).algo_status === "CANCELLED"
            ? setColorThemeMode(theme.palette.grey[100], "#3f3f3f61")
            : "",

        opacity:
          (order.order as any).status === "CANCELLED"
            ? "0.6"
            : "1" || (order.order as any).algo_status === "CANCELLED"
            ? "0.6"
            : "1",
        "&:hover": {
          backgroundColor:
            (order.order as any).status === "CANCELLED"
              ? `${setColorThemeMode(
                  theme.palette.grey[100],
                  "#3f3f3f61"
                )} !important`
              : "" || (order.order as any).algo_status === "CANCELLED"
              ? `${setColorThemeMode(
                  theme.palette.grey[100],
                  "#3f3f3f61"
                )} !important`
              : "",
        },
      }}
    >
      <TableCell>
        {base}-{prep}
      </TableCell>

      <TableCell>
        {order.isAlgoOrder ? order.order.algo_type : ""} {order.order.type}
      </TableCell>

      <TableCell>
        <Typography
          fontWeight={600}
          color={match(order.order.side)
            .with("BUY", () => theme.palette.success.main)
            .otherwise(() => theme.palette.error.main)}
        >
          {order.order.side}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography
          color={match(order.order.side)
            .with("BUY", () => theme.palette.success.main)
            .otherwise(() => theme.palette.error.main)}
          fontWeight={600}
        >
          {baseFormatter.format(order.order.quantity)}
        </Typography>
      </TableCell>

      <TableCell>
        {order.order.type === "MARKET"
          ? "MARKET"
          : order.order.price
          ? usdFormatter.format(order.order.price)
          : "-"}
      </TableCell>

      <TableCell>
        {" "}
        {(order.order as any).average_executed_price
          ? usdFormatter.format((order.order as any).average_executed_price)
          : "_"}{" "}
      </TableCell>

      <TableCell>
        {" "}
        {order.order.trigger_price
          ? usdFormatter.format(order.order.trigger_price)
          : "-"}
      </TableCell>

      <TableCell> {(order.order as any).realized_pnl}</TableCell>

      <TableCell>
        {totalEstPrice(
          order.order.quantity,
          (order.order as any).average_executed_price ?? 0,
          baseDecimals
        )}
      </TableCell>

      <TableCell> {order.order.total_fee}</TableCell>

      <TableCell>
        {" "}
        {(order.order as any).status ?? (order.order as any).algo_status}
      </TableCell>

      <TableCell width={"200px"}>
        {" "}
        {dayjs(order.order.created_time).format("YYYY-MM-DD HH:mm")}
      </TableCell>

      <TableCell align="right" padding="checkbox">
        <Stack direction={"row"}>
          {(order.order as any).status === "CANCELLED" && (
            <MainButton
              size="xsmall"
              variant="outlined"
              onClick={() => handleClickOrderItem(order, "renew")}
            >
              Renew
            </MainButton>
          )}

          {(order.order as any).status == "NEW" && (
            <MainButton
              size="xsmall"
              variant="outlined"
              onClick={() => handleClickOrderItem(order, "cancel")}
            >
              Cancel
            </MainButton>
          )}

          {(order.order as any).algo_status == "NEW" && (
            <MainButton
              size="xsmall"
              variant="outlined"
              onClick={() => handleClickOrderItem(order, "cancel")}
            >
              Cancel
            </MainButton>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default HistoryOrderItem;
