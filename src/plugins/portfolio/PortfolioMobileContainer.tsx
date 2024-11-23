import { ITab } from "@/common/types/components/tab";
import MainTab from "@/components/tab/MainTab";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Box, useTheme } from "@mui/material";
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

  const [currentTab, setCurrentTab] = useState("deposite");
  const handleOnChange = (tab: ITab) => {
    setCurrentTab(tab.value);
  };

  return (
    <TabContext value={currentTab}>
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
    </TabContext>
  );
};

export default memo(PortfolioMobileContainer);
