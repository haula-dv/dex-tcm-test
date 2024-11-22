"use client";
import "@/styles/abstracts/variables-test.scss";
import { OrderlyConfig } from "@/utils/config/orderly";
import { TCMP_ORDERLY_SDK_TITLE_KEY } from "@/utils/constants/key_store";
import { _orderlySymbolKey } from "@/utils/constants/orderly";
import { Box } from "@mui/material";
import { TradingPage } from "@orderly.network/react";
import "@orderly.network/react/dist/styles.css";
import { API } from "@orderly.network/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function PerpPage({ params }: { params: { symbol: string } }) {
  const router = useRouter();
  const [symbol, setSymbol] = useState(params.symbol);

  useEffect(() => {
    if (symbol === undefined) {
      setSymbol(localStorage?.getItem(_orderlySymbolKey)!);
    }
  }, [symbol]);

  const updateTitle = useCallback(
    (title: string) => {
      var titleElement = document.getElementById(TCMP_ORDERLY_SDK_TITLE_KEY);
      if (titleElement) {
        titleElement.textContent = title ?? symbol.toString();
      }
    },
    [symbol]
  );

  const onSymbolChange = (symbol: API.Symbol) => {
    console.log(symbol);
    localStorage.setItem(_orderlySymbolKey, symbol.symbol);
    router.push(`/trading-test/perp/${symbol}`);
    updateTitle(symbol.symbol);
  };

  const { tradingViewConfig } = OrderlyConfig();

  useEffect(() => {
    const parentDivDataList = document.querySelector(
      ".orderly-data-list-mobile"
    );

    const parentDiv = document.querySelector(".orderly-pb-\\[70px\\]");

    if (parentDivDataList && parentDiv) {
      setTimeout(() => {
        // Iterate through the child nodes
        Array.from(parentDiv.children).forEach((child) => {
          // Keep the div with id 'orderly-data-list' and remove others
          if (child.id !== "orderly-data-list") {
            child.remove();
          }
        });
      }, 10);
    }
  }, []);

  return (
    <Box className="orderly-data-list-mobile">
      <TradingPage
        symbol={symbol}
        tradingViewConfig={tradingViewConfig}
        onSymbolChange={(sym) => onSymbolChange(sym)}
      />
    </Box>
  );
}
