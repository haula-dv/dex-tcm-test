import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import { setColorThemeMode } from "@/utils/helpers";
import { Box, Typography, useTheme } from "@mui/material";
import { useAccount } from "@orderly.network/hooks";
import { useConnectWallet } from "@web3-onboard/react";
import { memo } from "react";

const BoxConnectWallet = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const { account } = useAccount();
  const theme = useTheme();

  // Handle connect wallet button
  const handleConnectWallet = async () => {
    await connect().then((res) => {
      if (res && res.length > 0) {
        localStorage.setItem("networkId", "mainnet");
        location.reload();
      }
    });
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
