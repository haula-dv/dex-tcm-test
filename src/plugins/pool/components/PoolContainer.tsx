"use client";
import { MainButton } from "@/components/button/MainButton";
import { MainCard } from "@/components/card/MainCard";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { AccountAnalystic } from "./AccountAnalystic";
import { SignatureRequest } from "./SignatureRequest";
import { TokenSelected } from "./TokenSelected";

export const PoolContainer = () => {
  const [isSignature, setIsSignature] = useState(false);

  return (
    <>
      {!isSignature ? (
        <Stack spacing={2} alignItems={"center"}>
          <MainCard backgroudColor="grey" variant="outlined">
            <Typography fontSize={"18px"} fontWeight={600} pb={1}>
              Liquidity provider rewards
            </Typography>

            <Typography>
              A token contract address is a unique address that represents a
              token on the blockchain. A token contract address is a unique
              address that represents a token on the blockchain.
            </Typography>
          </MainCard>

          <MainCard backgroudColor="white">
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pb={2}
            >
              <Typography fontSize={"18px"} fontWeight={600}>
                Liquidity
              </Typography>

              <Stack direction={"row"} maxWidth={"300px"} spacing={2}>
                <Link href={"/pool/create-a-pair"}>
                  <MainButton variant="outlined" color="inherit">
                    Create A Pair
                  </MainButton>
                </Link>

                <Link href={"/pool/add"}>
                  <MainButton variant="contained" color="darkPrimary">
                    Add Liquidity
                  </MainButton>
                </Link>
              </Stack>
            </Stack>

            <MainCard isHover variant="outlined">
              <Typography textAlign={"center"}>
                Your active V3 liquidity positions will appear here.
              </Typography>
            </MainCard>

            <Box pt={2} />
            <AccountAnalystic />
            <Box pt={2} />
            <TokenSelected />

            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"center"}
              pt={2}
              alignItems={"center"}
            >
              <Typography>{"Don't"} see a pool you joined?</Typography>
              <MainButton variant="textLink" color="inherit">
                Import It
              </MainButton>
            </Stack>
          </MainCard>
        </Stack>
      ) : (
        <SignatureRequest />
      )}
    </>
  );
};
