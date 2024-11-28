import MainCard from "@/components/card/MainCard";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Select } from "@orderly.network/react";
import dayjs from "dayjs";
import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import LineChartNoData from "./LineChartNoData";
import { dateRange } from "./MainContainer";

export interface IDialy {
  broker_id: string;
  date: string;
  perp_volume: number;
  pnl: number;
  account_value: number;
  snapshot_time: number;
}

interface IProps {
  dailys: IDialy[];
  handleChangeRange: (date: any) => void;
  currentDate: any;
}

const AssetsContent = ({ dailys, handleChangeRange, currentDate }: IProps) => {
  const theme = useTheme();
  // Process the dailys data to create the chart data
  const chartData = useMemo(() => {
    return dailys.map((daily) => ({
      date: daily.date,
      accountValue: daily.account_value, // Use this for the Y-axis
    }));
  }, [dailys]);

  return (
    <MainCard backgroudColor="primary">
      <Stack direction={"row"} justifyContent={"space-between"} pb={1}>
        <Typography fontSize={"18px"} fontWeight={500}>
          Assets
        </Typography>
        <Select
          className="main-select"
          onChange={handleChangeRange}
          value={currentDate}
          options={dateRange}
        />
      </Stack>

      <Box height="142px">
        {dailys.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={772}
              height={300}
              data={chartData}
              margin={{
                left: -34,
              }}
            >
              <CartesianGrid
                horizontal={true} // Hiển thị lưới ngang
                vertical={false} // Tắt lưới dọc nếu không cần
                stroke={setColorThemeMode(
                  theme.palette.grey[200],
                  theme.palette.grey[700]
                )}
                strokeWidth={1}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${Math.floor(value / 1000)}k`}
              />

              <Tooltip
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null;

                  const { date, accountValue } = payload[0].payload;

                  return (
                    <Box
                      p={"10px"}
                      borderRadius={"6px"}
                      bgcolor={setColorThemeMode(
                        theme.palette.primary.light,
                        theme.palette.grey[700]
                      )}
                    >
                      <Typography>
                        {`${Number(accountValue.toFixed(2)).toLocaleString()}`}

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
                dataKey="accountValue"
                strokeWidth={2}
                type="monotone"
                dot={false}
                stroke={theme.palette.success.main}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <LineChartNoData />
        )}
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
  );
};

export default AssetsContent;
