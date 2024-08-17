'use client';
import { Backdrop, Box } from '@mui/material';
import IconLoading from '../icons/loading';

export const Loading = () => {
	const loading = false;

	return (
		<Backdrop open={loading} sx={{ zIndex: 99999, bgcolor: 'transparent' }}>
			<Box height={'80px'} width={'80px'} position={'relative'}>
				<IconLoading />
			</Box>
		</Backdrop>
	);
};
