import { MainIconButton } from '@/components/button/MainIconButton';
import { useTheme } from '@mui/material';
import { IconArrowsSort } from '@tabler/icons-react';

interface IProps {
	toggleSwapType: () => void;
}

export const ButtonSwapToggle = ({ toggleSwapType }: IProps) => {
	return (
		<div style={{ margin: '-20px auto -24px auto' }}>
			<MainIconButton
				color="white"
				sx={{ border: `5px solid ${useTheme().palette.primary.main}` }}
				onClick={toggleSwapType}
			>
				<IconArrowsSort size={'1rem'} color="#000" />
			</MainIconButton>
		</div>
	);
};
