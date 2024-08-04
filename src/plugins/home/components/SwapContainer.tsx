"use client";
import { MainIconButton } from "@/components/button/MainIconButton";
import theme from "@/utils/themes/mui-theme";
import { Box, Stack, Typography } from "@mui/material";
import { IconArrowsSort, IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { SwapBuyContent } from "./SwapBuyContent";
import { ITypeSwap, SwapSellContent } from "./SwapSellContent";

export const SwapContainer = () => {
  const [currentTypeSwap, setCurrentTypeSwap] = useState<ITypeSwap>("sell");

  const [currentSellValue, setCurrentSellValue] = useState({
    token: null,
    amount: 0,
  });

  const [currentBuyValue, setCurrentBuyValue] = useState({
    token: null,
    amount: 0,
  });

  // Change swap type
  const toggleSwapType = () => {
    // Swap the values between sell and buy
    setCurrentSellValue((prevSellValue) => ({
      token: currentBuyValue.token,
      amount: currentBuyValue.amount,
    }));

    setCurrentBuyValue((prevBuyValue) => ({
      token: currentSellValue.token,
      amount: currentSellValue.amount,
    }));
  };

  return (
    <>
      <Box maxWidth={"420px"} mx={"auto"} width={"100%"}>
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={"18px"} fontWeight={600}>
            Swap
          </Typography>

          <MainIconButton variant="text" isFullRounded>
            <IconSettings size={"1.5rem"} />
          </MainIconButton>
        </Stack>

        <Stack spacing={1}>
          <SwapSellContent
            tokenSelected={currentSellValue}
            setTokenSelected={setCurrentSellValue}
          />

          <div style={{ margin: "-20px auto -24px auto" }}>
            <MainIconButton
              color="white"
              sx={{ border: `4px solid ${theme.palette.grey[100]}` }}
              onClick={toggleSwapType}
            >
              <IconArrowsSort size={"1rem"} />
            </MainIconButton>
          </div>

          <SwapBuyContent
            tokenSelected={currentBuyValue}
            setTokenSelected={setCurrentSellValue}
          />
        </Stack>
      </Box>
    </>
  );
};
