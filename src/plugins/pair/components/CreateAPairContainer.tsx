"use client";
import { fetchTokenSpotPriceAPI } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import { ChildHeader } from "@/components/swap/ChildHeader";
import { CurrencyField } from "@/components/swap/CurrencyField";
import { ButtonSwapToggle } from "@/plugins/swap/components/SwapIconToggle";
import { toggleSwapType } from "@/plugins/swap/handlers";
import { tokenInputState, tokenOutputState } from "@/plugins/swap/store";
import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useStore } from "zustand";

export const CreateAPairContainer = () => {
  // TOKEN
  const tokenInput = useStore(tokenInputState, (state) => state.value);
  const tokenOutput = useStore(tokenOutputState, (state) => state.value);

  // Handle get swap price
  const getSwapPrice = (inputAmount: number) => {
    //
  };

  useEffect(() => {
    fetchTokenSpotPriceAPI();
  }, []);

  return (
    <MainCard variant="outlined">
      <ChildHeader onBackLink="/pool" title="Create A Pair" />

      <MainCard variant="outlined">
        <Typography fontSize={"16px"} fontWeight={600} pb={1}>
          You are the first liquidity provider
        </Typography>
        <Typography>
          You are the first liquidity provider You are the first liquidity
          provider You are the first liquidity provider
        </Typography>
      </MainCard>

      <Stack spacing={1} pt={2} pb={2}>
        <CurrencyField
          handleGetSwapPrice={getSwapPrice}
          field="input"
          currentToken={tokenInput}
        />

        <ButtonSwapToggle toggleSwapType={toggleSwapType} />

        <CurrencyField currentToken={tokenOutput} field="output" />
      </Stack>

      <MainButton
        fullWidth
        size="large"
        variant="contained"
        color="darkPrimary"
      >
        Invalid Pair
      </MainButton>
    </MainCard>
  );
};
