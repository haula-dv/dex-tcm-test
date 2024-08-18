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
			<Image
				src={url}
				height={size}
				width={size}
				alt=""
				onError={() => setIsError(true)}
				style={{
					overflow: 'hidden',
					borderRadius: '50%',
				}}
			/>
		);

	return <></>;
};
