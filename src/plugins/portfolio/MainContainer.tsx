"use client";
import MainCard from "@/components/card/MainCard";
import { HeadPage } from "@/components/HeadPage";
import { setColorThemeMode } from "@/utils/helpers";
import {
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Select } from "@orderly.network/react";
import {
  IconArrowsLeftRight,
  IconCalculatorFilled,
  IconDatabase,
} from "@tabler/icons-react";
import AssetsContent from "./AssetsContent";
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
          <MainCard backgroudColor="primary">
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1}
              pb={1}
              sx={{ overflowX: "auto" }}
            >
              <Button
                startIcon={<IconArrowsLeftRight size={"1.2rem"} />}
                variant="contained"
                sx={{
                  backgroundColor: setColorThemeMode(
                    theme.palette.grey[50],
                    theme.palette.grey[700]
                  ),
                }}
              >
                Deposits & Withdrawals
              </Button>
              <Button
                startIcon={<IconCalculatorFilled size={"1.2rem"} />}
                variant="filledTonal"
                sx={{
                  backgroundColor: setColorThemeMode(
                    theme.palette.grey[50],
                    theme.palette.grey[700]
                  ),
                  opacity: ".5",
                }}
              >
                Funding
              </Button>
              <Button
                variant="filledTonal"
                startIcon={<IconDatabase size={"1.2rem"} />}
                sx={{
                  backgroundColor: setColorThemeMode(
                    theme.palette.grey[50],
                    theme.palette.grey[700]
                  ),
                  opacity: ".5",
                }}
              >
                Distribution
              </Button>
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              pb={"6px"}
              borderRadius={"0px 0px 10px 10px"}
              bgcolor={setColorThemeMode(
                theme.palette.grey[100],
                theme.palette.grey[800]
              )}
            >
              <Select className="main-select" options={type} value={"All"} />

              <Stack direction={"row"} spacing={"6px"}>
                <Typography fontSize={"12px"}>Rows per page</Typography>
                <Select className="main-select" options={size} value={10} />
              </Stack>
            </Stack>
            <MainCard
              variant="outlined"
              height="200px"
              backgroudColor="primary"
            >
              ...
            </MainCard>
          </MainCard>
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
