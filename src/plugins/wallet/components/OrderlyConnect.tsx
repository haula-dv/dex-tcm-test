"use client";
import { MainDialog } from "@/components/dialog/MainDialog";
import { useIsTestnet } from "@/hooks/useIsTestnet";
import { useAccount } from "@orderly.network/hooks";
import { AccountStatusEnum } from "@orderly.network/types";
import {
  useConnectWallet,
  useNotifications,
  useSetChain,
} from "@web3-onboard/react";
import { useEffect, useState } from "react";

let timer: number | undefined;

export const OrderlyConnect = () => {
  const [open, setOpen] = useState(false);
  const [{ wallet }] = useConnectWallet();
  const [isTestnet] = useIsTestnet();

  const { account, state } = useAccount();
  const [{ connectedChain }] = useSetChain();

  const [_, customNotification] = useNotifications();

  console.log(state);

  useEffect(() => {
    if (!connectedChain) return;
    account.switchChainId(connectedChain.id);
  }, [connectedChain, account]);

  useEffect(() => {
    if (timer != null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (state.status < AccountStatusEnum.EnableTrading && wallet != null) {
        setOpen(true);
        timer = undefined;
      }
    }, 3_000) as unknown as number;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, setOpen, wallet]);

  const isRegistered = state.status >= AccountStatusEnum.SignedIn;
  const hasOrderlyKey = state.status >= AccountStatusEnum.EnableTrading;

  return (
    <MainDialog open={open} handleClose={() => setOpen(false)}>
      123
    </MainDialog>
  );
};
