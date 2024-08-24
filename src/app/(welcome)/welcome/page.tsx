import { WelcomeContainer } from '@/plugins/welcome/components/WelcomeContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Welcome',
	description: '...',
};

export default function WelComePage() {
	return (
		<>
			<WelcomeContainer />
		</>
	);
}
