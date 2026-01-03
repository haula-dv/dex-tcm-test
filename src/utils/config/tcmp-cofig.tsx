import { type RestrictedInfoOptions } from "@orderly.network/hooks";
import { AppLogos } from "@orderly.network/react-app";
import { useMemo } from "react";
import { PathEnum } from "../constant";

export type OrderlyConfig = {
  orderlyAppProvider: {
    appIcons: AppLogos;
    restrictedInfo?: RestrictedInfoOptions;
  };

  scaffold: {
    mainNavProps: any;
  };
};

export const useOrderlyConfig = () => {
  return useMemo<OrderlyConfig>(() => {
    return {
      scaffold: {
        mainNavProps: {
          mainMenus: [
            { name: 'Trade', href: PathEnum.Root },
            { name: 'Portfolio', href: PathEnum.Portfolio },
          ],
          initialMenu: PathEnum.Root,
        },
        footerProps: {
          telegramUrl: "https://orderly.network",
          discordUrl: "https://discord.com/invite/orderlynetwork",
          twitterUrl: "https://twitter.com/OrderlyNetwork",
        },
      },
      orderlyAppProvider: {
        appIcons: {
          main: {
            component: (
              <img
                alt="Orderly logo"
                src="/Orderly.svg"
                style={{ width: 100, height: 40 }}
              />
            ),
          },
          secondary: {
            img: "/orderly-logo-secondary.svg",
          },
        },
      },
    };
  }, []);
}
