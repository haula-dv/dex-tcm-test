import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import { DepositWithdrawDialog } from "@/components/deposit/DepositWithdrawDialog";
import { MainDialog } from "@/components/dialog/MainDialog";
import { useIsTestnet } from "@/hooks";
import { AppInfo } from "@/utils/constants/key_store";
import { usdFormatter } from "@/utils/formatters/number";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { useAccount, useChains, useWithdraw } from "@orderly.network/hooks";
import { useSetChain } from "@web3-onboard/react";
import Image from "next/image";
import { memo, useMemo, useState } from "react";
import { toast } from "sonner";

interface IProps {
  quote: string;
  isFristLoading: boolean;
}

const Balance = ({
  quote,
  isFristLoading,
}: IProps) => {
  // Orderly hooks
  const theme = useTheme();
  const [isTestnet] = useIsTestnet();
  const {
    account,
    state: { status }
  } = useAccount();
  const [chains] = useChains(isTestnet ? 'testnet' : 'mainnet');

  const token = useMemo(
    () => chains.find((item) => item.network_infos.chain_id === account.chainId)?.token_infos[0],
    [chains, account.chainId]
  );

  const { availableBalance } = useWithdraw({
    decimals: token?.decimals,
    token: token?.symbol,
    srcChainId: Number(account.chainId),
  });

  const [open, setOpen] = useState(false);
  const [openWithDraw, setOpenWithDraw] = useState(false);
  const [activedTab, setActivedTab] = useState("withdraw");
  const [{ connectedChain }, setChain] = useSetChain();

  // Handle get test USDC
  const handleGetTestUSDC = async () => {
    if (!account?.address) {
      toast.error("Wallet not connected");
      return;
    }

    const toastId = toast.loading("Minting 1k USDC on testnet...");

    try {
      // Use local API route to bypass CORS
      const res = await fetch("/api/faucet/usdc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          broker_id: AppInfo.BROKER_ID,
          chain_id: String(Number(connectedChain?.id)),
          user_address: account.address,
        }),
      });

      if (!res.ok) {
        throw new Error(
          res.status === 429 ? "Too many requests" : res.statusText
        );
      }

      const { success, message } = (await res.json()) as any;

      if (!success) {
        throw new Error(message);
      }

      toast.success(
        "Mint success! It might take a while to be received in your Orderly account",
        { id: toastId }
      );
    } catch (err) {
      console.error(err);
      let message: string;
      if (err instanceof Error) {
        message = err.message;
      } else {
        message = "Mint failed!";
      }
      toast.error(message, { id: toastId });
      throw err;
    }
  };

  const handleOpenWithdraw = (type: string) => {
    setActivedTab(type);
    setOpenWithDraw(!openWithDraw);
  };

  return (
    <>
      <MainCard
        backgroudColor="primaryLight"
        width="100%"
        isActionSlot={
          <>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography
                fontSize={"12px"}
                color={setColorThemeMode(
                  useTheme().palette.grey[600],
                  useTheme().palette.grey[200]
                )}
              >
                Total balance
              </Typography>

              {isFristLoading ? (
                <Skeleton variant="text" width={"100px"} />
              ) : (
                <Typography fontWeight={600} fontSize={"17px"}>
                  {usdFormatter.format(availableBalance)}{" "}
                  <span
                    style={{
                      color: setColorThemeMode(
                        theme.palette.grey[700],
                        theme.palette.grey[300]
                      ),
                    }}
                  >
                    {quote}
                  </span>
                </Typography>
              )}
            </Stack>

            {isTestnet && (
              <>
                <Box mb={TSizes.margin_xs} />

                <MainButton
                  size="xsmall"
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  onClick={handleGetTestUSDC}
                >
                  <Image
                    src={"/images/USDC.png"}
                    height={18}
                    width={18}
                    alt=""
                    style={{ marginRight: "4px" }}
                  />{" "}
                  Get 1,000 test {quote}
                </MainButton>
              </>
            )}
          </>
        }
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Account</Typography>

          <Stack direction={"row"} spacing={"10px"}>
            <MainButton
              size="xsmall"
              variant="outlined"
              color={setColorThemeMode("darkGrey", "greyLight")}
              onClick={() => handleOpenWithdraw("withdraw")}
            >
              Withdraw
            </MainButton>

            <MainButton
              size="xsmall"
              variant="outlined"
              color={setColorThemeMode("darkGrey", "greyLight")}
              onClick={() => handleOpenWithdraw("deposit")}
            >
              Deposit
            </MainButton>
          </Stack>
        </Stack>
      </MainCard>

      <Box mb={TSizes.margin_xs} />

      <MainDialog
        open={open}
        handleClose={() => setOpen(false)}
        maxWidth="xs"
        hiddenHeader
      >
        <MainCard backgroudColor="common">
          <Typography
            textAlign={"center"}
            color={useTheme().palette.success.main}
          >
            Receive 1,000 USDC in the Testnet environment. Each account may only
            use the faucet a maximum of 5 times.
          </Typography>

          <Typography textAlign={"center"} pt={1}>
            Please wait about 1 minute until you receive the 1,000 USDC testnet
          </Typography>
        </MainCard>
        <Box mt="10px" />

        <MainButton
          fullWidth
          variant="contained"
          onClick={() => setOpen(false)}
        >
          Close
        </MainButton>
      </MainDialog>

      <DepositWithdrawDialog
        open={openWithDraw}
        activedTab={activedTab as any}
        onClose={() => setOpenWithDraw(false)}
      />
    </>
  );
};

export default memo(Balance);
