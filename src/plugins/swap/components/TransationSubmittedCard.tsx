import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import theme from "@/utils/themes/mui-theme";
import { Box, Stack, Typography } from "@mui/material";
import { setZustandValue } from "nes-zustand";
import { isTransactionSubmittedState } from "../store";

export const TransationSubmittedCard = () => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <MainCard maxWidth="320px">
        <Box
          height={100}
          width={100}
          bgcolor={theme.palette.grey[200]}
          display={"flex"}
          justifyContent={"center"}
          mx={"auto"}
        />

        <Typography
          fontSize={"18px"}
          fontWeight={600}
          textAlign={"center"}
          pt={2}
        >
          Transaction Submitted
        </Typography>

        <Typography textAlign={"center"} py={1}>
          Swaping 099ETH for 08092088 ALM
        </Typography>

        <Stack spacing={1}>
          <MainButton size="large" color="inherit">
            View on Therscan
          </MainButton>

          <MainButton
            size="large"
            variant="contained"
            color="darkPrimary"
            onClick={() => setZustandValue(isTransactionSubmittedState, false)}
          >
            Close
          </MainButton>
        </Stack>
      </MainCard>
    </Box>
  );
};
