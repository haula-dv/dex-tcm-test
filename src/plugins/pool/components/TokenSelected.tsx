"use client";
import { MainButton } from "@/components/button/MainButton";
import { MainIconButton } from "@/components/button/MainIconButton";
import { MainCard } from "@/components/card/MainCard";
import theme from "@/utils/themes/mui-theme";
import { Collapse, Stack, Typography } from "@mui/material";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export const TokenSelected = () => {
  const [explained, setExpanded] = useState(false);

  const handleToggleExplanation = () => {
    setExpanded(!explained);
  };

  return (
    <MainCard variant="outlined">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Image src={"/images/token.png"} height={34} width={34} alt="" />
          <Image src={"/images/token.png"} height={34} width={34} alt="" />

          <Typography>ETH/AMPL</Typography>
        </Stack>

        <MainIconButton onClick={handleToggleExplanation}>
          <IconChevronDown color={theme.palette.common.black} />
        </MainIconButton>
      </Stack>

      <Collapse in={explained}>
        <Stack spacing={1} py={1}>
          <ItemRow title="Your total tokens" value="0.09087766" />
          <ItemRow title="Pooled ETH" value="0.09087766" />
          <ItemRow title="Pooled AML" value="0.09087766" />
          <ItemRow title="Pooled Share" value="0.09087766" />
        </Stack>

        <MainButton color="inherit" fullWidth size="large">
          View Pair Analytis
        </MainButton>

        <Stack direction={"row"} spacing={2} pt={2}>
          <MainButton color="inherit" variant="outlined" fullWidth size="large">
            Remove
          </MainButton>

          <MainButton
            color="darkPrimary"
            fullWidth
            variant="contained"
            size="large"
          >
            Add
          </MainButton>
        </Stack>
      </Collapse>
    </MainCard>
  );
};

interface IItemRow {
  title: string;
  value: string;
}

const ItemRow = ({ title, value }: IItemRow) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography color={theme.palette.grey[800]}>{title}</Typography>
      <Typography variant="h6" fontWeight={600}>
        {value}
      </Typography>
    </Stack>
  );
};
