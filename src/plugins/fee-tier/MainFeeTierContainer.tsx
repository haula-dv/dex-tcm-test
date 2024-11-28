"use client";
import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import IconCollapes from "@/components/icons/collapse";
import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { memo } from "react";

const MainFeeTierContainer = () => {
  const theme = useTheme();
  const tiers = [
    {
      label: "Your tier",
      value: 1,
    },
    {
      label: "30D trading volume (USDC)",
      value: "0.00",
    },
    {
      label: "Taker fee rate",
      value: "0.06%",
    },
    {
      label: "Maker fee rate",
      value: "0.03%",
    },
  ];

  const data = [
    {
      tier: "1",
      volume: "0 - 500K",
      or: "1",
      staking: null,
      maker: "0.03%",
      Ttaker: "0.06%",
    },
    {
      tier: "2",
      volume: "500K - 2.5M",
      or: "/",
      staking: {
        level: "Level 1 - 3",
        des: "(1.8K - 35.9K TCMP)",
      },
      maker: "0.02%",
      Ttaker: "0.05%",
    },
    {
      tier: "3",
      volume: "2.5M - 10M",
      or: "1",
      staking: {
        level: "Level 4 - 5",
        des: "(35.9K - 189.6K TCMP)",
      },
      maker: "0.015%",
      Ttaker: "0.045%",
    },
    {
      tier: "4",
      volume: "10M - 50M",
      or: "1",
      staking: {
        level: "Level 6",
        des: "(189.6K - 430.7K TCMP)",
      },
      maker: "0.01%",
      Ttaker: "0.04%",
    },
    {
      tier: "5",
      volume: "50M - 125M",
      or: "1",
      staking: {
        level: "Level 7",
        des: "(430.7K - 976K TCMP)",
      },
      maker: "0.005%",
      Ttaker: "0.035%",
    },
    {
      tier: "6",
      volume: "Above 125M",
      or: "1",
      staking: {
        level: "Level 8 - 10",
        des: "(Above 976K TCMP)",
      },
      maker: "0%",
      Ttaker: "0.03%",
    },
  ];

  return (
    <MainCard backgroudColor="common" height="100%">
      <Stack direction={"row"} justifyContent={"space-between"} pb={2}>
        <Typography fontSize={"18px"}>Fee tier</Typography>
        <Typography sx={{ opacity: ".5" }}>
          Updated daily by 2:00 UTC
        </Typography>
      </Stack>
      <Grid container spacing={2} pb={2}>
        {tiers.map((item, index) => (
          <Grid key={index} item xs={12} md={3}>
            <MainCard backgroudColor="common" variant="outlined">
              <Typography fontSize={"12px"} sx={{ opacity: ".4" }}>
                {item.label}
              </Typography>
              <Typography color={index != 1 ? theme.palette.success.main : ""}>
                {item.value}
              </Typography>
            </MainCard>
          </Grid>
        ))}
      </Grid>

      <MainCard backgroudColor="common" variant="outlined" disablePadding>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"small"} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Tier</TableCell>
                <TableCell align="center">30 day volume (USDC) </TableCell>
                <TableCell align="center">or</TableCell>
                <TableCell align="center">TCMP staking level </TableCell>
                <TableCell align="right">Maker</TableCell>
                <TableCell align="right">Taker</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{ bgcolor: index == 0 ? theme.palette.success.main : "" }}
                >
                  <TableCell>
                    <Box
                      sx={{ minHeight: "50px" }}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography>{item.tier}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{item.volume}</TableCell>
                  <TableCell align="center">/</TableCell>
                  <TableCell align="center">
                    {item.staking ? (
                      <>
                        <Typography fontSize={"12px"}>
                          {item.staking.level}
                        </Typography>
                        <Typography fontSize={"12px"} sx={{ opacity: ".5" }}>
                          {item.staking.des}
                        </Typography>
                      </>
                    ) : (
                      "--"
                    )}
                  </TableCell>
                  <TableCell align="right">{item.maker}</TableCell>
                  <TableCell align="right">{item.Ttaker}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">
                  <Box display={"flex"} justifyContent={"center"}>
                    <MainButton
                      size="small"
                      variant="contained"
                      href="/trading/"
                      startIcon={<IconCollapes />}
                    >
                      Trading
                    </MainButton>
                  </Box>
                </TableCell>

                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </MainCard>
  );
};

export default memo(MainFeeTierContainer);
