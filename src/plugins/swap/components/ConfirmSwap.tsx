import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import { MainChip } from "@/components/chip/MainChip";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { ITokenValue } from "../type";
import { Item } from "./SwapContainer";
import { ButtonSwapToggle } from "./SwapIconToggle";
import { ModalConfirmSwap } from "./modal-token/ModalConfirmSwap";

interface IProps {
  toggleSwapType: () => void;
  tokenSellSelected: ITokenValue;
  tokenBuySelected: ITokenValue;
}

export const ConfirmSwapContent = ({
  toggleSwapType,
  tokenSellSelected,
  tokenBuySelected,
}: IProps) => {
  const [openModalConfirmSwap, setOpenModalConfirmSwap] = useState(false);

  // Toggle the open modal
  const handleToggleModal = () => {
    setOpenModalConfirmSwap(!openModalConfirmSwap);
  };
  return (
    <>
      <Stack spacing={1}>
        <MainCard backgroudColor="white">
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontSize={"18px"}>0990.009</Typography>

            <MainChip
              label={tokenSellSelected.token && tokenSellSelected.token.name}
              variant="outlined"
              icon={
                <Image
                  src={"/images/token.png"}
                  height={24}
                  width={24}
                  alt=""
                />
              }
            />
          </Stack>
        </MainCard>
        <ButtonSwapToggle toggleSwapType={toggleSwapType} />

        <MainCard backgroudColor="white">
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontSize={"18px"}>0990.009</Typography>

            <MainChip
              label={tokenBuySelected.token && tokenBuySelected.token.name}
              variant="outlined"
              icon={
                <Image
                  src={"/images/token.png"}
                  height={24}
                  width={24}
                  alt=""
                />
              }
            />
          </Stack>
        </MainCard>
      </Stack>

      <Typography pt={1}>
        An object representing the token and amount for the sell operation
      </Typography>

      <Stack spacing={1} py={2}>
        <Item />
        <Item />
        <Item />
      </Stack>

      <MainButton
        variant="contained"
        color="darkPrimary"
        size="large"
        fullWidth
        onClick={handleToggleModal}
      >
        Confirm Swap
      </MainButton>

      <ModalConfirmSwap
        open={openModalConfirmSwap}
        onClose={handleToggleModal}
      />
    </>
  );
};
