import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import { setColorThemeMode } from "@/utils/helpers";
import { Typography, useTheme } from "@mui/material";
import { useConnectWallet } from "@web3-onboard/react";
import { memo } from "react";

const BoxConnectWallet = () => {
  const [{ wallet: currentWallet, connecting }, connectWallet] = useConnectWallet();
  const theme = useTheme();

  // Handle connect wallet button
  const handleConnectWallet = async () => {
    await connectWallet();
  };

  if (currentWallet) {
    return <></>;
  }

  return (
    <MainCard backgroudColor="primary">
      <Typography
        textAlign={"center"}
        color={setColorThemeMode(
          theme.palette.common.black,
          theme.palette.grey[200]
        )}
        pb="24px"
      >
        Connect your Ethereum wallet to deposit funds & start trading.
      </Typography>

      <MainButton
        fullWidth
        isLoading={connecting}
        variant="contained"
        color="primary"
        onClick={handleConnectWallet}
      >
        Connect Wallet
      </MainButton>
    </MainCard>
  );
};

export default memo(BoxConnectWallet);
