/* eslint-disable react-hooks/rules-of-hooks */
import MainTooltip from "@/components/MainTooltip";
import { Stack, Typography, useTheme } from "@mui/material";
import { OrderBookItem } from "@orderly.network/hooks";
import { Decimal } from "@orderly.network/utils";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { useMemo } from "react";

interface IProps {
  markPrice: number;
  lastPrice: number[];
  bids: OrderBookItem[];
  asks: OrderBookItem[];
  quoteDecimals: any;
}

const MarkPrice = ({
  markPrice,
  lastPrice,
  asks,
  bids,
  quoteDecimals,
}: IProps) => {
  const [prevLastPrice, middlePrice] = lastPrice;
  const theme = useTheme(); // Always call useTheme outside of conditional logic

  const spread = useMemo(() => {
    if (bids.length === 0 && asks.length === 0) {
      return 0;
    }

    const bid1 = Number.isNaN(bids[0][0]) ? 0 : bids[0][0];
    const index = asks.reverse().findIndex((item) => !Number.isNaN(item[0]));
    let ask1 = 0.0;

    if (index !== -1) {
      ask1 = Number.isNaN(asks[index][0]) ? 0 : asks[index][0];
    }

    // Đảm bảo giá trị không âm
    const dValue = new Decimal(Math.abs(ask1 - bid1)).div(
      new Decimal(ask1).add(bid1).div(2)
    );

    return Math.ceil(dValue.toNumber() * 1000000 + 0.1) / 10000;
  }, [asks, bids]);

  const formatMiddlePrice = useMemo(() => {
    // Format giá trị với dấu phẩy cho UI
    const formattedValue = Number(middlePrice).toLocaleString(undefined, {
      minimumFractionDigits: quoteDecimals,
      maximumFractionDigits: quoteDecimals,
    });

    return formattedValue;
  }, [middlePrice, quoteDecimals]);

  return (
    <Stack direction={"row"} py="10px">
      <Stack direction={"row"} alignItems={"center"} width={"100%"}>
        <Typography
          fontSize={"18px"}
          fontWeight={600}
          color={`${
            middlePrice < prevLastPrice
              ? theme.palette.success.main
              : middlePrice > prevLastPrice
              ? theme.palette.error.main
              : ""
          }`}
        >
          {middlePrice}
        </Typography>

        {middlePrice < prevLastPrice && (
          <IconArrowUp size={"1rem"} color={theme.palette.success.main} />
        )}

        {middlePrice > prevLastPrice && (
          <IconArrowDown size={"1rem"} color={theme.palette.error.main} />
        )}
      </Stack>

      <MainTooltip
        placement="top"
        arrow
        title="Obtained from a third-party oracle, the mark price is calculated as the median of three prices: the last price, the fair price based on the funding rate basis, and the fair price based on the order books."
      >
        <Typography fontSize={"12px"} width={"100%"} textAlign={"center"}>
          {markPrice ?? "_"}
        </Typography>
      </MainTooltip>

      <MainTooltip
        placement="top"
        title="Spread Ratio of the ask1 and bid1."
        arrow
      >
        <Typography fontSize={"12px"} width={"100%"} textAlign={"end"}>
          {spread}%
        </Typography>
      </MainTooltip>
    </Stack>
  );
};

export default MarkPrice;
