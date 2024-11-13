import { setColorThemeMode } from "@/utils/helpers";
import { Box, Skeleton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMarketsStream } from "@orderly.network/hooks";
import { memo, useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import MarketItem from "./MarketItem";

interface IProps {
	onChangeSymbol: (symbol: string) => void;
}

const MarketSlider = ({ onChangeSymbol }: IProps) => {
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
			currentRef.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (currentRef) {
				currentRef.removeEventListener("scroll", handleScroll);
			}
		};
	}, [itemRef]);

	return (
		<Wrapper showBefore={true} showAfter={true}>
			<ItemWrap
				ref={itemRef}
				direction={"row"}
				height={"48px"}
				alignItems={"center"}
				spacing={"16px"}>
				{data ? (
					<Marquee autoFill pauseOnClick pauseOnHover speed={20}>
						{data?.length > 0 &&
							data?.map((market, index) => (
								<MarketItem
									onChangeSymbol={onChangeSymbol}
									key={index}
									index={index}
									market={market}
								/>
							))}
					</Marquee>
				) : (
					<Skeleton
						variant="text"
						height={"46px"}
						sx={{ flexShrink: 0 }}
						animation="wave"
						width={"120px"}
					/>
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

const Wrapper = styled(Box, {
	shouldForwardProp: (prop) => prop !== "showBefore" && prop !== "showAfter",
})<IWrapper>(({ theme, showBefore, showAfter }) => ({
	position: "relative",
	width: "100%",
	transition: "0.6s",
	"&::after": {
		content: '""',
		position: "absolute",
		top: 0,
		right: 0,
		height: "100%",
		width: "100px",
		background: `linear-gradient(to left, ${setColorThemeMode(
			theme.palette.primary.light,
			"#322D2B",
		)}, transparent)`,
		pointerEvents: "none",
		zIndex: 2,
	},

	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		width: "100px",
		background: showBefore
			? `linear-gradient(to right, ${setColorThemeMode(
					theme.palette.primary.light,
					"#322D2B",
			  )}, transparent)`
			: "transparent",
		pointerEvents: "none",
		transition: "0.6s",
		zIndex: 2,
	},
}));

const ItemWrap = styled(Stack)(({ theme }) => ({
	position: "relative",
	overflowX: "auto",
}));
