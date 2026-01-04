import { PageTitleMap, PathEnum } from "@/utils/constant";
import { generatePageTitle } from "@/utils/utils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const DynamicAssetsView = dynamic(() => import("./view"));

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Assets]),
};

export default function AssetsPage() {
  return <DynamicAssetsView />;
}
