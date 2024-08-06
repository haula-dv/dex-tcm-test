"use client";
import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import { ChildHeader } from "@/components/swap/ChildHeader";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

export const RemoveLiquidityContainer = () => {
  const [currentSelectedPercentage, setCurrentSelectedPercentage] =
    useState(-1);

  const handleSelectPercentage = (index: number) => {
    setCurrentSelectedPercentage(index);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      <MainCard variant="outlined" maxWidth="500px" backgroudColor="white">
        <ChildHeader onBackLink="/pool" title="Remove liquidity" />

        <MainCard variant="outlined">
          <Typography>
            <strong>Tips:</strong> You are the first liquidity provider You are
            the first liquidity provider You are the first liquidity provider
            You are the first liquidity provider You are the first liquidity
            provider You are the first liquidity provider
          </Typography>
        </MainCard>

        <Stack
          pt={2}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={"16px"} fontWeight={600}>
            Amount
          </Typography>

          <MainButton size="small" variant="contained" color="secondary">
            Detailed
          </MainButton>
        </Stack>

        <Stack pt={2} spacing={1.5}>
          <Typography fontSize={"28px"}>62%</Typography>

          <Stack direction={"row"} spacing={2}>
            {["25%", "50%", "75%", "Max"].map((value, index) => (
              <MainButton
                size="small"
                variant="contained"
                onClick={() => handleSelectPercentage(index)}
                color={
                  currentSelectedPercentage === index
                    ? "darkPrimary"
                    : "inherit"
                }
                key={index}
              >
                {value}
              </MainButton>
            ))}
          </Stack>
        </Stack>
      </MainCard>
    </Box>
  );
};
