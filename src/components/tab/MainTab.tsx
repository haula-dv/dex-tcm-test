import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, useState } from 'react';

interface ITab {
	label: string;
	value: string | number;
}

interface IProps {
	tabs: ITab[];
	onChange?: (tab: ITab) => void;
	fullWidth?: boolean;
}

const MainTab = ({ tabs, onChange, fullWidth }: IProps) => {
	const [value, setValue] = useState<any>(tabs[0].value);

	const handleChange = (val: ITab) => {
		setValue(val.value);
		onChange && onChange(val);
	};

	return (
		<Stack direction={'row'} spacing={'10px'}>
			{tabs.slice(0, 3).map((item, index) => {
				return (
					<TabItem actived={value === item.value} key={index} fullWidth={fullWidth} onClick={(e) => handleChange(item)}>
						{item.label}
					</TabItem>
				);
			})}
		</Stack>
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
