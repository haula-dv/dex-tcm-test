import { themeSelectorState } from "@/common/stores/common";
import { MainButton } from "@/components/button/MainButton";
import IconLoading from "@/components/icons/loading";

import { useOrderlyConnectModal } from "@/app/(main)/layout";
import { MainIconButton } from "@/components/button/MainIconButton";
import { TLocalStorage } from "@/utils/constants/key_store";
import { formartAddress } from "@/utils/formatters/token";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Stack, useTheme } from "@mui/material";
import { useAccountInstance, useWalletConnector } from "@orderly.network/hooks";
import { ChainNamespace } from "@orderly.network/types";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useConnectWallet } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "zustand";
import AccountDetailPopup from "./AccountDetailPopup";
import NetworkContentV2 from "./NetworkContentV2";


interface IWalletContainerProps {
  isMobile?: boolean;
}

export default function WalletContainer({ isMobile = false }: IWalletContainerProps) {
  const [{ wallet: currentWallet, connecting }, connectWallet] = useConnectWallet();
  const themeSelector = useStore(themeSelectorState, (state) => state.value);
  const [openAccountDetailsModal, setAccountDetailsModal] = useState(false);
  const account = useAccountInstance();
  const { connectedChain: connectedEvmChain } = useWalletConnector();
  const evmAddress = useMemo(() => currentWallet?.accounts[0].address, [currentWallet]);
  const { openModal, hasOrderlyKey, isRegistered } = useOrderlyConnectModal();

  const theme = useTheme();
  // Handle close menu account
  const handleToggleAccountMenu = () => {
    setAccountDetailsModal(!openAccountDetailsModal);
  };

  // Handle change theme mode
  const handleChangeTheme = () => {
    localStorage.setItem(
      TLocalStorage.DEX_THEME_MODE,
      themeSelector.activeMode == "light" ? "dark" : "light"
    );
    setZustandValue(themeSelectorState, (prev: any) => {
      return {
        ...prev,
        activeMode: prev.activeMode == "light" ? "dark" : "light",
      };
    });

    location.reload();
  };

  // Watch wallet change
  useEffect(() => {
    if (!currentWallet || !connectedEvmChain || !evmAddress) return;

    const item = currentWallet.accounts[0];
    const currentChainId = currentWallet.chains[0].id;

    account.setAddress(item.address, {
      provider: currentWallet.provider,
      chain: {
        id: currentChainId,
        namespace: 'evm' as ChainNamespace,
      },
      wallet: {
        name: currentWallet.label,
      },
    }).then(() => {
      window.localStorage.setItem('chain-namespace', ChainNamespace.evm);
    })
  }, [account, currentWallet]);

  useEffect(() => {
    if (account.address && isRegistered && !hasOrderlyKey) {
      setTimeout(() => {
        openModal();
      }, 1000)
    }
  }, [account.address, isRegistered, hasOrderlyKey])

  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      {evmAddress && <NetworkContentV2 isMobile={isMobile} />}

      {connecting ? (
        <MainButton
          startIcon={<IconLoading height="20px" width="20px" />}
          variant="contained"
          size={isMobile ? "small" : "medium"}
          color={setColorThemeMode("darkGrey", "white")}
        >
          Connecting
        </MainButton>
      ) : (
        <>
          {!currentWallet ? (
            <MainButton
              onClick={async () => await connectWallet()}
              variant="contained"
              size={isMobile ? "small" : "medium"}
              color={setColorThemeMode("darkGrey", "white")}
            >
              Connect to Wallet
            </MainButton>
          ) : (
            <>
              {/* Show Enable Trading button if no key, otherwise show address */}
              {!hasOrderlyKey ? (
                <MainButton
                  onClick={openModal}
                  variant="contained"
                  size={isMobile ? "small" : "medium"}
                  color="primary"
                >
                  Enable Trading
                </MainButton>
              ) : (
                <MainButton
                  variant="contained"
                  size={isMobile ? "small" : "medium"}
                  color={setColorThemeMode("darkGrey", "white")}
                  onClick={handleToggleAccountMenu}
                >
                  {formartAddress(currentWallet.accounts[0].address)}
                </MainButton>
              )}

              {!isMobile && (
                <Box
                  height={"40px"}
                  width={"40px"}
                  bgcolor={theme.palette.info.light}
                  borderRadius={"50%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {currentWallet.icon.startsWith("data:image") ? (
                    <Image
                      src={currentWallet.icon}
                      height={20}
                      width={20}
                      alt={currentWallet.label}
                    />
                  ) : (
                    <div
                      style={{ padding: "6px" }}
                      dangerouslySetInnerHTML={{ __html: currentWallet.icon }}
                    ></div>
                  )}
                </Box>
              )}
            </>
          )}
        </>
      )}

      {openAccountDetailsModal && currentWallet && (
        <AccountDetailPopup
          open={openAccountDetailsModal}
          onClose={() => setAccountDetailsModal(false)}
          wallet={currentWallet as any}
        />
      )}

      {!isMobile && (
        <MainIconButton onClick={handleChangeTheme} color="inherit">
          {themeSelector.activeMode == "light" ? <IconSun /> : <IconMoonStars />}
        </MainIconButton>
      )}
    </Stack>
  );
}
