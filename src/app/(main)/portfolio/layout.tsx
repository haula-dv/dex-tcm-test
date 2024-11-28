"use client";
import IconCollapes from "@/components/icons/collapse";
import IconFeetier from "@/components/icons/feetier";
import IconSettings from "@/components/icons/settings";
import IconUser from "@/components/icons/user";
import "@/styles/global.scss";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "@orderly.network/react/dist/styles.css";
import { IconCertificate, IconChecklist } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();

  const tabs = [
    {
      label: "Overview",
      path: "/portfolio",
      icon: <IconUser />,
    },
    {
      label: "Positions",
      path: "/portfolio/positions",
      icon: <IconCertificate size={"1.2rem"} style={{ opacity: ".5" }} />,
    },
    {
      label: "Orders",
      path: "/portfolio/orders",
      icon: <IconChecklist size={"1.2rem"} style={{ opacity: ".5" }} />,
    },
    {
      label: "Fee tier",
      path: "/portfolio/fee-tier",
      icon: <IconFeetier />,
    },
    {
      label: "Setting",
      path: "/portfolio/setting",
      icon: <IconSettings />,
    },
  ];

  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const route = usePathname();

  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", md: "row" }}
      p={{ xs: "6px", md: "16px" }}
    >
      <Box
        height={mdDown ? "" : "calc(100vh - 100px)"}
        position={mdDown ? "relative" : "sticky"}
        top={{ xs: 0, md: 70 }}
        border={1}
        width={{ xs: "100%", md: !isCollapse ? "180px" : "auto" }}
        flexShrink={0}
        py={TSizes.margin_mobile}
        px={1}
        borderRadius={TSizes.borderRadius}
        bgcolor={setColorThemeMode(
          theme.palette.primary.main,
          theme.palette.grey[800]
        )}
        borderColor={theme.palette.divider}
        mb={"10px"}
      >
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          {mdDown ? (
            <Typography>Portfolio</Typography>
          ) : (
            <>{!isCollapse && <Typography>Portfolio</Typography>}</>
          )}

          <IconButton
            edge="end"
            onClick={() => {
              setIsCollapse(!isCollapse);
            }}
          >
            <IconCollapes />
          </IconButton>
        </Stack>

        {mdDown ? (
          <List sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {tabs.map((ite, index) => (
              <Link href={ite.path} key={index}>
                <ListItemButton
                  selected={route == ite.path}
                  className="portfolio-item"
                >
                  <ListItemIcon>{ite.icon}</ListItemIcon>
                  {!isCollapse && (
                    <ListItemText sx={{ ml: 1 }}>{ite.label}</ListItemText>
                  )}
                </ListItemButton>
              </Link>
            ))}
          </List>
        ) : (
          <List>
            {tabs.map((ite, index) => (
              <Link href={ite.path} key={index}>
                <ListItemButton
                  selected={route == ite.path}
                  className="portfolio-item"
                >
                  <ListItemIcon>{ite.icon}</ListItemIcon>
                  {!isCollapse && (
                    <ListItemText sx={{ ml: 1 }}>{ite.label}</ListItemText>
                  )}
                </ListItemButton>
              </Link>
            ))}
          </List>
        )}
      </Box>

      <Box pl={{ xs: "0px", md: "16px" }} width={"100%"}>
        {children}
      </Box>
    </Box>
  );
}
