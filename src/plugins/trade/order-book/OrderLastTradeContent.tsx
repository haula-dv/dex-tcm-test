import IconLoading from "@/components/icons/loading";
import { setColorThemeMode } from "@/utils/helpers";
import { Grid, Stack, Typography, useTheme } from "@mui/material";
import { useMarketTradeStream, useSymbolsInfo } from "@orderly.network/hooks";
import dayjs from "dayjs";
import { memo } from "react";

interface IProps {
  symbol: string;
}

const OrderLastTradeContent = ({ symbol }: IProps) => {
  const theme = useTheme();
  const config = useSymbolsInfo();
  const symbolInfo = config ? config[symbol] : ({} as any);
  const { data: tradeHistory, isLoading: tradeHistoryLoading } =
    useMarketTradeStream(symbol);

  return (
    <>
      {tradeHistoryLoading ? (
        <IconLoading />
      ) : (
        <>
          <Stack direction={"row"} pb={0.5}>
            <Typography width={"100%"} fontSize={"12px"} fontWeight={700}>
              Time
            </Typography>

            <Typography
              width={"100%"}
              fontSize={"12px"}
              textAlign="center"
              fontWeight={700}
            >
              Price({symbolInfo("quote")})
            </Typography>

            <Typography
              width={"100%"}
              fontSize={"12px"}
              fontWeight={700}
              textAlign="end"
            >
              Qty({symbolInfo("base")})
            </Typography>
          </Stack>

          <Stack pb={"10px"}>
            {tradeHistory.length > 0 &&
              tradeHistory.map((item: any, index) => (
                <Grid key={index} container>
                  <Grid item xs={4} md={4}>
                    <Typography
                      fontSize={"12px"}
                      color={setColorThemeMode(
                        theme.palette.grey[700],
                        theme.palette.common.white
                      )}
                    >
                      {dayjs(item.ts).format("HH:mm:ss")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Typography
                      fontSize={"12px"}
                      color={
                        item.side === "BUY"
                          ? theme.palette.success.main
                          : theme.palette.error.main
                      }
                      textAlign={"center"}
                    >
                      {item.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Typography
                      fontSize={"12px"}
                      textAlign={"end"}
                      color={
                        item.side === "BUY"
                          ? theme.palette.success.main
                          : theme.palette.error.main
                      }
                    >
                      {item.size}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
          </Stack>
        </>
      )}
    </>
  );
};

export default memo(OrderLastTradeContent);
