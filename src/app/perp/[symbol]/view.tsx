import { OrderlyConfig } from '@/src/utils/config/orderly/config';
import { TradingPage } from '@orderly.network/react';

interface Props {
	onSymbolChange: (symbol: any) => void;
	symbol: string;
}

const View = (props: Props) => {
	const { tradingViewConfig } = OrderlyConfig();

	return (
		<TradingPage symbol={props.symbol} tradingViewConfig={tradingViewConfig} onSymbolChange={props.onSymbolChange} />
	);
};

export default View;
