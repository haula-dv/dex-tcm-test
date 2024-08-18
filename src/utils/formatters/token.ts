export const hexChainId = (chainId: number) => {
	return `0x${chainId.toString(16)}`; // Convert chainId to hex
};

export const idFromHexChainId = (hexChainId: string): number => {
	return parseInt(hexChainId, 16);
};

export const formartAddress = (address: string) => {
	return address.slice(0, 6) + "..." + address.slice(-4);
};
