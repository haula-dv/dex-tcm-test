import MainCard from "@/components/card/MainCard";
import { useSymbolsInfo } from "@orderly.network/hooks";
import { OrderEntryWidget } from "@orderly.network/ui-order-entry";
import dynamic from "next/dynamic";
import { memo } from "react";
const DynamicBalance = dynamic(() => import("../common/Balance"));
const DynamicAccountleverage = dynamic(() => import("./Accountleverage").then((mod) => mod.default));

interface IOrderEntryFormProps {
    symbol: string;
}

function OrderEntryForm({ symbol }: IOrderEntryFormProps) {
    const [_, base, quote] = symbol.split("_");
    const symbolsInfo = useSymbolsInfo();

    return (
        <MainCard
            backgroudColor="primary"
            width="100%"
        >
            <DynamicBalance
                quote={quote}
                isFristLoading={symbolsInfo.isNil}
            />

            <DynamicAccountleverage symbol={symbol} />

            <div className="orderly-order-entry">
                <OrderEntryWidget
                    symbol={symbol}
                    key={symbol}
                />
            </div>
        </MainCard>
    );
}
export default memo(OrderEntryForm);