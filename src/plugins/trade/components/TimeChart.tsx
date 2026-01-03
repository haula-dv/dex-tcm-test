import { setColorThemeMode } from "@/utils/helpers";
import { useTheme } from "@mui/material";
import { memo } from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

interface IProps {
    symbol: string;
}

function PureTimeChart({ symbol }: IProps) {
    const theme = useTheme();
    const [_, base] = symbol.split("_");

    return <AdvancedRealTimeChart
        disabled_features={[
            "hide_left_toolbar_by_default",
            "adaptive_logo",
            "header_chart_type",
            "header_compare",
            "left_toolbar",
        ]}
        enabled_features={["header_settings", "header_chart_type"]}
        locale="en"
        calendar
        theme={theme.palette.mode}
        symbol={`${base}USD`}
        autosize
        allow_symbol_change={false}
        interval="180"
        range="12M"
        timezone="Etc/UTC"
        style="1"
        key={symbol}
        toolbar_bg={setColorThemeMode(theme.palette.primary.light, "#262626")}
        backgroundColor={setColorThemeMode("#fff", "#262626")}
    />
}

export const TimeChart = memo(PureTimeChart, (prevProps, nextProps) => {
    if (prevProps.symbol === nextProps.symbol) {
        return false;
    }

    return true;
});