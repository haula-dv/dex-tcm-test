import { tokenLoadingState, tokensState } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import { SearchField } from "@/components/form-control/SearchField";
import { TokenLoading } from "@/components/loading/TokenLoading";
import { ITypeSwap } from "@/components/swap/CurrencyField";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import theme from "@/utils/themes/mui-theme";
import { Box, Button, Divider, List, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useStore } from "zustand";
import { tokenInputState, tokenOutputState } from "../../store";
import { TokenItem } from "./TokenItem";
import { ITokenType } from "./TokenListModal";

interface IProps {
  handleSelectToken: (token: any) => void;
  setTokenType: Dispatch<SetStateAction<ITokenType>>;
  type: ITypeSwap;
}

export const Tokens = ({ handleSelectToken, setTokenType, type }: IProps) => {
  const tokens = useStore(tokensState, (state) => state.value);
  const tokenLoading = useStore(tokenLoadingState, (state) => state.value);
  const tokenInputCur = useStore(tokenInputState, (state) => state.value);
  const tokenOutputCur = useStore(tokenOutputState, (state) => state.value);

  const [tokenSlice, setTokeSlice] = useState(30);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (tokenSlice === 100) {
      setHasMore(false);
      return;
    }
    setTokeSlice((prev) => prev + 10);
  };

  return (
    <>
      <Stack px={TSizes.margin_base}>
        <SearchField />

        {tokenLoading ? (
          <TokenLoading style="chip" />
        ) : (
          <Box display={"flex"} flexWrap={"wrap"} gap={1.5} py={2}>
            {tokens.length > 0 &&
              tokens.slice(0, 7).map((item, index) => (
                <Token
                  key={index}
                  variant="outlined"
                  color="inherit"
                  onClick={() => handleSelectToken(item)}
                  isSelected={
                    (type === "input" ? tokenInputCur : tokenOutputCur)
                      ?.symbol === item.symbol
                  }
                >
                  <Image
                    src={item.project.logoUrl}
                    height={24}
                    width={24}
                    alt=""
                  />

                  <Typography fontSize={"14px"} pl={0.5} pr={0.5}>
                    {item.symbol}
                  </Typography>
                </Token>
              ))}
          </Box>
        )}
      </Stack>

      <Divider />

      <Box position={"relative"} pb={5} minHeight={"50vh"}>
        <Typography
          fontWeight={600}
          color={theme.palette.grey[600]}
          px={TSizes.margin_base}
          pt={TSizes.margin_base}
          pb={1}
        >
          Popular tokens
        </Typography>

        {tokenLoading ? (
          <TokenLoading />
        ) : (
          <List sx={{ height: "50vh", overflow: "auto" }} id="scrollableDiv">
            <InfiniteScroll
              dataLength={tokenSlice}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              {tokens.length > 0 &&
                tokens
                  .slice(7, tokenSlice)
                  .map((item, index) => (
                    <TokenItem
                      key={index}
                      item={item}
                      handleSelectToken={handleSelectToken}
                    />
                  ))}
            </InfiniteScroll>
          </List>
        )}
      </Box>

      <ManageButton>
        <MainButton
          fullWidth
          startIcon={<IconEdit />}
          color="inherit"
          onClick={() => setTokenType("manageTokens")}
        >
          Manage
        </MainButton>
      </ManageButton>
    </>
  );
};

interface IToken {
  isSelected?: boolean;
}

const Token = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<IToken>(({ theme, isSelected }) => ({
  padding: "4px",
  minHeight: "auto",
  height: "auto",
  minWidth: "auto",
  borderRadius: "40px",
  borderColor: theme.palette.grey[200],
  ...(isSelected && {
    backgroundColor: theme.palette.grey[100],
  }),
}));

const ManageButton = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
}));
