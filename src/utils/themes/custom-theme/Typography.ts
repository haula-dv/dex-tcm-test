import { Inter } from 'next/font/google';

export const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

const typography = {
	fontFamily: inter.style.fontFamily,
	h1: {
		fontWeight: 600,
		fontSize: '32px',
		lineHeight: '120%',
	},
	h2: {
		fontWeight: 600,
		fontSize: '32px',
		lineHeight: '120%',
	},
	h3: {
		fontWeight: 600,
		fontSize: '24px',
		lineHeight: '120%',
	},
	h4: {
		fontWeight: 600,
		fontSize: '20px',
		lineHeight: '120%',
	},
	h5: {
		fontWeight: 600,
		fontSize: '16xp',
		lineHeight: '120%',
	},
	h6: {
		fontWeight: 600,
		fontSize: '14px',
		lineHeight: '120%',
	},
	button: {
		textTransform: 'capitalize',
		fontWeight: 400,
	},
	body1: {
		fontSize: '0.875rem',
		fontWeight: 400,
		lineHeight: '1.334rem',
	},
	body2: {
		fontSize: '0.75rem',
		letterSpacing: '0rem',
		fontWeight: 400,
		lineHeight: '1rem',
	},
	subtitle1: {
		fontSize: '0.875rem',
		fontWeight: 400,
	},
	subtitle2: {
		fontSize: '0.875rem',
		fontWeight: 400,
	},
};

export default typography;
