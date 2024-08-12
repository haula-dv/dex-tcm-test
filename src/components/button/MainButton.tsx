import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";
import IconLoading from "../icons/loading";

interface IProps extends ButtonProps {
  children?: ReactNode;
  fullRounded?: boolean;
  isLoading?: boolean;
}

export const MainButton = ({
  children,
  isLoading,
  fullRounded,
  ...props
}: IProps) => {
  return (
    <Button
      disableElevation
      sx={{ borderRadius: fullRounded ? "40px" : TSizes.borderRadius }}
      {...props}
    >
      {isLoading && <IconLoading height="24px" width="24px" />}
      {children}
    </Button>
  );
};
