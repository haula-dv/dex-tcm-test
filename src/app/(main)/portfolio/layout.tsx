"use client";
import IconExplane from "@/components/icons/explane";
import IconSetting from "@/components/icons/setting";
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
import {
  IconCalculatorFilled,
  IconReservedLine,
  IconUserSquare,
} from "@tabler/icons-react";
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
      icon: <IconUserSquare size={"1.2rem"} />,
    },
    {
      label: "Fee tier",
      path: "/portfolio/fee-tier",
      icon: <IconCalculatorFilled size={"1.2rem"} />,
    },
    {
      label: "Api key",
      path: "/portfolio/api-key",
      icon: <IconReservedLine />,
    },
    {
      label: "Setting",
      path: "/portfolio/setting",
      icon: <IconSetting />,
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
          theme.palette.primary.light,
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
          {!isCollapse && <Typography>Portfolio</Typography>}

          {!mdDown && (
            <IconButton
              edge="end"
              onClick={() => {
                setIsCollapse(!isCollapse);
              }}
            >
              <IconExplane />
            </IconButton>
          )}
        </Stack>

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
      </Box>

      <Box pl={{ xs: "0px", md: "16px" }} width={"100%"}>
        {children}
      </Box>
    </Box>
  );
}
