import AmountSlider from '@/components/form-control/AmountSlider';
import CurrencyInputField from '@/components/form-control/CurrencyInputField';
import { CustomTextField } from '@/components/form-control/TokenInput';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { setColorThemeMode } from '@/utils/helpers';
import { Collapse, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
import { OrderEntity } from '@orderly.network/types';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { match } from 'ts-pattern';
import { getValidationErrors, Inputs } from './CreateOrderForm';

interface IProps {
	formContext: UseFormReturn<Inputs>;
	symbolsInfo: any;
	symbol: string;
	getInput: (data: Inputs, symbol: string) => OrderEntity;
	helper: any;
	maxQty: number;
	markPrice: number;
}

function InputForm({ formContext, symbolsInfo, symbol, getInput, helper, maxQty, markPrice }: IProps) {
	const symbolInfo = symbolsInfo[symbol]();
	const [_, base, quote] = symbol.split('_');
	const theme = useTheme();

	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: baseDecimals });

	const [isHiddenMarket, setIsHiddenMarket] = useState(false);

	useEffect(() => {
		const { unsubscribe } = formContext.watch((value, { name, type }) => {
			if (name === 'type') {
				if (value.type === 'Market' || value.type === 'StopMarket') {
					setIsHiddenMarket(true);
				} else {
					setIsHiddenMarket(false);
				}
			}
		});

		return () => unsubscribe();
	}, [formContext]);

	// Handle Convert price USDC to Base
	const onValueChangePrice = (val: any) => {
		const usdcAmountPrice = parseFloat(val);
		const baseMarkPrice = markPrice;

		if (!usdcAmountPrice) {
			formContext.setValue('quantity', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			return;
		}

		const calculatedQty = usdcAmountPrice / baseMarkPrice;
		const formattedQty = parseFloat(calculatedQty.toFixed(baseDecimals));

		formContext.setValue('quantity', formattedQty as any, {
			shouldValidate: true,
			shouldDirty: true,
		});

		// Set TOTAL
		if (!formattedQty) {
			return;
		}

		const caculatedTotal = usdcAmountPrice * Number(formattedQty);
		const formattedTotal = parseFloat(caculatedTotal.toFixed(quoteDecimals));

		formContext.setValue('total', String(formattedTotal));
	};

	// EX Base to USDC
	const onValueConvertQtyToPrice = (val: any) => {
		if (formContext.watch('type') == 'Market') {
			return;
		}

		const amountQty = parseFloat(val);
		const baseMarkPrice = markPrice;

		if (!amountQty) {
			formContext.setValue('price', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			return;
		}

		const calculatedQty = amountQty * baseMarkPrice;
		const formattedPrice = parseFloat(calculatedQty.toFixed(quoteDecimals));

		formContext.setValue('price', formattedPrice as any, {
			shouldValidate: true,
			shouldDirty: true,
		});

		// Set TOTAL
		if (!formattedPrice) {
			return;
		}

		const caculatedTotal = amountQty * Number(formattedPrice);
		const formattedTotal = parseFloat(caculatedTotal.toFixed(quoteDecimals));
		formContext.setValue('total', String(formattedTotal));
	};

	// On total Change
	const onTotalChange = (val: any) => {
		formContext.setValue('quantity', val, {
			shouldValidate: true,
			shouldDirty: true,
		});

		// onValueConvertQtyToPrice()
	};

	return (
		<Stack spacing={'8px'}>
			<Collapse
				in={formContext.watch('type') === 'StopLimit' || formContext.watch('type') === 'StopMarket'}
				sx={{ mt: '-10px !important' }}
			>
				<CurrencyInputField
					name="triggerPrice"
					formContext={formContext}
					suffix={quote}
					decimals={quoteDecimals}
					placeholder="Trigger"
					rules={{
						validate: {
							custom: async (_, data) => {
								const errors = await getValidationErrors(data, symbol, helper.validator);
								return errors?.trigger_price != null ? errors.trigger_price.message : true;
							},
						},
					}}
				/>
			</Collapse>

			<Stack spacing={'10px'}>
				{isHiddenMarket ? (
					<CustomTextField
						readOnly
						placeholder="Market"
						endAdornment={
							<InputAdornment position="end">
								<Typography
									px={'6px'}
									bgcolor={setColorThemeMode(theme.palette.primary.main, theme.palette.grey[800])}
									fontWeight={600}
									borderRadius={'40px'}
									fontSize={'12px'}
								>
									{quote}
								</Typography>
							</InputAdornment>
						}
					/>
				) : (
					<CurrencyInputField
						name="price"
						formContext={formContext}
						suffix={quote}
						decimals={quoteDecimals}
						prefix={'Price'}
						placeholder={match(formContext.watch('type'))
							.with('Market', () => 'Market')
							.with('StopMarket', () => 'Market')
							.otherwise(() => '0.0000')}
						readOnly={match(formContext.watch('type'))
							.with('Market', () => true)
							.with('StopMarket', () => true)
							.otherwise(() => false)}
						rules={{
							validate: {
								custom: async (_, data) => {
									const errors = await getValidationErrors(data, symbol, helper.validator);
									return errors?.order_price != null ? errors.order_price.message : true;
								},
							},
						}}
						onValueChange={(val) => onValueChangePrice(val._value)}
					/>
				)}

				<CurrencyInputField
					name="quantity"
					formContext={formContext}
					suffix={base}
					decimals={baseDecimals}
					placeholder="0.0000"
					prefix={'Quantity'}
					onValueChange={(val) => onValueConvertQtyToPrice(val._value)}
					rules={{
						validate: {
							custom: async (_, data) => {
								const errors = await getValidationErrors(data, symbol, helper.validator);
								return errors?.order_quantity != null ? errors.order_quantity.message : true;
							},
						},
					}}
				/>
			</Stack>

			<AmountSlider
				name="orderSide"
				formContext={formContext}
				max={maxQty}
				maxQty={`${formatter.format(maxQty)}`}
				extChange={(val) => onValueConvertQtyToPrice(val)}
			/>

			<CurrencyInputField
				name="total"
				formContext={formContext}
				suffix={quote}
				decimals={baseDecimals}
				prefix={'Total~'}
				placeholder="0.0000"
				onValueChange={(val) => onTotalChange(val._value)}
				rules={{
					validate: {
						custom: async (_, data) => {
							const errors = await getValidationErrors(data, symbol, helper.validator);
							return errors?.total != null ? errors.total.message : true;
						},
					},
				}}
			/>
		</Stack>
	);
}

export default InputForm;
