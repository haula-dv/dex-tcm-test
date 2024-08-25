import { Box } from '@mui/material';
import { useAccount, usePositionStream } from '@orderly.network/hooks';
import { PositionsView } from '@orderly.network/react';
import { AccountStatusEnum } from '@orderly.network/types';

interface IProps {
	symbol: string;
}

export const PositionMainView = ({ symbol }: IProps) => {
	const [positions, _info, { refresh, loading }] = usePositionStream(symbol);
	const { state } = useAccount();

	if (state.status <= AccountStatusEnum.NotSignedIn) {
		return;
	}

	if (!positions.rows || loading) {
		return <p>...</p>;
	}

	return (
		<Box>
			<p>Position</p>
			<PositionsView {...positions} dataSource={[]} />
		</Box>
	);
};
