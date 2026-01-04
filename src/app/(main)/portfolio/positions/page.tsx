import { PageTitleMap, PathEnum } from "@/utils/constant";
import { generatePageTitle } from "@/utils/utils";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const DynamicPositionsView = dynamic(() => import("./view"));

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Positions]),
};

export default function PositionsPage() {
  return <DynamicPositionsView />;
}
