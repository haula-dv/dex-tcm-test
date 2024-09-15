import { InputBase } from '@mui/material';

interface IProps {
	amount: string;
	onChange: (value: any) => void;
}

export const AmountInput = ({ amount, onChange }: IProps) => {
	return <InputBase placeholder="0.0" value={amount} onChange={(e) => onChange(e.target.value)} />;
};
