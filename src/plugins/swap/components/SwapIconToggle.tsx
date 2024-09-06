import { MainIconButton } from '@/components/button/MainIconButton';
import { setColorThemeMode } from '@/utils/helpers';
import { useTheme } from '@mui/material';
import { IconArrowsSort } from '@tabler/icons-react';

interface IProps {
	toggleSwapType: () => void;
}

export const ButtonSwapToggle = ({ toggleSwapType }: IProps) => {
	return (
		<div style={{ margin: '-20px auto -24px auto' }}>
			<MainIconButton
				isFullRounded
				color="white"
				sx={{ border: `5px solid ${setColorThemeMode(useTheme().palette.primary.main, useTheme().palette.grey[800])}` }}
				onClick={toggleSwapType}
			>
				<IconArrowsSort size={'1rem'} color="#000" />
			</MainIconButton>
		</div>
	);
};
