import { TabItem } from "@/components/tab/MainTab";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Divider, Stack } from "@mui/material";
import { SelectOption } from "@orderly.network/react/esm/select/select";
import { memo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IPlaceOrderValues } from "./CreateOrderForm";

const items: SelectOption[] = [
	{ label: "Limit", value: "Limit" },
	{ label: "Stop limit", value: "StopLimit" },
	{ label: "Market", value: "Market" },
	{ label: "Stop market", value: "StopMarket" },
];

interface IProps {
	formContext: UseFormReturn<IPlaceOrderValues>;
}

const OrderTypeTab = ({ formContext }: IProps) => {
	const [value, setValue] = useState<any>("Limit");

	const handleChange = (val: string | number, event?: React.MouseEvent<HTMLButtonElement>) => {
		setValue(val);
		formContext.setValue("type", val as any);
	};

	return (
		<Stack>
			<Stack direction={"row"} spacing={"10px"} justifyContent={"space-between"}>
				{items.slice(0, 2).map((item, index) => {
					return (
						<TabItem
							actived={item.value == value}
							key={index}
							fullWidth
							variant="outlined"
							onClick={(e) => handleChange(item.value, e)}>
							{item.label}
						</TabItem>
					);
				})}
			</Stack>

			<Stack
				direction={"row"}
				spacing={"10px"}
				justifyContent={"space-between"}
				py={TSizes.margin_common}>
				{items.slice(2, 4).map((item, index) => {
					return (
						<TabItem
							actived={item.value == value}
							key={index}
							fullWidth
							variant="outlined"
							onClick={(e) => handleChange(item.value, e)}>
							{item.label}
						</TabItem>
					);
				})}
			</Stack>

			<Divider />
		</Stack>
	);
};

export default memo(OrderTypeTab);
