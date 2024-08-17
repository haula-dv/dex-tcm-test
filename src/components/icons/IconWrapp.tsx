import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface IProps {
	size?: string;
	bgcolor?: string;
	children: ReactNode;
}

export const IconWrapp = ({ size = '32px', bgcolor = 'primary.light', children }: IProps) => {
	return (
		<Box
			height={size}
			width={size}
			bgcolor={bgcolor}
			borderRadius={'50%'}
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			{children}
		</Box>
	);
};
