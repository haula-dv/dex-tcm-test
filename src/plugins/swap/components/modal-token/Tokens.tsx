import {
	getImageNextwork,
	isTokenSearchState,
	tokenLoadingState,
	tokensSearchState,
	tokensState,
} from "@/common";
import { SearchTokenField } from "@/components/form-control/SearchTokenField";
import { TokenLoading } from "@/components/loading/TokenLoading";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, List, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { MarketsType, useMarkets } from "@orderly.network/hooks";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useStore } from "zustand";
import { tokenInputState, tokenOutputState } from "../../store";
import { TokenItem } from "./TokenItem";
import { ITokenType } from "./TokenListModal";

interface IProps {
	handleSelectToken: (token: any) => void;
	setTokenType: Dispatch<SetStateAction<ITokenType>>;
	type: "input" | "output";
}

export const Tokens = ({ handleSelectToken, setTokenType, type }: IProps) => {
	const [data, { addToHistory, favoriteTabs, updateFavoriteTabs, updateSymbolFavoriteState }] =
		useMarkets(MarketsType.ALL);

	const remapToken = useMemo(() => {
		return data && data.length > 0
			? data.map((item: any) => {
					const [_, base, quote] = item.symbol.split("_");
					return {
						token: base,
						token_account_id: item?.mark_price.toString() ?? "",
						logoURI: getImageNextwork(base, "symbol_logo"),
						decimals: 0,
						minimum_increment: 0,
						amount: 0,
						isInputting: false,
					};
			  })
			: [];
	}, [data]);

	const tokens = useStore(tokensState, (state) => remapToken);
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
			<Stack px={TSizes.margin_common}>
				{tokens.length > 0 ? (
					<SearchTokenField tokens={tokens} />
				) : (
					<SearchTokenField tokens={[]} />
				)}
			</Stack>

			<Box position={"relative"} pb={5}>
				<Typography
					fontWeight={600}
					color={useTheme().palette.grey[600]}
					px={TSizes.margin_common}
					pt={TSizes.margin_common}>
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
								scrollableTarget="scrollableDiv">
								{(isSearchToken ? tokensSearch : tokens).length > 0 ? (
									(isSearchToken ? tokensSearch : tokens).map((item, index) => {
										const isSelected =
											tokenInputCur?.token === item.token || tokenOutputCur?.token === item.token;
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

			{/* <ManageButton>
				<MainButton
					fullWidth
					startIcon={<IconEdit />}
					color="inherit"
					variant="textLink"
					onClick={() => setTokenType('manageTokens')}
				>
					Manage
				</MainButton>
			</ManageButton> */}
		</>
	);
};

interface IToken {
	isSelected?: boolean;
}

const ManageButton = styled(Box)(({ theme }) => ({
	position: "absolute",
	bottom: 0,
	left: 0,
	width: "100%",
	backgroundColor: theme.palette.background.paper,
	borderTop: `1px solid ${setColorThemeMode(theme.palette.common.white, theme.palette.grey[700])}`,
	display: "flex",
	justifyContent: "center",
}));
