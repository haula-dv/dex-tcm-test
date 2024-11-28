import MainCard from "@/components/card/MainCard";
import { Box, Typography } from "@mui/material";
import { DataListView } from "@orderly.network/react/esm/page/trading/desktop/sections/datalist";
import { memo, useEffect } from "react";

const MainOrderContainer = () => {
  useEffect(() => {
    const parentEl = document.querySelector(".data-list-view");

    if (parentEl) {
      const buttonOrder = document.getElementById("tab-orders");
      const buttonToRemove = document.getElementById("tab-positions");
      const buttonTabHistory = document.getElementById("tab-history");
      const buttonContainer = document.querySelector(".tabs-list"); // Thay thế bằng class hoặc selector chính xác

      if (buttonToRemove) {
        buttonToRemove.remove();
      }
      if (buttonContainer && buttonTabHistory) {
        buttonContainer.prepend(buttonTabHistory);
        buttonTabHistory.textContent = "All orders";
        buttonTabHistory.click();
      }
    }
  }, []);

  return (
    <MainCard backgroudColor="primary" height="calc(100vh - 100px)">
      <Typography pb={1}>Orders</Typography>

      <Box className="data-list-view" height={"calc(100vh - 150px)"}>
        <DataListView />
      </Box>
    </MainCard>
  );
};

export default memo(MainOrderContainer);
