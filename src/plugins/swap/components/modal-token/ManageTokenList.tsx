import { ITab } from "@/common/types/components/tab";
import { MainIconButton } from "@/components/button/MainIconButton";
import { MainCard } from "@/components/card/MainCard";
import { SearchField } from "@/components/form-control/SearchField";
import SwitchBase from "@/components/form-control/SwitcheBase";
import { GrayTab } from "@/components/tab/GrayTab";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Stack, Typography } from "@mui/material";
import { IconArrowLeft, IconSettings, IconX } from "@tabler/icons-react";
import Image from "next/image";

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

      <Stack pt={2} spacing={TSizes.margin_xs}>
        <MainCard isHover>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Image src={"/images/token.png"} height={32} width={32} alt="" />

              <Stack>
                <Typography fontSize={"16px"}>Liaa</Typography>
                <Stack direction={"row"} spacing={1}>
                  <Typography fontSize={"14px"}>21 token</Typography>

                  <IconSettings size={"1.2rem"} />
                </Stack>
              </Stack>
            </Stack>

            <SwitchBase />
          </Stack>
        </MainCard>

        <MainCard isHover>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={1}>
              <Image src={"/images/token.png"} height={32} width={32} alt="" />

              <Stack>
                <Typography fontSize={"16px"}>Liaa</Typography>
                <Stack direction={"row"} spacing={1}>
                  <Typography fontSize={"14px"}>21 token</Typography>

                  <IconSettings size={"1.2rem"} />
                </Stack>
              </Stack>
            </Stack>

            <SwitchBase />
          </Stack>
        </MainCard>
      </Stack>
    </Box>
  );
};
