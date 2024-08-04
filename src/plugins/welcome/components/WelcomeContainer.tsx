"use client";
import { MainCard } from "@/components/card/MainCard";
import InputPasswordField from "@/components/form-control/InputPasswordField";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormContainer, useForm } from "react-hook-form-mui";

interface IFormValues {
  password: string;
}

export const WelcomeContainer = () => {
  const router = useRouter();

  const formContext = useForm<IFormValues>({
    defaultValues: {
      password: "",
    },
  });

  const handleSubmit = (values: IFormValues) => {
    console.log(values);
    router.push("/accounts");
  };

  return (
    <MainCard>
      <Typography
        variant="h5"
        textAlign={"center"}
        pt={TSizes.margin_md}
        fontWeight={400}
      >
        Welcome to Cyrptooly
      </Typography>

      <Typography textAlign={"center"} pb={"48px"} pt={1}>
        The decentralized web awaits
      </Typography>

      <FormContainer formContext={formContext} onSuccess={handleSubmit}>
        <Stack spacing={TSizes.margin_sm}>
          <InputPasswordField
            formContext={formContext}
            name="password"
            label="Enter Your Password"
          />

          <Button
            fullWidth
            variant="contained"
            color="darkPrimary"
            disabled={!formContext.formState.isDirty}
            type="submit"
            size="large"
          >
            Unlock
          </Button>

          <Stack spacing={0.5}>
            <Button size="large" fullWidth variant="text" color="inherit">
              Restore Account?
            </Button>

            <Button size="large" fullWidth variant="text" color="inherit">
              Import Using Account Seedphrase
            </Button>
          </Stack>
        </Stack>
      </FormContainer>
    </MainCard>
  );
};
