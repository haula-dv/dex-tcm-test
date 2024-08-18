import { MainButton } from "@/components/button/MainButton";
import { useConnectWallet } from "@web3-onboard/react";

export const ConnectWalletButton = () => {
  const [{ wallet }, connectWallet, _] = useConnectWallet();

  return (
    <MainButton
      variant="contained"
      color="darkPrimary"
      onClick={async () => {
        if (wallet) return;
        await connectWallet();
      }}
    >
      Connect to Wallet
    </MainButton>
  );
};
