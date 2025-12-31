import { themeSelectorState } from "@/common/stores/common";
import { ITab } from "@/common/types/components/tab";
import { MainDialog } from "@/components/dialog/MainDialog";
import MainTab from "@/components/tab/MainTab";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DepositFormWidget, WithdrawFormWidget } from "@orderly.network/ui-transfer";
import { useStore } from "zustand";

interface IProps {
	open: boolean;
	onClose: () => void;
	activedTab?: "deposit" | "withdraw";
}

const tabs: ITab[] = [
	{ label: "Deposit", value: "deposit" },
	{ label: "Withdraw", value: "withdraw" },
];

export const DepositWithdrawDialog = ({ open, onClose, activedTab = "deposit" }: IProps) => {
	const themeSelector = useStore(themeSelectorState, (state) => state.value);

	return (
		<MainDialog
			open={open}
			handleClose={onClose}
			maxWidth="xs"
			title="Deposit / Withdraw"
			isDivider>
			{/* <DepositAndWithdraw activeTab={activedTab} /> */}
			<MainTab tabs={tabs} defaultValue={activedTab}>
				<Box className={themeSelector.activeMode} mt="-10px !important">
					<TabPanel value="deposit" sx={{ p: 0 }}>
						<DepositFormWidget close={onClose} />
					</TabPanel>

					<TabPanel value="withdraw" sx={{ p: 0 }}>
						<WithdrawFormWidget close={onClose} />
					</TabPanel>
				</Box>
			</MainTab>
		</MainDialog>
	);
};

const CustomField = styled(Box)(({ theme }) => ({
	border: `1px solid ${theme.palette.grey[600]}`,
	padding: `3px ${TSizes.margin_common} 3px ${TSizes.margin_common}`,
	borderRadius: TSizes.borderRadius,
	marginTop: "10px",
	backgroundColor: setColorThemeMode(theme.palette.grey[100], theme.palette.grey[700]),
	transition: "0.6s",

	"&:focus-within": {
		borderColor: setColorThemeMode(theme.palette.grey[200], theme.palette.grey[500]),
	},

	"& .MuiInputBase-input": {
		width: "100%",
	},
}));
