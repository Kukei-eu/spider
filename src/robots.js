import robotsParser from 'robots-parser';
import {DEFAULT_POLITE_WAIT, KUKEI_BOT_ID} from './helpers/constants.js';

const getRobotsContent = async (url) => {
	try {
		const urlParsed = new URL(url);
		const robotsUrl = `${urlParsed.origin}/robots.txt`;

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

export const makeRobots = async (robotsTxt) => {
	const robotsContent = await getRobotsContent(robotsTxt);

	if (!robotsContent) return {
		isAllowed: () => true,
		politeWait: DEFAULT_POLITE_WAIT,
	};

	const robots = robotsParser(robotsTxt, robotsContent);
	const wait = robots.getCrawlDelay(KUKEI_BOT_ID) || DEFAULT_POLITE_WAIT;
	const crawlDelay = wait < DEFAULT_POLITE_WAIT ? DEFAULT_POLITE_WAIT : wait;

	return {
		isAllowed: (url) => robots.isAllowed(url, KUKEI_BOT_ID),
		politeWait: crawlDelay,
	};
};

const robotsCached = new Map();
export const getRobots = async (incomingUrl) => {
	const rootUrlParsed = new URL(incomingUrl);
	const robotsTxt = `${rootUrlParsed.origin}/robots.txt`;

	if (!robotsCached.has(rootUrlParsed.origin)) {
		const robots = await makeRobots(robotsTxt);
		robotsCached.set(rootUrlParsed.origin, robots);
	}

	return robotsCached.get(rootUrlParsed.origin);
};
