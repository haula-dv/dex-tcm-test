import { Stack, Typography } from '@mui/material';
import { IconArrowLeft, IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import { MainIconButton } from '../button/MainIconButton';

interface IProps {
	onBackLink: any;
	title: string;
}

export const ChildHeader = ({ onBackLink, title }: IProps) => {
	return (
		<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pb={2}>
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

			<Typography variant="h4" fontWeight={600}>
				{title}
			</Typography>

			<MainIconButton size="small">
				<IconSettings />
			</MainIconButton>
		</Stack>
	);
};
