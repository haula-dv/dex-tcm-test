import baselightTheme from "@/utils/themes/custom-theme/DefaultColors";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IProps extends IconButtonProps {
  variant?: "contained" | "outlined" | "filledTonal";
  isFullRounded?: boolean;
}

export const MainIconButton = ({
  children,
  isFullRounded,
  variant = "filledTonal",
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
})<ICustomIconButton>(({ theme, isFullRounded, variant = "filledTonal" }) => ({
  height: TSizes.buttonHeight,
  width: TSizes.buttonHeight,
  borderRadius: isFullRounded ? "50%" : TSizes.borderRadius,

  ...(variant === "filledTonal" && {
    backgroundColor: baselightTheme.secondary.light,
    color: theme.palette.common.black,
    "&:hover": {
      // backgroundColor: theme.palette.tonalOffsetDark,
    },
  }),

  "& svg": {
    flexShrink: 0,
    height: "18px",
    width: "18px",
  },
}));
