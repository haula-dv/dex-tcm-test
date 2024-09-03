import CurrencyInputField from '@/components/form-control/CurrencyInputField';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { Stack } from '@mui/material';
import { useOrderEntry } from '@orderly.network/hooks';
import { OrderEntity } from '@orderly.network/types';
import { memo } from 'react';
import { UseFormReturn } from 'react-hook-form';
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

	const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);
	const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: baseDecimals });

	async function getValidationErrors(
		data: Inputs,
		symbol: string,
		validator: ReturnType<typeof useOrderEntry>['helper']['validator'],
	): Promise<ReturnType<ReturnType<typeof useOrderEntry>['helper']['validator']>> {
		return validator(getInput(data, symbol));
	}

	return (
		<>
			<Stack direction={'row'} alignItems={'start'} spacing={'10px'}>
				<CurrencyInputField
					name="price"
					formContext={formContext}
					suffix={quote}
					decimals={quoteDecimals}
					placeholder="0.0000"
					rules={{
						validate: {
							custom: async (_, data) => {
								const errors = await getValidationErrors(data, symbol, helper.validator);
								return errors?.order_price != null ? errors.order_price.message : true;
							},
						},
					}}
				/>

				<CurrencyInputField
					name="quantity"
					formContext={formContext}
					suffix={base}
					decimals={0}
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
		</>
	);
}

export default memo(InputForm);
