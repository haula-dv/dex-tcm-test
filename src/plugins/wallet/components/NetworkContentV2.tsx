import { MainButton } from "@/components/button/MainButton";
import { ItemList } from "@/components/list/ItemList";
import { StyledMenu } from "@/components/menu/StyledMenu";
import { TokenIcon } from "@/components/token/TokenIcon";
import { setColorThemeMode } from "@/utils/helpers";
import { supportedEvmChains } from "@/utils/network";
import {
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAccountInstance } from "@orderly.network/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { memo, useCallback, useMemo, useState } from "react";

function NetworkContentV2() {
  const theme = useTheme();
  const [networkAnchorEl, setNetworkAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openNetworkEl = Boolean(networkAnchorEl);
  const upLg = useMediaQuery(theme.breakpoints.up("lg"));

  // Hooks
  const account = useAccountInstance();
  const [{ connectedChain }, setChain] = useSetChain();
  const [_0, _1, disconnect] = useConnectWallet();
  const connectedWallets = useWallets();

  // Handle show menu
  const handleShowMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNetworkAnchorEl(event.currentTarget);
  };

  // Get current chain from supportedEvmChains
  const currentChain = useMemo(() => {
    return supportedEvmChains.find(
      ({ id }) => id === connectedChain?.id
    );
  }, [connectedChain?.id]);

  // Handle chain selection
  const selectChain = useCallback(
    (chainId: string) => () => {
      setChain({ chainId, chainNamespace: "evm" });
      setNetworkAnchorEl(null);
    },
    [setChain]
  );

  // Filter chains by network type
  const mainnetChains = useMemo(
    () => supportedEvmChains.filter(({ network }) => network === "mainnet"),
    []
  );

  const testnetChains = useMemo(
    () => supportedEvmChains.filter(({ network }) => network === "testnet"),
    []
  );

  // Check if current chain is supported
  const isSupportChain = useMemo(() => {
    return supportedEvmChains.some(({ id }) => id === connectedChain?.id);
  }, [connectedChain?.id]);

  console.log("currentChain", currentChain);

  return (
    <>
      <MainButton
        variant="contained"
        endIcon={
          <IconChevronDown
            size="1rem"
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
          currentChain && currentChain.icon ? (
            <TokenIcon url={currentChain.icon} />
          ) : null
        }
      >
        {upLg && (
          <>
            {isSupportChain
              ? currentChain?.label || "Select Network"
              : "Unsupported Network"}
          </>
        )}
      </MainButton>

      <StyledMenu
        id="network-menu"
        MenuListProps={{
          "aria-labelledby": "network-button",
        }}
        anchorEl={networkAnchorEl}
        open={openNetworkEl}
        onClose={() => setNetworkAnchorEl(null)}
      >
        {/* Mainnet Section */}
        <Stack pb={1}>
          <Typography
            px={1.6}
            color={setColorThemeMode(
              theme.palette.grey[600],
              theme.palette.grey[200]
            )}
            py={0.5}
          >
            Mainnet
          </Typography>

          <Stack spacing={0.2} px={0.5} pt={0.5}>
            {mainnetChains.map((chain) => (
              <ItemList
                key={chain.id}
                primaryText={chain.label}
                borderRadius="6px"
                disabledBg
                isHiddenEndIcon
                size="small"
                onClick={selectChain(chain.id)}
                startIcon={<TokenIcon url={chain.icon} />}
                isSelected={connectedChain?.id === chain.id}
              />
            ))}
          </Stack>
        </Stack>

        <Divider />

        {/* Testnet Section */}
        <Stack pt={0.5}>
          <Typography
            px={1.6}
            color={setColorThemeMode(
              theme.palette.grey[600],
              theme.palette.grey[200]
            )}
            py={0.5}
          >
            Testnet
          </Typography>

          <Stack spacing={0.2} px={0.5} pt={0.5}>
            {testnetChains.map((chain) => (
              <ItemList
                key={chain.id}
                primaryText={chain.label}
                borderRadius="6px"
                disabledBg
                isHiddenEndIcon
                size="small"
                onClick={selectChain(chain.id)}
                startIcon={<TokenIcon url={chain.icon} />}
                isSelected={connectedChain?.id === chain.id}
              />
            ))}
          </Stack>
        </Stack>

        <Divider />

        {/* Disconnect Option */}
        <ItemList
          primaryText="Disconnect"
          borderRadius="6px"
          disabledBg
          isHiddenEndIcon
          size="small"
          onClick={() => {
            account.disconnect();
            if (connectedWallets.length > 0) {
              disconnect({
                label: connectedWallets[0].label,
              });
            }
            window.localStorage.removeItem("chain-namespace");
            setNetworkAnchorEl(null);
          }}
        />
      </StyledMenu>
    </>
  );
}

export default memo(NetworkContentV2);
