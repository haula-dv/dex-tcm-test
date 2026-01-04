// import { HeadPage } from "@/components/HeadPage";
// import MainFeeTierContainer from "@/plugins/fee-tier/MainFeeTierContainer";

// const FeeTierPage = () => {
//   return (
//     <>
//       <HeadPage title="Fee tier" />
//       <MainFeeTierContainer />
//     </>
//   );
// };

// export default FeeTierPage;


import { PageTitleMap, PathEnum } from "@/utils/constant";
import { generatePageTitle } from "@/utils/utils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const DynamicFeeTierView = dynamic(() => import("./view"), { ssr: false });

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.FeeTier]),
};

export default function FeeTierPage() {
  return <DynamicFeeTierView />;
}
