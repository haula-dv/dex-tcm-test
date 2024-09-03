import { StyledMenu } from '@/components/menu/StyledMenu';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Button, MenuItem, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SelectOption } from '@orderly.network/react/esm/select/select';
import { IconChevronDown } from '@tabler/icons-react';
import { memo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Inputs } from './CreateOrderForm';

const items: SelectOption[] = [
	{ label: 'Market', value: 'Market' },
	{ label: 'Limit', value: 'Limit' },
	{ label: 'Stop', value: 'Stop' },
	{ label: 'Stop limit', value: 'StopLimit' },
	{ label: 'Stop market', value: 'StopMarket' },
];

interface IProps {
	formContext: UseFormReturn<Inputs>;
}

const OrderTypeTab = ({ formContext }: IProps) => {
	const [value, setValue] = useState<any>('Market');

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleChange = (val: string | number, event?: React.MouseEvent<HTMLButtonElement>) => {
		if (val === 'Stop' && event) {
			handleClick(event);
			return;
		}

		setValue(val);
		formContext.setValue('type', val as any);
		handleClose();
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Stack direction={'row'} spacing={'10px'} justifyContent={'space-between'}>
			{items.slice(0, 3).map((item, index) => {
				const isActived =
					index === 2 ? (value === 'StopLimit' || value === 'StopMarket' ? true : false) : item.value === value;
				return (
					<TabItem
						actived={isActived}
						key={index}
						fullWidth
						onClick={(e) => handleChange(item.value, e)}
						endIcon={index == 2 ? <IconChevronDown size={'1rem'} /> : null}
						id="basic-button"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						{item.label}
					</TabItem>
				);
			})}

			<StyledMenu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				{items.slice(3, items.length).map((item, index) => (
					<MenuItem
						key={index}
						onClick={(e) => handleChange(item.value)}
						selected={item.value === value}
						sx={{
							'&.Mui-selected': {
								backgroundColor: theme.palette.primary.light,
							},
						}}
					>
						{item.label}
					</MenuItem>
				))}
			</StyledMenu>
		</Stack>
	);
};

export default memo(OrderTypeTab);

interface IItab {
	actived: boolean;
}

const TabItem = styled(Button, { shouldForwardProp: (prop) => prop !== 'actived' })<IItab>(({ theme, actived }) => ({
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
}));
