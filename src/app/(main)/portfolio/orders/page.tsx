"use client";
import { HeadPage } from "@/components/HeadPage";
import MainOrderContainer from "@/plugins/orders/components/MainOrderContainer";

const FeeTierPage = () => {
  return (
    <>
      <HeadPage title="Orders" />
      <MainOrderContainer />
    </>
  );
};

export default FeeTierPage;
