import { TransactionPopup } from '@/plugins/swap/components/token/TransactionSettingPopup';
import { Stack, Typography } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { MainIconButton } from '../button/MainIconButton';

interface IProps {
	onBackLink: any;
	title: string;
}

export const ChildHeader = ({ onBackLink, title }: IProps) => {
	const [slippageAmount, setSlippageAmount] = useState('0.1');
	const [deadlineMinutes, setDeadlineMinutes] = useState('10');

	return (
		<Stack direction={'row'} alignItems={'center'} pb={2}>
			{typeof onBackLink === 'string' ? (
				<Link href={onBackLink}>
					<MainIconButton size="small">
						<IconArrowLeft />
					</MainIconButton>
				</Link>
			) : (
				<MainIconButton size="small" onClick={onBackLink}>
					<IconArrowLeft />
				</MainIconButton>
			)}

			<Typography variant="h4" fontWeight={600} flex={1}>
				{title}
			</Typography>

			<TransactionPopup
				getSlippageAmount={(value) => setSlippageAmount(value)}
				getDeadlineMinutes={(value) => setDeadlineMinutes(value)}
			/>
		</Stack>
	);
};
