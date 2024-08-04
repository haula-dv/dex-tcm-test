"use client";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IProps {
  children?: React.ReactNode;
  maxWidth?: string;
}

export const MainCard = ({ children, maxWidth }: IProps) => {
  return (
    <CustomCard elevation={0} sx={{ maxWidth: maxWidth }}>
      {children}
    </CustomCard>
  );
};

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: TSizes.margin_md,
}));
