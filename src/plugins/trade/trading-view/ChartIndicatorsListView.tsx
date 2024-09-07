/* eslint-disable react-hooks/rules-of-hooks */
import { MainIconButton } from '@/components/button/MainIconButton';
import { SearchField } from '@/components/form-control/SearchField';
import FixTrading from '@/components/icons/fixtrading';
import IconLoading from '@/components/icons/loading';
import MainTooltip from '@/components/MainTooltip';
import { StyledMenu } from '@/components/menu/StyledMenu';
import { setColorThemeMode } from '@/utils/helpers';
import { Box, ListItemButton, Stack, Typography, useTheme } from '@mui/material';
import { IconCheck } from '@tabler/icons-react';
import { memo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { indicatorsCore } from '../store';

interface IProps {
	handleSelectIndicator: (value: string[]) => void;
}

const ChartIndicatorsListView = ({ handleSelectIndicator }: IProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const [slice, setSlice] = useState(10);
	const [hasMore, setHasMore] = useState(true);
	const [currentSelect, setCurrentSelect] = useState<string[]>([]);
	const [allIndicator, setAllIndicator] = useState(indicatorsCore);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickItem = (newVal: string) => {
		setCurrentSelect((prev) => {
			if (prev.includes(newVal)) {
				const items = prev.filter((item) => item != newVal);
				handleSelectIndicator(items);
				return items;
			} else {
				const items = [newVal, ...prev];
				handleSelectIndicator(items);
				return items;
			}
		});
	};

	const fetchMoreData = () => {
		if (slice >= allIndicator.length) {
			setHasMore(false);
			return;
		}

		setSlice((prev) => prev + 10);
	};

	const onSearch = (keyword: string) => {
		const newArray = allIndicator.filter((item) => item.scriptName.includes(keyword));
		setAllIndicator(newArray);
	};

	return (
		<>
			<MainTooltip title="Indicators" placement="top" arrow>
				<MainIconButton
					size="small"
					id="chart-indicator-button"
					aria-controls={open ? 'chart-indicator-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					<FixTrading />
				</MainIconButton>
			</MainTooltip>

			<StyledMenu
				id="chart-indicator-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				maxheight="auto"
				MenuListProps={{
					'aria-labelledby': 'chart-indicator-button',
				}}
			>
				<Box
					mx={'16px'}
					pb="8px"
					pt="6px"
					position={'sticky'}
					top={'12px'}
					bgcolor={setColorThemeMode(useTheme().palette.common.white, useTheme().palette.background.paper)}
				>
					<SearchField
						placeholder="Search..."
						onSearch={onSearch}
						backgroundColor={setColorThemeMode(useTheme().palette.grey[50], useTheme().palette.grey[800])}
					/>
				</Box>

				<Typography fontSize={'12px'} color={useTheme().palette.grey[400]} px="16px" pt="8px">
					Script name
				</Typography>

				<Stack
					id="scrollableDiv"
					style={{
						height: 300,
						width: 300,
						overflow: 'auto',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<InfiniteScroll
						dataLength={allIndicator.length - slice}
						next={fetchMoreData}
						inverse={false}
						hasMore={hasMore}
						loader={<IconLoading />}
						scrollableTarget="scrollableDiv"
					>
						{allIndicator.slice(0, slice).map((item, index) => (
							<ListItemButton
								key={index}
								selected={currentSelect.includes(item.scriptIdPart)}
								onClick={() => handleClickItem(item.scriptIdPart)}
							>
								<Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
									<Typography>{item.scriptName}</Typography>

									{currentSelect.includes(item.scriptIdPart) && (
										<IconCheck size={'1rem'} color={useTheme().palette.success.main} />
									)}
								</Stack>
							</ListItemButton>
						))}
					</InfiniteScroll>
				</Stack>
			</StyledMenu>
		</>
	);
};

export default memo(ChartIndicatorsListView);
