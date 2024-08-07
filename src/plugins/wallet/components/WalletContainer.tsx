import { MainIconButton } from "@/components/button/MainIconButton";
import { TLocalStorage } from "@/utils/constants/localstorage";
import { supportedChains } from "@/utils/lib/network";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Button, Stack } from "@mui/material";
import { useAccount } from "@orderly.network/hooks";
import { IconDots } from "@tabler/icons-react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { useEffect, useState } from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { ModalConnectWallet } from "./ModalConnectWallet";

export const WalletContainer = () => {
  const [isOpenModalConnectWallet, setIsOpenModalConnectWallet] =
    useState(false);

  const handleToggleModalConnectWallet = () => {
    setIsOpenModalConnectWallet(!isOpenModalConnectWallet);
  };

  const { account } = useAccount();
  const [{ wallet }, connect, disconnectWallet] = useConnectWallet();
  const [{ connectedChain }, setChain] = useSetChain();

  useEffect(() => {
    if (!wallet) return;

    if (wallet) {
      // const jsonString = JSON.stringify(wallet);
    }

    // localStorage.setItem(
    //   TLocalStorage.DEX_ORDERLY_MAINNET_WALLET_KEY,
    //   JSON.stringify(wallet)
    // );

    account.setAddress(wallet.accounts[0].address, {
      provider: wallet.provider,
      chain: {
        id: wallet.chains[0].id,
      },
    });
  }, [wallet, account]);

  useEffect(() => {
    const savedWallet = localStorage.getItem(
      TLocalStorage.DEX_ORDERLY_MAINNET_WALLET_KEY
    );

    // console.log(savedWallet);

    if (savedWallet) {
      // connect(JSON.parse(savedWallet));
    }
  }, [connect]);

  const chainIcon = supportedChains.find(
    ({ id }) => id === connectedChain?.id
  )?.icon;

  const selectChain = (chainId: string) => () => {
    setChain({
      chainId,
    });
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

        {wallet ? "111" : <ConnectWalletButton />}

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
