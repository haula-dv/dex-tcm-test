// import PortfolioMainContainer from "@/plugins/portfolio/MainContainer";

// export default function PortfollioPage() {
//   return <PortfolioMainContainer />;
// }

// // https://orderly.network/docs/build-on-evm/evm-api/restful-api/private/get-asset-history#get-asset-history

'use client';
import { PageTitleMap, PathEnum } from "@/utils/constant";
import { generatePageTitle } from "@/utils/utils";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const DynamicPortfolioView = dynamic(() => import("./view"), { ssr: false });

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Portfolio]),
};

export default function PortfolioPage() {
  return <DynamicPortfolioView />;
}
