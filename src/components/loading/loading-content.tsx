import { Backdrop, Box } from '@mui/material';
import IconLoading from '../icons/loading';

export const LoadingContent = () => {
	return (
		<Backdrop open sx={{ zIndex: 99999, bgcolor: 'transparent' }}>
			<Box height={'80px'} width={'80px'} position={'relative'}>
				<IconLoading />
			</Box>
		</Backdrop>
	);
};
