"use client";
import MainCard from "@/components/card/MainCard";
import SwitchBase from "@/components/form-control/SwitcheBase";
import { HeadPage } from "@/components/HeadPage";
import { Divider, FormControl, Stack, Typography } from "@mui/material";

const FeeTierPage = () => {
  return (
    <MainCard backgroudColor="common">
      <HeadPage title="Settings" />
      <Typography fontSize={"18px"} pb={2}>
        System upgrade
      </Typography>
      <Divider />

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack>
          <Typography fontWeight={600} pt={2}>
            Cancel open orders during system upgrade
          </Typography>
          <Typography sx={{ opacity: ".5" }}>
            During the upgrade period, all open orders will be cancelled to
            manage your risk in case of high market volatility.
          </Typography>
        </Stack>

        <FormControl>
          <SwitchBase />
        </FormControl>
      </Stack>
    </MainCard>
  );
};

export default FeeTierPage;
