import { MainButton } from "@/components/button/MainButton";
import { Stack } from "@mui/material";
import { IAccountWallet } from "../type";

interface IProps {
  accountWallet: IAccountWallet;
}

export const WalletConnected = ({ accountWallet }: IProps) => {
  return (
    <Stack>
      <MainButton variant="filledTonal" color="inherit">
        {accountWallet.address.substring(0, 6)}...
        {accountWallet.address.substr(-4)}
      </MainButton>
    </Stack>
  );
};
