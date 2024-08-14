"use client";
import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import { MainChip } from "@/components/chip/MainChip";
import { MainDialog } from "@/components/dialog/MainDialog";
import IconLoading from "@/components/icons/loading";
import { useIsTestnet } from "@/hooks/useIsTestnet";
import { mainToast } from "@/utils/lib/toast";
import theme from "@/utils/themes/mui-theme";
import { Box, Stack, Typography } from "@mui/material";
import { useAccount } from "@orderly.network/hooks";
import { AccountStatusEnum } from "@orderly.network/types";
import { IconProgressCheck } from "@tabler/icons-react";
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

  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingOrderlyKey, setLoadingOrderlyKey] = useState(false);

  // Handle Register Account
  const handleRegisterAccount = async () => {
    setLoadingRegister(true);

    const { update } = customNotification({
      eventCode: "register",
      type: "pending",
      message: "Registering account...",
    });

    try {
      const res = await account.createAccount();
      update({
        eventCode: "registerSuccess",
        type: "success",
        message: "Registration complete!",
        autoDismiss: 5_000,
      });

      console.log(res);
    } catch (err) {
      console.error(err);
      // mainToast("registration failed", "error");

      update({
        eventCode: "registerError",
        type: "error",
        message: "Registration failed!",
        autoDismiss: 5_000,
      });
      setLoadingRegister(false);
    } finally {
      setLoadingRegister(false);
    }
  };

  const handleOrderkyKey = async () => {
    const { update } = customNotification({
      eventCode: "orderlyKey",
      type: "pending",
      message: "Registering Orderly key...",
    });
    setLoadingOrderlyKey(true);
    try {
      await account.createOrderlyKey(365);
      update({
        eventCode: "orderlyKeySuccess",
        type: "success",
        message: "Key registration complete!",
        autoDismiss: 5_000,
      });
    } catch (err) {
      console.error(err);
      setLoadingOrderlyKey(false);
      mainToast("Orderly key registration failed", "error");
      update({
        eventCode: "orderlyKeyError",
        type: "error",
        message: "Key registration failed!",
        autoDismiss: 5_000,
      });

      throw err;
    } finally {
      setLoadingOrderlyKey(false);
    }
  };

  return (
    <MainDialog
      open={open}
      handleClose={() => setOpen(false)}
      maxWidth="xs"
      title="Connect with Orderly Network"
      isBGWhite
    >
      <Typography
        textAlign={"center"}
        fontSize={"16px"}
        fontWeight={600}
        color={theme.palette.success.main}
        mb={2}
      >
        You are connected with Orderly {isTestnet ? "testnet" : "mainnet"}
      </Typography>

      <Stack spacing={2}>
        <MainCard>
          <Typography textAlign={"center"} pb={1.5} fontWeight={600}>
            Register your account first.
          </Typography>

          <Box display={"flex"} justifyContent={"center"}>
            {isRegistered ? (
              <MainChip
                variant="outlined"
                color="success"
                icon={<IconProgressCheck />}
                label={"Registered"}
              />
            ) : (
              <MainButton
                variant="contained"
                color="inherit"
                onClick={handleRegisterAccount}
                fullRounded
              >
                {loadingRegister && (
                  <Box pr={1}>
                    <IconLoading height={30} width={30} />
                  </Box>
                )}
                <Typography>Register</Typography>
              </MainButton>
            )}
          </Box>
        </MainCard>

        <MainCard>
          <Typography textAlign={"center"} pb={1.5} fontWeight={600}>
            Create a key pair to interact with our API. It will be stored in
            your {"browser's"} local storage and is unique per device.
          </Typography>

          <Box display={"flex"} justifyContent={"center"}>
            {hasOrderlyKey ? (
              <MainChip
                variant="outlined"
                color="success"
                icon={<IconProgressCheck />}
                label={"Created Key"}
              />
            ) : (
              <MainButton
                variant="contained"
                color="inherit"
                onClick={handleOrderkyKey}
                fullRounded
              >
                {loadingOrderlyKey && (
                  <Box pr={1}>
                    <IconLoading height={30} width={30} />
                  </Box>
                )}
                <Typography>Create Key</Typography>
              </MainButton>
            )}
          </Box>
        </MainCard>
      </Stack>
    </MainDialog>
  );
};
