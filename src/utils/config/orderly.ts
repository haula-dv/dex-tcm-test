import { useTheme } from '@mui/material';
import { Arbitrum, Base, Ethereum, Optimism } from '@orderly.network/types';
import injectedModule from '@web3-onboard/injected-wallets';
import ledgerModule from '@web3-onboard/ledger';
import walletConnectModule from '@web3-onboard/walletconnect';
import { AppInfo } from '../constants/key_store';

export function OrderlyConfig(ctx?: { url: string; domain: string }) {
	const wcV2InitOptions = {
		version: 2,
		projectId: '93dba83e8d9915dc6a65ffd3ecfd19fd',
		requiredChains: [42161],
		optionalChains: [421613, 42161],
		dappUrl: typeof window === 'object' ? window.location.host : 'http://localhost:3000/',
	};

	const ledgerInitOptions = {
		projectId: '93dba83e8d9915dc6a65ffd3ecfd19fd',
	};

	const walletConnect = walletConnectModule(wcV2InitOptions);
	// @ts-ignore
	const ledger = ledgerModule(ledgerInitOptions);

	const themeSelector = useTheme();

	return {
		// Wallet configuration
		web3Onboard: {
			theme: themeSelector.palette.mode,
			wallets: [injectedModule(), walletConnect, ledger],
			appMetadata: {
				name: 'Tcmp',
				icon: '/Orderly.svg',
				description: 'Orderly',

				recommendedInjectedWallets: [
					{ name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
					{ name: 'MetaMask', url: 'https://metamask.io' },
					{ name: 'Trezor', url: 'https://trezor.io/' },
					{ name: 'Walletconnect', url: 'https://walletconnect.com/' },
					{ name: 'Ledger', url: 'https://www.ledger.com/' },
				],

				agreement: {
					version: '1.0.0',
					termsUrl: 'https://www.blocknative.com/terms-conditions',
					privacyUrl: 'https://www.blocknative.com/privacy-policy',
				},

				gettingStartedGuide: 'https://blocknative.com',
				explore: 'https://blocknative.com',
			},
		},

		// Main App
		app: {
			brokerId: AppInfo.BROKER_ID,
			brokerName: AppInfo.BROKER_NAME,
			appIcons: {
				secondary: {
					img: '/orderly-logo-secondary.svg',
				},
			},
			chainFilter: { mainnet: [Arbitrum, Optimism, Base, Ethereum] },
			enableSwapDeposit: false,
		},

		// Trading view
		tradingViewConfig: {
			scriptSRC: '/tradingview/charting_library/charting_library.js',
			library_path: '/tradingview/charting_library/bundles',
			customCssUrl: '/tradingview/chart.css',
			overrides: {
				'paneProperties.backgroundType': 'solid',
				'paneProperties.background': '#1D1A26',

				'mainSeriesProperties.candleStyle.upColor': '#00B59F',
				'mainSeriesProperties.candleStyle.downColor': '#FF67C2',
				'mainSeriesProperties.candleStyle.borderColor': '#00B59F',
				'mainSeriesProperties.candleStyle.borderUpColor': '#00B59F',
				'mainSeriesProperties.candleStyle.borderDownColor': '#FF67C2',
				'mainSeriesProperties.candleStyle.wickUpColor': '#00B59F',
				'mainSeriesProperties.candleStyle.wickDownColor': '#FF67C2',

				// GRID lines
				'paneProperties.vertGridProperties.color': '#26232F',
				'paneProperties.horzGridProperties.color': '#26232F',

				// text color
				'scalesProperties.textColor': '#97969B',
				'scalesProperties.lineColor': '#2B2833',
			},
		},
	};
}
