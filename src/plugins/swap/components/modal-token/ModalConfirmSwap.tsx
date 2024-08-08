import { ITab } from "@/common/types/components/tab";
import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import { MainDialog } from "@/components/dialog/MainDialog";
import { GrayTab } from "@/components/tab/GrayTab";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import theme from "@/utils/themes/mui-theme";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { setZustandValue } from "nes-zustand";
import Image from "next/image";
import { isTransactionSubmittedState } from "../../store";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const ModalConfirmSwap = ({ onClose, open }: IProps) => {
  const tabs: ITab[] = [
    { label: "Details", value: 1 },
    { label: "Data", value: 2 },
  ];

  const handleConfirm = () => {
    setZustandValue(isTransactionSubmittedState, true);
    onClose();
  };

  return (
    <MainDialog
      open={open}
      handleClose={onClose}
      maxWidth="xs"
      title="Swap Exact ETH for Token"
      isBGWhite
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1} pb={0.5}>
        <Typography fontSize={"22px"}>0.5</Typography>
        <Image src={"/images/token.png"} height={24} width={24} alt="" />
      </Stack>

      <Typography pb={2}>Balance: $099998</Typography>

      <GrayTab tabs={tabs} />

      <Box pt={2} />

      <MainCard disablePadding>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          p={TSizes.margin_base}
        >
          <Stack>
            <Typography>Gas fee</Typography>
            <MainButton color="secondary" size="xsmall" variant="contained">
              Edit
            </MainButton>
          </Stack>

          <Stack>
            <Typography textAlign={"end"}>09988 ETH</Typography>
            <Typography
              textAlign={"end"}
              fontSize={"12px"}
              color={theme.palette.grey[800]}
            >
              $767
            </Typography>
          </Stack>
        </Stack>

        <Divider />

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          p={TSizes.margin_base}
        >
          <Typography>Total amount</Typography>

          <Stack>
            <Typography>09988 ETH</Typography>
            <Typography
              textAlign={"end"}
              fontSize={"12px"}
              color={theme.palette.grey[800]}
            >
              $767
            </Typography>
          </Stack>
        </Stack>
      </MainCard>

      <Stack direction={"row"} spacing={2} pt={2}>
        <MainButton
          onClick={onClose}
          variant="outlined"
          color="inherit"
          fullWidth
        >
          Reject
        </MainButton>

        <MainButton
          variant="contained"
          color="darkPrimary"
          fullWidth
          onClick={handleConfirm}
        >
          Confirm Swap
        </MainButton>
      </Stack>
    </MainDialog>
  );
};
