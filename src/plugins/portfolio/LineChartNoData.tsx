import { setColorThemeMode } from "@/utils/helpers";
import { useTheme } from "@mui/material";
import { memo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";

const LineChartNoData = () => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%" className={"line-no-data"}>
      <LineChart
        width={772}
        height={300}
        data={[{ a: 150 }, { a: 300 }, { a: 450 }]}
        margin={{
          left: -30,
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

        <YAxis tick={{ fontSize: 10 }} />

        <Line
          dataKey={"a"}
          strokeWidth={2}
          type="monotone"
          dot={false}
          stroke={theme.palette.success.main}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default memo(LineChartNoData);
