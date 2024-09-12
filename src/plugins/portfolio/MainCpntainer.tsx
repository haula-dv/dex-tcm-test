'use client';
import { Box } from '@mui/material';
import { useAccount } from '@orderly.network/hooks';
import { Portfolio } from '@orderly.network/react';
import { useEffect } from 'react';

const PortfolioMainContainer = () => {
	const { account } = useAccount();

	useEffect(() => {
		const container = document.querySelector('.portfolio');

		if (container) {
			// Escape special characters using double backslashes
			const elementsToRemoveClassesFrom = container.querySelectorAll(
				'.orderly-px-\\[60px\\], .desktop\\:orderly-px-\\[40px\\], .orderly-pt-\\[20px\\], .orderly-max-w-\\[1408px\\] .orderly-h-\\[100vh\\] .orderly-pb-\\[300px\\]',
			);

			// Remove the classes from each element
			elementsToRemoveClassesFrom.forEach((element: any) => {
				element.classList.remove(
					'orderly-px-[60px]',
					'desktop:orderly-px-[40px]',
					'orderly-pt-[20px]',
					'orderly-max-w-[1408px]',
					'orderly-h-[100vh]',
					'orderly-pb-[300px]',
				);
			});
		}
	}, []);

	return (
		<Box className="portfolio">
			<Portfolio />
		</Box>
	);
};

export default PortfolioMainContainer;
