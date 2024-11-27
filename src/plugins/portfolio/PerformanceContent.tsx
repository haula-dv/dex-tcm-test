import MainCard from "@/components/card/MainCard";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { Select } from "@orderly.network/react";
import dayjs from "dayjs";
import { memo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import { IDialy } from "./AssetsContent";
import { dateRange } from "./MainContainer";

interface IProps {
  dailys: IDialy[];
  handleChangeRange: (date: any) => void;
  currentDate: any;
}
const PerformanceContent = ({
  dailys,
  handleChangeRange,
  currentDate,
}: IProps) => {
  const theme = useTheme();

  // Process the dailys data to create the chart data
  const chartDataDailyPnL = dailys.map((daily) => ({
    date: daily.date,
    pnlVolume: daily.pnl, // Use this for the Y-axis
  }));

  // Process the dailys data to create the chart data 1
  const chartDataCumulativePnL = dailys.map((daily) => ({
    date: daily.date,
    perpVolume: daily.perp_volume, // Use this for the Y-axis
  }));

  const onChange = (val: string) => {
    handleChangeRange(val);
  };

  return (
    <MainCard backgroudColor="primary">
      <Stack direction={"row"} justifyContent={"space-between"} pb={1}>
        <Typography fontSize={"18px"} fontWeight={500}>
          Performance
        </Typography>
        <Select
          className="main-select"
          value={currentDate}
          onChange={onChange}
          options={dateRange}
        />
      </Stack>

      <Grid container spacing={1}>
        {["7D ROI", "7D PnL", "7D Volume (USDC)"].map((item, index) => (
          <Grid key={index} item xs={12} md={4}>
            <MainCard backgroudColor="common" variant="outlined">
              <Typography fontSize={"12px"} sx={{ opacity: ".5" }}>
                {item}
              </Typography>
              <Typography fontSize={"18px"} color={theme.palette.success.main}>
                +10.35%{" "}
              </Typography>
            </MainCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography pb={1} pt={2}>
            Daily PnL
          </Typography>

          <MainCard variant="outlined" backgroudColor="common">
            <Box height={"200px"}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={chartDataDailyPnL}
                  margin={{
                    left: -24,
                  }}
                >
                  <CartesianGrid
                    horizontal={true} // Hiển thị lưới ngang
                    vertical={false} // Tắt lưới dọc nếu không cần
                    stroke={theme.palette.grey[700]}
                  />

                  <YAxis tick={{ fontSize: 10 }} />

                  <Tooltip
                    content={({ payload }) => {
                      if (!payload || payload.length === 0) return null;

                      const { date, pnlVolume } = payload[0].payload;

                      return (
                        <Box
                          p={"10px"}
                          borderRadius={"6px"}
                          bgcolor={setColorThemeMode(
                            theme.palette.primary.light,
                            theme.palette.grey[700]
                          )}
                        >
                          <Typography
                            color={
                              pnlVolume <= 0
                                ? theme.palette.error.main
                                : theme.palette.success.main
                            }
                          >
                            {pnlVolume <= 0 ? "-" : "+"}{" "}
                            {`${pnlVolume.toFixed(2)}`}
                            <span
                              style={{
                                color: theme.palette.text.primary,
                                opacity: ".5",
                              }}
                            >
                              USDC
                            </span>
                          </Typography>
                          <Typography fontSize={"12px"} sx={{ opacity: ".5" }}>
                            {date}
                          </Typography>
                        </Box>
                      );
                    }}
                  />

                  <Bar
                    dataKey={"pnlVolume"}
                    fill={theme.palette.success.main}
                    radius={6}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            <Stack direction={"row"} justifyContent={"space-between"} pl={4}>
              <Typography fontSize={"10px"} sx={{ opacity: ".5" }}>
                {dayjs().subtract(currentDate, "day").format("YYYY-MM-DD")}
              </Typography>

              <Typography fontSize={"10px"} sx={{ opacity: ".5" }}>
                Now
              </Typography>
            </Stack>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography pb={1} pt={2}>
            Cumulative PnL
          </Typography>
          <MainCard variant="outlined" backgroudColor="common">
            <Box height={"200px"}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={772}
                  height={300}
                  data={chartDataCumulativePnL}
                  margin={{
                    left: -36,
                  }}
                >
                  <CartesianGrid
                    horizontal={true} // Hiển thị lưới ngang
                    vertical={false} // Tắt lưới dọc nếu không cần
                    stroke={theme.palette.grey[700]}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => `${Math.floor(value / 1000)}k`}
                  />

                  <Tooltip
                    content={({ payload }) => {
                      if (!payload || payload.length === 0) return null;

                      const { date, perpVolume } = payload[0].payload;

                      return (
                        <Box
                          p={"10px"}
                          borderRadius={"6px"}
                          bgcolor={setColorThemeMode(
                            theme.palette.primary.light,
                            theme.palette.grey[700]
                          )}
                        >
                          <Typography
                            color={
                              perpVolume <= 0
                                ? theme.palette.error.main
                                : theme.palette.success.main
                            }
                          >
                            {perpVolume <= 0 ? "-" : "+"}{" "}
                            {`${perpVolume.toFixed(2)} `}
                            <span
                              style={{
                                color: theme.palette.text.primary,
                                opacity: ".5",
                              }}
                            >
                              USDC
                            </span>
                          </Typography>

                          <Typography fontSize={"12px"} sx={{ opacity: ".5" }}>
                            {date}
                          </Typography>
                        </Box>
                      );
                    }}
                  />

                  <Line
                    strokeWidth={2}
                    type="monotone"
                    dot={false}
                    dataKey="perpVolume"
                    stroke={theme.palette.success.main}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Stack direction={"row"} justifyContent={"space-between"} pl={3}>
              <Typography fontSize={"10px"} sx={{ opacity: ".5" }}>
                {dayjs().subtract(currentDate, "day").format("YYYY-MM-DD")}
              </Typography>

              <Typography fontSize={"10px"} sx={{ opacity: ".5" }}>
                Now
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default memo(PerformanceContent);
