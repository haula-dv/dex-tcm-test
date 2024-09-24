import CurrencyInputField from '@/components/form-control/CurrencyInputField';
import { CustomTextField } from '@/components/form-control/TokenInput';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { setColorThemeMode } from '@/utils/helpers';
import { Collapse, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
import { useOrderEntry } from '@orderly.network/hooks';
import { OrderEntity } from '@orderly.network/types';
import { memo, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { match } from 'ts-pattern';
import AmountSetOrderSide from './AmountSetOrderSide';
import { Inputs } from './CreateOrderForm';

interface IProps {
	formContext: UseFormReturn<Inputs>;
	symbolsInfo: any;
	symbol: string;
	getInput: (data: Inputs, symbol: string) => OrderEntity;
	helper: any;
	maxQty: number;
}

function InputForm({ formContext, symbolsInfo, symbol, getInput, helper, maxQty }: IProps) {
	const symbolInfo = symbolsInfo[symbol]();
	const [_, base, quote] = symbol.split('_');
	const theme = useTheme();

	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

	async function getValidationErrors(
		data: Inputs,
		symbol: string,
		validator: ReturnType<typeof useOrderEntry>['helper']['validator'],
	): Promise<ReturnType<ReturnType<typeof useOrderEntry>['helper']['validator']>> {
		return validator(getInput(data, symbol));
	}

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

	return (
		<Stack spacing={'8px'}>
			<Collapse
				in={match(formContext.watch('type'))
					.with('StopLimit', () => true)
					.with('StopMarket', () => true)
					.otherwise(() => false)}
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

			<Stack direction={'row'} alignItems={'start'} spacing={'10px'}>
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
					/>
				)}

				<CurrencyInputField
					name="quantity"
					formContext={formContext}
					suffix={base}
					decimals={baseDecimals}
					placeholder="0.0000"
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

			{/* <Stack direction={'row'} justifyContent={'space-between'} mt={'2px !important'}>
				<Typography fontSize={'12px'} color={theme.palette.grey[300]}>
					Max{' '}
					{match(formContext.watch('direction'))
						.with('Buy', () => 'Buy')
						.otherwise(() => 'Sell')}
				</Typography>
				<Typography
					fontSize={'12px'}
					color={match(formContext.watch('direction'))
						.with('Buy', () => theme.palette.success.main)
						.otherwise(() => theme.palette.error.main)}
				>
					{formatter.format(maxQty)} {base}
				</Typography>
			</Stack> */}

			<AmountSetOrderSide maxQty={maxQty} formContext={formContext} formatter={formatter} />
		</Stack>
	);
}

export default memo(InputForm);
