"use client";
import { MainDialog } from "@/components/dialog/MainDialog";
import IconCoinBase from "@/components/icons/coinbase";
import IconCryto from "@/components/icons/cryto";
import IconFortmatic from "@/components/icons/fortmatic";
import IconFortis from "@/components/icons/portis";
import IconWalletConnect from "@/components/icons/wallet-connect";
import baselightTheme from "@/utils/themes/custom-theme/DefaultColors";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalConnectWallet = ({ isOpen, onClose }: IProps) => {
  const router = useRouter();

  const wallets = [
    { label: "Metamask", icon: <IconCryto /> },
    { label: "Cyrptooly", icon: <IconCryto /> },
    { label: "WalletConnect", icon: <IconWalletConnect /> },
    { label: "Coinbase Wallet", icon: <IconCoinBase /> },
    { label: "Fortmatic", icon: <IconFortmatic /> },
    { label: "Portis", icon: <IconFortis /> },
  ];

  const handleClickWallet = () => {
    router.push("/welcome");
    onClose();
  };

  return (
    <MainDialog
      open={isOpen}
      handleClose={onClose}
      maxWidth="xs"
      title="Connect to a wallet"
    >
      <Stack spacing={TSizes.margin_sm}>
        {wallets.map((wallet) => (
          <ItemWallet
            key={wallet.label}
            direction={"row"}
            justifyContent={"space-between"}
            onClick={handleClickWallet}
          >
            <Typography fontWeight={600}>{wallet.label}</Typography>
            {wallet.icon}
          </ItemWallet>
        ))}

        <Stack direction={"row"} spacing={0.5}>
          <Typography>New to Ethereum?</Typography>
          <Typography
            fontWeight={600}
            sx={{ textDecoration: "underline" }}
            color={baselightTheme.blue[500]}
          >
            Learn more about wallets
          </Typography>
        </Stack>
      </Stack>
    </MainDialog>
  );
};

const ItemWallet = styled(Stack)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: TSizes.borderRadius,
  alignItems: "center",
  padding: `${TSizes.margin_xs} ${TSizes.margin_sm}`,
  cursor: "pointer",
  transition: "box-shadow 0.3s ease-in-out", // Smooth transition for boxShadow
  "&:hover": {
    boxShadow: theme.shadows[1],
  },
}));
