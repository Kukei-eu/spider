import robotsParser from 'robots-parser';
import {DEFAULT_POLITE_WAIT, KUKEI_BOT_ID} from './helpers/constants.js';

const getRobotsContent = async (rootUrl) => {
	try {
		const rootUrlParsed = new URL(rootUrl);
		const robotsUrl = `${rootUrlParsed.origin}/robots.txt`;

		const response = await fetch(robotsUrl);
		if (response.status !== 200) {
			console.log('Robots returned non 200 code, assuming no robots.txt');
			return null;
		}

		const robotsContent = await response.text();

		return robotsContent;
	} catch (error) {
		console.log('No robots.txt found', error);
		return null;
	}
};

export const getRobots = async (rootUrl) => {
	const rootUrlParsed = new URL(rootUrl);
	const robotsContent = await getRobotsContent(rootUrl);

	if (!robotsContent) return {
		isAllowed: () => true,
		politeWait: DEFAULT_POLITE_WAIT,
	};

	const robots = robotsParser(`${rootUrlParsed.origin}/robots.txt`, robotsContent);
	const crawlDelay = robots.getCrawlDelay(KUKEI_BOT_ID) || DEFAULT_POLITE_WAIT;

	return {
		isAllowed: (url) => robots.isAllowed(url, KUKEI_BOT_ID),
		politeWait: crawlDelay,
	};
};
