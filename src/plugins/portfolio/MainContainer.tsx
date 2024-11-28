"use client";
import { HeadPage } from "@/components/HeadPage";
import { apiClientFetch } from "@/utils/apiClient";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useConnectWallet } from "@web3-onboard/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AssetsContent from "./AssetsContent";
import HistoryContainer from "./HistoryContainer";
import OverviewContent from "./OverviewContent";
import PerformanceContent from "./PerformanceContent";

export const dateRange = [
  { label: "7D", value: 7, size: 11 },
  { label: "30D", value: 30, size: 36 },
  { label: "90D", value: 90, size: 96 },
];

const PortfolioMainContainer = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.down("md"));
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const cheat = "2024-08-22";
  const [filter, setFilter] = useState<any>({
    page: 1,
    size: 11,
    start_date: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"), // Sau 7 ngày
  });

  const [dailys, setDailys] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(7);

  const handleChangeRange = (dateNum: number) => {
    setCurrentDate(Number(dateNum));
    const findSize = dateRange.find((ite) => ite.value == dateNum)?.size;

    setFilter({
      ...filter,
      size: findSize,
      start_date: dayjs(cheat).subtract(dateNum, "day").format("YYYY-MM-DD"),
    });
  };

  const fetchDailyStatistic = async () => {
    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries(filter).map(([key, value]) => [key, String(value)])
      )
    ).toString();

    await apiClientFetch
      .GET(wallet, `/client/statistics/daily?${queryString}`)
      .then((res: any) => {
        setDailys(res.data.rows);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchDailyStatistic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <>
      <HeadPage title="Portfolio - Dex Tcmp" />

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <OverviewContent />
        </Grid>

        <Grid item xs={12} md={6}>
          <AssetsContent
            dailys={dailys}
            handleChangeRange={handleChangeRange}
            currentDate={currentDate}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <PerformanceContent
            dailys={dailys}
            handleChangeRange={handleChangeRange}
            currentDate={currentDate}
          />
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
