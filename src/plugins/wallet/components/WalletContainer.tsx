import { MainIconButton } from "@/components/button/MainIconButton";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Button, Stack } from "@mui/material";
import { IconDots } from "@tabler/icons-react";
import { useState } from "react";
import { ModalConnectWallet } from "./ModalConnectWallet";

export const WalletContainer = () => {
  const [isOpenModalConnectWallet, setIsOpenModalConnectWallet] =
    useState(false);

  const handleToggleModalConnectWallet = () => {
    setIsOpenModalConnectWallet(!isOpenModalConnectWallet);
  };

  return (
    <>
      <Stack
        direction={"row"}
        spacing={TSizes.margin_md}
        justifyContent={"flex-end"}
      >
        <Button variant="contained" color="secondary">
          0 SAP
        </Button>

        <Button
          variant="contained"
          color="darkPrimary"
          onClick={handleToggleModalConnectWallet}
        >
          Connect to Wallet
        </Button>

        <MainIconButton variant="filledTonal">
          <IconDots />
        </MainIconButton>
      </Stack>

      <ModalConnectWallet
        isOpen={isOpenModalConnectWallet}
        onClose={handleToggleModalConnectWallet}
      />
    </>
  );
};
