import { getImageNextwork } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import { MainPopup } from "@/components/popup/MainPopup";
import { TokenIcon } from "@/components/token/TokenIcon";
import { hexChainId, idFromHexChainId } from "@/utils/formatters/token";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useChains } from "@orderly.network/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { useSetChain } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { supportedChainsLoadingState } from "../store";
import { NetworkItem } from "./NetworkItem";

export const ChainsButton = () => {
  const [{ connectedChain }, setChain] = useSetChain();
  const chains = useChains();
  const [_, { findByChainId }] = useChains();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ZUSTAND
  const supportedChainsLoading = useStore(
    supportedChainsLoadingState,
    (state) => state.value
  );

  // Handle change network
  const handleChangeNextwork = async (chainId: number) => {
    handleClose();
    setZustandValue(supportedChainsLoadingState, true);

    await setChain({
      chainId: hexChainId(chainId),
      chainNamespace: "evm",
    });
    setZustandValue(supportedChainsLoadingState, false);
  };

  // GET CURRENT CHAIN
  const currentChain = findByChainId(
    idFromHexChainId(connectedChain?.id ?? "")
  );

  useEffect(() => {
    if (currentChain) {
      setZustandValue(supportedChainsLoadingState, false);
    }
  }, [currentChain]);

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
        {supportedChainsLoading ? (
          "CHAINING"
        ) : (
          <Typography>
            {currentChain?.network_infos?.name.slice(0, 4)}...
          </Typography>
        )}
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
        <Box
          width={"100%"}
          maxWidth={"240px"}
          px={TSizes.margin_sm}
          py={TSizes.margin_xs}
        >
          <Stack pb={2}>
            <Typography fontWeight={600} pb={0.5}>
              Mainnest
            </Typography>

            <Grid container spacing={1}>
              {chains &&
                (chains[0].mainnet as any).length > 0 &&
                chains[0].mainnet.map((chain, index) => {
                  const isSelected =
                    currentChain?.network_infos.chain_id ===
                    chain.network_infos.chain_id;
                  return (
                    <NetworkItem
                      key={index}
                      chain={chain}
                      handleChangeNextwork={handleChangeNextwork}
                      isSelected={isSelected}
                    />
                  );
                })}
            </Grid>
          </Stack>

          <Stack>
            <Typography fontWeight={600} pb={0.5}>
              Testnest
            </Typography>

            <Grid container spacing={1}>
              {chains &&
                (chains[0].testnet as any).length > 0 &&
                chains[0].testnet.map((chain, index) => {
                  const isSelected =
                    currentChain?.network_infos.chain_id ===
                    chain.network_infos.chain_id;
                  return (
                    <NetworkItem
                      key={index}
                      chain={chain}
                      handleChangeNextwork={handleChangeNextwork}
                      isSelected={isSelected}
                    />
                  );
                })}
            </Grid>
          </Stack>
        </Box>
      </MainPopup>
    </>
  );
};
