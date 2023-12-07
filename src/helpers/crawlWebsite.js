import { crawlPage } from './crawlPage.js';
import { processResult } from './processResult.js';
import { getRobots } from '../robots.js';

/**
 * Keeps track of which urls have been crawled.
 * @typedef {Map<string, boolean>} Register
 */

/**
 *
 * @param {Register} register
 * @returns {string|null}
 */
const getUnprocessedUrl = (register) => {
	for (const [url, isCrawled] of register) {
		if (!isCrawled) return url;
	}
	return null;
};

/**
 * Waits for a given amount of time.
 * @param {number} waitTime
 * @returns {Promise<void>}
 */
const politeWait = (waitTime = 100) => new Promise((resolve) => setTimeout(resolve, waitTime));

/**
 *
 * @param {string} rootUrl
 * @param {string} index
 * @returns {Promise<void>}
 */
export const crawlWebsite = async (rootUrl, index) => {
	const robots = await getRobots(rootUrl);

	// If UA is not allowed for a root url, let's go away and stop bothering them.
	if (!robots.isAllowed(rootUrl)) {
		console.log('Robots.txt disallowed crawling of rootUrl');
		process.exit(1);
		return;
	}

	/**
   * @type {Register}
   */
	const register = new Map();
	// Get first page and process it.
	const firstResult = await crawlPage(rootUrl, robots);
	// Takes care of adding urls to register, and adding the first page to the index.
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

		try {
			const result = await crawlPage(url);
			await processResult(register, index, result);
			await politeWait(robots.politeWait);
		} catch (error) {
			console.log('Error while crawling', url, error);
			register.set(url, true);
		}
	}
};
