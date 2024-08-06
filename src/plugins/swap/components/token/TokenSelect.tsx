"use client";
import { MainButton } from "@/components/button/MainButton";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";

import { ITokenValue } from "../../type";

interface IProps {
  tokenSelected: ITokenValue;
  handleToggleModalTokenList: () => void;
}

export const TokenSelect = ({
  tokenSelected,
  handleToggleModalTokenList,
}: IProps) => {
  return (
    <Box flexShrink={0}>
      <CustomTokenSelect
        variant="contained"
        color={tokenSelected.token ? "inherit" : "secondary"}
        endIcon={<IconChevronDown size={"1.2rem"} />}
        size="small"
        fullRounded
        onClick={handleToggleModalTokenList}
        isSelectedToken={tokenSelected.token?.name ? true : false}
      >
        {tokenSelected.token ? (
          <>
            <Image src={"/images/token.png"} height={24} width={24} alt="" />

            <Typography pl={0.5} fontSize={"13px"} fontWeight={500}>
              {tokenSelected.token.name}
            </Typography>
          </>
        ) : (
          "Select token"
        )}
      </CustomTokenSelect>
    </Box>
  );
};

interface ITokenSelect {
  isSelectedToken?: boolean;
}

export const CustomTokenSelect = styled(MainButton, {
  shouldForwardProp: (prop) => prop !== "isSelectedToken",
})<ITokenSelect>(({ theme, isSelectedToken }) => ({
  ...(isSelectedToken && {
    minWidth: "auto",
    padding: "4px",
    minHeight: "auto",
    backgroundColor: "transparent",
    border: `1px solid ${theme.palette.grey[200]}`,
  }),
}));
