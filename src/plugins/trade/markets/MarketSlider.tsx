import { theme } from '@/utils';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMarketsStream } from '@orderly.network/hooks';
import { memo, useEffect, useRef, useState } from 'react';

const MarketSlider = () => {
	const { data } = useMarketsStream();
	const [showBefore, setShowBefore] = useState(false);
	const [showAfter, setShowAfter] = useState(true);
	const itemRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => {
		const currentRef = itemRef.current;
		if (currentRef) {
			const { scrollLeft, scrollWidth, clientWidth } = currentRef;
			setShowBefore(scrollLeft > 10);
			setShowAfter(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	useEffect(() => {
		const currentRef = itemRef.current;

		if (currentRef) {
			currentRef.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (currentRef) {
				currentRef.removeEventListener('scroll', handleScroll);
			}
		};
	}, [itemRef]);

	// console.log(data);

	return (
		<Wrapper showBefore={showBefore} showAfter={showAfter}>
			<ItemWrap ref={itemRef} direction={'row'} height={'48px'} alignItems={'center'} spacing={'16px'}>
				{data ? (
					data?.length > 0 &&
					data?.map((market, index) => (
						<Stack direction={'row'} spacing={'18px'} key={index}>
							<Stack direction={'row'} spacing={'8px'}>
								<Typography fontWeight={600} fontSize={'14px'}>
									{market.symbol}
								</Typography>
								<Typography fontWeight={600} fontSize={'14px'}>
									{(market as any).change * 100}
								</Typography>
								<Typography fontWeight={600} fontSize={'14px'} color={theme.palette.success.main}>
									2.11%
								</Typography>
							</Stack>

							{index < data.length - 1 && <Box height={'18px'} width={'2px'} bgcolor={theme.palette.common.black} />}
						</Stack>
					))
				) : (
					<Skeleton variant="text" height={'46px'} sx={{ flexShrink: 0 }} animation="wave" width={'220px'} />
				)}
			</ItemWrap>
		</Wrapper>
	);
};

export default memo(MarketSlider);

interface IWrapper {
	showBefore: boolean;
	showAfter: boolean;
}

const Wrapper = styled(Box, { shouldForwardProp: (prop) => prop !== 'showBefore' && prop !== 'showAfter' })<IWrapper>(
	({ theme, showBefore, showAfter }) => ({
		position: 'relative',
		width: '100%',
		transition: '0.6s',
		'&::after': {
			content: '""',
			position: 'absolute',
			top: 0,
			right: 0,
			height: '100%',
			width: '100px',
			background: showAfter ? `linear-gradient(to left, ${theme.palette.primary.light}, transparent)` : 'transparent',
			pointerEvents: 'none',
		},

		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			left: 0,
			height: '100%',
			width: '100px',
			background: showBefore ? `linear-gradient(to right, ${theme.palette.primary.light}, transparent)` : 'transparent',
			pointerEvents: 'none',
			transition: '0.6s',
			zIndex: 1,
		},
	}),
);

const ItemWrap = styled(Stack)(({ theme }) => ({
	position: 'relative',
	overflowX: 'auto',
}));
