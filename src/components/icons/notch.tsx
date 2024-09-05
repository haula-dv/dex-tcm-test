import { setColorThemeMode } from '@/utils/helpers';
import { useTheme } from '@mui/material';

const IconNotchCard = (props: any) => {
	const theme = useTheme();

	return (
		<svg width={586} height={109} viewBox="0 0 586 109" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M119.227 51.197C197.232 45.1194 267.578 14.5333 293 0V109H0C0 92 41.2227 57.2745 119.227 51.197Z"
				fill={setColorThemeMode('#E9E4DE', theme.palette.background.default)}
			/>
			<path
				d="M466.773 51.197C388.768 45.1194 318.422 14.5333 293 0V109H586C586 92 544.777 57.2745 466.773 51.197Z"
				fill={setColorThemeMode('#E9E4DE', theme.palette.background.default)}
			/>
		</svg>
	);
};
export default IconNotchCard;
