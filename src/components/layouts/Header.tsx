"use client";
import WalletContainer from "@/plugins/wallet/components/WalletContainer";
import { setColorThemeMode } from "@/utils/helpers";
import { Mixins } from "@/utils/themes/custom-theme/mixins";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { AppBar, Box, BoxProps, Stack, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Logo from "../icons/Logo";

export const Header = () => {
	const pathName = usePathname();
	const params = useParams();
	const navItems = [
		{ label: "Trading", to: "/trading/perp", actived: [`/trading/perp/${params.symbol}`] },
		// { label: 'Swap', to: '/swap', actived: ['/swap'] },
		// { label: 'Pool', to: '/pool', actived: ['/pool', '/pool/add', '/pool/create-a-pair'] },
		{ label: "Portfolio", to: "/portfolio", actived: ["/portfolio"] },
	];

	return (
		<MainAppBar elevation={0} position="sticky">
			<Box px={{ xs: "16px" }}>
				<Toolbar disableGutters>
					<Stack
						direction={"row"}
						justifyContent={"space-between"}
						width={"100%"}
						alignItems={"center"}>
						<Stack direction={"row"} alignItems={"center"} spacing={TSizes.margin_md}>
							<Logo width="80px" height="40px" />

							{/* <Stack
								direction={'row'}
								border={2}
								borderColor={setColorThemeMode(useTheme().palette.grey[600], '#fff')}
								borderRadius={TSizes.borderRadius}
								overflow={'hidden'}
							>
								{navItems.slice(0, 2).map((item, index) => (
									<Link key={item.label} href={item.to}>
										<MainButton
											variant={item.actived.includes(pathName) ? 'contained' : 'text'}
											color={
												item.actived.includes(pathName)
													? setColorThemeMode('darkGrey', 'white')
													: setColorThemeMode('darkGrey', 'inherit')
											}
											size="small"
											sx={{ fontSize: '14px', fontWeight: 700 }}
										>
											{item.label}
										</MainButton>
									</Link>
								))}
							</Stack> */}

							{navItems.map((navItem) => (
								<Link key={navItem.label} href={navItem.to}>
									<NavItem isActived={navItem.actived.includes(pathName)}>
										<Typography>{navItem.label}</Typography>
									</NavItem>
								</Link>
							))}
						</Stack>

						<WalletContainer />
					</Stack>
				</Toolbar>
			</Box>
		</MainAppBar>
	);
};

export const MainAppBar = styled(AppBar)(({ theme }) => ({
	backgroundColor: setColorThemeMode("#fff", theme.palette.grey[800]),
	zIndex: 10,
	height: "56px",
	borderRadius: "0px",
	top: 0,
	"& .MuiToolbar-root": {
		height: "56px",
		minHeight: "auto",
	},
}));

interface INavItemProps extends BoxProps {
	isActived: boolean;
}

export const NavItem = styled(Box, {
	shouldForwardProp: (prop) => prop !== "isActived",
})<INavItemProps>(({ theme, isActived }) => ({
	cursor: "pointer",
	position: "relative",
	display: "flex",
	alignItems: "center",
	height: "56px",

	"&:after": {
		...Mixins.boxFullMixin({
			top: "auto",
			bottom: 0,
			left: 0,
			height: "2px",
			width: "100%",
			backgroundColor: isActived
				? setColorThemeMode(theme.palette.common.black, theme.palette.common.white, theme)
				: "transparent",
			borderRadius: "4px",
		}),
	},

	"& .MuiTypography-root": {
		color: setColorThemeMode(theme.palette.common.black, theme.palette.common.white, theme),
		fontSize: "14px",
		fontWeight: 700,
		padding: "6px 12px",
		borderRadius: TSizes.borderRadius,
		transition: theme.transitions.create(["background-color"]),
	},
}));
