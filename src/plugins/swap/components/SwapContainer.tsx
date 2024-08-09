"use client";
import { fetchTokenSpotPriceAPI } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import { CurrencyField } from "@/components/swap/CurrencyField";
import theme from "@/utils/themes/mui-theme";
import { Stack, Typography } from "@mui/material";
import { AuthClient } from "@orderly.network/orderly-sdk";
import { IconHelp, IconTransform } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { toggleSwapType } from "../handlers";
import {
  isTransactionSubmittedState,
  tokenInputState,
  tokenOutputState,
} from "../store";
import { ConfirmSwapContent } from "./ConfirmSwap";
import { ButtonSwapToggle } from "./SwapIconToggle";
import { TransactionPopup } from "./token/TransactionPopup";
import { TransationSubmittedCard } from "./TransationSubmittedCard";

const apiClient = new AuthClient({
  networkId: "testnet",
  contractId: "asset-manager.orderly.testnet",
  debug: true,
});

export const SwapContainer = () => {
  // State
  const isTransactionSubmitted = useStore(
    isTransactionSubmittedState,
    (state) => state.value
  );

  // TOKEN
  const tokenInput = useStore(tokenInputState, (state) => state.value);
  const tokenOutput = useStore(tokenOutputState, (state) => state.value);

  const [isEnterAmount, setIsEnterAmount] = useState(false);
  const [isSwaped, setIsSwaped] = useState(false);

  //
  const [slippageAmount, setSlippageAmount] = useState(2);
  const [deadlineMinutes, setDeadlineMinutes] = useState(10);

  const [wethAmount, setWethAmount] = useState(undefined);
  const [inputAmount, setInputAmount] = useState(-1);
  const [outputAmount, setOutputAmount] = useState(undefined);
  const [loading, setLoading] = useState(false);

  // ================= //

  const handleEnterAmount = () => {
    setIsEnterAmount(true);

    if (isEnterAmount) {
      setIsSwaped(true);
    }
  };

  // Handle get swap price
  const getSwapPrice = (inputAmount: number) => {
    setLoading(true);
    setInputAmount(inputAmount);

    // const swap = getPrice(
    //   inputAmount,
    //   slippageAmount,
    //   Math.floor(Date.now()/1000 + (deadlineMinutes * 60)),
    //   signerAddress
    // ).then(data => {
    //   setTransaction(data[0])
    //   setOutputAmount(data[1])
    //   setRatio(data[2])
    //   setLoading(false)
    // })
  };

  useEffect(() => {
    fetchTokenSpotPriceAPI();
  }, []);

  return (
    <>
      {!isTransactionSubmitted ? (
        <MainCard backgroudColor="white">
          <TransactionPopup />

          {!isSwaped ? (
            <>
              <Stack spacing={1}>
                <CurrencyField
                  handleGetSwapPrice={getSwapPrice}
                  field="input"
                  currentToken={tokenInput}
                />

                <ButtonSwapToggle toggleSwapType={toggleSwapType} />

                <CurrencyField currentToken={tokenOutput} field="output" />

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
              tokenSellSelected={tokenInput}
              tokenBuySelected={tokenOutput}
            />
          )}
        </MainCard>
      ) : (
        <TransationSubmittedCard />
      )}
    </>
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
