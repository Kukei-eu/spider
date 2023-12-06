import { crawlPage } from './crawlPage.js';
import { processResult } from './processResult.js';
import { getRobots } from '../robots.js';

const getUnprocessedUrl = (register) => {
	for (const [url, isCrawled] of register) {
		if (!isCrawled) return url;
	}
	return null;
};

const politeWait = (waitTime = 100) => new Promise((resolve) => setTimeout(resolve, waitTime));

export const crawlWebsite = async (rootUrl, index) => {
	const robots = await getRobots(rootUrl);
	if (!robots.isAllowed(rootUrl)) {
		console.log('Robots.txt disallowed crawling of rootUrl');
		process.exit(1);
		return;
	}
	/**
   * Url -> isCrawled
   * @type {Map<string, boolean>}
   */
	const register = new Map();


	const firstResult = await crawlPage(rootUrl, robots);
	await processResult(register, index, firstResult);

	let iteration = 0;
	while (getUnprocessedUrl(register)) {
		iteration++;
		const url = getUnprocessedUrl(register);

		if (!robots.isAllowed(url)) {
			console.log('Robots.txt disallowed crawling of url', url);
			register.set(url, true);
			continue;
		}

		console.log(`Crawling ${url}, step ${iteration}/${register.size}`);

		const result = await crawlPage(url);
		await processResult(register, index, result);
		await politeWait(robots.politeWait);
	}
};
