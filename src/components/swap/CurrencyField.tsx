"use client";
import { ITokenType } from "@/common";
import { TokenSelect } from "@/plugins/swap/components/token/TokenSelect";
import { tokenInputState, tokenOutputState } from "@/plugins/swap/store";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import theme from "@/utils/themes/mui-theme";
import { Box, InputBase, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { setZustandValue } from "nes-zustand";
import { FocusEvent, useState } from "react";
import { TokenListModal } from "../../plugins/swap/components/modal-token/TokenListModal";

export type ITypeSwap = "input" | "output";

interface IProps {
  currentToken: ITokenType | null;
  field: ITypeSwap;
  handleGetSwapPrice?: (value: number) => void;
}

export const CurrencyField = ({
  currentToken,
  handleGetSwapPrice,
  field,
}: IProps) => {
  const [openTokenList, setOpenTokenList] = useState(false);

  const getPrice = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    handleGetSwapPrice && handleGetSwapPrice(+e.target.value);
  };

  // Function to select a token
  const handleSelectToken = (token: ITokenType) => {
    if (field == "input") {
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
          <Typography color={theme.palette.grey[900]} fontWeight={600}>
            {field === "input" ? "Sell" : "Buy"}
          </Typography>

          <InputBase placeholder="0.0" type="number" onBlur={getPrice} />
          <Typography color={theme.palette.grey[600]}>
            Balance: 0.00{" "}
          </Typography>
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
          field={field}
          handleSelectToken={handleSelectToken}
        />
      )}
    </>
  );
};

export const Content = styled(Box)(({ theme }) => ({
  borderRadius: TSizes.borderRadiusMd,
  border: `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.grey[50],
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
