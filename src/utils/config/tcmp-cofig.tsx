import { type RestrictedInfoOptions } from "@orderly.network/hooks";
import { AppLogos } from "@orderly.network/react-app";
import { useMemo } from "react";

export type OrderlyConfig = {
  orderlyAppProvider: {
    appIcons: AppLogos;
    restrictedInfo?: RestrictedInfoOptions;
  };
};

export const useOrderlyConfig = () => {
  return useMemo<OrderlyConfig>(() => {
    return {
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
