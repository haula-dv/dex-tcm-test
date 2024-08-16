import { Metadata } from 'next';
import ClientThemeProvider from '../components/ClientThemeProvider';
import '../styles/global.scss';
import OrderlyContainer from './common/OrderlyContainer';

export const metadata: Metadata = {
	title: 'TCMP Dex Trade',
	description: 'TCMP Dex Trade',
};

export const viewport = {
	minimumScale: 1.0,
	maximumScale: 1.0,
	userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/png" href="/apple-touch-icon.png" />
				<link rel="apple-touch-icon" type="image/png" sizes="16x16" href="/apple-touch-icon.png" />
			</head>

			<body>
				<ClientThemeProvider>
					<OrderlyContainer>{children}</OrderlyContainer>
				</ClientThemeProvider>
			</body>
		</html>
	);
}
