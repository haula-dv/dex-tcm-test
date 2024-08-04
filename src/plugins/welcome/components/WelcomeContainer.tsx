"use client";
import InputPasswordField from "@/components/form-control/InputPasswordField";
import IconCryptooly from "@/components/icons/crytoly";
import { MainCard } from "@/plugins/card/MainCard";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FormContainer, useForm } from "react-hook-form-mui";

interface IFormValues {
  password: string;
}

export const WelcomeContainer = () => {
  const formContext = useForm<IFormValues>({});

  const handleSubmit = (values: IFormValues) => {};

  return (
    <Box pt={"80px"}>
      <Box display={"flex"} justifyContent={"center"} pb={"64px"}>
        <IconCryptooly />
      </Box>

      <MainCard>
        <Typography variant="h4" textAlign={"center"} pt={TSizes.margin_md}>
          Welcome to Cyrptooly
        </Typography>

        <Typography textAlign={"center"} pb={"48px"}>
          The decentralized web awaits
        </Typography>

        <FormContainer formContext={formContext} onSuccess={handleSubmit}>
          <Stack spacing={TSizes.margin_sm}>
            <InputPasswordField
              formContext={formContext}
              name="password"
              label="Enter Your Password"
            />

            <Button fullWidth variant="contained" color="darkPrimary" disabled>
              Unlock
            </Button>
          </Stack>
        </FormContainer>
      </MainCard>
    </Box>
  );
};
