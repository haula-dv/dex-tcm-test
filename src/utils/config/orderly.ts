import { Arbitrum, Base, Ethereum, Optimism } from "@orderly.network/types";
import injectedModule from "@web3-onboard/injected-wallets";
import ledgerModule from "@web3-onboard/ledger";
import walletConnectModule from "@web3-onboard/walletconnect";
import { AppInfo } from "../constants/key_store";

export function OrderlyConfig(ctx?: { url: string; domain: string }) {
  const wcV2InitOptions = {
    version: 2,
    projectId: "93dba83e8d9915dc6a65ffd3ecfd19fd",
    requiredChains: [42161],
    optionalChains: [421613, 42161],
    dappUrl:
      typeof window === "object"
        ? window.location.host
        : "http://localhost:3000/",
  };

  const ledgerInitOptions = {
    projectId: "93dba83e8d9915dc6a65ffd3ecfd19fd",
  };

  const walletConnect = walletConnectModule(wcV2InitOptions);
  // @ts-ignore
  const ledger = ledgerModule(ledgerInitOptions);

  return {
    // Wallet configuration
    web3Onboard: {
      theme: "light",
      wallets: [injectedModule(), walletConnect, ledger],
      appMetadata: {
        name: "Tcmp",
        icon: "/Orderly.svg",
        description: "Orderly",

        recommendedInjectedWallets: [
          { name: "Coinbase", url: "https://wallet.coinbase.com/" },
          { name: "MetaMask", url: "https://metamask.io" },
          { name: "Trezor", url: "https://trezor.io/" },
          { name: "Walletconnect", url: "https://walletconnect.com/" },
          { name: "Ledger", url: "https://www.ledger.com/" },
        ],

        agreement: {
          version: "1.0.0",
          termsUrl: "https://www.blocknative.com/terms-conditions",
          privacyUrl: "https://www.blocknative.com/privacy-policy",
        },

        gettingStartedGuide: "https://blocknative.com",
        explore: "https://blocknative.com",
      },
    },

    // Main App
    app: {
      brokerId: AppInfo.BROKER_ID,
      brokerName: AppInfo.BROKER_NAME,
      appIcons: {
        secondary: {
          img: "/orderly-logo-secondary.svg",
        },
      },
      chainFilter: { mainnet: [Arbitrum, Optimism, Base, Ethereum] },
      enableSwapDeposit: false,
      footerStatusBarProps: {
        xUrl: "https://twitter.com/OrderlyNetwork",
        telegramUrl: "https://orderly.network",
        discordUrl: "https://discord.com/invite/orderlynetwork",
      },
      shareOptions: {
        pnl: {
          backgroundImages: [
            "/images/poster_bg_1.png",
            "/images/poster_bg_2.png",
            "/images/poster_bg_3.png",
            "/images/poster_bg_4.png",
            "/images/poster_bg_5.png",
            "/images/poster_bg_6.png",
          ],
        },
      },
    },

    // Trading view
    tradingViewConfig: {
      scriptSRC: "/tradingview/charting_library/charting_library.js",
      library_path: "/tradingview/charting_library/bundles",
      customCssUrl: "/tradingview/chart.css",
    },
  };
}
