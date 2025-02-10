import { themeSelectorState } from "@/common/stores/common";
import { MainButton } from "@/components/button/MainButton";
import { MainIconButton } from "@/components/button/MainIconButton";
import IconLoading from "@/components/icons/loading";

import { TLocalStorage } from "@/utils/constants/key_store";
import { formartAddress } from "@/utils/formatters/token";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Stack, useTheme } from "@mui/material";
import { useAccount } from "@orderly.network/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useConnectWallet } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import AccountDetailPopup from "./AccountDetailPopup";
import NetworkContent from "./NetworkContent";
import { OrderlyConnect } from "./OrderlyConnect";

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

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const { account } = useAccount();

  // Handle connect wallet button
  const handleConnectWallet = async () => {
    await connect().then((res) => {
      if (res && res.length > 0) {
        location.reload();
      }
    });
  };

  // Handle close menu account
  const handleToggleAccountMenu = () => {
    setAccountDetailsModal(!openAccountDetailsModal);
  };

  // Watch wallet change
  useEffect(() => {
    if (Array.isArray(wallet?.accounts) && wallet.accounts.length > 0) {
      const item = wallet.accounts[0];
      const chain = wallet.chains[0];

      account.setAddress(item.address, {
        provider: wallet.provider,
        chain: {
          id: chain.id,
        },
        wallet: {
          name: wallet.label,
        },
      });
    }
  }, [account, wallet]);

  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      {wallet && <NetworkContent />}

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
                {formartAddress(wallet.accounts[0].address)}
              </MainButton>

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

      <OrderlyConnect />

      <MainIconButton onClick={handleChangeTheme} color="inherit">
        {themeSelector.activeMode == "light" ? <IconSun /> : <IconMoonStars />}
      </MainIconButton>
    </Stack>
  );
}
