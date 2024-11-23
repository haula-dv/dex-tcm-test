import { ITab } from "@/common/types/components/tab";
import MainCard from "@/components/card/MainCard";
import MainTab from "@/components/tab/MainTab";
import { apiClientFetch } from "@/utils/apiClient";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Divider } from "@mui/material";
import { useConnectWallet } from "@web3-onboard/react";
import { memo, useEffect, useState } from "react";
import DepositsWithdrawalsContainer from "./DepositsWithdrawalsContainer";

const PortfolioMobileContainer = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const [rowsDeposite, setRowsDeposite] = useState([]);
  const [rowsDepositeLoading, setRowsDepositeLoading] = useState(true);

  const onFetchAssetHistory = async () => {
    await apiClientFetch
      .GET(wallet, "/asset/history?size=100&page=1")
      .then((res: any) => {
        setRowsDeposite(res.data.rows);
      })
      .finally(() => {
        setRowsDepositeLoading(false);
      });
  };

  console.log(rowsDeposite);

  const tabs: ITab[] = [
    {
      value: "deposite",
      label: "Deposits & Withdrawals",
      children: (
        <DepositsWithdrawalsContainer
          rows={rowsDeposite}
          isLoading={rowsDepositeLoading}
        />
      ),
    },
    {
      value: "funding",
      label: "Funding",
    },
  ];

  useEffect(() => {
    onFetchAssetHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabContext value={"deposite"}>
      <MainCard backgroudColor="primary">
        <MainTab tabs={tabs}>
          <>
            <Divider />
            <Box>Sort</Box>
          </>
        </MainTab>
      </MainCard>

      <TabPanel value={"deposite"} sx={{ p: 0 }}>
        <DepositsWithdrawalsContainer
          rows={rowsDeposite}
          isLoading={rowsDepositeLoading}
        />
      </TabPanel>
    </TabContext>
  );
};

export default memo(PortfolioMobileContainer);
