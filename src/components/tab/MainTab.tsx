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
}

const MainTab = ({ tabs, onChange, fullWidth, children }: IProps) => {
	const [value, setValue] = useState<any>(tabs[0].value);

	const handleChange = (val: ITab) => {
		setValue(val.value);
		onChange && onChange(val);
	};

	return (
		<TabContext value={value}>
			<Stack direction={'row'} spacing={'10px'} pb={'10px'}>
				{tabs.map((item, index) => {
					return (
						<TabItem
							actived={value === item.value}
							key={index}
							fullWidth={fullWidth}
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
}

const TabItem = styled(Button, { shouldForwardProp: (prop) => prop !== 'actived' })<IItabCustom>(
	({ theme, actived }) => ({
		borderRadius: TSizes.borderRadius,
		height: TSizes.buttonHeightSmall,
		minHeight: TSizes.buttonHeightSmall,
		fontSize: '13px',
		fontWeight: 600,
		color: theme.palette.grey[500],
		...(actived && {
			backgroundColor: theme.palette.common.white,
			color: theme.palette.grey[700],
		}),
	}),
);
