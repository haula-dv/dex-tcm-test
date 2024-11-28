"use client";
import MainOrderContainer from "@/plugins/orders/components/MainOrderContainer";
import Head from "next/head";

const FeeTierPage = () => {
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <MainOrderContainer />
    </>
  );
};

export default FeeTierPage;
