/* eslint-disable react-hooks/rules-of-hooks */
import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import { GrayTab } from '@/components/tab/GrayTab';
import TabPanel from '@mui/lab/TabPanel';
import { Divider, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { ItemRow } from '../components/TokenSelected';

interface IProps {
	open: boolean;
	onClose: () => void;
}

export const CustomizeGasModal = ({ onClose, open }: IProps) => {
	const [currentSelect, setCurrentSelect] = useState(0);
	const items = [
		{ label: 'Slow', balance: '0.0047252 ETH', price: '$6.52' },
		{ label: 'Average', balance: '0.0053585 ETH', price: '$7.39' },
		{ label: 'Fast', balance: '0.0069173 ETH', price: '$9.54' },
	];

	const handleSelect = (index: number) => {
		setCurrentSelect(index);
	};

	return (
		<MainDialog open={open} handleClose={onClose} maxWidth="xs" title="Customize Gas">
			<GrayTab
				tabs={[
					{ label: 'Basic', value: '1' },
					{ label: 'Advanced', value: '2' },
				]}
			>
				<TabPanel value={'1'} sx={{ p: 0 }}>
					<Stack spacing={2} pt={2}>
						<Typography fontSize={'18px'} fontWeight={600}>
							Estimated Processing Times
						</Typography>
						<Typography color={useTheme().palette.grey[500]} fontSize={'16px'}>
							Select a higher gas fee accelerate the processing of your transaction.*
						</Typography>

						<Stack direction={'row'} spacing={1}>
							{items.map((item, inde) => (
								<MainCard
									key={inde}
									width="100%"
									isHover
									isSelected={inde === currentSelect}
									variant="outlined"
									onClick={() => handleSelect(inde)}
								>
									<Stack spacing={0.5}>
										<Typography fontSize={'13px'} color={useTheme().palette.grey[500]}>
											{item.label}
										</Typography>
										<Typography fontSize={'13px'}>{item.balance}</Typography>
										<Typography fontSize={'13px'}>{item.price}</Typography>
									</Stack>
								</MainCard>
							))}
						</Stack>
						<Typography color={useTheme().palette.grey[500]} fontSize={'16px'}>
							*Accelerating a transaction by using a higher gas price increases its changes of getting processed by the
							network faster, but it is not always guaranteed.
						</Typography>

						<MainCard width="100%">
							<Stack spacing={1}>
								<ItemRow title="Send Amount" value={<Typography fontSize={'15px'}>0.00000014309ETH</Typography>} />
								<ItemRow title="Transaction Fee" value={<Typography fontSize={'15px'}>0.0047252ETH</Typography>} />
								<Divider />
								<ItemRow
									title={<Typography fontSize={'15px'}>New Total</Typography>}
									value={<Typography fontSize={'15px'}>0.00472534309 ETH</Typography>}
								/>
								<ItemRow
									title=""
									value={
										<Typography color={useTheme().palette.grey[500]} fontSize={'15px'}>
											$6..52
										</Typography>
									}
								/>
							</Stack>
						</MainCard>

						<MainButton fullWidth variant="contained" color="darkGrey" size="large">
							Save
						</MainButton>
					</Stack>
				</TabPanel>
				<TabPanel value={'2'}>2</TabPanel>
			</GrayTab>
		</MainDialog>
	);
};
