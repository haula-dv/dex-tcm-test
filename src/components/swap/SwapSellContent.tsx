"use client";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import theme from "@/utils/themes/mui-theme";
import { Box, InputBase, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Dispatch, SetStateAction, useState } from "react";
import { TokenListModal } from "../../plugins/swap/components/modal-token/TokenListModal";
import { TokenSelect } from "../../plugins/swap/components/token/TokenSelect";

export type ITypeSwap = "sell" | "buy";

interface IProps {
  tokenSelected: any;
  setTokenSelected: Dispatch<
    SetStateAction<{
      token: null;
      amount: number;
    }>
  >;
}

export const SwapSellContent = ({
  tokenSelected,
  setTokenSelected,
}: IProps) => {
  const [openTokenList, setOpenTokenList] = useState(false);

  // Function to select a token
  const handleSelectToken = (token: any) => {
    setTokenSelected({ token: token, amount: 0 });
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
          <Typography color={theme.palette.grey[600]}>Sell</Typography>

          <InputBase placeholder="0" />
          <Typography color={theme.palette.grey[600]}>$7,135.57 </Typography>
        </Stack>

        <TokenSelect
          handleToggleModalTokenList={handleToggleModalTokenList}
          tokenSelected={tokenSelected}
        />
      </Content>

      {openTokenList && (
        <TokenListModal
          open={openTokenList}
          onClose={handleToggleModalTokenList}
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
