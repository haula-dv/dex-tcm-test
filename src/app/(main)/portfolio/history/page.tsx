import { PageTitleMap, PathEnum } from "@/utils/constant";
import { generatePageTitle } from "@/utils/utils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const DynamicHistoryView = dynamic(() => import("./view"), { ssr: false });

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.History]),
};

export default function HistoryPage() {
  return <DynamicHistoryView />;
}
