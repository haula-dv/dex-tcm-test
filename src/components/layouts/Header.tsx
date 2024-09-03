'use client';
import WalletContainer from '@/plugins/wallet/components/WalletContainer';
import { setColorThemeMode } from '@/utils/helpers';
import { Mixins } from '@/utils/themes/custom-theme/mixins';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { AppBar, Box, BoxProps, Stack, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import Logo from '../icons/Logo';

export const Header = () => {
	const pathName = usePathname();
	const params = useParams();

	const navItems = [
		{ label: 'Swap', to: '/swap', actived: ['/swap'] },
		{ label: 'Pool', to: '/pool', actived: ['/pool'] },
		{ label: 'Trading', to: '/trading/perp', actived: [`/trading/perp/${params.symbol}`] },
		{ label: 'Portfolio', to: '/portfolio', actived: ['/portfolio'] },
		{ label: 'Vote', to: '/vote', actived: ['/vote'] },
	];

	return (
		<MainAppBar elevation={0} position="static">
			<Box px={{ xs: '16px', xl: '60px' }}>
				<Toolbar disableGutters>
					<Stack direction={'row'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
						<Stack direction={'row'} alignItems={'center'} spacing={TSizes.margin_md}>
							<Logo width="124px" height="40px" />

							{navItems.map((navItem) => (
								<Link key={navItem.label} href={navItem.to}>
									<NavItem isActived={navItem.actived.includes(pathName)}>
										<Typography>{navItem.label}</Typography>
									</NavItem>
								</Link>
							))}
						</Stack>

						<WalletContainer />
					</Stack>
				</Toolbar>
			</Box>
		</MainAppBar>
	);
};

// theme.palette.mode === 'dark' ? theme.palette.grey[900] :
const MainAppBar = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	zIndex: 0,
	height: '56px',
	borderRadius: '0px',
	'& .MuiToolbar-root': {
		height: '56px',
		minHeight: 'auto',
	},
}));

interface INavItemProps extends BoxProps {
	isActived: boolean;
}

const NavItem = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'isActived',
})<INavItemProps>(({ theme, isActived }) => ({
	cursor: 'pointer',
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	height: '56px',

	'&:after': {
		...Mixins.boxFullMixin({
			top: 'auto',
			bottom: 0,
			left: 0,
			height: '2px',
			width: '100%',
			backgroundColor: isActived
				? setColorThemeMode(theme.palette.common.black, theme.palette.common.white, theme)
				: 'transparent',
			borderRadius: '4px',
		}),
	},

	'& .MuiTypography-root': {
		color: setColorThemeMode(theme.palette.common.black, theme.palette.common.white, theme),
		fontSize: '14px',
		fontWeight: 700,
		padding: '6px 12px',
		borderRadius: TSizes.borderRadius,
		transition: theme.transitions.create(['background-color']),
	},
}));
