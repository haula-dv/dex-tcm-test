import { HeadPage } from "@/components/HeadPage";
import MainFeeTierContainer from "@/plugins/fee-tier/MainFeeTierContainer";

const FeeTierPage = () => {
  return (
    <>
      <HeadPage title="Fee tier" />
      <MainFeeTierContainer />
    </>
  );
};

export default FeeTierPage;
