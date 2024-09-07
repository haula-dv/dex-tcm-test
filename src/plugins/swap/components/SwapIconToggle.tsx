import { MainIconButton } from '@/components/button/MainIconButton';
import { setColorThemeMode } from '@/utils/helpers';
import { useTheme } from '@mui/material';
import { IconArrowsSort, IconPlus } from '@tabler/icons-react';

interface IProps {
	toggleSwapType: () => void;
	isPlus?: boolean;
}

export const ButtonSwapToggle = ({ toggleSwapType, isPlus }: IProps) => {
	return (
		<div style={{ margin: '-18px auto -28px auto' }}>
			<MainIconButton
				isFullRounded
				color="white"
				sx={{ border: `5px solid ${setColorThemeMode(useTheme().palette.primary.main, useTheme().palette.grey[800])}` }}
				onClick={toggleSwapType}
			>
				{isPlus ? <IconPlus color="#000" /> : <IconArrowsSort size={'1rem'} color="#000" />}
			</MainIconButton>
		</div>
	);
};
