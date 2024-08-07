import { MainIconButton } from "@/components/button/MainIconButton";
import { TLocalStorage } from "@/utils/constants/localstorage";
import { supportedChains } from "@/utils/lib/network";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Button, Stack } from "@mui/material";
import { useAccount } from "@orderly.network/hooks";
import { IconDots } from "@tabler/icons-react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { accountWalletState } from "../store";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { ModalConnectWallet } from "./ModalConnectWallet";
import { OrderlyConnect } from "./OrderlyConnect";
import { WalletConnected } from "./WalletConnected";

export const WalletContainer = () => {
  const [isOpenModalConnectWallet, setIsOpenModalConnectWallet] =
    useState(false);

  const handleToggleModalConnectWallet = () => {
    setIsOpenModalConnectWallet(!isOpenModalConnectWallet);
  };

  const accountWallet = useStore(accountWalletState, (state) => state.value);

  const { account } = useAccount();
  const [{ wallet }, connect, disconnectWallet] = useConnectWallet();
  const [{ connectedChain }, setChain] = useSetChain();

  useEffect(() => {
    if (!wallet) return;
    account.setAddress(wallet.accounts[0].address, {
      provider: wallet.provider,
      chain: {
        id: wallet.chains[0].id,
      },
    });

    const { name, avatar } = wallet?.accounts[0].ens ?? {};
    const accountObj = {
      address: wallet.accounts[0].address,
      balance: wallet.accounts[0].balance,
      ens: { name, avatar: "" },
    };
    setZustandValue(accountWalletState, accountObj);

    localStorage.setItem(
      TLocalStorage.DEX_ORDERLY_MAINNET_WALLET_KEY,
      JSON.stringify(accountObj)
    );
  }, [wallet, account]);

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

        {accountWallet ? (
          <WalletConnected accountWallet={accountWallet} />
        ) : (
          <ConnectWalletButton />
        )}

        <MainIconButton variant="filledTonal" color="inherit">
          <IconDots />
        </MainIconButton>
      </Stack>

      <ModalConnectWallet
        isOpen={isOpenModalConnectWallet}
        onClose={handleToggleModalConnectWallet}
      />

      <OrderlyConnect />
    </>
  );
};
