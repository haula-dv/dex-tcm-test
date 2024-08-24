import { Box } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

interface IProps {
	size?: number;
	url: string;
	symbol?: string;
	fontSize?: string;
}

export const TokenIcon = ({ url, size = 20, symbol, fontSize }: IProps) => {
	const [isError, setIsError] = useState(false);

	if (isError) {
		return <></>;
	} else
		return (
			<Box flexShrink={0} height={size} width={size}>
				<Image
					src={url}
					height={size}
					width={size}
					alt=""
					onError={() => setIsError(true)}
					placeholder="blur"
					blurDataURL={url}
					style={{
						overflow: 'hidden',
						borderRadius: '50%',
						flexShrink: 0,
					}}
				/>
			</Box>
		);
};
