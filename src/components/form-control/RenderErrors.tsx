import { Typography, useTheme } from '@mui/material';

export const RenderFormError = ({ error }: { error?: string }) => {
	const theme = useTheme();

	return (
		<Typography fontSize={'10px'} color={theme.palette.error.main} lineHeight={'14px'} pt={'4px'}>
			{error ? `${error.charAt(0).toUpperCase()}${error.slice(1)}` : ''}
		</Typography>
	);
};
