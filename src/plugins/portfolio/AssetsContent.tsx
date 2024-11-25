import MainCard from "@/components/card/MainCard";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Select } from "@orderly.network/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
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
const AssetsContent = () => {
  const theme = useTheme();

  return (
    <MainCard backgroudColor="primary">
      <Stack direction={"row"} justifyContent={"space-between"} pb={1}>
        <Typography fontSize={"18px"} fontWeight={500}>
          Assets
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

      <Box height="142px">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={772}
            height={300}
            data={data}
            margin={{
              left: -16,
            }}
          >
            <CartesianGrid
              horizontal={true} // Hiển thị lưới ngang
              vertical={false} // Tắt lưới dọc nếu không cần
              stroke={theme.palette.grey[700]}
            />
            {/* <XAxis dataKey=""  /> */}
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

      <Stack direction={"row"} justifyContent={"space-between"} pl={4.5}>
        <Typography fontSize={"10px"} sx={{ opacity: ".5" }}>
          2024-11-19
        </Typography>

        <Typography fontSize={"10px"} sx={{ opacity: ".5" }}>
          Now
        </Typography>
      </Stack>

      {/* <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
        series={[
          {
            data: [3100, 3121, 3200, 3323, 4322, 5000],
            showMark: false,
          },
        ]}
        tooltip={{
          slots: {
            itemContent: () => {
              return <>1212121212121</>;
            },
          },
        }}
        grid={{ horizontal: true }}
        height={200}
      /> */}
    </MainCard>
  );
};

export default AssetsContent;
