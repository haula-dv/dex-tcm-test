"use client";
import { HeadPage } from "@/components/HeadPage";
import { apiClientFetch } from "@/utils/apiClient";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useConnectWallet } from "@web3-onboard/react";
import { useEffect, useState } from "react";
import AssetsContent from "./AssetsContent";
import HistoryContainer from "./HistoryContainer";
import OverviewContent from "./OverviewContent";
import PerformanceContent from "./PerformanceContent";

const PortfolioMainContainer = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.down("md"));
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [filter, setFilter] = useState<any>({
    page: 1,
    size: 10,
    start_date: "2024-08-22",
    end_date: "2024-11-27",
  });

  const fetchDailyStatistic = async () => {
    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries(filter).map(([key, value]) => [key, String(value)])
      )
    ).toString();

    await apiClientFetch
      .GET(wallet, `/client/statistics/daily?${queryString}`)
      .then((res: any) => {
        console.log(res);
        // setRowsDeposite(res.data.rows);
      })
      .finally(() => {
        // setRowsDepositeLoading(false);
      });
  };

  useEffect(() => {
    fetchDailyStatistic();
  }, [filter]);

  return (
    <>
      <HeadPage title="Portfolio - Dex Tcmp" />

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <OverviewContent />
        </Grid>

        <Grid item xs={12} md={6}>
          <AssetsContent />
        </Grid>

        <Grid item xs={12} md={12}>
          <PerformanceContent />
        </Grid>
        <Grid item xs={12} md={12}>
          <HistoryContainer />
        </Grid>
      </Grid>
    </>
  );
};

export default PortfolioMainContainer;

const type = [
  { label: "All", value: "all" },
  { label: "Deposite", value: "DEPOSIT" },
  { label: "Withdraw", value: "WITHDRAW" },
];

const size = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];
