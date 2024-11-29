import MainCard from "@/components/card/MainCard";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { usePositionStream } from "@orderly.network/hooks";
import { PositionsView } from "@orderly.network/react";
import { DataListView } from "@orderly.network/react/esm/page/trading/desktop/sections/datalist";
import { memo, useEffect } from "react";

const MainPositionContainer = () => {
  const [positions, _info, { refresh, loading }] = usePositionStream();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

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

  return (
    <MainCard backgroudColor="primary" height="calc(100vh - 100px)">
      <Typography pb={{ xs: 2, md: 1 }}>Position</Typography>

      {mdDown ? (
        <Box className="data-list-view-mobile">
          <PositionsView
            aggregated={positions.aggregated}
            dataSource={positions.rows}
          />
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
