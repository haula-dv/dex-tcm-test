// "use client";
// import { HeadPage } from "@/components/HeadPage";
// import MainOrderContainer from "@/plugins/orders/components/MainOrderContainer";

// const FeeTierPage = () => {
//   return (
//     <>
//       <HeadPage title="Orders" />
//       <MainOrderContainer />
//     </>
//   );
// };

// export default FeeTierPage;

import { PageTitleMap, PathEnum } from "@/utils/constant";
import { generatePageTitle } from "@/utils/utils";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const DynamicOrdersView = dynamic(() => import("./view"));

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Orders]),
};

export default function OrdersPage() {
  return <DynamicOrdersView />;
}
