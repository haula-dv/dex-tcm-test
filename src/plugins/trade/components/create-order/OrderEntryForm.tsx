import { useSymbolsInfo } from "@orderly.network/hooks";
import { OrderEntryWidget } from "@orderly.network/ui-order-entry";
import dynamic from "next/dynamic";
import { memo } from "react";
const DynamicBalance = dynamic(() => import("../common/Balance"));

interface IOrderEntryFormProps {
    symbol: string;
}

function OrderEntryForm({ symbol }: IOrderEntryFormProps) {
    const [_, base, quote] = symbol.split("_");
    const symbolsInfo = useSymbolsInfo();

    return (
        <div>
            <DynamicBalance
                quote={quote}
                isFristLoading={symbolsInfo.isNil}
            />

            <div className="orderly-order-entry">
                <OrderEntryWidget symbol={symbol} />
            </div>
        </div>
    );
}
export default memo(OrderEntryForm);