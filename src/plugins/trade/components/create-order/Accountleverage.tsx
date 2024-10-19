import { MainButton } from "@/components/button/MainButton";
import MainCard from "@/components/card/MainCard";
import { MainDialog } from "@/components/dialog/MainDialog";
import { MainSlider } from "@/components/form-control/AmountSlider";
import { BarCircularProgress } from "@/components/loading/GradientCircularProgress";
import MainTooltip from "@/components/MainTooltip";
import { getDecimalsFromTick } from "@/utils/formatters/api";
import { Box, Divider, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import {
	useCollateral,
	useLeverage,
	useMarginRatio,
	usePositionStream,
	useSymbolsInfo,
} from "@orderly.network/hooks";
import { toast } from "@orderly.network/react";
import { IconPencil } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormContainer } from "react-hook-form-mui";

export const Accountleverage = ({ symbol }: any) => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const [positions, _info, { refresh, loading }] = usePositionStream();

	const { currentLeverage, mmr } = useMarginRatio();
	const { totalCollateral, totalValue } = useCollateral();

	const [maxLeverage, { update, config: leverageLevers, isMutating }] = useLeverage();

	const handleToggle = () => {
		setOpen(!open);
	};

	// Remap for matching with marks
	const newLeverageLevers = useMemo(() => {
		const length = leverageLevers.length;

		return leverageLevers.length > 0
			? leverageLevers.map((id: any, index: any) => {
					const percentValue = (index * 100) / (length - 1);

					return { value: percentValue, label: `${id}x` }; // Thêm nhãn cho mỗi marks
			  })
			: [];
	}, [leverageLevers]);

	// Initial value for slider
	const leverageValue = useMemo(() => {
		const index: any = newLeverageLevers.find((item: any) => item.label === `${maxLeverage}x`);
		if (!index) {
			return 0;
		}

		return index.value;
	}, [maxLeverage, newLeverageLevers]);

	const symbolsInfo = useSymbolsInfo();
	const symbolInfo = symbolsInfo[symbol]();
	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	const formatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: quoteDecimals });

	const totalMarginRatio = useMemo(() => {
		const t = (totalCollateral / Math.abs(positions.aggregated?.notional)) * 100;
		return t;
	}, [totalCollateral, positions]);

	return (
		<>
			<MainCard backgroudColor="primaryLight">
				{maxLeverage ? (
					<>
						<BarCircularProgress
							value={totalMarginRatio == Infinity ? 100 : totalMarginRatio}
							background={
								totalMarginRatio == Infinity || isNaN(totalMarginRatio)
									? theme.palette.success.main
									: totalMarginRatio >= 100
									? theme.palette.success.main
									: theme.palette.warning.main
							}
							variant="determinate"
						/>

						<Stack direction={"row"} justifyContent={"space-between"} pt={"6px"}>
							<Stack>
								<MainTooltip
									placement="top"
									arrow
									title={
										<div>
											Your actual Leverage of the whole account / Your max Leverage of the whole
											account
											<Divider />
											Margin ratio = Total collateral / Total position notional
										</div>
									}>
									<Box display={"inline-flex"}>
										<Typography
											fontSize={"12px"}
											color={theme.palette.grey[400]}
											className="pointer">
											Margin ratio
										</Typography>
									</Box>
								</MainTooltip>

								<Typography
									color={
										totalMarginRatio == Infinity || isNaN(totalMarginRatio)
											? theme.palette.success.main
											: totalMarginRatio >= 100
											? theme.palette.success.main
											: theme.palette.warning.main
									}
									fontWeight={600}>
									{totalMarginRatio == Infinity || isNaN(totalMarginRatio)
										? "1000.00"
										: formatter.format(totalMarginRatio)}
									%
								</Typography>
							</Stack>

							<Stack>
								<Typography fontSize={"12px"} color={theme.palette.grey[400]} textAlign={"end"}>
									Account leverage
								</Typography>

								<Stack
									direction={"row"}
									spacing={0.4}
									alignItems={"center"}
									justifyContent={"flex-end"}>
									<Typography>
										{formatter.format(Math.abs(currentLeverage))}x / {maxLeverage}x
									</Typography>

									<Box className="pointer" onClick={handleToggle}>
										<IconPencil size={"1.1rem"} />
									</Box>
								</Stack>
							</Stack>
						</Stack>
					</>
				) : (
					<Stack>
						<Typography fontSize={"12px"} color={theme.palette.grey[400]} className="pointer">
							Margin ratio
						</Typography>

						<Skeleton variant="rounded" animation="wave" height={"18px"} width={"100%"} />
					</Stack>
				)}
			</MainCard>
			<Box pb={"10px"} />

			{open && (
				<FormSlider
					handleToggle={handleToggle}
					open={open}
					leverageValue={leverageValue}
					currentLeverage={formatter.format(Math.abs(currentLeverage))}
					newLeverageLevers={newLeverageLevers}
					update={update}
				/>
			)}
		</>
	);
};

interface IFormProps {
	open: boolean;
	handleToggle: () => void;
	leverageValue: number;
	newLeverageLevers: Array<any>;
	currentLeverage: string;
	update: any;
}

const FormSlider = ({
	open,
	handleToggle,
	leverageValue,
	currentLeverage,
	newLeverageLevers,
	update,
}: IFormProps) => {
	const theme = useTheme();

	const [isLoading, setIsLoading] = useState(false);
	const formContent = useForm({
		defaultValues: {
			value: leverageValue,
		},
	});

	const handleSubmit = async (values: any) => {
		const value = mapValueToReal(values.value);
		setIsLoading(true);
		try {
			await update({ leverage: value });
			toast.success("Leverage updated");
		} catch (error) {
			toast.error("Leverage updated error!");
		} finally {
			setIsLoading(false);
			handleToggle();
		}
	};

	const mapValueToReal = (value: any) => {
		const mapping: any = {
			0: 1,
			10: 2,
			20: 3,
			30: 4,
			40: 5,
			50: 10,
			60: 15,
			70: 20,
			80: 30,
			90: 40,
			100: 50,
		};
		return mapping[value];
	};

	return (
		<MainDialog
			open={open}
			handleClose={handleToggle}
			title="Account Leverage"
			isDivider
			maxWidth="xs">
			<Stack direction={"row"} justifyContent={"space-between"} pb={1}>
				<Typography>Max account leverage</Typography>

				<Typography>CurrentCurrent: {currentLeverage}x</Typography>
			</Stack>

			<FormContainer formContext={formContent} onSuccess={handleSubmit}>
				<Box px={1} pb={1}>
					<Controller
						name="value"
						control={formContent.control}
						render={({ field: { value = 0, onChange } }) => (
							<MainSlider
								aria-label="Leverage"
								value={Number(value)}
								valueLabelDisplay="off"
								size="small"
								marks={newLeverageLevers}
								min={0} // Giá trị nhỏ nhất
								max={100} // Giá trị lớn nhất
								step={newLeverageLevers.length - 1} // Bước nhảy đều
								onChange={(event, value: any) => {
									onChange(value);
								}} // Ánh xạ về giá trị thực
							/>
						)}
					/>
				</Box>
				<Divider />
				<Stack direction={"row"} spacing={"10px"} pt="10px">
					<MainButton disabled={isLoading} onClick={handleToggle} fullWidth>
						Cancel
					</MainButton>

					<MainButton
						disabled={!formContent.formState.isDirty || isLoading}
						type="submit"
						variant="contained"
						isLoading={isLoading}
						fullWidth>
						Save changes
					</MainButton>
				</Stack>
			</FormContainer>
		</MainDialog>
	);
};
