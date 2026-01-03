import { getGlobals } from "common-es";
import path from "path";

const { __dirname, __filename } = getGlobals(import.meta.url);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oss.orderly.network",
      },
      {
        protocol: "https",
        hostname: "arbitrum-one.publicnode.com",
      },
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  env: {
    CURRENT_ENV: process.env.CURRENT_ENV,
    NEXTWORK_URL: process.env.NEXTWORK_URL,
    
    BROKER_NAME: process.env.BROKER_NAME,
    BROKER_ID: process.env.BROKER_ID,

    WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
    WALLETCONNECT_DAPP_URL: process.env.WALLETCONNECT_DAPP_URL,

    APP_URL: process.env.APP_URL,
  },
// # https://dashboard.walletconnect.com/01692520-64b0-4ed8-8713-cdac19098bff/2202d3e2-19b7-4dd2-954d-3208dfdb639a

  reactStrictMode: false,

  typescript: {
    // Dangerously allow production builds to successfully complete even if your project has type errors.
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/trading/perp/PERP_ETH_USDC",
        permanent: false,
      },

      {
        source: "/swap",
        destination: "/trading/perp/PERP_ETH_USDC",
        permanent: false,
      },

      {
        source: "/pool",
        destination: "/trading/perp/PERP_ETH_USDC",
        permanent: false,
      },

      {
        source: "/trading/perp",
        destination: "/trading/perp/PERP_ETH_USDC",
        permanent: false,
      },

      {
        source: "/trading",
        destination: "/trading/perp/PERP_ETH_USDC",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
