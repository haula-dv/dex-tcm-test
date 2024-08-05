"use client";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IProps {
  children?: React.ReactNode;
  maxWidth?: string;
  isHover?: boolean;
  backgroudColor?: "white" | "grey";
}

export const MainCard = ({
  children,
  maxWidth,
  backgroudColor = "grey",
  isHover,
}: IProps) => {
  return (
    <CustomCard
      elevation={0}
      sx={{ maxWidth: maxWidth, cursor: isHover ? "pointer" : "" }}
      backgroudColor={backgroudColor}
    >
      {children}
    </CustomCard>
  );
};

interface ICard {
  backgroudColor?: "white" | "grey";
}

const CustomCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "backgroudColor",
})<ICard>(({ theme, backgroudColor = "grey" }) => ({
  ...(backgroudColor === "white" && {
    backgroundColor: "#fff",
  }),

  ...(backgroudColor === "grey" && {
    backgroundColor: theme.palette.grey[50],
  }),
  padding: TSizes.margin_base,
}));
