import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import { MainDialog } from "@/components/dialog/MainDialog";
import { TokenChip } from "@/components/swap/TokenChip";
import { ItemRow } from "@/plugins/pool/components/TokenSelected";
import theme from "@/utils/themes/mui-theme";
import { Stack, Typography } from "@mui/material";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const ModalConfirmLiquidity = ({ onClose, open }: IProps) => {
  return (
    <MainDialog
      open={open}
      handleClose={onClose}
      maxWidth="xs"
      title="You will Receice"
    >
      <Stack spacing={2}>
        <ItemRow
          title="0.09087766"
          value={
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Typography fontWeight={600}>ETH</Typography>
              <TokenChip />
            </Stack>
          }
        />

        <ItemRow
          title="0.09087766"
          value={
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Typography fontWeight={600}>ETH</Typography>
              <TokenChip />
            </Stack>
          }
        />

        <Typography color={theme.palette.grey[900]}>
          You are the first liquidity provider You are the first liquidity
          provider You are the first liquidity provider You are the first
          liquidity provider You are the first liquidity
        </Typography>

        <MainCard backgroudColor="white">
          <Typography pb={1} fontSize={"16px"} fontWeight={600}>
            Deva
          </Typography>

          <Stack spacing={1}>
            <ItemRow title="Price" value="Recive WETH" />

            <ItemRow title="Bured" value="Recive WETH" />
          </Stack>
        </MainCard>

        <MainButton variant="contained" color="darkPrimary">
          Confirm
        </MainButton>
      </Stack>
    </MainDialog>
  );
};
