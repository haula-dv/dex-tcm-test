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

	webpack: (config, { isServer }) => {
		if (!isServer) {
			// don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
			config.resolve.fallback = {
				fs: false,
			};
		}
		return config;
	},

	typescript: {
		// Dangerously allow production builds to successfully complete even if your project has type errors.
		// ignoreBuildErrors: true,
	},

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
