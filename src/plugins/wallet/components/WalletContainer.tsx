import { MainIconButton } from "@/components/button/MainIconButton";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Button, Stack } from "@mui/material";
import { IconDots } from "@tabler/icons-react";

export const WalletContainer = () => {
  return (
    <Stack direction={"row"} spacing={TSizes.margin_sm}>
      <Button variant="contained" color="secondary">
        0 SAP
      </Button>

      <Button variant="contained" color="darkPrimary">
        Connect to Wallet
      </Button>

      <MainIconButton>
        <IconDots />
      </MainIconButton>
    </Stack>
  );
};
