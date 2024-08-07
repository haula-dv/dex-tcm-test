import { MainButton } from "@/components/button/MainButton";
import { MainIconButton } from "@/components/button/MainIconButton";
import IconStarGreen from "@/components/icons/star-green";
import { MainPopup } from "@/components/popup/MainPopup";
import { loadingState } from "@/stores/global-loading";
import { Stack, Typography } from "@mui/material";
import { IconCopy, IconPlugOff } from "@tabler/icons-react";
import { useConnectWallet } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import { useState } from "react";

export const WalletConnected = () => {
  const [{ wallet }, _, disconnectWallet] = useConnectWallet();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = async () => {
    setZustandValue(loadingState, true);
    // Disconnect from wallet
    if (wallet) await disconnectWallet({ label: wallet.label });
    setZustandValue(loadingState, false);
  };

  return (
    <>
      {wallet && (
        <Stack direction={"row"} spacing={1.5} alignItems={"center"} pb={2}>
          <Typography fontSize={"18px"} fontWeight={600}>
            {wallet.accounts[0].balance ? wallet.accounts[0].balance.ETH : 0}{" "}
            ETH
          </Typography>

          <MainButton
            variant="filledTonal"
            color="inherit"
            startIcon={<IconStarGreen />}
            id="wallet-button"
            aria-controls={open ? "wallet-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {wallet.accounts[0].address.substring(0, 6)}...
            {wallet.accounts[0].address.substr(-4)}
          </MainButton>
        </Stack>
      )}

      <MainPopup
        id="wallet-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "wallet-button",
        }}
      >
        <Stack px={2} py={1.8}>
          {wallet && (
            <Stack direction={"row"} spacing={1.5} alignItems={"center"} pb={2}>
              <Typography fontWeight={600}>
                {wallet.accounts[0].address.substring(0, 20)}...
                {wallet.accounts[0].address.substr(-4)}
              </Typography>

              <MainIconButton size="small">
                <IconCopy size={"1.2rem"} />
              </MainIconButton>
            </Stack>
          )}

          <MainButton
            startIcon={<IconPlugOff />}
            variant="filledTonal"
            color="inherit"
            onClick={handleDisconnect}
          >
            Disconnect
          </MainButton>
        </Stack>
      </MainPopup>
    </>
  );
};
