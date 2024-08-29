import { MainButton } from '@/components/button/MainButton';
import CurrencyInputField from '@/components/form-control/CurrencyInputField';
import SwitchBase from '@/components/form-control/SwitcheBase';
import { theme } from '@/utils';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Inputs } from './CreateOrderForm';

const slippages = [
	{
		value: 2,
		percentValue: '2',
		label: '2 x',
	},
	{
		value: 5,
		label: '5 x',
		percentValue: '5',
	},
	{
		value: 10,
		label: '10 x',
		percentValue: '10',
	},
];

interface IProps {
	formContext: UseFormReturn<Inputs>;
}

const AmountSetOrderSide = ({ formContext }: IProps) => {
	const handleChangeSlippage = (val: string) => {
		formContext.setValue('price', val);
	};

	return (
		<>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
				<Stack direction={'row'} alignItems={'center'} spacing={1}>
					<Typography fontWeight={600} fontSize={'13px'}>
						Amount
					</Typography>

					<Typography color={theme.palette.grey[500]} fontSize={'12px'}>
						Set order size
					</Typography>
				</Stack>

				<SwitchBase label="Slider" />
			</Stack>

			<Stack direction={'row'} spacing={TSizes.margin_xs} alignItems={'center'}>
				<Box width={'100%'}>
					<CurrencyInputField placeholder="0.00 x" name="price" formContext={formContext} suffix="NONE" />
				</Box>

				<Stack direction={'row'} spacing={'5px'} alignItems={'center'} width={'100%'}>
					{slippages.map((item) => (
						<ButtonPercent
							key={item.value}
							variant="filledTonal"
							onClick={() => handleChangeSlippage(item.percentValue)}
							size="small"
							color="inherit"
							fullWidth
						>
							{item.label}
						</ButtonPercent>
					))}
				</Stack>
			</Stack>
		</>
	);
};

export default memo(AmountSetOrderSide);

const ButtonPercent = styled(MainButton)(({ theme }) => ({
	backgroundColor: theme.palette.primary.light,
	borderRadius: '10px !important',
	fontSize: '13px',
}));
