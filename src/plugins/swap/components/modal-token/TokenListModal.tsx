import { fetchTopTokensAPI, tokenParamsState } from "@/common";
import { MainDialog } from "@/components/dialog/MainDialog";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { ImportToken } from "./ImportToken";
import { ManageTokenList } from "./ManageTokenList";
import { Tokens } from "./Tokens";

interface IProps {
  open: boolean;
  onClose: () => void;
  handleSelectToken: (token: any) => void;
}

export type ITokenType = "importToken" | "manageTokens" | "tokens";

export const TokenListModal = ({
  open,
  onClose,
  handleSelectToken,
}: IProps) => {
  const [tokenType, setTokenType] = useState<ITokenType>("tokens");

  const tokenParams = useStore(tokenParamsState, (state) => state.value);

  useEffect(() => {
    fetchTopTokensAPI(tokenParams);
  }, [tokenParams]);

  return (
    <MainDialog
      open={open}
      handleClose={onClose}
      title="Select a token"
      maxWidth="xs"
      disablePadding
      isBGWhite
      hiddenHeader={tokenType !== "tokens"}
    >
      {tokenType === "tokens" && (
        <Tokens
          handleSelectToken={handleSelectToken}
          setTokenType={setTokenType}
        />
      )}

      {tokenType === "manageTokens" && (
        <ManageTokenList
          handleCloseModal={onClose}
          onBack={() => setTokenType("tokens")}
        />
      )}

      {tokenType === "importToken" && (
        <ImportToken
          handleCloseModal={onClose}
          onBack={() => setTokenType("tokens")}
        />
      )}
    </MainDialog>
  );
};
