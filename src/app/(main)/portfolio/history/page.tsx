import { PageTitleMap, PathEnum } from "@/utils/constant";
import { generatePageTitle } from "@/utils/utils";
import { Metadata } from "next";
import HistoryView from "./view";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.History]),
};

export default function HistoryPage() {
  return <HistoryView />;
}
