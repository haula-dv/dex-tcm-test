"use client";
import { ITokenType } from "@/common";
import { TokenSelect } from "@/plugins/swap/components/token/TokenSelect";
import { tokenInputState, tokenOutputState } from "@/plugins/swap/store";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import theme from "@/utils/themes/mui-theme";
import { Box, InputBase, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { setZustandValue } from "nes-zustand";
import { useState } from "react";
import { TokenListModal } from "../../plugins/swap/components/modal-token/TokenListModal";

export type ITypeSwap = "input" | "output";

interface IProps {
  currentToken: ITokenType | null;
  type: ITypeSwap;
}

export const CurrencyField = ({ currentToken, type }: IProps) => {
  const [openTokenList, setOpenTokenList] = useState(false);

  // Function to select a token
  const handleSelectToken = (token: ITokenType) => {
    if (type == "input") {
      setZustandValue(tokenInputState, token);
    } else {
      setZustandValue(tokenOutputState, token);
    }

    handleToggleModalTokenList();
  };

  // Modal show modal token
  const handleToggleModalTokenList = () => {
    setOpenTokenList(!openTokenList);
  };

  return (
    <>
      <Content>
        <Stack>
          <Typography color={theme.palette.grey[600]}>
            {type === "input" ? "Sell" : "Buy"}
          </Typography>

          <InputBase placeholder="0" />
          <Typography color={theme.palette.grey[600]}>$7,135.57 </Typography>
        </Stack>

        <TokenSelect
          handleToggleModalTokenList={handleToggleModalTokenList}
          tokenSelected={currentToken}
        />
      </Content>

      {openTokenList && (
        <TokenListModal
          open={openTokenList}
          onClose={handleToggleModalTokenList}
          type={type}
          handleSelectToken={handleSelectToken}
        />
      )}
    </>
  );
};

export const Content = styled(Box)(({ theme }) => ({
  borderRadius: TSizes.borderRadiusMd,
  border: `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",

  "&:hover": {
    borderColor: theme.palette.grey[200],
  },

  "& .MuiInputBase-input": {
    fontSize: "24px",
    fontWeight: 600,
  },
}));
