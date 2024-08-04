import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

interface IProps extends ButtonProps {
  children?: ReactNode;
  fullRounded?: boolean;
}

export const MainButton = ({ children, fullRounded, ...props }: IProps) => {
  return (
    <Button
      disableElevation
      sx={{ borderRadius: fullRounded ? "40px" : TSizes.borderRadius }}
      {...props}
    >
      {children}
    </Button>
  );
};
