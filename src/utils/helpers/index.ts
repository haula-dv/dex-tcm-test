import { Theme, useTheme } from "@mui/material";
import { useOrderEntry } from "@orderly.network/hooks";

export const setColorThemeMode = (colorLight: string, colorDark: string, themeEx?: Theme): any => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const theme = useTheme();

	if ((themeEx ? themeEx.palette.mode : theme.palette.mode) === "dark") {
		return colorDark;
	} else {
		return colorLight;
	}
};

export async function getValidationErrors(
	data: any,
	symbol: string,
	validator: ReturnType<typeof useOrderEntry>["helper"]["validator"],
	getInput: any,
): Promise<ReturnType<ReturnType<typeof useOrderEntry>["helper"]["validator"]>> {
	return validator(getInput(data, symbol));
}

type TPSLType = "TAKE_PROFIT" | "STOP_LOSS";

export const findTPnSLOrderByType = (type: TPSLType, childOrders: any[]) => {
	return (
		childOrders.find(
			(order) => order.algo_type === type && typeof order.trigger_price === "number",
		) ?? null
	);
};
