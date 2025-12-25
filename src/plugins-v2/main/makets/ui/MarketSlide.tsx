'use client'
import { useMarketsStream } from "@orderly.network/hooks";
import { memo } from "react";

  function MarketSlide() {
  const { data } = useMarketsStream();
  console.log(data);
    return (
        <div>
            <h1>MarketSlide</h1>
        </div>
    );
}

export default memo(MarketSlide);