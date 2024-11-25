"use client";
import { HeadPage } from "@/components/HeadPage";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import AssetsContent from "./AssetsContent";
import HistoryContainer from "./HistoryContainer";
import OverviewContent from "./OverviewContent";
import PerformanceContent from "./PerformanceContent";

const PortfolioMainContainer = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.down("md"));

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
