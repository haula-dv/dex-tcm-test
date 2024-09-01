import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { memo, ReactNode } from 'react';
import IconNoContent from '../icons/no-content';

export interface ITableHead {
	title: string;
}

interface IProps {
	headTable: ITableHead[];
	children?: ReactNode;
	isEmpty?: boolean;
}

function MainTable({ headTable, children, isEmpty }: IProps) {
	return (
		<TableContainer>
			<Table aria-label="position-table" size="small" stickyHeader>
				<TableHead>
					<TableRow>
						{headTable.map((item, index) => (
							<TableCell
								key={index}
								sx={{
									borderTopLeftRadius: index == 0 ? TSizes.borderRadius : '',
									borderBottomLeftRadius: index == 0 ? TSizes.borderRadius : '',
									borderBottomRightRadius: index < headTable.length - 1 ? '' : TSizes.borderRadius,
									borderTopRightRadius: index < headTable.length - 1 ? '' : TSizes.borderRadius,
									borderBottom: 0,
								}}
							>
								{item.title}
							</TableCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{children}

					{isEmpty && (
						<TableRow>
							<TableCell align="center" colSpan={headTable.length} sx={{ border: 0 }}>
								<Stack justifyContent={'center'} width={'100%'} alignItems={'center'} pt={2}>
									<IconNoContent />
								</Stack>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default memo(MainTable);
