import WalletContainer from "@/plugins/wallet/components/WalletContainer";
import {
  IconButton,
  Stack,
  Toolbar
} from "@mui/material";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo, useState } from "react";
import Logo from "../icons/Logo";
import { MainAppBar } from "./Header";
import { MobileDrawer } from "./MobileDrawer";

function HeaderMobile() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const params = useParams();

  const navItems = [
    {
      label: "Trading",
      to: "/trading/perp",
      actived: [`/trading/perp/${params.symbol}`],
    },
    {
      label: "Portfolio",
      to: "/portfolio",
      actived: [
        "/portfolio",
        "/portfolio/api-key",
        "/portfolio/fee-tier",
        "/portfolio/orders",
        "/portfolio/positions",
        "/portfolio/setting",
      ],
    },
  ];

  return (
    <MainAppBar elevation={0} position="sticky">
      <Toolbar sx={{ px: "16px !important" }} disableGutters>
        <Stack
          direction={"row"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
          ml={'-6px'}
        >
          {/* Left Side: Hamburger + Logo */}
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <IconButton
              size="small"
              onClick={() => setOpenDrawer(true)}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <IconMenu2 height={18} width={18} />
            </IconButton>
            <Link href={"/trading"}>
              <Logo width="60px" height="32px" />
            </Link>
          </Stack>

          {/* Right Side: Wallet Container (Network + Account) */}
          <WalletContainer isMobile={true} />
        </Stack>
      </Toolbar>

      <MobileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        navItems={navItems}
      />
    </MainAppBar>
  );
}

export default memo(HeaderMobile);
