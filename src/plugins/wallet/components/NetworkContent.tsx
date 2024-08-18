import { getImageNextwork } from '@/common';
import { MainButton } from '@/components/button/MainButton';
import { ItemList } from '@/components/list/ItemList';
import { StyledMenu } from '@/components/menu/StyledMenu';
import { TokenIcon } from '@/components/token/TokenIcon';
import { theme } from '@/utils';
import { idFromHexChainId } from '@/utils/formatters/token';
import { Divider, Stack, Typography } from '@mui/material';
import { useChains } from '@orderly.network/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useConnectWallet, useSetChain } from '@web3-onboard/react';
import { useCallback, useState } from 'react';

export default function NetworkContent() {
	const [networkAnchorEl, setNetworkAnchorEl] = useState<null | HTMLElement>(null);
	const openNetworkEl = Boolean(networkAnchorEl);

	// Hooks
	const [chains, { findByChainId }] = useChains();
	const [{ connectedChain }, setChain] = useSetChain();
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	// Handle show menu account button
	const handleShowMenu = (event: React.MouseEvent<HTMLElement>) => {
		setNetworkAnchorEl(event.currentTarget);
	};

	// GET CURRENT CHAIN
	const currentChain = useCallback(() => {
		return findByChainId(connectedChain ? idFromHexChainId(connectedChain?.id ?? '') : 1);
	}, [connectedChain, findByChainId]);

	// Handle change network
	const onChainChanged = useCallback(
		async (chainId: any, isTestnet: boolean) => {
			if (!wallet) {
				setNetworkAnchorEl(null);
				return;
			}

			await setChain({
				chainId: chainId,
				chainNamespace: 'evm',
			});

			localStorage.setItem('orderly-networkId', isTestnet ? 'testnet' : 'mainnet');

			// realod page
			setTimeout(() => {
				window.location.reload();
			}, 100);
		},
		[setChain, wallet],
	);

	return (
		<>
			<MainButton
				variant="outlined"
				endIcon={<IconChevronDown size={'1rem'} />}
				onClick={handleShowMenu}
				id="network-button"
				aria-controls={openNetworkEl ? 'network-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={openNetworkEl ? 'true' : undefined}
				startIcon={<TokenIcon url={getImageNextwork(currentChain()?.network_infos?.chain_id, 'network_logo')} />}
			>
				{currentChain()?.network_infos?.name}
			</MainButton>

			<StyledMenu
				id="network-menu"
				MenuListProps={{
					'aria-labelledby': 'network-button',
				}}
				anchorEl={networkAnchorEl}
				open={openNetworkEl}
				onClose={() => setNetworkAnchorEl(null)}
			>
				<Stack pb={1}>
					<Typography px={1.6} color={theme.palette.grey[600]} py={0.5}>
						Mainnet
					</Typography>

					<Stack spacing={0.2} px={0.5} pt={0.5}>
						{chains.mainnet.map((chain) => (
							<ItemList
								key={chain.network_infos.name}
								primaryText={chain.network_infos.name}
								borderRadius="6px"
								disabledBg
								isHiddenEndIcon
								size="small"
								onClick={() => onChainChanged(chain.network_infos.chain_id, false)}
								startIcon={<TokenIcon url={getImageNextwork(chain.network_infos.chain_id, 'network_logo')} />}
								isSelected={currentChain()?.network_infos?.chain_id === chain.network_infos.chain_id}
							/>
						))}
					</Stack>
				</Stack>

				<Divider />
				<Stack pt={0.5}>
					<Typography px={1.6} color={theme.palette.grey[600]} py={0.5}>
						Testnet
					</Typography>

					<Stack spacing={0.2} px={0.5} pt={0.5}>
						{chains.testnet.map((chain) => (
							<ItemList
								key={chain.network_infos.name}
								primaryText={chain.network_infos.name}
								borderRadius="6px"
								disabledBg
								isHiddenEndIcon
								size="small"
								onClick={() => onChainChanged(chain.network_infos.chain_id, false)}
								startIcon={<TokenIcon url={getImageNextwork(chain.network_infos.chain_id, 'network_logo')} />}
								isSelected={currentChain()?.network_infos?.chain_id === chain.network_infos.chain_id}
							/>
						))}
					</Stack>
				</Stack>
			</StyledMenu>
		</>
	);
}
