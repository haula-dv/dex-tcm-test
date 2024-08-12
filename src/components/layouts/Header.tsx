"use client";
import { WalletContainer } from "@/plugins/wallet/components/WalletContainer";
import { Mixins } from "@/utils/themes/custom-theme/mixins";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import {
  AppBar,
  Box,
  BoxProps,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainContainer } from "../container/MainContainer";
import Logo from "../icons/Logo";

export const Header = () => {
  const pathName = usePathname();

  const navItems = [
    { label: "Swap", to: "/" },
    { label: "Pool", to: "/pool" },
    { label: "Vote", to: "/vote" },
  ];

  return (
    <MainAppBar elevation={0}>
      <MainContainer>
        <Toolbar disableGutters>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            width={"100%"}
            alignItems={"center"}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={TSizes.margin_md}
              height={"100%"}
            >
              <Logo />
              {navItems.map((navItem) => (
                <Link key={navItem.label} href={navItem.to}>
                  <NavItem isActived={pathName === navItem.to}>
                    <Typography>{navItem.label}</Typography>
                  </NavItem>
                </Link>
              ))}
            </Stack>

            <WalletContainer />
          </Stack>
        </Toolbar>
      </MainContainer>
    </MainAppBar>
  );
};

const MainAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#fff",
  zIndex: 0,
  "& .MuiToolbar-root": {
    minHeight: "auto",
  },
}));

interface INavItemProps extends BoxProps {
  isActived: boolean;
}

const NavItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActived",
})<INavItemProps>(({ theme, isActived }) => ({
  cursor: "pointer",
  position: "relative",
  display: "flex", // Flex display to center content
  alignItems: "center", // Center the Typography vertically
  height: "80px",

  "&:after": {
    ...Mixins.boxFullMixin({
      top: "auto",
      bottom: 0,
      left: 0,
      height: "2px",
      width: "100%",
      backgroundColor: isActived ? theme.palette.common.black : "transparent",
      borderRadius: "4px",
    }),
  },

  "& .MuiTypography-root": {
    color: theme.palette.common.black,
    fontSize: "14px",
    fontWeight: 700,
    padding: "6px 12px",
    borderRadius: TSizes.borderRadius,
    transition: theme.transitions.create(["background-color"]),
    // backgroundColor: isActived ? theme.palette.grey[50] : "transparent",

    "&:hover": {
      // backgroundColor: theme.palette.grey[50],
    },
  },
}));
