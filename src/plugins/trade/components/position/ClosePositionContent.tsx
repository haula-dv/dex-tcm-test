import IconLoading from '@/components/icons/loading';
import { getDecimalsFromTick } from '@/utils/formatters/api';
import { Typography } from '@mui/material';
import { useOrderEntry, useSymbolsInfo } from '@orderly.network/hooks';
import { API, OrderEntity, OrderSide, OrderType } from '@orderly.network/types';
import { useNotifications } from '@web3-onboard/react';
import { memo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
	direction: OrderSide;
	type: OrderType;
	quantity: string | number;
};

interface IProps {
	symbol: string;
	position: API.PositionExt;
	refresh: import('swr/_internal').KeyedMutator<API.PositionInfo>;
}
const ClosePositionContent = ({ symbol, position, refresh }: IProps) => {
	const [loading, setLoading] = useState(false);

	const symbolsInfo = useSymbolsInfo();

	const { register, handleSubmit, control } = useForm<Inputs>({
		defaultValues: {
			direction: position.position_qty > 0 ? OrderSide.SELL : OrderSide.BUY,
			type: OrderType.MARKET,
			quantity: position.position_qty,
		},
	});

	const { onSubmit, helper } = useOrderEntry(
		{
			symbol,
			side: OrderSide.BUY,
			order_type: OrderType.MARKET,
		},
		{ watchOrderbook: true },
	);

	const [_0, customNotification] = useNotifications();

	if (symbolsInfo.isNil) {
		return <IconLoading />;
	}

	const submitForm: SubmitHandler<Inputs> = async (data) => {
		setLoading(true);
		const { update } = customNotification({
			eventCode: 'closePosition',
			type: 'pending',
			message: 'Closing position...',
		});
		try {
			await onSubmit(getInput(data, symbol));
			update({
				eventCode: 'closePositionSuccess',
				type: 'success',
				message: 'Successfully closed position!',
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(`Unhandled error in "submitForm":`, err);
			update({
				eventCode: 'closePositionError',
				type: 'error',
				message: 'Closing position failed!',
				autoDismiss: 5_000,
			});
		} finally {
			setLoading(false);
			refresh();
			// setOpen(false);
		}
	};

	const symbolInfo = symbolsInfo[symbol]();
	const [_, base] = symbol.split('_');
	const [baseDecimals] = getDecimalsFromTick(symbolInfo);

	return (
		<>
			<form onSubmit={handleSubmit(submitForm)}>
				<Typography>Partially or fully close your open position at mark price.</Typography>
			</form>
		</>
	);
};

export default memo(ClosePositionContent);

async function getValidationErrors(
	data: Inputs,
	symbol: string,
	validator: ReturnType<typeof useOrderEntry>['helper']['validator'],
): Promise<ReturnType<ReturnType<typeof useOrderEntry>['helper']['validator']>> {
	return validator(getInput(data, symbol));
}

function getInput(data: Inputs, symbol: string): OrderEntity {
	return {
		symbol,
		side: data.direction,
		order_type: data.type,
		order_quantity: String(data.quantity),
		reduce_only: true,
	};
}
