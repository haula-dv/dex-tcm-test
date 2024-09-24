import { Avatar, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `0${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

interface IProps {
	size?: number;
	url: string;
	symbol?: string;
	fontSize?: string;
}

export const TokenIcon = ({ url, size = 20, symbol, fontSize }: IProps) => {
	const [isError, setIsError] = useState(false);

	if (isError) {
		return (
			<Avatar
				sx={{
					height: size,
					width: size,
					bgcolor: stringToColor(symbol ?? ''),
				}}
			>
				<Typography fontSize={fontSize} color={'#fff'}>
					{symbol}
				</Typography>
			</Avatar>
		);
	} else
		return (
			<Box flexShrink={0} height={size} width={size}>
				{url && (
					<Image
						src={url}
						height={size}
						width={size}
						alt=""
						onError={() => setIsError(true)}
						// placeholder="blur"
						// blurDataURL={url}
						style={{
							overflow: 'hidden',
							borderRadius: '50%',
							flexShrink: 0,
						}}
					/>
				)}
			</Box>
		);
};
