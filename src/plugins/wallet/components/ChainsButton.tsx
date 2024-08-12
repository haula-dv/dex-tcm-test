import { MainButton } from "@/components/button/MainButton";
import { MainPopup } from "@/components/popup/MainPopup";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useChains } from "@orderly.network/hooks";
import { useSetChain } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { supportedChainsLoadingState, supportedChainsState } from "../store";

export const ChainsButton = () => {
  const [{ connectedChain }] = useSetChain();
  const chains = useChains();

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

  const supportedChains = useStore(
    supportedChainsState,
    (state) => state.value
  );

  console.log(connectedChain, chains);

  useEffect(() => {
    if (chains && (chains[0].mainnet as any).length > 0) {
      setZustandValue(supportedChainsLoadingState, false);
    }
  }, [chains]);

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
      >
        {supportedChainsLoading ? "CHAINING" : <>12</>}
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
          maxWidth={"300px"}
          px={TSizes.margin_sm}
          py={TSizes.margin_xs}
        >
          <Stack>
            <Typography fontWeight={600} pb={1}>
              Mainnest
            </Typography>

            <Grid container spacing={1.5}>
              {chains &&
                (chains[0].testnet as any).length > 0 &&
                chains[0].mainnet
                  .sort((a, b) =>
                    a?.network_infos?.name
                      .toLowerCase()
                      .localeCompare(b?.network_infos?.name.toLowerCase())
                  )
                  .map((chain, index) => (
                    <Grid item md={6} key={index}>
                      <MainButton
                        size="xsmall"
                        color="inherit"
                        startIcon={
                          <Image
                            src={"/images/token.png"}
                            height={20}
                            width={20}
                            alt=""
                            style={{ overflow: "hidden", borderRadius: "50%" }}
                          />
                        }
                      >
                        <Typography>{chain?.network_infos?.name}</Typography>
                      </MainButton>
                    </Grid>
                  ))}
            </Grid>
          </Stack>
        </Box>
      </MainPopup>
    </>
  );
};
