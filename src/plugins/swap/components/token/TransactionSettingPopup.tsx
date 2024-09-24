'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainDialog } from '@/components/dialog/MainDialog';
import CustomSwitch from '@/components/form-control/CustomSwitch';
import MainTooltip from '@/components/MainTooltip';
import { TColors } from '@/utils';
import { filterAllowedCharacters } from '@/utils/formatters/number';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconHelpCircle, IconSettings } from '@tabler/icons-react';
import { useState } from 'react';

interface IProps {
	getSlippageAmount: (value: string) => void;
	getDeadlineMinutes: (value: string) => void;
}

export const TransactionPopup = ({ getSlippageAmount, getDeadlineMinutes }: IProps) => {
	const slippages = [
		{
			value: 10,
			percentValue: '0.1',
			label: '0.1%',
		},
		{
			value: 25,
			label: '0.25%',
			percentValue: '0.25',
		},
		{
			value: 50,
			label: '0.5%',
			percentValue: '0.5',
		},
		{
			value: 100,
			label: '1.0%',
			percentValue: '1.0',
		},
	];

	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [currentSlippageAmount, setCurrentSlippageAmount] = useState('0.1');
	const [deadlineMinutes, setDeadlineMinutes] = useState('30');

	// Handle change slippage
	const handleChangeSlippage = (value: string) => {
		let newValue = filterAllowedCharacters(String(value));

		if (+newValue >= 1) {
			setCurrentSlippageAmount('1.0');
			return;
		}

		setCurrentSlippageAmount(newValue);
		getSlippageAmount(newValue);
	};

	// Handle change deadline minutes
	const handleChangeDeadline = (value: string) => {
		setDeadlineMinutes(value);
	};

	return (
		<>
			<MainButton
				endIcon={<IconSettings size={'1rem'} color={theme.palette.text.primary} />}
				variant={setColorThemeMode('filledTonal', 'contained')}
				color={setColorThemeMode('inherit', 'darkPrimary')}
				size="small"
				fullRounded
				onClick={handleClick}
			>
				{currentSlippageAmount} % slippage
			</MainButton>

			<MainDialog open={open} handleClose={handleClose} hiddenHeader maxWidth="xs">
				<Box>
					<Typography fontSize={'16px'} fontWeight={600} pb={'10px'} lineHeight={'100%'}>
						Transactions setting
					</Typography>

					<Stack spacing={1} width={'100%'} pt="6px">
						<Stack direction={'row'} alignItems={'center'} spacing={1}>
							<Typography
								lineHeight={'100%'}
								color={setColorThemeMode(theme.palette.grey[700], theme.palette.grey[200])}
							>
								Max. slippage
							</Typography>

							<MainTooltip
								arrow
								title={`Your transaction will revert if the price changes unfavorably by more than this percentage.`}
							>
								<IconHelpCircle size={'1.2rem'} />
							</MainTooltip>
						</Stack>

						<Stack direction={'row'} spacing={TSizes.margin_xs} alignItems={'center'}>
							{slippages.map((item) => (
								<MainButton
									key={item.value}
									variant="filledTonal"
									color={currentSlippageAmount === item.percentValue ? 'darkPrimary' : 'darkGrey'}
									onClick={() => {
										setCurrentSlippageAmount(item.percentValue);
										getSlippageAmount(item.percentValue);
									}}
									size="small"
									sx={{ flexShrink: 0 }}
								>
									{item.label}
								</MainButton>
							))}

							<Box width={'100%'}>
								<CustomTextField
									value={currentSlippageAmount}
									placeholder="1.0"
									size="small"
									onChange={(e) => handleChangeSlippage(e.target.value)}
									InputProps={{
										endAdornment: <InputAdornment position="end">%</InputAdornment>,
									}}
								/>
							</Box>
						</Stack>

						<Stack direction={'row'} alignItems={'center'} spacing={1} pt="10px">
							<Typography color={setColorThemeMode(theme.palette.grey[700], theme.palette.grey[200])}>
								Transaction deadline
							</Typography>
							<MainTooltip arrow title={`Your transaction will revert if it is pending for more than this long`}>
								<IconHelpCircle size={'1.2rem'} />
							</MainTooltip>
						</Stack>

						<Stack direction={'row'} spacing={1.5} alignItems={'center'}>
							<CustomTextField
								placeholder="30"
								size="small"
								sx={{ width: '100px' }}
								value={deadlineMinutes}
								onChange={(e) => handleChangeDeadline(e.target.value)}
							/>
							<Typography>minutes</Typography>
						</Stack>

						<Stack>
							<Typography fontSize={'16px'} fontWeight={600} pt={'6px'}>
								Interface settings
							</Typography>

							<CustomSwitch
								label={
									<Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
										<Typography
											fontSize={'14px'}
											color={setColorThemeMode(theme.palette.grey[700], theme.palette.grey[200])}
										>
											Toggle expert mode
										</Typography>

										<MainTooltip
											arrow
											title="Bypasses confirmation modals and allows high slippage trades. Use at your own risk"
										>
											<IconHelpCircle size={'1.2rem'} />
										</MainTooltip>
									</Stack>
								}
							/>

							<CustomSwitch
								label={
									<Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
										<Typography
											fontSize={'14px'}
											color={setColorThemeMode(theme.palette.grey[700], theme.palette.grey[200])}
										>
											Disabled multihop
										</Typography>

										<MainTooltip arrow title="Restricts swaps to direct pairt only">
											<IconHelpCircle size={'1.2rem'} />
										</MainTooltip>
									</Stack>
								}
							/>
						</Stack>
					</Stack>
				</Box>
			</MainDialog>
		</>
	);
};

const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: setColorThemeMode(theme.palette.primary.light, TColors.brownnDark),

		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: setColorThemeMode(theme.palette.grey[100], theme.palette.grey[700]),
		},
		'&:hover': {
			borderColor: setColorThemeMode(theme.palette.grey[100], theme.palette.grey[700]),
		},
	},
	'& .MuiOutlinedInput-input::-webkit-input-placeholder': {
		color: setColorThemeMode(theme.palette.grey[900], theme.palette.common.white),
		opacity: '0.6',
	},
}));
