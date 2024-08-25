import { MainDialog } from '@/components/dialog/MainDialog';
import { GrayTab } from '@/components/tab/GrayTab';
import TabPanel from '@mui/lab/TabPanel';
import { Typography } from '@mui/material';

interface IProps {
	open: boolean;
	onClose: () => void;
}

export const CustomizeGasModal = ({ onClose, open }: IProps) => {
	return (
		<MainDialog open={open} handleClose={onClose} maxWidth="xs" title="Customize Gas">
			<GrayTab
				tabs={[
					{ label: 'Basic', value: '1' },
					{ label: 'Advanced', value: '2' },
				]}
			>
				<TabPanel value={'1'}>
					<Typography>Estimated Processing Times</Typography>
					<Typography>Select a higher gas fee accelerate the processing of your transaction.*</Typography>
				</TabPanel>
				<TabPanel value={'2'}>2</TabPanel>
			</GrayTab>
		</MainDialog>
	);
};
