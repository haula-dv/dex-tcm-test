import { MainIconButton } from '@/components/button/MainIconButton';
import { theme } from '@/utils';
import {
	Box,
	Collapse,
	Stack,
	Step,
	StepConnector,
	stepConnectorClasses,
	StepIconProps,
	StepLabel,
	Stepper,
	styled,
	Typography,
} from '@mui/material';
import { Divider, toast, Tooltip } from '@orderly.network/react';
import { IconPencil } from '@tabler/icons-react';
import { memo, useState } from 'react';

// eslint-disable-next-line react/display-name
export const LeverageContent = memo(() => {
	const [checked, setChecked] = useState(false);
	const [activeStep, setActiveStep] = useState(0);

	const handleChecked = () => {
		setChecked((prev) => !prev);
	};

	const marks = {
		1: '1x',
		2: '2x',
		3: '3x',
		4: '4x',
		5: '5x',
		10: '10x',
		15: '15x',
		20: '20x',
		30: '30x',
		40: '40x',
		50: '50x',
	};

	const marksArray = Object.entries(marks).map(([key, value]) => ({
		key: Number(key),
		value: value,
	}));

	const handleChangeLeverage = (key: number, index: number) => {
		toast.success('Leverage updated');
		setActiveStep(index);
	};

	function ColorlibStepIcon(props: StepIconProps) {
		const { active, completed, className } = props;

		const icons: { [index: string]: React.ReactElement } = {
			index: <Box height={'6px'} width={'6px'}></Box>,
		};

		return (
			<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
				{icons[String(props.icon)]}
			</ColorlibStepIconRoot>
		);
	}

	return (
		<>
			<Stack direction={'row'} justifyContent={'space-between'} p={1}>
				<Stack>
					<Tooltip
						style={{ maxWidth: '300px' }}
						align="center"
						content={
							(
								<div>
									Your actual Leverage of the whole account / Your max Leverage of the whole account
									<Divider />
									Margin ratio = Total collateral / Total position notional
								</div>
							) as any
						}
					>
						<Box display={'inline-flex'}>
							<Typography fontSize={'12px'} color={theme.palette.grey[600]} className="pointer">
								Margin ratio
							</Typography>
						</Box>
					</Tooltip>

					<Typography color={theme.palette.success.main} fontWeight={600}>
						1000.00%
					</Typography>
				</Stack>

				<Stack>
					<Typography fontSize={'12px'} color={theme.palette.grey[600]} textAlign={'end'}>
						Account leverage
					</Typography>

					<Stack direction={'row'} spacing={0.2} alignItems={'center'} justifyContent={'flex-end'}>
						<Typography>0.00x / {marksArray[activeStep].value}</Typography>

						<MainIconButton size="small" edge="end" onClick={handleChecked}>
							<IconPencil size={'1rem'} />
						</MainIconButton>
					</Stack>
				</Stack>
			</Stack>

			<Collapse in={checked}>
				<Stack py={1}>
					<Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
						{marksArray.map((item, index) => (
							<Step key={item.key} onClick={() => handleChangeLeverage(item.key, index)}>
								<StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>

								<Typography textAlign={'center'} fontSize={'12px'} pt={0.2} color={theme.palette.grey[400]}>
									{item.value}
								</Typography>
							</Step>
						))}
					</Stepper>
				</Stack>
			</Collapse>
			<Divider />
		</>
	);
});

const ColorlibStepIconRoot = styled('div')<{
	ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
	zIndex: 1,
	color: '#fff',
	width: 8,
	height: 8,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	border: `1px solid ${theme.palette.grey[600]}`,
	cursor: 'pointer',
	...(ownerState.active && {
		border: `2px solid ${theme.palette.success.main}`,
		width: 12,
		height: 12,
		margin: '-2px !important',
	}),
	...(ownerState.completed && {
		borderWidth: 0,
		backgroundColor: theme.palette.success.main,
	}),
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 3,
		left: 'calc(-50% + 4px)',
		right: 'calc(50% + 4px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: theme.palette.success.main,
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: theme.palette.success.main,
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderTopWidth: 1,
	},
}));
