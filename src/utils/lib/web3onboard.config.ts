// import coinbaseModule from "@web3-onboard/coinbase";
// import injectedModule from "@web3-onboard/injected-wallets";
// import { init } from "@web3-onboard/react";

// // Initialize Web3 Onboard
// const injected = injectedModule();
// const coinbase = coinbaseModule();

// // Sign up to get your free API key at https://explorer.blocknative.com/?signup=true
// // Required for Transaction Notifications and Transaction Preview
// const apiKey = "1730eff0-9d50-4382-a3fe-89f0d34a2070";
// const infuraKey = "<INFURA_KEY>";

// export const web3Onboard = init({
//   apiKey,
//   wallets: [injected, coinbase], // initialize wallet

//   chains: [
//     {
//       id: "0x1",
//       token: "ETH",
//       label: "Ethereum Mainnet",
//       rpcUrl: `https://mainnet.infura.io/v3/${infuraKey}`,
//     },
//     {
//       id: 42161,
//       token: "ARB-ETH",
//       label: "Arbitrum One",
//       rpcUrl: "https://rpc.ankr.com/arbitrum",
//     },
//     {
//       id: "0xa4ba",
//       token: "ARB",
//       label: "Arbitrum Nova",
//       rpcUrl: "https://nova.arbitrum.io/rpc",
//     },
//     {
//       id: "0x2105",
//       token: "ETH",
//       label: "Base",
//       rpcUrl: "https://mainnet.base.org",
//     },
//   ],

//   appMetadata: {
//     name: "Your App Name",
//     icon: "<svg>Your SVG Icon</svg>", // Replace with your icon
//     description: "Your app description",
//     recommendedInjectedWallets: [
//       { name: "MetaMask", url: "https://metamask.io" },
//       { name: "Coinbase", url: "https://wallet.coinbase.com/" },
//     ],
//   },
// });

import { supportedChains } from "@/utils/lib/network";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";

const injected = injectedModule();
const walletConnect = walletConnectModule({
  projectId: "5f4e967f02cf92c8db957c56e877e149",
  requiredChains: [10, 42161],
  optionalChains: [421614, 11155420],
  dappUrl: "https://orderlynetwork.github.io/example-dex",
});

export const web3OnboardConfig = init({
  wallets: [injected, walletConnect],
  chains: supportedChains.map(({ id, token, label, rpcUrl }) => ({
    id,
    token,
    label,
    rpcUrl,
  })),
  appMetadata: {
    name: "Orderly DEX",
    description: "Fully fledged example DEX using Orderly Network",
  },
  accountCenter: {
    desktop: { enabled: false },
    mobile: { enabled: false },
  },
  connect: {
    autoConnectLastWallet: true,
  },
});
