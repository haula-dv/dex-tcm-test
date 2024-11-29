import MainCard from "@/components/card/MainCard";
import { OrderlyConfig } from "@/utils/config/orderly";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { usePositionStream } from "@orderly.network/hooks";
import { DataListView } from "@orderly.network/react/esm/page/trading/desktop/sections/datalist";
import { MobileTradingPage } from "@orderly.network/react/esm/page/trading/mobile/trading";
import { memo, useEffect, useState } from "react";

const MainPositionContainer = () => {
  const [positions, _info, { refresh, loading }] = usePositionStream();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { tradingViewConfig } = OrderlyConfig();

  useEffect(() => {
    const dataListEl = document.querySelector(".data-list-view");

    if (dataListEl) {
      // Lấy phần tử mục tiêu cần giữ lại
      const targetEl = dataListEl.querySelector(
        "#orderly-desktop-positions-content"
      );

      if (targetEl) {
        // Xóa tất cả các phần tử con của `dataListEl` ngoại trừ phần tử chứa `targetEl`
        let currentParent: any = targetEl.parentElement;

        while (currentParent && currentParent !== dataListEl) {
          // Xóa tất cả các anh em (siblings) của currentParent, ngoại trừ currentParent
          Array.from(currentParent.parentElement.children).forEach(
            (sibling: any) => {
              if (sibling !== currentParent) {
                sibling.remove();
              }
            }
          );

          // Tiếp tục đi lên cấp cha
          currentParent = currentParent.parentElement;
        }

        // Cuối cùng, xóa tất cả phần tử không phải `targetEl` trong `dataListEl`
        Array.from(dataListEl.children).forEach((child) => {
          if (!child.contains(targetEl)) {
            child.remove();
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    if (mdDown) {
      const el = document.getElementById("orderly-data-list-positions-header");
      const elf = document.querySelector(".orderly-data-list-filter");
      if (el) {
        el.remove();
      }
      if (elf) {
        elf.remove();
      }
    }
  }, [mdDown]);

  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    if (!mdDown) {
      return;
    }

    const observer = new MutationObserver(() => {
      setTimeout(() => {
        const parentDivDataList = document.querySelector(
          ".orderly-data-list-mobile-2"
        );
        const parentDivDataList2 = document.querySelector(
          ".orderly-data-list-tab-bar"
        );

        const parentDiv = document.querySelector(".orderly-pb-\\[70px\\]");

        if (parentDivDataList && parentDiv) {
          if (parentDivDataList2) {
            parentDivDataList2.remove();
          }
          Array.from(parentDiv.children).forEach((child) => {
            if (child.id !== "orderly-data-list") {
              child.remove();
            }
          });

          observer.disconnect(); // Stop observing once the element is found
        }
      }, 1000);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, [tradingViewConfig, mdDown]);

  useEffect(() => {
    setTimeout(() => {
      setLoading2(false);
    }, 1500);
  }, []);

  return (
    <MainCard backgroudColor="primary" height="calc(100vh - 100px)">
      <Typography pb={{ xs: 2, md: 1 }}>Position</Typography>

      {mdDown ? (
        <Box className="data-list-view-mobile" sx={{ overflowY: "auto" }}>
          {/* <PositionsView
            aggregated={positions.aggregated}
            dataSource={positions.rows}
          /> */}

          <Box
            className="orderly-data-list-mobile-2"
            height={loading2 ? "10px" : "auto"}
            overflow={loading2 ? "hidden" : "auto"}
          >
            <MobileTradingPage
              symbol={"PERP_ETH_USDC"}
              tradingViewConfig={tradingViewConfig}
            />
          </Box>
        </Box>
      ) : (
        <Box className="data-list-view" height={"calc(100vh - 200px)"}>
          <DataListView />
        </Box>
      )}
    </MainCard>
  );
};

export default memo(MainPositionContainer);
