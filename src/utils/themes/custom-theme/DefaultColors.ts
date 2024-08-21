const baselightTheme = {
	direction: 'ltr',
	palette: {},
};

const baseDarkTheme = {
	direction: 'ltr',
	palette: {
		primary: {
			main: '#00A9FF',
			dark: '#00A9FF',
		},
		grey: {
			A900: 'rgba(255, 255, 255, 0.02)',
		},

		background: {
			default: '#10121A',
			dark: '#10121A',
			paper: '#10121A',
		},
		divider: '#363a45',
		white: {
			main: '#fff',
			contrastText: '#000',
		},

		success: {
			main: 'rgba(0, 181, 159)',
			contrastText: '#fff',
		},
	},
};

export { baseDarkTheme, baselightTheme };
