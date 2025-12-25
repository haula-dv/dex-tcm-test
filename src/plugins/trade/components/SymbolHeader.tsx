'use client'
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { usdFormatter } from "@/utils/formatters/number";
import { formatMarkPriceNoDecimal } from "@/utils/helpers/format";
import { useTheme } from "@mui/material";
import {
  useFundingRate,
  useSymbolsInfo,
  useTickerStream
} from "@orderly.network/hooks";
import Decimal from "decimal.js-light";
import { memo, useState } from "react";

interface IProps {
  symbol: string;
  onSymbolChange: (symbol: string) => void;
}

const SymbolHeader = ({ onSymbolChange, symbol }: IProps) => {
  const [marketEl, setMarketEl] = useState<null | HTMLElement>(null);
  const openMarketEl = Boolean(marketEl);
  const theme = useTheme();

  // Get detail symbol
  const stream = useTickerStream(symbol);
  const [perp, base, quote] = symbol.split("_");

  const symbolsInfo = useSymbolsInfo();
  const symbolInfo = symbolsInfo[symbol]();
  const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

  const handleClose = () => {
    setMarketEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMarketEl(event.currentTarget);
  };

  const data = useFundingRate(symbol);

  const openInterestValue = new Decimal(stream?.open_interest ?? 0)
    .mul(stream?.index_price ?? 0)
    .toDecimalPlaces(2)
    .valueOf();

  // Định dạng thành "K", "M", "B" (nghìn, triệu, tỷ)
  function formatNumber(value: any) {
    const num = new Decimal(value);

    if (num.gte(1e9)) {
      return `${num.div(1e9).toDecimalPlaces(2).valueOf()}B ${quote}`;
    } else if (num.gte(1e6)) {
      return `${num.div(1e6).toDecimalPlaces(2).valueOf()}M ${quote}`;
    } else if (num.gte(1e3)) {
      return `${num.div(1e3).toDecimalPlaces(2).valueOf()}K ${quote}`;
    } else {
      return `${num.toDecimalPlaces(2).valueOf()} ${quote}`;
    }
  }

  let dailyChange: string | undefined;
  let dailyChangePercentage: string | undefined;
  if (
    stream &&
    (stream as any)["24h_change"] != null &&
    stream.index_price != null
  ) {
    dailyChange = String((stream as any)["24h_change"].toNumber());
    dailyChangePercentage = (stream as any)["24h_change"]
      .div(stream.index_price)
      .mul(100)
      .toPrecision(4, 2);
  }

  const datas = [
    {
      label: "24h change",
      value:
        dailyChange && dailyChangePercentage ? (
          <span
            style={{
              color: !dailyChange.startsWith("-")
                ? theme.palette.success.main
                : theme.palette.error.main,
            }}
          >
            {!dailyChange.startsWith("-") ? "+" : ""}
            {usdFormatter.format(Number(dailyChange))} /{" "}
            {!dailyChange.startsWith("-") ? "+" : ""}
            {dailyChangePercentage}%
          </span>
        ) : (
          "-"
        ),
    },
    {
      label: "Mark",
      value: stream ? formatMarkPriceNoDecimal(stream.mark_price) : "_",
    },
    {
      label: "Index",
      value: stream ? formatMarkPriceNoDecimal(stream.index_price) : "_",
    },
    {
      label: "24h volume",
      value: stream ? formatNumber(stream["24h_amount"]) : "_",
      hint: "24 hour total trading volume on the Orderly Network.",
    },

    {
      label: "Pred. funding rate",
      hint: "Funding rates are payments between traders who are long and short. When positive, long positions pay short positions funding. When negative, short positions pay long positions.",
      value: (
        <>
          <span style={{ color: useTheme().palette.primary.dark }}>
            {data.est_funding_rate} %
          </span>{" "}
          {`in ${data.countDown}`}
        </>
      ),
    },
    {
      label: "Open interest",
      value: formatNumber(openInterestValue),
      hint: "Total size of positions per side.",
    },
  ];

  return (
    <>
      {/* <HeadPage
        title={`${isNaN(stream?.mark_price)
          ? "--"
          : formatMarkPriceNoDecimal(stream?.mark_price)
          } | ${base}-${perp}`}
      />

      <Stack
        direction={"row"}
        spacing={1.5}
        alignItems={"center"}
        pl={"4px"}
        mb="8px"
        height={"30px"}
        width={"100%"}
      >
        <MainButton
          startIcon={
            <TokenIcon
              url={getImageNextwork(
                symbol ? spitSymbol(symbol) : "",
                "symbol_logo"
              )}
            />
          }
          variant="textLink"
          color={setColorThemeMode("dark", "white")}
          id="market-button"
          aria-controls={openMarketEl ? "market-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMarketEl ? "true" : undefined}
          onClick={handleClick}
          endIcon={<IconChevronDown size="1rem" />}
          sx={{ flexShrink: 0 }}
        >
          {`${base}-${perp}`}
        </MainButton>

        <Box
          height={"20px"}
          width={"2px"}
          bgcolor={setColorThemeMode(theme.palette.grey[900], "#fff")}
        />

        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          sx={{ overflowX: "auto" }}
          width={"100%"}
          pr={1}
        >
          <Typography fontWeight={600} pr={1} whiteSpace={"nowrap"}>
            {stream ? formatMarkPriceNoDecimal(stream?.mark_price) : "_"}
          </Typography>

          <Stack direction={"row"} spacing={2}>
            {datas.map((ite, index) => (
              <MainTooltip
                key={index}
                title={ite?.hint}
                style={{ maxWidth: "200px" }}
                arrow
              >
                <Stack sx={{ cursor: "pointer" }}>
                  <Typography
                    color={setColorThemeMode(theme.palette.grey[400], "#fff")}
                    lineHeight="120%"
                    fontWeight={600}
                    fontSize={"10px"}
                    whiteSpace={"nowrap"}
                  >
                    {ite.label}
                  </Typography>

                  <Typography
                    fontWeight={600}
                    fontSize={"12px"}
                    lineHeight="120%"
                    whiteSpace={"nowrap"}
                  >
                    {ite.value}
                  </Typography>
                </Stack>
              </MainTooltip>
            ))}
          </Stack>
        </Stack>
      </Stack>

      {openMarketEl && (
        <MarketsContent
          handleClose={handleClose}
          marketEl={marketEl}
          openMarketEl={openMarketEl}
          onSymbolChange={onSymbolChange}
        />
      )} */}
    </>
  );
};

export default memo(SymbolHeader);
