import { MainButton } from "@/components/button/MainButton";
import { MainIconButton } from "@/components/button/MainIconButton";
import { MainCard } from "@/components/card/MainCard";
import { CheckBoxBase } from "@/components/form-control/CheckBoxBase";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import theme from "@/utils/themes/mui-theme";
import { Box, Stack, Typography } from "@mui/material";
import { IconArrowLeft, IconX } from "@tabler/icons-react";
import Image from "next/image";

interface IProps {
  handleCloseModal: () => void;
  onBack: () => void;
}

export const ImportToken = ({ handleCloseModal, onBack }: IProps) => {
  return (
    <Box p={TSizes.margin_xs}>
      <Stack direction={"row"} alignItems={"center"}>
        <MainIconButton isFullRounded onClick={onBack}>
          <IconArrowLeft />
        </MainIconButton>

        <Typography flex={1} fontWeight={600} fontSize={"16px"}>
          Import token
        </Typography>

        <MainIconButton isFullRounded onClick={handleCloseModal}>
          <IconX />
        </MainIconButton>
      </Stack>

      <Stack spacing={TSizes.margin_xs} py={TSizes.margin_xs}>
        <MainCard>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Image src={"/images/token.png"} height={30} width={30} alt="" />

            <Stack>
              <Typography fontSize={"16px"}>Token name</Typography>

              <Typography fontSize={"12px"} color={theme.palette.info.main}>
                09xx762hdbjahsgd7asiyiasdasbdjhsutsd7as57d6asdv
              </Typography>

              <Typography color={theme.palette.grey[600]}>Symbol</Typography>
            </Stack>
          </Stack>
        </MainCard>
        <MainCard>
          <Typography
            textAlign={"center"}
            fontSize={"18px"}
            pb={1}
            color={theme.palette.warning.main}
          >
            Trade at your own risk
          </Typography>

          <Typography textAlign={"center"}>
            ONDO is the governance token for Flux Finance and the Ondo DAO. ONDO
            is the governance token for Flux Finance and the Ondo DAO. ONDO is
            the governance token for Flux Finance and the Ondo DAO.
          </Typography>

          <Box display={"flex"} justifyContent={"center"} pt={2}>
            <CheckBoxBase label="I understand" />
          </Box>
        </MainCard>
      </Stack>

      <MainButton variant="contained" color="darkPrimary" fullWidth>
        Import
      </MainButton>
    </Box>
  );
};
