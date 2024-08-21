<<<<<<< HEAD
=======
import { Box } from '@mui/material';
import Image from 'next/image';
>>>>>>> feat/swap
import { useState } from 'react';

interface IProps {
	size?: number;
	url: string;
	symbol?: string;
	fontSize?: string;
}

export const TokenIcon = ({ url, size = 20, symbol, fontSize }: IProps) => {
	const [isError, setIsError] = useState(false);

<<<<<<< HEAD
	// if (isError) {
	// 	return <NoToken symbol={symbol ?? 'T'} sizes={`${size}px`} fontSize={fontSize} />;
	// } else
	// 	return (
	// 		<Image
	// 			src={url}
	// 			height={size}
	// 			width={size}
	// 			alt=""
	// 			onError={() => setIsError(true)}
	// 			style={{
	// 				overflow: 'hidden',
	// 				borderRadius: '50%',
	// 			}}
	// 		/>
	// 	);

	return <></>;
=======
	if (isError) {
		return <></>;
	} else
		return (
			<Box flexShrink={0}>
				<Image
					src={url}
					height={size}
					width={size}
					alt=""
					onError={() => setIsError(true)}
					style={{
						overflow: 'hidden',
						borderRadius: '50%',
						flexShrink: 0,
					}}
				/>
			</Box>
		);
>>>>>>> feat/swap
};
