import { TradingMainView } from '@/plugins/trading-view/components/TradingView';
import { API } from '@orderly.network/types';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: API.Symbol) => void;
}

export const MainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	return (
		<div>
			{/* <TradingMainView symbol={symbol} /> */}
			<TradingMainView symbol={symbol} />
		</div>
	);
};
