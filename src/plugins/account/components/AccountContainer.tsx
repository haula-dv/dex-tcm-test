"use client";
import { MainCard } from "@/components/card/MainCard";
import IconCheckActived from "@/components/icons/check-actived";
import IconCheckInActived from "@/components/icons/check-inactived";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccountItem } from "./AccountItem";

export const AccountContainer = () => {
  const router = useRouter();
  const [currentSelect, setCurrentSelect] = useState<number[]>([0]);

  const handleSelectAccount = (index: number) => {
    if (currentSelect.includes(index)) {
      setCurrentSelect(currentSelect.filter((i) => i !== index));
    } else {
      setCurrentSelect([...currentSelect, index]);
    }
  };

  // Handle connect wallet
  const handleConnect = () => {
    router.push("/");
  };

  return (
    <MainCard>
      <Typography
        variant="h5"
        fontWeight={400}
        textAlign={"center"}
        pt={TSizes.margin_md}
      >
        Connect to Swaplux
      </Typography>

      <Typography textAlign={"center"} pb={"48px"} pt={1}>
        Select the account (s)
      </Typography>

      <Stack spacing={TSizes.margin_sm} pb={TSizes.margin_sm}>
        {[...Array(3)].map((item, index) => (
          <AccountItem
            key={index}
            index={index}
            isSelected={currentSelect.includes(index)}
            handleSelectAccount={handleSelectAccount}
          />
        ))}
      </Stack>

      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            color="darkPrimary"
            icon={<IconCheckInActived />}
            checkedIcon={<IconCheckActived />}
          />
        }
        label="Allow this site View the addresses of your authorized accounts (required)"
      />

      <Stack direction={"row"} spacing={TSizes.margin_sm} pt={"32px"}>
        <Button color="inherit" fullWidth size="large">
          Cancel
        </Button>

        <Button
          variant="contained"
          color="darkPrimary"
          fullWidth
          size="large"
          onClick={handleConnect}
        >
          Connect
        </Button>
      </Stack>
    </MainCard>
  );
};
