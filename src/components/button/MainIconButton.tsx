"use client";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IProps extends IconButtonProps {
	variant?: "contained" | "outlined" | "filledTonal" | "text";
	isFullRounded?: boolean;
	color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | "white" | "grey";
}

export const MainIconButton = ({ children, isFullRounded, variant = "filledTonal", color, ...props }: IProps) => {
	return (
		<CustomIconButton variant={variant} isFullRounded={isFullRounded} color={color} {...props}>
			{children}
		</CustomIconButton>
	);
};

interface ICustomIconButton {
	variant?: "contained" | "outlined" | "filledTonal" | "text";
	isFullRounded?: boolean;
	color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | "grey" | "white";
}

const CustomIconButton = styled(IconButton, {
	shouldForwardProp: (prop) => prop !== "variant" && prop !== "isFullRounded" && prop !== "color",
})<ICustomIconButton>(({ theme, isFullRounded, variant = "filledTonal", color }) => ({
	height: TSizes.buttonHeight,
	width: TSizes.buttonHeight,
	borderRadius: isFullRounded ? "50%" : TSizes.borderRadiusMd,

	"&.MuiIconButton-sizeSmall": {
		height: TSizes.buttonHeightSmall,
		width: TSizes.buttonHeightSmall,
	},

	...(color === "white" && {
		backgroundColor: "#fff !important",
	}),

	...(variant === "filledTonal" && {
		...(color === "secondary" && {
			backgroundColor: theme.palette.secondary.light,
			color: theme.palette.common.black,
		}),

		...(color === "inherit" && {
			backgroundColor: theme.palette.grey[100],
			color: theme.palette.common.black,
		}),
	}),

	"& svg": {
		flexShrink: 0,
	},
}));
