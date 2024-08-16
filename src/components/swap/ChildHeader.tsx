import { Stack, Typography } from '@mui/material';
import { IconArrowLeft, IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import { MainIconButton } from '../button/MainIconButton';

interface IProps {
	onBackLink: string;
	title: string;
}

export const ChildHeader = ({ onBackLink, title }: IProps) => {
	return (
		<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pb={2}>
			<Link href={onBackLink}>
				<MainIconButton variant="filledTonal" color="inherit">
					<IconArrowLeft />
				</MainIconButton>
			</Link>

			<Typography variant="h6" fontWeight={600}>
				{title}
			</Typography>

			<MainIconButton variant="filledTonal" color="inherit">
				<IconSettings />
			</MainIconButton>
		</Stack>
	);
};
