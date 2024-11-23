import IconNotFound from "@/components/icons/NotFound";
import MainTab from "@/components/tab/MainTab";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Typography, useTheme } from "@mui/material";
import { memo } from "react";

const DataListMobileEmpty = () => {
  const theme = useTheme();

  const tabs = [
    {
      label: `Positions`,
      value: "positions",
    },
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "TP/SL",
      value: "TP/SL",
    },
    {
      label: "Order history",
      value: "order_history",
    },
  ];

  return (
    <Box
      height={"333px"}
      p={TSizes.margin_xs}
      borderRadius={TSizes.borderRadius}
      bgcolor={setColorThemeMode(
        theme.palette.primary.main,
        theme.palette.grey[800]
      )}
    >
      <MainTab tabs={tabs}>
        <Box
          display={"flex"}
          height={"100%"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <IconNotFound />
          <Typography fontSize={"12px"} textAlign={"center"}>
            No results found.
          </Typography>
        </Box>
      </MainTab>
    </Box>
  );
};

export default memo(DataListMobileEmpty);
