import { setColorThemeMode } from '@/utils/helpers';

const IconLineTrading = (props: any) => {
	return (
		<svg width={22} height={13} viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M2 12L6 7.23333L9.5 9.43333L15 1L21 12"
				stroke={setColorThemeMode('#A5A5A5', '#fff')}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M1 6H20" stroke={setColorThemeMode('#A5A5A5', '#fff')} strokeLinecap="round" strokeDasharray="1 2" />
		</svg>
	);
};
export default IconLineTrading;
