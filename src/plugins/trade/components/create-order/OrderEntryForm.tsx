import { OrderEntryWidget } from "@orderly.network/ui-order-entry";
import { memo } from "react";

function OrderEntryForm() {
    return (
        <div>
            <OrderEntryWidget symbol="PERP_ETH_USDC" />
            {/* <OrderEntry /> */}
        </div>
    );
}
export default memo(OrderEntryForm);