import { StyledMenu } from "@/components/menu/StyledMenu";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconWallet } from "@tabler/icons-react";

interface IProps {
	anchorEl: HTMLElement | null;
	open: boolean;
	handleClose: (type: string) => void;
}

export default function AccountMenuContainer({ anchorEl, handleClose, open }: IProps) {
	const menus = [
		{ label: "My orders", id: "orders", icon: <></> },
		{ label: "My wallet", id: "wallet", icon: <IconWallet size={"1rem"} /> },
	];

	return (
		<StyledMenu
			id="account-menu"
			MenuListProps={{
				"aria-labelledby": "account-button",
			}}
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}>
			<Stack p={0.5}>
				{menus.map(({ label, id, icon }) => (
					<MenuItem key={id} onClick={() => handleClose(id)}>
						{label} {icon}
					</MenuItem>
				))}
			</Stack>
		</StyledMenu>
	);
}

const MenuItem = styled(Box)(({ theme }) => ({
	width: "200px",
	height: TSizes.buttonHeight,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	borderRadius: TSizes.borderRadius,
	padding: "0 12px",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: theme.palette.grey[800],
	},
}));
