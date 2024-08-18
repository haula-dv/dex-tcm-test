import { hexChainId, idFromHexChainId } from '@/utils/formatters/token';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useChains } from '@orderly.network/hooks';
import { API } from '@orderly.network/types';
import { useConnectWallet, useSetChain } from '@web3-onboard/react';
import { setZustandValue } from 'nes-zustand';
import { useCallback, useEffect, useState } from 'react';
import { supportedChainsLoadingState } from '../store';
import { NetworkItem } from './NetworkItem';

interface IProps {
	handleClose?: (chain?: API.Chain) => void;
	maxWidth?: string;
}

export const ChainList = ({ handleClose, maxWidth = '240px' }: IProps) => {
	const [{ connectedChain }, setChain] = useSetChain();
	const [_, { findByChainId }] = useChains();
	const chains = useChains();
	const [{ wallet }, connect, disconnectWallet] = useConnectWallet();

	// STATE
	const [currentChainSelected, setCurrentChainSelected] = useState<API.Chain | null>(null);

	// GET CURRENT CHAIN
	const currentChain = findByChainId(idFromHexChainId(connectedChain?.id ?? ''));

	// Handle change network
	const handleChangeNextwork = useCallback(async (chain: API.Chain) => {
		handleClose && handleClose(chain);
		setCurrentChainSelected(chain);

		if (!wallet) {
			return;
		}

		setZustandValue(supportedChainsLoadingState, true);

		await setChain({
			chainId: hexChainId(chain.network_infos.chain_id),
			chainNamespace: 'evm',
		});

		setZustandValue(supportedChainsLoadingState, false);
	}, []);

	// IsSelect network
	const isSelected = useCallback(
		(chain: API.Chain) => {
			if (!wallet) {
				return currentChainSelected?.network_infos.chain_id === chain.network_infos.chain_id;
			}

			return currentChain?.network_infos.chain_id === chain.network_infos.chain_id;
		},
		[currentChain?.network_infos.chain_id, currentChainSelected?.network_infos.chain_id, wallet],
	);

	useEffect(() => {
		if (!wallet && chains) {
			const defaultChain = chains[0].mainnet[0];
			setCurrentChainSelected(defaultChain);
		}
	}, []);

	return (
		<Box width={'100%'} maxWidth={maxWidth}>
			<Stack pb={1}>
				<Typography fontWeight={600} pb={0.5} px={2.5} pt={1}>
					Mainnest
				</Typography>

				<Grid container spacing={0.5}>
					{chains &&
						(chains[0].mainnet as any).length > 0 &&
						chains[0].mainnet.map((chain, index) => {
							return (
								<NetworkItem
									key={index}
									chain={chain}
									handleChangeNextwork={handleChangeNextwork}
									isSelected={isSelected(chain)}
								/>
							);
						})}
				</Grid>
			</Stack>

			<Stack>
				<Typography fontWeight={600} pb={0.5} px={2.5}>
					Testnest
				</Typography>

				<Grid container spacing={0.5}>
					{chains &&
						(chains[0].testnet as any).length > 0 &&
						chains[0].testnet.map((chain, index) => {
							return (
								<NetworkItem
									key={index}
									chain={chain}
									handleChangeNextwork={handleChangeNextwork}
									isSelected={isSelected(chain)}
								/>
							);
						})}
				</Grid>
			</Stack>
		</Box>
	);
};
