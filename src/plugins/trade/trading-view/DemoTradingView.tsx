// import * as React from 'react';
// import styles from './index.module.css';
// import { widget, version } from '../../public/charting_library';

// function getLanguageFromURL() {
// 	const regex = new RegExp('[\\?&]lang=([^&#]*)');
// 	const results = regex.exec(window.location.search);
// 	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
// }

// export const TVChartContainer = ({
// 	symbol = 'AAPL',
// 	interval = 'D',
// 	datafeedUrl = 'https://demo_feed.tradingview.com',
// 	libraryPath = '/static/charting_library/',
// 	chartsStorageUrl = 'https://saveload.tradingview.com',
// 	chartsStorageApiVersion = '1.1',
// 	clientId = 'tradingview.com',
// 	userId = 'public_user_id',
// 	fullscreen = false,
// 	autosize = true,
// 	studiesOverrides = {},
// }) => {
// 	const ref = React.useRef(null);
// 	const tvWidgetRef = React.useRef(null);

// 	React.useEffect(() => {
// 		const widgetOptions = {
// 			symbol,
// 			datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(datafeedUrl),
// 			interval,
// 			container: ref.current,
// 			library_path: libraryPath,
// 			locale: getLanguageFromURL() || 'en',
// 			disabled_features: ['use_localstorage_for_settings'],
// 			enabled_features: ['study_templates'],
// 			charts_storage_url: chartsStorageUrl,
// 			charts_storage_api_version: chartsStorageApiVersion,
// 			client_id: clientId,
// 			user_id: userId,
// 			fullscreen,
// 			autosize,
// 			studies_overrides: studiesOverrides,
// 		};

// 		const tvWidget = new widget(widgetOptions);
// 		tvWidgetRef.current = tvWidget;

// 		tvWidget.onChartReady(() => {
// 			tvWidget.headerReady().then(() => {
// 				const button = tvWidget.createButton();
// 				button.setAttribute('title', 'Click to show a notification popup');
// 				button.classList.add('apply-common-tooltip');
// 				button.addEventListener('click', () => tvWidget.showNoticeDialog({
// 					title: 'Notification',
// 					body: 'TradingView Charting Library API works correctly',
// 					callback: () => {
// 						console.log('Noticed!');
// 					},
// 				}));
// 				button.innerHTML = 'Check API';
// 			});
// 		});

// 		return () => {
// 			if (tvWidgetRef.current !== null) {
// 				tvWidgetRef.current.remove();
// 				tvWidgetRef.current = null;
// 			}
// 		};
// 	}, [symbol, interval, datafeedUrl, libraryPath, chartsStorageUrl, chartsStorageApiVersion, clientId, userId, fullscreen, autosize, studiesOverrides]);

// 	return (
// 		<>
// 			<header className={styles.VersionHeader}>
// 				<h1>TradingView Charting Library and Next.js Integration Example {version()}</h1>
// 			</header>
// 			<div ref={ref} className={styles.TVChartContainer} />
// 		</>
// 	);
// };
