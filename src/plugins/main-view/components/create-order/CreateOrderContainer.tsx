import { MainIconButton } from '@/components/button/MainIconButton';
import { Box, Dialog, Stack, Typography } from '@mui/material';
import { Deposit, Divider, Withdraw } from '@orderly.network/react';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';
import CreateOrderForm from './CreateOrderForm';

interface IProps {
	symbol: string;
}

export const CreateOrderContainer = ({ symbol }: IProps) => {
	const [open, setOpen] = useState(false);
	const [currentType, setCurrentType] = useState<string>();

	const handleClick = (type: string) => {
		setOpen(true);
		setCurrentType(type);
	};

	return (
		<Box>
			<CreateOrderForm symbol={symbol} />

			<Dialog open={open} onClose={() => setOpen(false)} sx={{ zIndex: 1 }}>
				<Stack direction={'row'} justifyContent={'space-between'} p={1} alignItems={'center'}>
					<Typography>{currentType === 'desposit' ? 'Desposit' : 'Withdraw'}</Typography>

					<MainIconButton size="small" onClick={() => setOpen(false)}>
						<IconX />
					</MainIconButton>
				</Stack>

				<Divider />

				<Box p={1}>{currentType === 'desposit' ? <Deposit /> : <Withdraw />}</Box>
			</Dialog>
		</Box>
	);
};
