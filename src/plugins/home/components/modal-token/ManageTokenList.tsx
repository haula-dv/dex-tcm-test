import { MainIconButton } from "@/components/button/MainIconButton";
import { MainCard } from "@/components/card/MainCard";
import { SearchField } from "@/components/form-control/SearchField";
import { GrayTab } from "@/components/tab/GrayTab";
import { ITab } from "@/types/components/tab";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Stack, Typography } from "@mui/material";
import { IconArrowLeft, IconX } from "@tabler/icons-react";

interface IProps {
  onBack: () => void;
  handleCloseModal: () => void;
}

export const ManageTokenList = ({ onBack, handleCloseModal }: IProps) => {
  const tabs: ITab[] = [
    { label: "Lists", value: 1 },
    { label: "Tokens", value: 2 },
  ];

  return (
    <Box p={TSizes.margin_xs}>
      <Stack direction={"row"} alignItems={"center"} pb={TSizes.margin_xs}>
        <MainIconButton isFullRounded onClick={onBack}>
          <IconArrowLeft />
        </MainIconButton>

        <Typography flex={1} fontWeight={600} fontSize={"16px"}>
          Manage
        </Typography>

        <MainIconButton isFullRounded onClick={handleCloseModal}>
          <IconX />
        </MainIconButton>
      </Stack>

      <GrayTab tabs={tabs} />
      <Box pt={2} />
      <SearchField />

      <Stack pt={2}>
        <MainCard>Token</MainCard>
      </Stack>
    </Box>
  );
};
