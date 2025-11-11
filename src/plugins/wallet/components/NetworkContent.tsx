import { memo } from "react";

// NetworkContent component temporarily disabled - useChains requires Orderly SDK
function NetworkContent() {
  // const theme = useTheme();
  // const [networkAnchorEl, setNetworkAnchorEl] = useState<null | HTMLElement>(
  //   null
  // );
  // const openNetworkEl = Boolean(networkAnchorEl);
  // const upLg = useMediaQuery(theme.breakpoints.up("lg"));

  // Hooks
  // const [chains, { findByChainId }] = useChains();
  // const { wallet, connectedChain, setChain } = useWalletConnector();

  // All chain-related logic temporarily disabled
  return null;
}

export default memo(NetworkContent);
