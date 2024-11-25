"use client";
import MainCard from "@/components/card/MainCard";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  IconEyeFilled,
  IconPencil,
  IconSquareRoundedArrowDownFilled,
  IconSquareRoundedArrowUpFilled,
} from "@tabler/icons-react";

const OverviewContent = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.down("md"));

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
          >
            Withdraw
          </Button>
          <Button
            variant="filledTonal"
            size="small"
            color="inherit"
            startIcon={<IconSquareRoundedArrowDownFilled size={"1rem"} />}
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
        <span style={{ fontSize: "22px", color: theme.palette.primary.main }}>
          5,535.20
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

          <Stack direction={"row"} spacing={"4px"} alignItems={"center"}>
            <Typography fontSize={"18px"}>3x</Typography>

            <IconButton size="small">
              <IconPencil size={"1rem"} />
            </IconButton>
          </Stack>
        </Stack>

        <Stack flex={1}>
          <Typography fontSize={"13px"} sx={{ opacity: ".4" }}>
            Available to withdraw
          </Typography>
          <Typography fontSize={"18px"}>3,595.70</Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default OverviewContent;
