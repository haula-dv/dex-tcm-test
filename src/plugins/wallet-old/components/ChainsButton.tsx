import { getImageNextwork } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import { MainPopup } from "@/components/popup/MainPopup";
import { TokenIcon } from "@/components/token/TokenIcon";
import { idFromHexChainId } from "@/utils/formatters/token";
import { useChains } from "@orderly.network/hooks";
import { API } from "@orderly.network/types";
import { IconChevronDown } from "@tabler/icons-react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";
import { supportedChainsLoadingState } from "../store";
import { ChainList } from "./ChainList";

export const ChainsButton = () => {
  const [{ connectedChain }, setChain] = useSetChain();
  const [_, { findByChainId }] = useChains();
  const [{ wallet }, connect, disconnectWallet] = useConnectWallet();
  const chains = useChains();

  // STATE
  const [currentChainSelected, setCurrentChainSelected] =
    useState<API.Chain | null>(null);

  // SHOW POPUP
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle get chain selected
  const handleGetChainSelected = useCallback((chain?: API.Chain) => {
    if (chain) {
      setCurrentChainSelected(chain);
    }
  }, []);

  // Handle close popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ZUSTAND
  const supportedChainsLoading = useStore(
    supportedChainsLoadingState,
    (state) => state.value
  );

  // GET CURRENT CHAIN
  const currentChain = findByChainId(
    idFromHexChainId(connectedChain?.id ?? "")
  );

  useEffect(() => {
    if (currentChain) {
      setZustandValue(supportedChainsLoadingState, false);
    }
  }, [currentChain]);

  // Handle render chain text
  const renderChainItem = () => {
    if (currentChainSelected) {
      return `${currentChainSelected?.network_infos?.name.slice(0, 4)}...`;
    }

    if (supportedChainsLoading) {
      return "Requesting...";
    }

    if (!currentChain) {
      const currentChain = chains[0].mainnet[0];

      if (currentChain) {
        return `${currentChain?.network_infos?.name.slice(0, 4)}...`;
      } else {
        return "Unsupported";
      }
    } else {
      return `${currentChain?.network_infos?.name.slice(0, 4)}...`;
    }
  };

  return (
    <>
      <MainButton
        isLoading={supportedChainsLoading}
        variant="filledTonal"
        color="inherit"
        id="chain-button"
        aria-controls={open ? "chain-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<IconChevronDown size={"1.5rem"} />}
        startIcon={
          supportedChainsLoading ? null : currentChain ? (
            <TokenIcon
              url={getImageNextwork(currentChain?.network_infos.chain_id)}
            />
          ) : null
        }
      >
        {renderChainItem()}
      </MainButton>

      <MainPopup
        id="chain-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "chain-button",
        }}
      >
        <ChainList handleClose={handleGetChainSelected} />
      </MainPopup>
    </>
  );
};
