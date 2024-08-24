import { SwapContainer } from '@/plugins/swap/components/SwapContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Swap',
	description: '...',
};

export default function SwapPage() {
	return <SwapContainer />;
}
