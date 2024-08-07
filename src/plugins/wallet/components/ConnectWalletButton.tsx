import { Button } from "@mui/material";
import { useConnectWallet } from "@web3-onboard/react";

export const ConnectWalletButton = () => {
  const [{ wallet }, connectWallet, _] = useConnectWallet();

  return (
    <Button
      variant="contained"
      color="darkPrimary"
      // onClick={handleToggleModalConnectWallet}
      onClick={async () => {
        if (wallet) return;
        await connectWallet();
      }}
    >
      Connect to Wallet
    </Button>
  );
};
