import { theme } from '@/utils';
import { Collapse, Stack, Typography } from '@mui/material';
import { Divider } from '@orderly.network/react';
import { IconChevronDown } from '@tabler/icons-react';
import { memo, useState } from 'react';
import { Item } from '../create-order/CreateOrderForm';

export const Balance = memo(() => {
	const [checked, setChecked] = useState(false);
	const handleChange = () => {
		setChecked((prev) => !prev);
	};

	return (
		<>
			{/* <SettlePnlContent /> */}

			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				className="pointer"
				p={1}
				alignItems={'center'}
				onClick={handleChange}
			>
				<Stack>
					<Typography fontSize={'12px'} color={theme.palette.grey[600]}>
						Total balance
					</Typography>

					<Typography fontWeight={600}>0.00 USDC</Typography>
				</Stack>

				<IconChevronDown />
			</Stack>

			<Collapse in={checked}>
				<Stack spacing={1} p={1}>
					<Item label="Free collateral" value={'0.00 USDC'} />

					<Item label="Unsettled" value={'PnL 0.00 USDC'} />
				</Stack>
			</Collapse>

			<Divider />
		</>
	);
});
