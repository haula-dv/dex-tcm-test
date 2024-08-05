"use client";
import { MainIconButton } from "@/components/button/MainIconButton";
import { MainPopup } from "@/components/popup/MainPopup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
    <div>
      <MainIconButton
        variant="text"
        isFullRounded
        id="transaction-button"
        aria-controls={open ? "transaction-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <IconSettings size={"1.5rem"} />
      </MainIconButton>

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

            <Stack direction={"row"} spacing={1} py={1} alignItems={"center"}>
              {["0.1%", "0.5%", "1%"].map((item) => (
                <Button key={item} color="secondary">
                  {item}
                </Button>
              ))}

              <TextField placeholder="1.00%" />
            </Stack>

            <Stack>
              <Typography>Transaction deadline</Typography>

              <TextField placeholder="20 minutes" />
            </Stack>

            <Typography fontSize={"16px"} fontWeight={600} pb={1} pt={2}>
              Interface settings
            </Typography>

            <FormControlLabel
              label="Toggle expert mode"
              control={<Checkbox />}
            />

            <FormControlLabel
              label="Disabled multihop"
              control={<Checkbox />}
            />
          </Stack>
        </Box>
      </MainPopup>
    </div>
  );
};
