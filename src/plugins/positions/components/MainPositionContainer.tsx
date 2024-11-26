import MainCard from "@/components/card/MainCard";
import { Box, Typography } from "@mui/material";
import { DataListView } from "@orderly.network/react/esm/page/trading/desktop/sections/datalist";
import { memo, useEffect } from "react";

const MainPositionContainer = () => {
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

  return (
    <MainCard backgroudColor="primary" height="calc(100vh - 100px)">
      <Typography pb={1}>Position</Typography>

      <Box className="data-list-view" height={"calc(100vh - 200px)"}>
        <DataListView />
      </Box>
    </MainCard>
  );
};

export default memo(MainPositionContainer);
