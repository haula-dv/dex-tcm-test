import { getTokensAPI } from "@/common";
import { MainDialog } from "@/components/dialog/MainDialog";
import { ITypeSwap } from "@/components/swap/CurrencyField";
import { useEffect, useState } from "react";
import { ImportToken } from "./ImportToken";
import { ManageTokenList } from "./ManageTokenList";
import { Tokens } from "./Tokens";

interface IProps {
  open: boolean;
  onClose: () => void;
  handleSelectToken: (token: any) => void;
  field: ITypeSwap;
}

export type ITokenType = "importToken" | "manageTokens" | "tokens";

export const TokenListModal = ({
  open,
  onClose,
  handleSelectToken,
  field,
}: IProps) => {
  const [tokenType, setTokenType] = useState<ITokenType>("tokens");

  useEffect(() => {
    if (open) getTokensAPI();
  }, [open]);

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
          type={field}
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
