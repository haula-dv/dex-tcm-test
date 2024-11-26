"use client";
import MainCard from "@/components/card/MainCard";
import { DepositWithdrawDialog } from "@/components/deposit/DepositWithdrawDialog";
import { usdFormatter } from "@/utils/formatters/number";
import { idFromHexChainId } from "@/utils/formatters/token";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  useChains,
  useCollateral,
  useDeposit,
  useLeverage,
  useMarginRatio,
  useWithdraw,
} from "@orderly.network/hooks";
import {
  IconEyeFilled,
  IconPencil,
  IconSquareRoundedArrowDownFilled,
  IconSquareRoundedArrowUpFilled,
} from "@tabler/icons-react";
import { useSetChain } from "@web3-onboard/react";
import { useMemo, useState } from "react";
import { FormSlider } from "../trade/components/create-order/Accountleverage";

const OverviewContent = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.down("md"));
  const [_, { findByChainId }] = useChains();
  const [{ connectedChain }, setChain] = useSetChain();
  const collateral = useCollateral();
  const [isOpenDeposit, setIsOpenDesposit] = useState(false);
  const [activedTab, setActivedTab] = useState<any>("withdraw");

  // GET CURRENT CHAIN
  const currentChain = useMemo(() => {
    return findByChainId(
      connectedChain ? idFromHexChainId(connectedChain?.id ?? "") : 1
    );
  }, [connectedChain, findByChainId]);

  const token = useMemo(() => {
    return currentChain?.token_infos[0] ?? undefined;
  }, [currentChain]);

  const deposit = useDeposit({
    address: token?.address,
    decimals: token?.decimals,
    srcToken: token?.symbol,
    srcChainId: Number(connectedChain?.id),
  });

  const { unsettledPnL, availableWithdraw } = useWithdraw();
  const [maxLeverage, { update, config: leverageLevers, isMutating }] =
    useLeverage();

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
          >
            Withdraw
          </Button>
          <Button
            variant="filledTonal"
            size="small"
            color="inherit"
            startIcon={<IconSquareRoundedArrowDownFilled size={"1rem"} />}
            onClick={() => handleToggleDesposit("deposit")}
          >
            Deposit
          </Button>
        </Stack>
      </Stack>

      <Stack direction={"row"} spacing={1} alignItems={"center"} pt={"10px"}>
        <Typography fontSize={"12px"} sx={{ opacity: ".5" }}>
          Total value
        </Typography>

        <IconEyeFilled size={"1rem"} />
      </Stack>

      <Typography fontWeight={500} pt={1}>
        <span style={{ fontSize: "22px", color: theme.palette.success.main }}>
          {usdFormatter.format(Number(collateral.availableBalance))}
        </span>{" "}
        USDC
      </Typography>

      <Box pt={2} />
      <Divider />
      <Box pt={1} />
      {/* <Button variant="contained" fullWidth>
        Connect wallet
      </Button> */}

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack flex={1}>
          <Typography fontSize={"13px"} sx={{ opacity: ".4" }}>
            Unrealized PnL
          </Typography>
          <Typography fontSize={"18px"} color={theme.palette.success.main}>
            1,528.03 (38.59%)
          </Typography>
        </Stack>

        <Stack flex={1}>
          <Typography fontSize={"13px"} sx={{ opacity: ".4" }}>
            Max account leverage
          </Typography>

          <Stack direction={"row"} spacing={0.4} alignItems={"center"}>
            {maxLeverage ? (
              <>
                <Typography>
                  {formatter.format(Math.abs(currentLeverage))}x / {maxLeverage}
                  x
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
            {usdFormatter.format(availableWithdraw)}
          </Typography>
        </Stack>
      </Stack>

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
