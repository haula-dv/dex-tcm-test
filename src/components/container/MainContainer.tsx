import { Container, ContainerProps } from '@mui/material';
import { ReactNode } from 'react';

interface IProps extends ContainerProps {
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
	children?: ReactNode;
}

export const MainContainer = ({ children, maxWidth = 'xl', ...props }: IProps) => {
	return (
		<Container maxWidth={maxWidth} {...props}>
			{children}
		</Container>
	);
};
