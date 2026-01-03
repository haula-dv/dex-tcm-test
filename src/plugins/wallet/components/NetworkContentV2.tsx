import { getImageNextwork } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import { StyledMenu } from "@/components/menu/StyledMenu";
import { TokenIcon } from "@/components/token/TokenIcon";
import { idFromHexChainId } from "@/utils/formatters/token";
import { setColorThemeMode } from "@/utils/helpers";
import {
  Box,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useAccount, useChains } from "@orderly.network/hooks";
import { ChainSelectorWidget } from "@orderly.network/ui-chain-selector";
import { IconChevronDown } from "@tabler/icons-react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { memo, useCallback, useMemo, useState } from "react";

interface INetworkContentV2Props {
  isMobile?: boolean;
}

function NetworkContentV2({ isMobile = false }: INetworkContentV2Props) {
  const theme = useTheme();
  const [networkAnchorEl, setNetworkAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openNetworkEl = Boolean(networkAnchorEl);
  const upLg = useMediaQuery(theme.breakpoints.up("lg"));

  // Hooks
  const [chains, { findByChainId }] = useChains();
  const [{ connectedChain }, setChain] = useSetChain();
  const [{ wallet }] = useConnectWallet();

  // Handle show menu account button
  const handleShowMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNetworkAnchorEl(event.currentTarget);
  };

  const { account } = useAccount();
  const DEFAULT_CHAIN = 1

  // GET CURRENT CHAIN - use useMemo instead of useCallback to avoid hook order issues
  const currentChainValue = useMemo(() => {
    return findByChainId(
      connectedChain ? idFromHexChainId(connectedChain?.id ?? "") : DEFAULT_CHAIN
    );
  }, [connectedChain, findByChainId]);

  // Keep as function for backward compatibility
  const currentChain = useCallback(() => currentChainValue, [currentChainValue]);

  // Handle change network
  const onChainChanged = useCallback(
    async (chainId: any, isTestnet: boolean) => {
      if (!wallet) {
        setNetworkAnchorEl(null);
        return;
      }

      await setChain({
        chainId: chainId,
        chainNamespace: "evm",
      }).then(async (res) => {
        localStorage.setItem("networkId", !isTestnet ? "mainnet" : "testnet");
        await account.switchChainId(chainId);
        // realod page
        setTimeout(() => {
          window.location.reload();
        }, 400);
      });
    },
    [setChain, wallet, account]
  );

  // Check network
  const allChains = useMemo(() => {
    if (!chains || !chains.mainnet || !chains.testnet) return []
    return [...chains.mainnet, ...chains.testnet];
  }, [chains])

  const remapChainIds = useMemo(() => {
    return allChains.length > 0
      ? allChains.map((item: any) => {
        return item.network_infos.chain_id;
      })
      : [];
  }, [allChains]);

  const isSupportChain = useMemo(() => {
    return currentChainValue
      ? remapChainIds.some(
        (it) => it === currentChainValue.network_infos.chain_id
      )
      : false;
  }, [currentChainValue, remapChainIds]);

  return (
    <>
      {chains ? (
        <MainButton
          variant={"contained"}
          size={isMobile ? "small" : "medium"}
          endIcon={
            <IconChevronDown
              size={"1rem"}
              color={setColorThemeMode(
                theme.palette.common.black,
                theme.palette.common.white
              )}
            />
          }
          onClick={handleShowMenu}
          id="network-button"
          aria-controls={openNetworkEl ? "network-menu" : undefined}
          aria-haspopup="true"
          color={isSupportChain ? "inherit" : "warning"}
          sx={{
            backgroundColor: isSupportChain
              ? setColorThemeMode(
                theme.palette.grey[50],
                theme.palette.grey[700]
              )
              : "",
            color: setColorThemeMode(
              theme.palette.common.black,
              theme.palette.common.white
            ),
          }}
          aria-expanded={openNetworkEl ? "true" : undefined}
          startIcon={
            currentChain() ? (
              <TokenIcon
                url={getImageNextwork(
                  currentChain()?.network_infos?.chain_id,
                  "network_logo"
                )}
              />
            ) : (
              ""
            )
          }
        >
          {upLg && (
            <>
              {isSupportChain
                ? ''
                : "Unsupport Network"}{" "}
            </>
          )}
        </MainButton>
      ) : null}

      <StyledMenu
        id="network-menu"
        MenuListProps={{
          "aria-labelledby": "network-button",
        }}
        anchorEl={networkAnchorEl}
        open={openNetworkEl}
        onClose={() => setNetworkAnchorEl(null)}
      >
        <Box p={1}>
          <ChainSelectorWidget variant="compact" isWrongNetwork={!isSupportChain} onChainChangeBefore={(chainId, isTestnet) => onChainChanged(chainId, isTestnet.isTestnet)} onChainChangeAfter={(chainId, isTestnet) => onChainChanged(chainId, isTestnet.isTestnet)} />
        </Box>

        {/* <Stack pb={1}>
          <Typography
            px={1.6}
            color={setColorThemeMode(
              useTheme().palette.grey[600],
              useTheme().palette.grey[200]
            )}
            py={0.5}
          >
            Mainnet
          </Typography>

          <Stack spacing={0.2} px={0.5} pt={0.5}>
            {chains.mainnet.map((chain) => (
              <ItemList
                key={chain.network_infos.name}
                primaryText={chain.network_infos.name}
                borderRadius="6px"
                disabledBg
                isHiddenEndIcon
                size="small"
                onClick={() =>
                  onChainChanged(chain.network_infos.chain_id, false)
                }
                startIcon={
                  <TokenIcon
                    url={getImageNextwork(
                      chain.network_infos.chain_id,
                      "network_logo"
                    )}
                  />
                }
                isSelected={
                  currentChain()?.network_infos?.chain_id ===
                  chain.network_infos.chain_id
                }
              />
            ))}
          </Stack>
        </Stack>

        <Divider />

        <Stack pt={0.5}>
          <Typography
            px={1.6}
            color={setColorThemeMode(
              useTheme().palette.grey[600],
              useTheme().palette.grey[200]
            )}
            py={0.5}
          >
            Testnet
          </Typography>

          <Stack spacing={0.2} px={0.5} pt={0.5}>
            {chains.testnet.map((chain) => (
              <ItemList
                key={chain.network_infos.name}
                primaryText={chain.network_infos.name}
                borderRadius="6px"
                disabledBg
                isHiddenEndIcon
                size="small"
                onClick={() =>
                  onChainChanged(chain.network_infos.chain_id, true)
                }
                startIcon={
                  <TokenIcon
                    url={getImageNextwork(
                      chain.network_infos.chain_id,
                      "network_logo"
                    )}
                  />
                }
                isSelected={
                  currentChain()?.network_infos?.chain_id ===
                  chain.network_infos.chain_id
                }
              />
            ))}
          </Stack>
        </Stack> */}
      </StyledMenu>
    </>
  );
}

export default memo(NetworkContentV2);
