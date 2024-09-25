import { IHeadCell } from '@/common';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import {
	Skeleton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	useTheme,
} from '@mui/material';
import React, { memo, ReactNode } from 'react';
import IconNoContent from '../icons/no-content';

interface IProps {
	headTable: IHeadCell[];
	children?: ReactNode;
	isEmpty?: boolean;
	isLoading?: boolean;
}

function MainTable({ headTable, children, isEmpty, isLoading }: IProps) {
	const theme = useTheme();

	return (
		<TableContainer>
			<Table aria-label="position-table" size="small" stickyHeader>
				<TableHead>
					<TableRow>
						{headTable.map((item, index) => (
							<TableCell
								key={index}
								align={item.align}
								width={item.width}
								sx={{
									borderTopLeftRadius: index == 0 ? TSizes.borderRadius : '',
									borderBottomLeftRadius: index == 0 ? TSizes.borderRadius : '',
									borderBottomRightRadius: index < headTable.length - 1 ? '' : TSizes.borderRadius,
									borderTopRightRadius: index < headTable.length - 1 ? '' : TSizes.borderRadius,
									borderBottom: 0,
									color: `${theme.palette.grey[300]} !important`,
								}}
							>
								{item.title}
							</TableCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{isLoading ? (
						<TableRow>
							{headTable.map((item, index) => (
								<TableCell key={index} sx={{ border: 0 }}>
									<Skeleton variant="text" animation="wave" height={'36px'} width={'100%'} />
								</TableCell>
							))}
						</TableRow>
					) : (
						<React.Fragment>
							{isEmpty ? (
								<TableRow>
									<TableCell align="center" colSpan={headTable.length} sx={{ border: 0 }}>
										<Stack justifyContent={'center'} width={'100%'} alignItems={'center'} pt={2}>
											<IconNoContent />
										</Stack>
									</TableCell>
								</TableRow>
							) : (
								children
							)}
						</React.Fragment>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default memo(MainTable);
