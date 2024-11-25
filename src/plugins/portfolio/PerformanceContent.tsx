import MainCard from "@/components/card/MainCard";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { Select } from "@orderly.network/react";
import { memo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data2 = [
  {
    name: "Page A",
    uv: -1000,
  },
  {
    name: "Page B",
    uv: -3000,
  },
  {
    name: "Page C",
    uv: 3300,
  },
  {
    name: "Page D",
    uv: 3780,
  },
  {
    name: "Page E",
    uv: 3890,
  },
  {
    name: "Page F",
    uv: 3390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];
const data = [
  {
    name: "Page A",
    uv: -4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: -3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: -2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: -2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: -1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: -3490,
    pv: 4300,
  },
];
const PerformanceContent = () => {
  const theme = useTheme();

  return (
    <MainCard backgroudColor="primary">
      <Stack direction={"row"} justifyContent={"space-between"} pb={1}>
        <Typography fontSize={"18px"} fontWeight={500}>
          Performance
        </Typography>
        <Select
          className="main-select"
          value={"7D"}
          options={[
            { label: "7D", value: "7D" },
            { label: "30D", value: "30D" },
            { label: "90D", value: "90D" },
          ]}
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
                <BarChart width={500} height={300} data={data}>
                  <CartesianGrid
                    horizontal={true} // Hiển thị lưới ngang
                    vertical={false} // Tắt lưới dọc nếu không cần
                    stroke={theme.palette.grey[700]}
                  />

                  <XAxis dataKey="name" />
                  <YAxis />

                  <Tooltip
                    content={() => {
                      return (
                        <Box
                          p={"10px"}
                          borderRadius={"6px"}
                          bgcolor={setColorThemeMode(
                            theme.palette.primary.light,
                            theme.palette.grey[700]
                          )}
                        >
                          <Typography>1,0900 USDC</Typography>

                          <Typography fontSize={"12px"} sx={{ opacity: ".5" }}>
                            22/11/2024
                          </Typography>
                        </Box>
                      );
                    }}
                  />

                  <Bar
                    dataKey="pv"
                    fill={theme.palette.success.main}
                    radius={6}
                  />

                  <Bar
                    dataKey="uv"
                    fill={theme.palette.error.main}
                    radius={6}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography pb={1} pt={2}>
            Cumulative PnL
          </Typography>
          <MainCard variant="outlined" backgroudColor="common">
            <Box height={"200px"}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={772} height={300} data={data2}>
                  <CartesianGrid
                    horizontal={true} // Hiển thị lưới ngang
                    vertical={false} // Tắt lưới dọc nếu không cần
                    stroke={theme.palette.grey[700]}
                  />
                  <YAxis />
                  <Tooltip
                    content={() => {
                      return (
                        <Box
                          p={"10px"}
                          borderRadius={"6px"}
                          bgcolor={setColorThemeMode(
                            theme.palette.primary.light,
                            theme.palette.grey[700]
                          )}
                        >
                          <Typography>1,0900 USDC</Typography>

                          <Typography fontSize={"12px"} sx={{ opacity: ".5" }}>
                            22/11/2024
                          </Typography>
                        </Box>
                      );
                    }}
                  />
                  <Line
                    strokeWidth={2}
                    type="monotone"
                    dot={false}
                    dataKey="uv"
                    stroke={theme.palette.success.main}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default memo(PerformanceContent);
