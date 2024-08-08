"use client";
import theme from "@/utils/themes/mui-theme";
import { InputBase, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { TokenSelect } from "../../plugins/swap/components/token/TokenSelect";
import { Content } from "./SwapSellContent";

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

export const SwapBuyContent = ({ tokenSelected, setTokenSelected }: IProps) => {
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

      {/* {openTokenList && (
        <TokenListModal
          open={openTokenList}
          onClose={handleToggleModalTokenList}
          handleSelectToken={handleSelectToken}
        />
      )} */}
    </>
  );
};
