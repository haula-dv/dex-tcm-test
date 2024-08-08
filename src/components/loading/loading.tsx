"use client";
import { loadingState } from "@/common/stores/global-loading";
import { Backdrop, Box } from "@mui/material";
import { useStore } from "zustand";
import IconLoading from "../icons/loading";

export const Loading = () => {
  const loading = useStore(loadingState, (state) => state.value);

  return (
    <Backdrop open={loading} sx={{ zIndex: 99999, bgcolor: "transparent" }}>
      <Box height={"80px"} width={"80px"} position={"relative"}>
        <IconLoading />
      </Box>
    </Backdrop>
  );
};
