import { AddLiquidityContainer } from '@/plugins/pool/liquidity/AddLiquidityContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Add liquidity',
	description: '...',
};

export default function AddLiquidityPage() {
	return <AddLiquidityContainer />;
}
