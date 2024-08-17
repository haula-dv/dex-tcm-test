import { MainButton } from '@/src/components/button/MainButton';
import { IconChevronDown } from '@tabler/icons-react';

export default function NetworkContent() {
	return (
		<MainButton variant="outlined" endIcon={<IconChevronDown size={'1rem'} />}>
			NetworkContent
		</MainButton>
	);
}
