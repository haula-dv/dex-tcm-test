import { TColors } from "@/utils";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Button, Stack } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { WalletState } from "@orderly.network/hooks/esm/walletConnectorContext";
import { memo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IPlaceOrderValues } from "./CreateOrderForm";

interface IProps {
	formContext: UseFormReturn<IPlaceOrderValues>;
	wallet: WalletState | null;
}

const OrderDirection = ({ formContext, wallet }: IProps) => {
	const [currentDirection, setCurrentDirection] = useState("Buy");
	const theme = useTheme();

	const handleChangeDirection = (side: any) => {
		formContext.setValue("direction", side);
		setCurrentDirection(side);
	};

	return (
		<Stack
			direction={"row"}
			spacing={1}
			bgcolor={setColorThemeMode(theme.palette.grey[50], TColors.brownnDark)}
			borderRadius={TSizes.borderRadius}>
			{["Buy", "Sell"].map((label, index) => (
				<TabItem
					key={index}
					fullWidth
					color="inherit"
					isSell={currentDirection == "Sell" ? true : false}
					selected={currentDirection === label}
					onClick={() => handleChangeDirection(label)}>
					{label}
				</TabItem>
			))}
		</Stack>
	);
};

export default memo(OrderDirection);

interface IITabItem {
	selected: boolean;
	isSell: boolean;
}

const TabItem = styled(Button, {
	shouldForwardProp: (prop) => prop !== "selected" && prop !== "isSell",
})<IITabItem>(({ theme, selected, isSell }) => ({
	transition: "0.6s",
	border: `1px solid ${theme.palette.grey[50]}`,
	fontSize: "13px",
	minHeight: TSizes.buttonHeightSmall,
	height: TSizes.buttonHeightSmall,

	...(selected
		? {
				...(!isSell
					? {
							borderColor: theme.palette.success.main,
							color: theme.palette.success.main,
					  }
					: {
							borderColor: theme.palette.error.main,
							color: theme.palette.error.main,
					  }),
		  }
		: {
				color: theme.palette.grey[300],
				backgroundColor: setColorThemeMode(theme.palette.grey[50], TColors.brownnDark),
				borderColor: setColorThemeMode(theme.palette.grey[50], TColors.brownnDark),
		  }),
	"&:hover": {
		backgroundColor: setColorThemeMode(theme.palette.grey[50], TColors.brownnDark),
	},
}));
