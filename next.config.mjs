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
	experimental: {
		ppr: "incremental",
	},

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

	reactStrictMode: true,

	async redirects() {
		return [
			{
				source: "/",
				destination: "/perp/PERP_ETH_USDC",
				permanent: false,
			},
		];
	},
});
