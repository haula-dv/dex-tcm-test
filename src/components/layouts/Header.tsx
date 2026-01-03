"use client";
import WalletContainer from "@/plugins/wallet/components/WalletContainer";
import { setColorThemeMode } from "@/utils/helpers";
import { Mixins } from "@/utils/themes/custom-theme/mixins";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import {
  AppBar,
  Box,
  BoxProps,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Logo from "../icons/Logo";

const HeaderMobile = dynamic(() => import("./HeaderMobile"), { ssr: false });

export const Header = () => {
  const pathName = usePathname();
  const params = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

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

  if (isMobile) {
    return <HeaderMobile />;
  }

  return (
    <MainAppBar elevation={0} position="sticky">
      <Box px={{ xs: "16px" }}>
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
            >
              <Link href={"/trading/"}>
                <Logo width="80px" height="40px" />
              </Link>

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

export const HeaderLoading = () => {
  return (
    <MainAppBar elevation={0} position="sticky">
      <Box px={{ xs: "16px" }}>
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
            >
              <Logo width="80px" height="40px" />
            </Stack>
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

  [theme.breakpoints.down("md")]: {
    borderRadius: "8px",
    backgroundColor: isActived
      ? setColorThemeMode(
        theme.palette.primary.main,
        theme.palette.grey[800],
        theme
      )
      : "transparent",

    "& .MuiTypography-root": {
      fontSize: "13px !important",
      fontWeight: 500,
    },
  },

  [theme.breakpoints.up("md")]: {
    height: "56px",
    "&:after": {
      ...Mixins.boxFullMixin({
        top: "auto",
        bottom: 0,
        left: 0,
        height: "2px",
        width: "100%",
        backgroundColor: isActived
          ? setColorThemeMode(
            theme.palette.common.black,
            theme.palette.common.white,
            theme
          )
          : "transparent",
        borderRadius: "4px",
      }),
    },
  },
  "& .MuiTypography-root": {
    color: setColorThemeMode(
      theme.palette.common.black,
      theme.palette.common.white,
      theme
    ),
    fontSize: "14px",
    fontWeight: 700,
    padding: "6px 12px",
    borderRadius: TSizes.borderRadius,
    transition: theme.transitions.create(["background-color"]),
  },
}));
