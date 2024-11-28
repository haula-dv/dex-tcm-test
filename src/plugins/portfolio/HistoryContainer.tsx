import { ITab } from "@/common/types/components/tab";
import MainCard from "@/components/card/MainCard";
import { setColorThemeMode } from "@/utils/helpers";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { IconArrowsLeftRight, IconCalculatorFilled } from "@tabler/icons-react";
import { useConnectWallet } from "@web3-onboard/react";
import { memo, useState } from "react";
import DepositsWithdrawalsContainer from "./DepositsWithdrawalsContainer";
import FundingContainer from "./FundingContainer";

const PortfolioMobileContainer = () => {
  const tabs: ITab[] = [
    {
      value: "deposite",
      label: "Deposits & Withdrawals",
    },
    {
      value: "funding",
      label: "Funding",
    },
  ];
  const theme = useTheme();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const [currentTab, setCurrentTab] = useState("deposite");
  const handleOnChange = (tab: string) => {
    setCurrentTab(tab);
  };
  // Handle connect wallet button
  const handleConnectWallet = async () => {
    await connect();
    location.reload();
  };
  return (
    <>
      <MainCard backgroudColor="primary">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          pb={1}
          sx={{ overflowX: "auto" }}
        >
          <Button
            startIcon={<IconArrowsLeftRight size={"1.2rem"} />}
            onClick={() => handleOnChange("deposite")}
            variant="contained"
            sx={{
              backgroundColor: setColorThemeMode(
                theme.palette.grey[50],
                theme.palette.grey[700]
              ),
              opacity: currentTab == "deposite" ? 1 : ".5",
            }}
          >
            Deposits & Withdrawals
          </Button>
          <Button
            startIcon={<IconCalculatorFilled size={"1.2rem"} />}
            variant="filledTonal"
            onClick={() => handleOnChange("funding")}
            sx={{
              backgroundColor: setColorThemeMode(
                theme.palette.grey[50],
                theme.palette.grey[700]
              ),
              opacity: currentTab == "funding" ? 1 : ".5",
            }}
          >
            Funding
          </Button>
          {/* <Button
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
          </Button> */}
        </Stack>
        {/* 
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
</Stack> */}

        {wallet ? (
          <TabContext value={currentTab}>
            <TabPanel value={"deposite"} sx={{ p: 0 }}>
              <DepositsWithdrawalsContainer />
            </TabPanel>

            <TabPanel value={"funding"} sx={{ p: 0 }}>
              <FundingContainer />
            </TabPanel>
          </TabContext>
        ) : (
          <>
            <Divider />
            <Box
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"180px"}
              pt={2}
            >
              <Box>
                <Button onClick={handleConnectWallet} variant="contained">
                  Connect wallet
                </Button>
              </Box>
              <Typography fontSize={"12px"} sx={{ opacity: ".5" }}>
                Please Connect wallet before starting to trade
              </Typography>
            </Box>
          </>
        )}
      </MainCard>

      {/* <TabContext value={currentTab}>
        <Box
          borderRadius={"10px 10px 0px 0px"}
          px={TSizes.margin_mobile}
          pt={TSizes.margin_mobile}
          bgcolor={setColorThemeMode(
            theme.palette.grey[100],
            theme.palette.grey[800]
          )}
        >
          <MainTab tabs={tabs} onChange={handleOnChange} />
        </Box>

        <TabPanel value={"deposite"} sx={{ p: 0 }}>
          <DepositsWithdrawalsContainer />
        </TabPanel>

        <TabPanel value={"funding"} sx={{ p: 0 }}>
          <FundingContainer />
        </TabPanel>
      </TabContext> */}
    </>
  );
};

export default memo(PortfolioMobileContainer);
