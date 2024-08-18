import { Skeleton, Stack } from '@mui/material';

interface IProps {
	style?: 'chip' | 'list';
}

export const TokenLoading = ({ style = 'list' }: IProps) => {
	return (
		<>
			{style === 'list' ? (
				<Stack spacing={2} px={2}>
					{[...Array(4)].map((item, index) => (
						<Stack key={index} direction={'row'} spacing={1.5} alignItems={'center'}>
							<Skeleton variant="circular" width={40} height={40} animation="wave" sx={{ flexShrink: 0 }} />

							<Stack width={'100%'}>
								<Skeleton variant="text" width={'40%'} animation="wave" />
								<Skeleton variant="text" width={'10%'} animation="wave" />
							</Stack>
						</Stack>
					))}
				</Stack>
			) : (
				<Stack direction={'row'} spacing={2} py={2}>
					{[...Array(3)].map((item, index) => (
						<Skeleton
							key={index}
							variant="rounded"
							width={'80px'}
							height={'32px'}
							sx={{ borderRadius: '44px' }}
							animation="wave"
						/>
					))}
				</Stack>
			)}
		</>
	);
};
