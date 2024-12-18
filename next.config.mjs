/**
 * @type {import('next').NextConfig}
 */
import { getGlobals } from "common-es";
import path from "path";

const { __dirname, __filename } = getGlobals(import.meta.url);

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
  // experimental: {
  // 	ppr: "incremental",
  // 	reactCompiler: process.env.CURRENT_ENV === "dev" ? false : true,
  // },
  //   cacheHandler: require.resolve("./cache-handler.js"),
  cacheMaxMemorySize: 0, // disable default in-memory caching

  images: {
    domains: [process.env.API_URL, process.env.IMAGE_DOMAIN],
    unoptimized: true,
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

  // Các tùy chọn cấu hình khác nếu cần thiết
  webpack(config, { isServer }) {
    if (!isServer) {
      // Các cấu hình riêng cho client-side (trình duyệt)
      config.optimization.splitChunks.maxSize = 200000; // Giới hạn kích thước chunk tối đa
    }
    return config;
  },
});
