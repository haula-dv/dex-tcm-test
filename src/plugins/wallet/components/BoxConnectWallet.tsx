import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Typography, useTheme } from "@mui/material";
import { useWalletConnector } from "@orderly.network/hooks";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { memo } from "react";

const BoxConnectWallet = () => {
  const { wallet, connecting } = useWalletConnector();
  const { open } = useWeb3Modal();
  const theme = useTheme();

  // Handle connect wallet button
  const handleConnectWallet = async () => {
    await open();
  };

  if (wallet) {
    return <></>;
  }

  return (
    <Box>
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
    </Box>
  );
};

export default memo(BoxConnectWallet);
