"use client";
import MainCard from "@/components/card/MainCard";
import IconFeetier from "@/components/icons/feetier";
import IconSettings from "@/components/icons/settings";
import IconUser from "@/components/icons/user";
import { usePathWithoutLang } from "@/hooks/usePathWithoutLang";
import "@/styles/global.scss";
import { useOrderlyConfig } from "@/utils/config/tcmp-cofig";
import { PathEnum } from "@/utils/constant";
import { getSymbol } from "@/utils/storage";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { PortfolioLayoutWidget, PortfolioLeftSidebarPath } from "@orderly.network/portfolio";
import "@orderly.network/react/dist/styles.css";
import { RouteOption } from "@orderly.network/types";
import { IconCertificate, IconChecklist } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useCallback, useMemo, useState } from "react";


type SideMenuItem = {
  name: string;
  icon?: ReactNode;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  hide?: boolean;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const config = useOrderlyConfig();
  const path = usePathWithoutLang();

  const currentPath = useMemo(() => {
    if (path.endsWith(PathEnum.FeeTier))
      return PortfolioLeftSidebarPath.FeeTier;
    return path;
  }, [path]);

  const tabs: SideMenuItem[] = [
    {
      name: "Overview",
      href: "/portfolio",
      icon: <IconUser />,
    },
    {
      name: "Positions",
      href: "/portfolio/positions",
      icon: <IconCertificate size={"1.2rem"} style={{ opacity: ".7" }} />,
    },
    {
      name: "Orders",
      href: "/portfolio/orders",
      icon: <IconChecklist size={"1.2rem"} style={{ opacity: ".7" }} />,
    },
    {
      name: "Fee tier",
      href: "/portfolio/fee-tier",
      icon: <IconFeetier />,
    },
    {
      name: "Setting",
      href: "/portfolio/setting",
      icon: <IconSettings />,
    },
  ];

  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const route = usePathname();
  const router = useRouter();

  const [isCollapse, setIsCollapse] = useState(false);

  const onRouteChange = useCallback(
    (option: RouteOption) => {
      if (option.target === "_blank") {
        window.open(option.href);
        return;
      }


      if (option.href === "/") {
        const symbol = getSymbol();
        router.push(`/${PathEnum.Perp}/${symbol}`);
        return;
      }

      // if href not equal to the route path, we need to convert it to the route path
      const routeMap = {
        [PortfolioLeftSidebarPath.FeeTier]: PathEnum.FeeTier,
      } as Record<string, string>;

      const path = routeMap[option.href] || option.href;

      router.push(path.startsWith("/") ? path : `/${path}`);
    },
    [router],
  );

  return (
    <div className="portfolio-page">
      <PortfolioLayoutWidget
        mainNavProps={{
          ...config.scaffold.mainNavProps,
          initialMenu: PathEnum.Portfolio,
        }}
        routerAdapter={{
          onRouteChange,
        }}
        leftSideProps={{
          current: currentPath,
          items: tabs
          // items: tabs.map((item) => ({
          //   href: item.path,
          //   label: item.label,
          //   icon: item.icon,
          // })),
        }}
        classNames={{
          body: 'portfolio-page',
          topNavbar: '',
          bottomNav: ''
        }}
      >

        {mdDown ? (
          <Box p={1}>
            <MainCard backgroudColor="primary">
              <List disablePadding sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {tabs.map((ite, index) => (
                  <Link href={ite.href ?? ''} key={index}>
                    <ListItemButton
                      selected={route == ite.href}
                      className="portfolio-item"
                    >
                      <ListItemIcon>{ite.icon}</ListItemIcon>
                      {!isCollapse && (
                        <ListItemText sx={{ ml: 1 }}>{ite.name}</ListItemText>
                      )}
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </MainCard>
          </Box>
        ) : (
          null
        )}

        {children}
      </PortfolioLayoutWidget>
    </div>
    // <Box
    //   display={"flex"}
    //   flexDirection={{ xs: "column", md: "row" }}
    //   p={{ xs: "6px", md: "16px" }}
    // >
    //   <Box
    //     height={mdDown ? "" : "calc(100vh - 100px)"}
    //     position={mdDown ? "relative" : "sticky"}
    //     top={{ xs: 0, md: 70 }}
    //     border={1}
    //     width={{ xs: "100%", md: !isCollapse ? "180px" : "auto" }}
    //     flexShrink={0}
    //     py={TSizes.margin_mobile}
    //     px={1}
    //     borderRadius={TSizes.borderRadius}
    //     bgcolor={setColorThemeMode(
    //       theme.palette.primary.main,
    //       theme.palette.grey[800]
    //     )}
    //     borderColor={theme.palette.divider}
    //     mb={"10px"}
    //   >
    //     <Stack
    //       direction={"row"}
    //       spacing={1}
    //       alignItems={"center"}
    //       width={"100%"}
    //       justifyContent={"space-between"}
    //     >
    //       {mdDown ? (
    //         <Typography>Portfolio</Typography>
    //       ) : (
    //         <>{!isCollapse && <Typography>Portfolio</Typography>}</>
    //       )}

    //       <IconButton
    //         edge="end"
    //         onClick={() => {
    //           setIsCollapse(!isCollapse);
    //         }}
    //       >
    //         <IconCollapes />
    //       </IconButton>
    //     </Stack>

    //     {mdDown ? (
    //       <List sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
    //         {tabs.map((ite, index) => (
    //           <Link href={ite.path} key={index}>
    //             <ListItemButton
    //               selected={route == ite.path}
    //               className="portfolio-item"
    //             >
    //               <ListItemIcon>{ite.icon}</ListItemIcon>
    //               {!isCollapse && (
    //                 <ListItemText sx={{ ml: 1 }}>{ite.label}</ListItemText>
    //               )}
    //             </ListItemButton>
    //           </Link>
    //         ))}
    //       </List>
    //     ) : (
    //       <List>
    //         {tabs.map((ite, index) => (
    //           <Link href={ite.path} key={index}>
    //             <ListItemButton
    //               selected={route == ite.path}
    //               className="portfolio-item"
    //             >
    //               <ListItemIcon>{ite.icon}</ListItemIcon>
    //               {!isCollapse && (
    //                 <ListItemText sx={{ ml: 1 }}>{ite.label}</ListItemText>
    //               )}
    //             </ListItemButton>
    //           </Link>
    //         ))}
    //       </List>
    //     )}
    //   </Box>

    //   <Box pl={{ xs: "0px", md: "16px" }} width={"100%"}>
    //     {children}
    //   </Box>
    // </Box>
  );
}
