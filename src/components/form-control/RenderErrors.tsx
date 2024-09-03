import { Typography } from '@mui/material';

export const RenderFormError = ({ error }: { error?: string }) => {
	return (
		<Typography fontSize={'10px'} color={theme.palette.error.main} mt={'-10px important'}>
			{error ? `${error.charAt(0).toUpperCase()}${error.slice(1)}` : ''}
		</Typography>
	);
};
