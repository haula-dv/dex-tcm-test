"use client";
import { MainIconButton } from "@/components/button/MainIconButton";
import SwitchBase from "@/components/form-control/SwitcheBase";
import { MainPopup } from "@/components/popup/MainPopup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";

export const TransactionPopup = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <Box p={2}>
          <Typography fontSize={"16px"} fontWeight={600} pb={1}>
            Transactions setting
          </Typography>

          <Stack>
            <Stack>
              <Typography>Max. slippage</Typography>
            </Stack>

            <Stack direction={"row"} spacing={2} py={1} alignItems={"center"}>
              {["0.1%", "0.5%", "1%"].map((item) => (
                <Button
                  key={item}
                  variant="contained"
                  color="inherit"
                  size="small"
                >
                  {item}
                </Button>
              ))}

              <TextField placeholder="1.00%" size="small" />
            </Stack>

            <Stack>
              <Typography pb={1}>Transaction deadline</Typography>

              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <TextField placeholder="20 minutes" size="small" />
                <Typography>20 Minutes</Typography>
              </Stack>
            </Stack>

            <Typography fontSize={"16px"} fontWeight={600} pb={1} pt={2}>
              Interface settings
            </Typography>

            <SwitchBase label="Toggle expert mode" />
            <SwitchBase label="Disabled multihop" />
          </Stack>
        </Box>
      </MainPopup>
    </>
  );
};
