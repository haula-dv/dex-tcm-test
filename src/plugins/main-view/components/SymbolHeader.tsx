import { theme } from '@/utils';
import { Divider, Stack } from '@mui/material';
import { MarketsContent } from './MarketContent';

export const SymbolHeader = () => {
	return (
		<>
			<Divider />

			<Stack
				px={1}
				py={1}
				borderLeft={1}
				borderColor={theme.palette.divider}
				direction={'row'}
				bgcolor={theme.palette.background.paper}
				spacing={1}
			>
				<MarketsContent />

				<Divider orientation="vertical" flexItem />
			</Stack>
		</>
	);
};
