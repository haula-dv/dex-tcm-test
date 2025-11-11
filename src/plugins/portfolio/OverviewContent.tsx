"use client";
import MainCard from "@/components/card/MainCard";
import { DepositWithdrawDialog } from "@/components/deposit/DepositWithdrawDialog";
import { usdFormatter } from "@/utils/formatters/number";
import { idFromHexChainId } from "@/utils/formatters/token";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  useChains,
  useCollateral,
  useLeverage,
  useMarginRatio,
  usePositionStream,
  useWithdraw,
} from "@orderly.network/hooks";
import {
  IconEyeFilled,
  IconPencil,
  IconSquareRoundedArrowDownFilled,
  IconSquareRoundedArrowUpFilled,
} from "@tabler/icons-react";
import { useWalletConnector } from "@orderly.network/hooks";
import { useSetChain } from "@web3-onboard/react";
import { useMemo, useState } from "react";
import { FormSlider } from "../trade/components/create-order/Accountleverage";

const OverviewContent = ({ isHideValue, setIsHideValue }: any) => {
  const theme = useTheme();
  // Temporarily disabled - requires Orderly SDK
  // const [_, { findByChainId }] = useChains();
  // const [{ connectedChain }, setChain] = useSetChain();
  // const collateral = useCollateral();
  const [isOpenDeposit, setIsOpenDesposit] = useState(false);
  const [activedTab, setActivedTab] = useState<any>("withdraw");
  // const [positions, _info, { refresh, loading }] = usePositionStream();
  const { wallet } = useWalletConnector();

  // GET CURRENT CHAIN - Disabled
  // const currentChain = useMemo(() => {
  //   return findByChainId(
  //     connectedChain ? idFromHexChainId(connectedChain?.id ?? "") : 1
  //   );
  // }, [connectedChain, findByChainId]);

  // const token = useMemo(() => {
  //   return currentChain?.token_infos[0] ?? undefined;
  // }, [currentChain]);

  // const { unsettledPnL, availableWithdraw } = useWithdraw();
  // const [maxLeverage, { update, config: leverageLevers, isMutating }] =
  //   useLeverage();

  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  });

  const { currentLeverage, mmr } = useMarginRatio();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleToggleDesposit = (type?: string) => {
    if (type) {
      setActivedTab(type);
    }
    setIsOpenDesposit(!isOpenDeposit);
  };

  // Remap for matching with marks
  const newLeverageLevers = useMemo(() => {
    const length = leverageLevers.length;

    return leverageLevers.length > 0
      ? leverageLevers.map((id: any, index: any) => {
          const percentValue = (index * 100) / (length - 1);

          return { value: percentValue, label: `${id}x` }; // Thêm nhãn cho mỗi marks
        })
      : [];
  }, [leverageLevers]);

  // Initial value for slider
  const leverageValue = useMemo(() => {
    const index: any = newLeverageLevers.find(
      (item: any) => item.label === `${maxLeverage}x`
    );
    if (!index) {
      return 0;
    }

    return index.value;
  }, [maxLeverage, newLeverageLevers]);

  const unrealPnL: number = positions?.aggregated?.unrealPnL ?? 0;
  const totalValue: number = positions?.aggregated?.notional; // Tránh chia 0

  const unrealPnLPercentage: number = (unrealPnL / totalValue) * 100;

  // Handle connect wallet button
  const handleConnectWallet = async () => {
    await connect().then((res) => {
      if (res && res.length > 0) {
        location.reload();
      }
    });
  };

  return (
    <MainCard backgroudColor="primary" height="220px">
      <Stack
        direction={"row"}
        alignItems={"center"}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={"18px"} fontWeight={500}>
          Overview
        </Typography>

        <Stack direction={"row"} spacing={"10px"}>
          <Button
            variant="filledTonal"
            color="inherit"
            size="small"
            startIcon={<IconSquareRoundedArrowUpFilled size={"1rem"} />}
            onClick={() => handleToggleDesposit("withdraw")}
            disabled={!wallet}
          >
            Withdraw
          </Button>
          <Button
            variant="filledTonal"
            size="small"
            color="inherit"
            startIcon={<IconSquareRoundedArrowDownFilled size={"1rem"} />}
            onClick={() => handleToggleDesposit("deposit")}
            disabled={!wallet}
          >
            Deposit
          </Button>
        </Stack>
      </Stack>

      <Stack direction={"row"} spacing={1} alignItems={"center"} pt={"10px"}>
        <Typography fontSize={"12px"} sx={{ opacity: ".5" }}>
          Total value
        </Typography>

        <IconButton size="small" onClick={() => setIsHideValue(!isHideValue)}>
          <IconEyeFilled size={"1rem"} />
        </IconButton>
      </Stack>

      <Typography fontWeight={500} pt={1}>
        <span style={{ fontSize: "22px", color: theme.palette.success.main }}>
          {isHideValue
            ? "*********"
            : usdFormatter.format(Number(collateral.availableBalance))}
        </span>{" "}
        USDC
      </Typography>

      <Box pt={2} />
      <Divider />
      <Box pt={1} />

      {!wallet ? (
        <Button variant="contained" fullWidth onClick={handleConnectWallet}>
          Connect wallet
        </Button>
      ) : (
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack flex={1}>
            <Typography fontSize={"13px"} sx={{ opacity: ".4" }}>
              Unrealized PnL
            </Typography>

            <Typography
              fontWeight={600}
              fontSize={"18px"}
              color={
                unrealPnL.toString().startsWith("-")
                  ? theme.palette.error.main
                  : theme.palette.success.main
              }
            >
              {isHideValue ? (
                "*****"
              ) : (
                <>
                  {positions.aggregated?.unrealPnL
                    ? usdFormatter.format(positions.aggregated?.unrealPnL)
                    : "0.00"}{" "}
                  <span style={{ fontSize: "12px" }}>
                    (
                    {`${
                      isNaN(unrealPnLPercentage)
                        ? `0.00`
                        : unrealPnLPercentage.toFixed(2)
                    }%`}
                    )
                  </span>
                </>
              )}
            </Typography>
          </Stack>

          <Stack flex={1}>
            <Typography fontSize={"13px"} sx={{ opacity: ".4" }}>
              Max account leverage
            </Typography>

            <Stack direction={"row"} spacing={0.4} alignItems={"center"}>
              {maxLeverage ? (
                <>
                  <Typography fontSize={"18px"}>
                    {maxLeverage}
                    <span style={{ fontSize: "12px" }}>x</span>
                  </Typography>
                  <Box className="pointer" onClick={handleToggle}>
                    <IconPencil size={"1.1rem"} />
                  </Box>
                </>
              ) : (
                <span>--</span>
              )}
            </Stack>
          </Stack>

          <Stack flex={1}>
            <Typography fontSize={"13px"} sx={{ opacity: ".4" }}>
              Available to withdraw
            </Typography>
            <Typography fontSize={"18px"}>
              {isHideValue ? "******" : usdFormatter.format(availableWithdraw)}
            </Typography>
          </Stack>
        </Stack>
      )}

      <DepositWithdrawDialog
        open={isOpenDeposit}
        onClose={handleToggleDesposit}
        activedTab={activedTab}
      />

      {open && (
        <FormSlider
          handleToggle={handleToggle}
          open={open}
          leverageValue={leverageValue}
          currentLeverage={formatter.format(Math.abs(currentLeverage))}
          newLeverageLevers={newLeverageLevers}
          update={update}
        />
      )}
    </MainCard>
  );
};

export default OverviewContent;
