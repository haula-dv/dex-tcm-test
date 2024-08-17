/**
 * @type {import('next').NextConfig}
 */
import { getGlobals } from 'common-es';
import path from 'path';

const { __dirname, __filename } = getGlobals(import.meta.url);

const nextConfig = {
	experimental: {
		ppr: 'incremental',
	},

	reactStrictMode: true,

	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},

	async redirects() {
		return [
			{
				source: '/',
				destination: '/perp/PERP_ETH_USDC',
				permanent: false,
			},
		];
	},
};

export default nextConfig;
