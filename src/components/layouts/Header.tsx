"use client";
import { TSizes } from "@/utils/themes/sizes";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MainContainer } from "../container/MainContainer";
import Logo from "../icons/Logo";

export const Header = () => {
  const navItems = [
    { label: "Swap", to: "/" },
    { label: "Pool", to: "/pool" },
    { label: "Vote", to: "/vote" },
  ];

  return (
    <MainAppBar elevation={0}>
      <MainContainer>
        <Toolbar>
          <Logo />

          <Stack
            direction={"row"}
            spacing={TSizes.margin_md}
            pl={TSizes.margin_md}
          >
            {navItems.map((navItem) => (
              <NavItem key={navItem.label}>
                <Typography>{navItem.label}</Typography>
              </NavItem>
            ))}
          </Stack>
        </Toolbar>
      </MainContainer>
    </MainAppBar>
  );
};

const MainAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#fff",
}));

const NavItem = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  "& .MuiTypography-root": {
    color: theme.palette.common.black,
    fontSize: "14px",
    fontWeight: 700,
    padding: "6px 12px",
    borderRadius: TSizes.borderRadius,
    transition: theme.transitions.create(["background-color"]),

    "&:hover": {
      backgroundColor: theme.palette.grey[50],
    },
  },
}));
