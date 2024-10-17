import { getImageNextwork } from "@/common";
import { TokenIcon } from "@/components/token/TokenIcon";
import { setColorThemeMode } from "@/utils/helpers";
import { Divider, Stack, Typography, useTheme } from "@mui/material";
import { useChains } from "@orderly.network/hooks";
import { useState } from "react";
import { MainButton } from "../button/MainButton";
import { StyledMenu } from "../menu/StyledMenu";
import { ItemList } from "./ItemList";

export const ListNetwork = () => {
	const theme = useTheme();

	const [networkAnchorEl, setNetworkAnchorEl] = useState<null | HTMLElement>(null);
	const openNetworkEl = Boolean(networkAnchorEl);

	// Hooks
	const [chains, { findByChainId }] = useChains();

	const [currentChain, setCurrentChanin] = useState<any>(null);

	// Handle change network
	const onChainChanged = (id: any, type: boolean) => {
		const a = findByChainId(id);
		setCurrentChanin(a);
		setNetworkAnchorEl(null);
	};

	// Handle show menu account button
	const handleShowMenu = (event: React.MouseEvent<HTMLElement>) => {
		setNetworkAnchorEl(event.currentTarget);
	};

	// Check network
	const allChains = [...chains.mainnet, ...chains.testnet];

	return (
		<>
			<MainButton
				id="network-button"
				aria-controls={openNetworkEl ? "network-menu" : undefined}
				aria-haspopup="true"
				size="xsmall"
				variant="outlined"
				onClick={handleShowMenu}
				startIcon={
					<TokenIcon
						url={getImageNextwork(
							currentChain
								? currentChain?.network_infos?.chain_id
								: allChains[0].network_infos.chain_id,
							"network_logo",
						)}
					/>
				}>
				{currentChain ? currentChain?.network_infos.name : allChains[0].network_infos.name}
			</MainButton>

			<StyledMenu
				id="network-menu"
				MenuListProps={{
					"aria-labelledby": "network-button",
				}}
				anchorEl={networkAnchorEl}
				open={openNetworkEl}
				onClose={() => setNetworkAnchorEl(null)}>
				<Stack pb={1}>
					<Typography
						px={1.6}
						color={setColorThemeMode(theme.palette.grey[600], theme.palette.grey[200])}
						py={0.5}>
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
								startIcon={
									<TokenIcon url={getImageNextwork(chain.network_infos.chain_id, "network_logo")} />
								}
								isSelected={currentChain?.network_infos?.chain_id === chain.network_infos.chain_id}
							/>
						))}
					</Stack>
				</Stack>

				<Divider />

				<Stack pt={0.5}>
					<Typography
						px={1.6}
						color={setColorThemeMode(useTheme().palette.grey[600], useTheme().palette.grey[200])}
						py={0.5}>
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
								onClick={() => onChainChanged(chain.network_infos.chain_id, true)}
								startIcon={
									<TokenIcon url={getImageNextwork(chain.network_infos.chain_id, "network_logo")} />
								}
								isSelected={currentChain?.network_infos?.chain_id === chain.network_infos.chain_id}
							/>
						))}
					</Stack>
				</Stack>
			</StyledMenu>
		</>
	);
};
