import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IProps extends IconButtonProps {
  variant?: "contained" | "outlined" | "filledTonal" | string;
  isFullRounded?: boolean;
}

export const MainIconButton = ({
  children,
  isFullRounded,
  variant,
}: IProps) => {
  return (
    <CustomIconButton variant={variant} isFullRounded={isFullRounded}>
      {children}
    </CustomIconButton>
  );
};

interface ICustomIconButton {
  variant?: "contained" | "outlined" | "filledTonal" | string;
  isFullRounded?: boolean;
}

const CustomIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "variant" && prop !== "isFullRounded",
})<ICustomIconButton>(({ theme, isFullRounded, variant }) => ({
  height: TSizes.buttonHeight,
  width: TSizes.buttonHeight,
  borderRadius: isFullRounded ? "50%" : TSizes.borderRadius,
  padding: theme.spacing(1.5, 2),
  fontSize: "16px",

  //   ...(variant === "filledTonal" && {
  //     backgroundColor: theme.palette.tonalOffset,
  //     color: theme.palette.common.white,
  //     "&:hover": {
  //       backgroundColor: theme.palette.tonalOffsetDark,
  //     },
  //   }),

  "& svg": {
    flexShrink: 0,
  },
}));
