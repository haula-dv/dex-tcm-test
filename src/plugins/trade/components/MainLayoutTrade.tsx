'use client'
import { useMediaQuery, useTheme } from "@mui/material";
import dynamic from "next/dynamic";

const DynamicMainViewContainer = dynamic(() => import("./MainViewContainer").then((mod) => mod.MainViewContainer), {
    ssr: false,
});

const DynamicMainViewMobileContainer = dynamic(() => import("./DynamicMainViewMobileContainer").then((mod) => mod.MainViewMobileContainer), {
    ssr: false,
});

interface IProps {
    symbol: string;
}

export const MainLayoutTrade = ({ symbol }: IProps) => {
    const theme = useTheme();
    const upLg = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <>
            {upLg ? <DynamicMainViewContainer symbol={symbol} /> : <DynamicMainViewMobileContainer symbol={symbol} />}
        </>
    )
}