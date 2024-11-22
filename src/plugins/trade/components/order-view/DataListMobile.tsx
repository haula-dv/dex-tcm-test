"use client";

import { OrderlyConfig } from "@/utils/config/orderly";
import { setColorThemeMode } from "@/utils/helpers";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";

interface IProps {
  symbol: string;
}

// Dynamically import TradingPage
const TradingPage = dynamic(
  () => import("@orderly.network/react").then((mod) => mod.TradingPage),
  {
    ssr: false, // Ensures it's only rendered on the client side
  }
);

const DataListMobile = ({ symbol }: IProps) => {
  const { tradingViewConfig } = OrderlyConfig();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const parentDivDataList = document.querySelector(
        ".orderly-data-list-mobile-2"
      );
      const parentDiv = document.querySelector(".orderly-pb-\\[70px\\]");

      if (parentDivDataList && parentDiv) {
        // Iterate through the child nodes
        Array.from(parentDiv.children).forEach((child) => {
          if (child.id !== "orderly-data-list") {
            child.remove();
          }
        });
        observer.disconnect(); // Stop observing once the element is found
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, [tradingViewConfig]);

  return (
    <MainOrder className="orderly-data-list-mobile-2">
      <TradingPage symbol={symbol} tradingViewConfig={tradingViewConfig} />
    </MainOrder>
  );
};

export default memo(DataListMobile);

const MainOrder = styled(Box)(({ theme }) => ({
  "& .orderly-pb-\\[70px\\]": {
    paddingBottom: "0px",
  },

  "& .orderly-border-b-divider": {
    borderColor: theme.palette.divider,
  },

  "& .orderly-tab-header": {
    borderRadius: "10px 10px 0px 0px",
    padding: "6px",
    backgroundColor: `${setColorThemeMode(
      theme.palette.primary.main,
      theme.palette.grey[800]
    )} !important`,

    "& .orderly-data-list-tab-bar": {
      backgroundColor: `${setColorThemeMode(
        theme.palette.primary.main,
        theme.palette.grey[800]
      )} !important`,
    },
  },

  "& #orderly-data-list-positions-header": {
    backgroundColor: `${setColorThemeMode(
      theme.palette.primary.main,
      theme.palette.grey[800]
    )} !important`,
  },

  // Position
  "& .orderly-data-list-positions": {
    "& .orderly-px-4": {
      padding: "0px !important",
    },
  },

  "& .orderly-data-list-filter": {
    backgroundColor: setColorThemeMode(
      theme.palette.primary.main,
      theme.palette.grey[800]
    ),
    marginBottom: "10px",
    borderRadius: "0px 0px 10px 10px",
  },

  "& .orderly-list-view-inner ": {
    gap: "4px",
    display: "flex",
    flexDirection: "column",

    "& .orderly-px-4": {
      padding: "6px",
      borderRadius: "10px",
      backgroundColor: setColorThemeMode(
        theme.palette.primary.main,
        theme.palette.grey[800]
      ),

      "& .orderly-grid": {
        borderTop: `1px solid ${theme.palette.divider}`,
      },
    },

    "& .orderly-border-divider": {
      display: "none",
    },
  },

  "& .orderly-border-divider": {
    display: "none",
  },
}));
