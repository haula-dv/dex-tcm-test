"use client";
import IconExplane from "@/components/icons/explane";
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
      path: "/fee-tier",
      icon: <IconCalculatorFilled size={"1.2rem"} />,
    },
    {
      label: "Api key",
      path: "/api-key",
      icon: <IconReservedLine />,
    },
  ];

  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", md: "row" }}
      p={{ xs: "6px", md: "16px" }}
    >
      <Box
        height={mdDown ? "" : "calc(100vh - 90px)"}
        position={"sticky"}
        top={70}
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
      >
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          {!isCollapse && <Typography>Portfolio</Typography>}

          <IconButton
            edge="end"
            onClick={() => {
              setIsCollapse(!isCollapse);
            }}
          >
            <IconExplane />
          </IconButton>
        </Stack>

        <List>
          {tabs.map((ite, index) => (
            <ListItemButton
              selected={index == 0}
              key={index}
              className="portfolio-item"
            >
              <ListItemIcon>{ite.icon}</ListItemIcon>
              {!isCollapse && (
                <ListItemText sx={{ ml: 1 }}>{ite.label}</ListItemText>
              )}
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box pl={{ xs: "0px", md: "16px" }} width={"100%"}>
        {children}
      </Box>
    </Box>
  );
}
