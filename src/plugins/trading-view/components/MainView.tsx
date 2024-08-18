import { OrderlyConfig } from '@/utils/config/orderly';
import { API } from '@orderly.network/types';

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: API.Symbol) => void;
}

export const MainView = ({ onSymbolChange, symbol }: IProps) => {
	const { tradingViewConfig } = OrderlyConfig();

	return <></>;
};
