"use client";
import { MainButton } from "@/components/button/MainButton";
import { MainIconButton } from "@/components/button/MainIconButton";
import { MainCard } from "@/components/card/MainCard";
import SwitchBase from "@/components/form-control/SwitcheBase";
import { MainPopup } from "@/components/popup/MainPopup";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";

interface IProps {
  slippageAmount: number;
}

export const TransactionPopup = ({ slippageAmount }: IProps) => {
  const slippages = [
    {
      value: 10,
      percentValue: "0.1",
      label: "0.1%",
    },
    {
      value: 25,
      label: "0.25%",
      percentValue: "0.25",
    },
    {
      value: 50,
      label: "0.5%",
      percentValue: "0.5",
    },
    {
      value: 100,
      label: "1.0%",
      percentValue: "1.0",
    },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [currentSlippageAmount, setCurrentSlippageAmount] = useState("0.1");
  const [deadlineMinutes, setDeadlineMinutes] = useState(30);

  // Handle change slippage
  const handleChangeSlippage = (value: string) => {
    if (+value >= 101) {
      setCurrentSlippageAmount("100");
      return;
    }

    setCurrentSlippageAmount(value);
  };

  // Handle change deadline minutes
  const handleChangeDeadline = (value: number) => {
    setDeadlineMinutes(value);
  };

  return (
    <>
      <Stack
        direction={"row"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"-10px"}
      >
        <Typography fontSize={"18px"} fontWeight={600}>
          Swap
        </Typography>
        <MainIconButton
          variant="text"
          isFullRounded
          id="transaction-button"
          aria-controls={open ? "transaction-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          edge="end"
        >
          <IconSettings size={"1.5rem"} />
        </MainIconButton>
      </Stack>

      <MainPopup
        id="transaction-menu"
        MenuListProps={{
          "aria-labelledby": "transaction-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box p={TSizes.margin_xs}>
          <Typography fontSize={"16px"} fontWeight={600} pb={1}>
            Transactions setting
          </Typography>

          <Stack spacing={2}>
            <MainCard>
              <Stack>
                <Typography>Max. slippage</Typography>
              </Stack>

              <Stack
                direction={"row"}
                spacing={TSizes.margin_xs}
                alignItems={"center"}
              >
                {slippages.map((item) => (
                  <MainButton
                    key={item.value}
                    variant="contained"
                    color={
                      currentSlippageAmount === item.percentValue
                        ? "darkPrimary"
                        : "inherit"
                    }
                    onClick={() => handleChangeSlippage(item.percentValue)}
                    size="xsmall"
                  >
                    {item.label}
                  </MainButton>
                ))}

                <Box width={"100px"}>
                  <TextField
                    value={currentSlippageAmount}
                    placeholder="1.0"
                    size="xsmall"
                    type="number"
                    onChange={(e) => handleChangeSlippage(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Stack>
            </MainCard>

            <MainCard>
              <Typography pb={1}>Transaction deadline</Typography>

              <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
                <TextField
                  placeholder="30"
                  size="xsmall"
                  sx={{ width: "100px" }}
                  value={deadlineMinutes}
                  type="number"
                  onChange={(e) => handleChangeDeadline(+e.target.value)}
                />
                <Typography>minutes</Typography>
              </Stack>
            </MainCard>

            <Stack>
              <Typography fontSize={"16px"} fontWeight={600} pb={1}>
                Interface settings
              </Typography>

              <SwitchBase label="Toggle expert mode" />
              <SwitchBase label="Disabled multihop" />
            </Stack>
          </Stack>
        </Box>
      </MainPopup>
    </>
  );
};
