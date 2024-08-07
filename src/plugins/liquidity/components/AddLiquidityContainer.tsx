"use client";
import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import { ChildHeader } from "@/components/swap/ChildHeader";
import { SwapBuyContent } from "@/components/swap/SwapBuyContent";
import { SwapSellContent } from "@/components/swap/SwapSellContent";
import { ButtonSwapToggle } from "@/plugins/swap/components/SwapIconToggle";
import theme from "@/utils/themes/mui-theme";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

export const AddLiquidityContainer = () => {
  const [isApprove, setIsApprove] = useState(false);

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

  const handlSubmitInvalid = () => {
    setIsApprove(true);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      <MainCard variant="outlined">
        <ChildHeader onBackLink="/pool" title="Add liquidity" />

        <MainCard variant="outlined">
          <Typography>
            <strong>Tips</strong> You are the first liquidity provider You are
            the first liquidity provider You are the first liquidity provider
            You are the first liquidity provider You are the first liquidity
            provider You are the first liquidity provider
          </Typography>
        </MainCard>

        <Stack spacing={1} pt={2} pb={2}>
          <SwapSellContent
            tokenSelected={currentSellValue}
            setTokenSelected={setCurrentSellValue}
          />

          <ButtonSwapToggle toggleSwapType={toggleSwapType} />

          <SwapBuyContent
            tokenSelected={currentBuyValue}
            setTokenSelected={setCurrentBuyValue}
          />
        </Stack>

        <Typography fontSize={"18px"} fontWeight={600} pb={2}>
          Prices and pool share
        </Typography>
        <Stack
          pb={2}
          spacing={2}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Stack>
            <Typography color={theme.palette.grey[900]}>WTB</Typography>
            <Typography fontSize={"16px"} fontWeight={600}>
              0.099998
            </Typography>
          </Stack>
          <Stack>
            <Typography color={theme.palette.grey[900]}>WTB</Typography>
            <Typography fontSize={"16px"} fontWeight={600}>
              0.099998
            </Typography>
          </Stack>
          <Stack>
            <Typography color={theme.palette.grey[900]}>WTB</Typography>
            <Typography fontSize={"16px"} fontWeight={600}>
              0.099998
            </Typography>
          </Stack>
        </Stack>

        {!isApprove ? (
          <MainButton
            fullWidth
            size="large"
            variant="contained"
            color="darkPrimary"
            onClick={handlSubmitInvalid}
          >
            Invalid Pair
          </MainButton>
        ) : (
          <Stack spacing={2}>
            <MainButton
              fullWidth
              size="large"
              variant="contained"
              color="darkPrimary"
            >
              Approve WBTC
            </MainButton>

            <MainButton
              fullWidth
              size="large"
              variant="contained"
              color="darkPrimary"
              disabled
            >
              Supply
            </MainButton>
          </Stack>
        )}
      </MainCard>
    </Box>
  );
};
