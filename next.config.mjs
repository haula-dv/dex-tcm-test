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
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  env: {
    CURRENT_ENV: process.env.CURRENT_ENV,
    API_URL: process.env.API_URL,
    TOKEN_API_URL: process.env.TOKEN_API_URL,
    BROKER_ID: process.env.BROKER_ID,
    NEXTWORK_URL: process.env.NEXTWORK_URL,
    ORDERLY_ENV: process.env.ORDERLY_ENV,
    ORDERLY_API_KEY: process.env.ORDERLY_API_KEY,
    ORDERLY_SECRET: process.env.ORDERLY_SECRET,
  },

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
