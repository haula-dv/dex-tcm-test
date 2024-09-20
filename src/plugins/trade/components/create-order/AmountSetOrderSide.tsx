import { MainButton } from '@/components/button/MainButton';
import InputField from '@/components/form-control/InputField';
import SwitchBase from '@/components/form-control/SwitcheBase';
import { TColors } from '@/utils';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Inputs } from './CreateOrderForm';

const slippages = [
	{
		value: 20,
		percentValue: '20%',
		label: '2 x',
	},
	{
		value: 50,
		label: '5 x',
		percentValue: '50%',
	},
	{
		value: 100,
		label: '10 x',
		percentValue: '100%',
	},
];

interface IProps {
	formContext: UseFormReturn<Inputs>;
	maxQty: number;
	formatter: Intl.NumberFormat;
}

const AmountSetOrderSide = ({ formContext, maxQty, formatter }: IProps) => {
	const onExtChange = (val: any, onChange: any) => {
		const onlyNumbers = val.replace(/[^0-9]/g, ''); // Loại bỏ các ký tự không phải số
		onChange(onlyNumbers);
	};

	return (
		<>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt="-6px !important">
				<Stack direction={'row'} alignItems={'center'} spacing={1}>
					<Typography fontWeight={600} fontSize={'13px'}>
						Amount
					</Typography>

					<Typography color={useTheme().palette.grey[500]} fontSize={'12px'}>
						Set order size
					</Typography>
				</Stack>

				<SwitchBase label="Slider" />
			</Stack>

			<Stack direction={'row'} spacing={TSizes.margin_xs} alignItems={'center'}>
				<Box width={'100%'}>
					<InputField
						placeholder="0.00 x"
						name="orderSide"
						formContext={formContext}
						suffix="NONE"
						onExtChange={onExtChange}
					/>
				</Box>

				<Stack direction={'row'} spacing={'5px'} alignItems={'center'} width={'100%'}>
					<Controller
						control={formContext.control}
						name="orderSide"
						render={({ field: { value, onChange, name } }) => (
							<>
								{slippages.map((item) => (
									<ButtonPercent
										name={name}
										key={item.value}
										variant={value == item.percentValue ? 'outlined' : 'filledTonal'}
										onClick={() => {
											const caculatedAmount = (maxQty * item.value) / 100;
											formContext.setValue('quantity', Number(formatter.format(caculatedAmount)) as any);
											onChange(item.percentValue);
										}}
										size="small"
										color={value == item.percentValue ? 'darkGrey' : 'inherit'}
										fullWidth
									>
										{item.label}
									</ButtonPercent>
								))}
							</>
						)}
					/>
				</Stack>
			</Stack>
		</>
	);
};

export default AmountSetOrderSide;

const ButtonPercent = styled(MainButton)(({ theme }) => ({
	backgroundColor: setColorThemeMode(theme.palette.primary.light, TColors.brownnDark),
	borderRadius: '10px !important',
	fontSize: '13px',
}));
