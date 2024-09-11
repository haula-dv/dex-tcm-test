import { TColors } from '@/utils';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Button, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { memo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { StopOrderInputs } from './StopOrderContent';

interface IProps {
	formContext: UseFormReturn<StopOrderInputs>;
}

const OrderDirection = ({ formContext }: IProps) => {
	const theme = useTheme();
	const [current, setCurrent] = useState('TakeProfit');

	const handleChangeDirection = (side: any) => {
		formContext.setValue('direction', side);
		setCurrent(side);
	};

	const tabs = [
		{
			label: 'Take Profit',
			value: 'TakeProfit',
		},
		{
			label: 'Stop Loss',
			value: 'StopLoss',
		},
	];

	return (
		<Stack
			direction={'row'}
			spacing={1}
			bgcolor={setColorThemeMode(theme.palette.grey[50], TColors.brownnDark)}
			borderRadius={TSizes.borderRadius}
			mt="16px"
		>
			{tabs.map((item, index) => (
				<TabItem
					key={index}
					fullWidth
					color="inherit"
					isSell={current == 'StopLoss' ? true : false}
					selected={current === item.value}
					onClick={() => handleChangeDirection(item.value)}
				>
					{item.label}
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

const TabItem = styled(Button, { shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'isSell' })<IITabItem>(
	({ theme, selected, isSell }) => ({
		transition: '0.6s',
		border: `1px solid ${theme.palette.grey[50]}`,
		fontSize: '13px',
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
		'&:hover': {
			backgroundColor: setColorThemeMode(theme.palette.grey[50], TColors.brownnDark),
		},
	}),
);
