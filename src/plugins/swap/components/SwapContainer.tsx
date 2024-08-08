"use client";
import { fetchTokenSpotPriceAPI } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import { SwapBuyContent } from "@/components/swap/SwapBuyContent";
import theme from "@/utils/themes/mui-theme";
import { Box, Stack, Typography } from "@mui/material";
import { IconHelp, IconTransform } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { SwapSellContent } from "../../../components/swap/SwapSellContent";
import { isTransactionSubmittedState, tokenInputState } from "../store";
import { ConfirmSwapContent } from "./ConfirmSwap";
import { ButtonSwapToggle } from "./SwapIconToggle";
import { TransactionPopup } from "./token/TransactionPopup";
import { TransationSubmittedCard } from "./TransationSubmittedCard";

export const SwapContainer = () => {
  // State
  const isTransactionSubmitted = useStore(
    isTransactionSubmittedState,
    (state) => state.value
  );

  // TOKEN
  const tokenInput = useStore(tokenInputState, (state) => state.value);

  const [isEnterAmount, setIsEnterAmount] = useState(false);
  const [isSwaped, setIsSwaped] = useState(false);
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

  const handleEnterAmount = () => {
    setIsEnterAmount(true);

    if (isEnterAmount) {
      setIsSwaped(true);
    }
  };

  useEffect(() => {
    fetchTokenSpotPriceAPI();
  }, []);

  console.log(tokenInput);

  return (
    <Box display={"flex"} justifyContent={"center"}>
      {!isTransactionSubmitted ? (
        <MainCard>
          <TransactionPopup />

          {!isSwaped ? (
            <>
              <Stack spacing={1}>
                <SwapSellContent
                  tokenSelected={currentSellValue}
                  setTokenSelected={setCurrentSellValue}
                />

                <ButtonSwapToggle toggleSwapType={toggleSwapType} />

                <SwapBuyContent
                  tokenSelected={currentBuyValue}
                  setTokenSelected={setCurrentBuyValue}
                />

                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  pb={2}
                >
                  <Typography>
                    {!isEnterAmount ? "Slippage Tolerance" : "Price"}
                  </Typography>

                  <Stack direction={"row"} alignItems={"centter"} spacing={1}>
                    <Typography>
                      {!isEnterAmount ? "1%" : "0978787667 ETH Per"}
                    </Typography>

                    {isEnterAmount && <IconTransform size={"1.2rem"} />}
                  </Stack>
                </Stack>

                <MainButton
                  variant="contained"
                  color="darkPrimary"
                  size="large"
                  onClick={handleEnterAmount}
                >
                  {isEnterAmount ? "Swap" : "Enter A Mount"}
                </MainButton>
              </Stack>

              {isEnterAmount && (
                <Stack spacing={1} pt={2}>
                  <Item />
                  <Item />
                  <Item />
                  <MainButton fullWidth color="inherit">
                    View Pair Analytis
                  </MainButton>
                </Stack>
              )}
            </>
          ) : (
            <ConfirmSwapContent
              toggleSwapType={toggleSwapType}
              tokenSellSelected={currentSellValue}
              tokenBuySelected={currentBuyValue}
            />
          )}
        </MainCard>
      ) : (
        <TransationSubmittedCard />
      )}
    </Box>
  );
};

export const Item = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Stack direction={"row"} spacing={1}>
        <Typography color={theme.palette.grey[900]}>
          Minimum recevied
        </Typography>

        <IconHelp color={theme.palette.grey[900]} />
      </Stack>
      <Typography>80099 AMPL</Typography>
    </Stack>
  );
};
