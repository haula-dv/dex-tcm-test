import { themeSelectorState } from "@/common/stores/common";
import { MainButton } from "@/components/button/MainButton";
import IconLoading from "@/components/icons/loading";

import { MainIconButton } from "@/components/button/MainIconButton";
import { TLocalStorage } from "@/utils/constants/key_store";
import { formartAddress } from "@/utils/formatters/token";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Stack, useTheme } from "@mui/material";
import { useAccountInstance } from "@orderly.network/hooks";
import { ChainNamespace } from "@orderly.network/types";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useConnectWallet } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import AccountDetailPopup from "./AccountDetailPopup";

const DynamicNetworkContent = dynamic(() => import("./NetworkContentV2"));

interface IWalletContainerProps {
  isMobile?: boolean;
}

export default function WalletContainer({ isMobile = false }: IWalletContainerProps) {
  const [{ wallet: currentWallet, connecting }, connectWallet] = useConnectWallet();
  const themeSelector = useStore(themeSelectorState, (state) => state.value);
  const [openAccountDetailsModal, setAccountDetailsModal] = useState(false);
  const account = useAccountInstance();

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
    if (Array.isArray(currentWallet?.accounts) && currentWallet.accounts.length > 0) {
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
      });
    }
  }, [account, currentWallet]);

  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      <DynamicNetworkContent isMobile={isMobile} />

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
              <MainButton
                variant="contained"
                size={isMobile ? "small" : "medium"}
                color={setColorThemeMode("darkGrey", "white")}
                onClick={handleToggleAccountMenu}
              >
                {formartAddress(currentWallet.accounts[0].address)}
              </MainButton>

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
