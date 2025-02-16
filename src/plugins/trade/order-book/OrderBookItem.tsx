import MainTooltip from "@/components/MainTooltip";
import { ItemRow } from "@/plugins/pool/components/TokenSelected";
import { usdFormatter } from "@/utils/formatters/number";
import { setColorThemeMode } from "@/utils/helpers";
import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { memo } from "react";
import { useStore } from "zustand";
import { orderBookActivedStore } from "../store";

interface IProps {
  price: any;
  quantity: any;
  aggregated: any;
  totalQuote: number;
  gradient: number;
  isFirstAsk?: boolean;
  base: string;
  quote: string;
}

const OrderBookItem = ({
  price,
  quantity,
  aggregated,
  totalQuote,
  gradient,
  base,
  quote,
  isFirstAsk,
}: IProps) => {
  const theme = useTheme();
  const setOrderBookItemActived = useStore(
    orderBookActivedStore,
    (state) => state.setValue
  );
  const handleClickRow = () => {
    setOrderBookItemActived(price);
  };

  const TooltipValue = (
    <Stack minWidth={"168px"}>
      <ItemRow
        title={
          <Typography
            fontSize={"12px"}
            fontWeight={600}
            color={useTheme().palette.grey[500]}
          >
            Avg. Price
          </Typography>
        }
        value={
          <Typography fontSize={"12px"} fontWeight={600}>
            {price}
          </Typography>
        }
      />
      <ItemRow
        title={
          <Typography
            fontSize={"12px"}
            fontWeight={600}
            color={useTheme().palette.grey[500]}
          >
            {`Sum (${base})`}
          </Typography>
        }
        value={
          <Typography fontSize={"12px"} fontWeight={600}>
            {aggregated}
          </Typography>
        }
      />
      <ItemRow
        title={
          <Typography
            fontSize={"12px"}
            fontWeight={600}
            color={useTheme().palette.grey[500]}
          >
            {`Sum (${quote})`}
          </Typography>
        }
        value={
          <Typography fontSize={"12px"} fontWeight={600}>
            {usdFormatter.format(totalQuote)}
          </Typography>
        }
      />
    </Stack>
  );

  const upLg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <MainTooltip placement={upLg ? "left" : "top"} arrow title={TooltipValue}>
      <Box
        borderRadius={0}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: setColorThemeMode(
              theme.palette.primary.main,
              theme.palette.grey[900]
            ),
          },
        }}
        onClick={handleClickRow}
      >
        <Grid container spacing={1}>
          <Grid item xs={4} md={4}>
            <Typography
              fontSize={"12px"}
              fontWeight={600}
              color={
                isFirstAsk
                  ? theme.palette.error.main
                  : theme.palette.success.main
              }
              py={"1px"}
            >
              {price}
            </Typography>
          </Grid>

          <Grid item xs={4} md={3}>
            <Typography
              fontSize={"12px"}
              fontWeight={600}
              textAlign={"end"}
              color={setColorThemeMode(
                theme.palette.grey[900],
                theme.palette.common.white
              )}
              py={"1px"}
            >
              {quantity}
            </Typography>
          </Grid>

          <Grid item xs={4} md={5}>
            <Box
              py={"1px"}
              borderRadius={"0px"}
              sx={{
                background: `linear-gradient(to right, ${
                  isFirstAsk
                    ? `color-mix(in srgb, ${theme.palette.error.main}, transparent 70%)`
                    : `color-mix(in srgb, ${theme.palette.success.main}, transparent 70%)`
                } ${gradient}%, transparent ${gradient}%)`,
              }}
              display={"flex"}
              justifyContent={"end"}
            >
              <Typography
                fontSize={"12px"}
                fontWeight={600}
                textAlign={"end"}
                pr={0.5}
                color={setColorThemeMode(
                  theme.palette.grey[900],
                  theme.palette.common.white
                )}
              >
                {aggregated}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainTooltip>
  );
};

export default memo(OrderBookItem);
