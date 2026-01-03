"use client";

import { updateSymbol } from "@/utils/storage";
import { PositionsModule } from "@orderly.network/portfolio";
import { API } from "@orderly.network/types";
import { Box } from "@orderly.network/ui";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function PositionsView() {
  const router = useRouter();

  const onSymbolChange = useCallback(
    (data: API.Symbol) => {
      const symbol = data.symbol;
      updateSymbol(symbol);
    },
    [router],
  );

  return (
    <Box
      p={6}
      pb={0}
      intensity={900}
      r="xl"
      width="100%"
      style={{
        minHeight: 379,
        maxHeight: 2560,
        overflow: "hidden",
        // Make the table scroll instead of the page scroll
        height: "calc(100vh - 48px - 29px - 48px)",
      }}
    >
      <PositionsModule.PositionsPage
        onSymbolChange={onSymbolChange}
      />
    </Box>
  );
}
