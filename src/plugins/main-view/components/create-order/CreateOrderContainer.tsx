import { MainButton } from '@/components/button/MainButton';
import { MainIconButton } from '@/components/button/MainIconButton';
import { theme } from '@/utils';
import { Box, Dialog, Stack, Typography } from '@mui/material';
import { Deposit, Divider, Withdraw } from '@orderly.network/react';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { CreateOrderForm } from './CreateOrderForm';

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
		<Box borderLeft={1} borderColor={theme.palette.divider} borderRadius={0}>
			<Divider />

			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				width={'400px'}
				flexShrink={0}
				p={1}
				height={'58px'}
			>
				<Typography>Account</Typography>

				<Stack direction={'row'} spacing={1}>
					<MainButton color="inherit" variant="filledTonal" onClick={() => handleClick('desposit')}>
						Desposit
					</MainButton>

					<MainButton color="inherit" variant="filledTonal" onClick={() => handleClick('withdraw')}>
						Withdraw
					</MainButton>
				</Stack>
			</Stack>

			<Divider />

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
