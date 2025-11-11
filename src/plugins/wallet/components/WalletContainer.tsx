import { themeSelectorState } from "@/common/stores/common";
import { MainIconButton } from "@/components/button/MainIconButton";

import { TLocalStorage } from "@/utils/constants/key_store";
import { Stack, useTheme } from "@mui/material";
import { useWalletConnector } from "@orderly.network/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { setZustandValue } from "nes-zustand";
import { useState } from "react";
import { useStore } from "zustand";

export default function WalletContainer() {
  const themeSelector = useStore(themeSelectorState, (state) => state.value);
  const theme = useTheme();

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

  // Account Details
  const [openAccountDetailsModal, setAccountDetailsModal] = useState(false);

  const { wallet, connecting, disconnect } = useWalletConnector();
  const { open } = useWeb3Modal();

  // Handle connect wallet button
  const handleConnectWallet = async () => {
    await open();
  };

  // Handle close menu account
  const handleToggleAccountMenu = () => {
    setAccountDetailsModal(!openAccountDetailsModal);
  };

  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      {/* {wallet && <NetworkContent />}

      {connecting ? (
        <MainButton
          startIcon={<IconLoading height="20px" width="20px" />}
          variant="contained"
          color={setColorThemeMode("darkGrey", "white")}
        >
          Connecting
        </MainButton>
      ) : (
        <>
          {!wallet ? (
            <MainButton
              onClick={handleConnectWallet}
              variant="contained"
              color={setColorThemeMode("darkGrey", "white")}
            >
              Connect to Wallet
            </MainButton>
          ) : (
            <>
              <MainButton
                variant="contained"
                color={setColorThemeMode("darkGrey", "white")}
                onClick={handleToggleAccountMenu}
              >
                {formartAddress(wallet.accounts?.[0]?.address || "")}
              </MainButton>

              {wallet.icon && (
                <Box
                  height={"40px"}
                  width={"40px"}
                  bgcolor={theme.palette.info.light}
                  borderRadius={"50%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {wallet.icon.startsWith("data:image") ? (
                    <Image
                      src={wallet.icon}
                      height={20}
                      width={20}
                      alt={wallet.label}
                    />
                  ) : (
                    <div
                      style={{ padding: "6px" }}
                      dangerouslySetInnerHTML={{ __html: wallet.icon }}
                    ></div>
                  )}
                </Box>
              )}
            </>
          )}
        </>
      )}

      {openAccountDetailsModal && wallet && (
        <AccountDetailPopup
          open={openAccountDetailsModal}
          onClose={() => setAccountDetailsModal(false)}
          wallet={wallet}
          disconnect={disconnect}
        />
      )}

      <OrderlyConnect /> */}

      <MainIconButton onClick={handleChangeTheme} color="inherit">
        {themeSelector.activeMode == "light" ? <IconSun /> : <IconMoonStars />}
      </MainIconButton>
    </Stack>
  );
}
