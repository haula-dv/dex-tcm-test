import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Stack, Toolbar, Typography } from "@mui/material";
import { IconMenu } from "@tabler/icons-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { memo } from "react";
import { MainIconButton } from "../button/MainIconButton";
import Logo from "../icons/Logo";
import { MainAppBar, NavItem } from "./Header";

function HeaderMobile() {
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
			<Toolbar>
				<Stack direction={"row"} width={"100%"} spacing={TSizes.margin_sm} alignItems={"center"}>
					<Logo width="80px" height="40px" />

					{navItems.map((navItem) => (
						<Link key={navItem.label} href={navItem.to}>
							<NavItem isActived={navItem.actived.includes(pathName)}>
								<Typography>{navItem.label}</Typography>
							</NavItem>
						</Link>
					))}
				</Stack>

				<MainIconButton edge="end">
					<IconMenu />
				</MainIconButton>
			</Toolbar>
		</MainAppBar>
	);
}

export default memo(HeaderMobile);
