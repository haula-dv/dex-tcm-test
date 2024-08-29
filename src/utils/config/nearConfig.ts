import { keyStores, Near, WalletConnection } from 'near-api-js';

const config: any = {
	networkId: 'testnet', // Hoặc 'mainnet'
	keyStore: new keyStores.BrowserLocalStorageKeyStore(),
	nodeUrl: 'https://rpc.testnet.near.org', // Hoặc 'https://rpc.mainnet.near.org'
	walletUrl: 'https://wallet.testnet.near.org', // Hoặc 'https://wallet.mainnet.near.org'
	helperUrl: 'https://helper.testnet.near.org', // Hoặc 'https://helper.mainnet.near.org'
	explorerUrl: 'https://explorer.testnet.near.org', // Hoặc 'https://explorer.mainnet.near.org'
};

export const near = new Near(config);
export const walletConnection = new WalletConnection(near, 'orderly_testnet_');
export const accountId = walletConnection.getAccountId();
