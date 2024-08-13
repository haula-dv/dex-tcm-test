import {
  isTokenSearchState,
  tokenLoadingState,
  tokensSearchState,
  tokensState,
} from "@/common";
import { MainButton } from "@/components/button/MainButton";
import { SearchTokenField } from "@/components/form-control/SearchTokenField";
import { TokenLoading } from "@/components/loading/TokenLoading";
import { ITypeSwap } from "@/components/swap/CurrencyField";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import theme from "@/utils/themes/mui-theme";
import { Box, Button, List, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconEdit } from "@tabler/icons-react";
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
  const isSearchToken = useStore(isTokenSearchState, (state) => state.value);
  const tokensSearch = useStore(tokensSearchState, (state) => state.value);

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
        {tokens.length > 0 && <SearchTokenField tokens={tokens} />}
      </Stack>

      <Box position={"relative"} pb={5}>
        <Typography
          fontWeight={600}
          color={theme.palette.grey[600]}
          px={TSizes.margin_base}
          pt={TSizes.margin_base}
          pb={1}
        >
          Popular tokens
        </Typography>

        <Box height={"50vh"}>
          {tokenLoading ? (
            <TokenLoading />
          ) : (
            <List sx={{ height: "50vh", overflow: "auto" }} id="scrollableDiv">
              <InfiniteScroll
                dataLength={tokenSlice}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={""}
                scrollableTarget="scrollableDiv"
              >
                {(isSearchToken ? tokensSearch : tokens).length > 0 ? (
                  (isSearchToken ? tokensSearch : tokens).map((item, index) => {
                    const isSelected =
                      (type == "input" ? tokenInputCur : tokenOutputCur)
                        ?.token === item.token;
                    return (
                      <TokenItem
                        key={index}
                        isImportToken={index == 1}
                        item={item}
                        isSelected={isSelected}
                        handleSelectToken={() => handleSelectToken(item)}
                      />
                    );
                  })
                ) : (
                  <Typography textAlign={"center"} pt={2}>
                    No results found.
                  </Typography>
                )}
              </InfiniteScroll>
            </List>
          )}
        </Box>
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
