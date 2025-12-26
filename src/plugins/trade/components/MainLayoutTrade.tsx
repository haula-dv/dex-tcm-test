'use client'
import { DataListWidget } from "@orderly.network/trading";
import dynamic from "next/dynamic";

const DynamicMainViewContainer = dynamic(() => import("./MainViewContainer").then((mod) => mod.MainViewContainer), {
    ssr: false,
});

interface IProps {
    symbol: string;
}

export const MainLayoutTrade = ({ symbol }: IProps) => {
    return (
        <>
            <DynamicMainViewContainer symbol={symbol} />
            <DataListWidget />
        </>
    )
}