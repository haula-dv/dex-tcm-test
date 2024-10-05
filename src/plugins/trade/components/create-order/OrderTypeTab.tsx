import { StyledMenu } from "@/components/menu/StyledMenu";
import { TabItem } from "@/components/tab/MainTab";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { MenuItem, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SelectOption } from "@orderly.network/react/esm/select/select";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { memo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IPlaceOrderValues } from "./CreateOrderForm";

const items: SelectOption[] = [
	{ label: "Limit", value: "Limit" },
	{ label: "Market", value: "Market" },
	{ label: "Stop", value: "Stop" },
	{ label: "Stop limit", value: "StopLimit" },
	{ label: "Stop market", value: "StopMarket" },
];

interface IProps {
	formContext: UseFormReturn<IPlaceOrderValues>;
}

const OrderTypeTab = ({ formContext }: IProps) => {
	const [value, setValue] = useState<any>("Limit");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const theme = useTheme();

	const handleChange = (val: string | number, event?: React.MouseEvent<HTMLButtonElement>) => {
		if (val === "Stop" && event) {
			handleClick(event);
			return;
		}

		setValue(val);
		formContext.setValue("type", val as any);
		handleClose();
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Stack direction={"row"} spacing={"10px"} justifyContent={"space-between"}>
			{items.slice(0, 3).map((item, index) => {
				const isActived =
					index === 2
						? value === "StopLimit" || value === "StopMarket"
							? true
							: false
						: item.value === value;
				return (
					<TabItem
						actived={isActived}
						key={index}
						fullWidth
						onClick={(e) => handleChange(item.value, e)}
						endIcon={index == 2 ? <IconChevronDown size={"1rem"} /> : null}
						id="basic-button"
						aria-controls={open ? "basic-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						sx={{ height: TSizes.buttonHeight }}>
						{item.label}
					</TabItem>
				);
			})}

			<StyledMenu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}>
				{items.slice(3, items.length).map((item, index) => (
					<MenuItem
						key={index}
						onClick={(e) => handleChange(item.value)}
						selected={item.value === value}
						sx={{
							"&.Mui-selected": {
								backgroundColor: setColorThemeMode(
									theme.palette.primary.light,
									theme.palette.grey[800],
								),
							},
						}}>
						<Typography flex={1}>{item.label}</Typography>

						{item.value === value && <IconCheck size={"1rem"} color={theme.palette.success.main} />}
					</MenuItem>
				))}
			</StyledMenu>
		</Stack>
	);
};

export default memo(OrderTypeTab);
