"use client";
import { MainIconButton } from "@/components/button/MainIconButton";
import { MainCard } from "@/components/card/MainCard";
import theme from "@/utils/themes/mui-theme";
import { Stack, Typography } from "@mui/material";
import { IconChevronDown } from "@tabler/icons-react";

export const AccountAnalystic = () => {
  return (
    <MainCard variant="outlined">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>Account Analytics and accrued fees</Typography>

        <MainIconButton>
          <IconChevronDown color={theme.palette.common.black} />
        </MainIconButton>
      </Stack>
    </MainCard>
  );
};
