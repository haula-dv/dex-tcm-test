import { themeSelectorState } from "@/common/stores/common";
import { OrderlyConnect } from "@/plugins/wallet/components/OrderlyConnect";
import { TLocalStorage } from "@/utils/constants/key_store";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { IconButton, Stack, Toolbar, useTheme } from "@mui/material";
import { IconMenu } from "@tabler/icons-react";
import { useConnectWallet } from "@web3-onboard/react";
import { setZustandValue } from "nes-zustand";
import { useParams, usePathname } from "next/navigation";
import { memo, useState } from "react";
import { useStore } from "zustand";
import { MainButton } from "../button/MainButton";
import Logo from "../icons/Logo";
import { MainAppBar } from "./Header";

function HeaderMobile() {
  const theme = useTheme();
  const pathName = usePathname();
  const params = useParams();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const themeSelector = useStore(themeSelectorState, (state) => state.value);

  // Handle change theme mode
  const handleChangeTheme = () => {
    localStorage.setItem(
      TLocalStorage.DEX_THEME_MODE,
      themeSelector.activeMode == "light" ? "dark" : "light"
    );
    setZustandValue(themeSelectorState, (prev: any) => {
      return {
        ...prev,
        activeMode: prev.activeMode == "light" ? "dark" : "light",
      };
    });

    location.reload();
  };

  const navItems = [
    {
      label: "Trading",
      to: "/trading/perp",
      actived: [`/trading/perp/${params.symbol}`],
    },
    { label: "Portfolio", to: "/portfolio", actived: ["/portfolio"] },
  ];

  const [openAccountDetailsModal, setAccountDetailsModal] = useState(false);

  return (
    <MainAppBar elevation={0} position="sticky">
      <OrderlyConnect />

      <Toolbar sx={{ px: "10px !important" }}>
        <Stack
          direction={"row"}
          width={"100%"}
          spacing={TSizes.margin_sm}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Logo width="80px" height="40px" />

          {/* {navItems.map((navItem) => (
						<Link key={navItem.label} href={navItem.to}>
							<NavItem isActived={navItem.actived.includes(pathName)}>
								<Typography>{navItem.label}</Typography>
							</NavItem>
						</Link>
					))} */}

          <Stack direction={"row"} spacing={"10px"}>
            {!wallet && (
              <MainButton variant="contained">Connect Wallet</MainButton>
            )}
            <IconButton>
              <IconMenu />
            </IconButton>
          </Stack>
        </Stack>

        {/* <Stack direction={"row"} spacing={"10px"}>
          <NetworkContent />

          {wallet ? (
            <MainIconButton
              edge="end"
              onClick={() => setAccountDetailsModal(!openAccountDetailsModal)}
            >
              <IconMenu />
            </MainIconButton>
          ) : (
            <MainIconButton onClick={handleChangeTheme} color="inherit">
              {themeSelector.activeMode == "light" ? (
                <IconSun />
              ) : (
                <IconMoonStars />
              )}
            </MainIconButton>
          )}

          {openAccountDetailsModal && (
            <AccountDetailMobile
              open={openAccountDetailsModal}
              handleClose={() => setAccountDetailsModal(false)}
            />
          )}
        </Stack> */}
      </Toolbar>
    </MainAppBar>
  );
}

export default memo(HeaderMobile);
