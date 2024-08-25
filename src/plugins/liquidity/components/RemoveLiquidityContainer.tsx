"use client";
import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import { ChildHeader } from "@/components/swap/ChildHeader";
import { ItemRow } from "@/plugins/pool/components/TokenSelected";
import { Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ModalConfirmLiquidity } from "./ModalConfirmLiquidity";

export const RemoveLiquidityContainer = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const [currentSelectedPercentage, setCurrentSelectedPercentage] =
    useState(-1);

  const handleSelectPercentage = (index: number) => {
    setCurrentSelectedPercentage(index);
  };

  // Handle open confirmation
  const handleToggleOpenConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  return (
    <>
      <MainCard variant="outlined" backgroudColor="white">
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

          <Stack spacing={2} pt={2}>
            <ItemRow title="09.00009998888" value="ETH" />
            <ItemRow title="99900009887" value="AMPL" />
            <ItemRow title="" value="Recive WETH" />
            <Divider />
            <ItemRow title="Price" value="Recive WETH" />
            <ItemRow title="" value="Recive WETH" />
          </Stack>

          <Stack spacing={2} direction={"row"} pt={1}>
            <MainButton variant="outlined" color="inherit" fullWidth>
              Remove
            </MainButton>
            <MainButton
              variant="contained"
              color="darkPrimary"
              fullWidth
              onClick={handleToggleOpenConfirm}
            >
              Approve
            </MainButton>
          </Stack>
        </Stack>
      </MainCard>

      <ModalConfirmLiquidity
        open={openConfirm}
        onClose={handleToggleOpenConfirm}
      />
    </>
  );
};
