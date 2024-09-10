import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import TabContext from '@mui/lab/TabContext';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, ReactElement, useState } from 'react';

interface ITab {
	label: string;
	value: string | number;
}

interface IProps {
	tabs: ITab[];
	onChange?: (tab: ITab) => void;
	fullWidth?: boolean;
	children?: ReactElement;
	height?: string;
	defaultValue?: string | number;
}

const MainTab = ({ tabs, onChange, fullWidth, height, children, defaultValue }: IProps) => {
	const [value, setValue] = useState<any>(tabs[0].value);

	const handleChange = (val: ITab) => {
		setValue(val.value);
		onChange && onChange(val);
	};

	return (
		<TabContext value={value ?? defaultValue}>
			<Stack direction={'row'} spacing={'10px'} pb={'10px'} width={'100%'}>
				{tabs.map((item, index) => {
					return (
						<TabItem
							actived={value === item.value}
							key={index}
							fullWidth={fullWidth}
							height={height}
							onClick={(e) => handleChange(item)}
						>
							{item.label}
						</TabItem>
					);
				})}
			</Stack>

			{children}
		</TabContext>
	);
};

export default memo(MainTab);

interface IItabCustom {
	actived: boolean;
	height?: string;
}

export const TabItem = styled(Button, { shouldForwardProp: (prop) => prop !== 'actived' })<IItabCustom>(
	({ theme, actived, height }) => ({
		borderRadius: TSizes.borderRadius,
		height: height ? height : TSizes.buttonHeightSmall,
		minHeight: height ? height : TSizes.buttonHeightSmall,
		fontSize: '13px',
		fontWeight: 600,
		color: theme.palette.grey[500],
		...(actived && {
			backgroundColor: setColorThemeMode(theme.palette.common.white, '#322B27'),
			color: setColorThemeMode(theme.palette.grey[600], theme.palette.grey[100]),
		}),

		'&:hover': {
			backgroundColor: setColorThemeMode(theme.palette.common.white, '#322B27'),
		},

		'& svg': {
			color: setColorThemeMode(theme.palette.grey[600], theme.palette.grey[100]),
		},
	}),
);
