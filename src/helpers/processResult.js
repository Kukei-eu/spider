import { createHash } from 'crypto';
import {normalizeUrl} from './normalizeUrl.js';
import {meiliClient} from './meili.js';
import {MEILI_INDEX_PREFIX} from './constants.js';
import {getRobots} from './robots.js';
import { FailedIndexSave } from './errors.js';

const getId = (url) => {
	const hash = createHash('sha256');
	hash.update(url);
	return hash.digest('hex');
};

/**
 *
 * @param {Register} register
 * @param {string} index
 * @param {CrawlResult} result
 * @returns {Promise<void>}
 */
export const processResult = async (register, index, result) => {
	const robots = await getRobots(result.url);

	// Mark the url as crawled.
	register.set(result.url, true);
	// Parse the host/parent url for later
	const docUrl = new URL(result.url);

	for (const link of result.links) {
		try {
			// Parse the link
			const linkUrl = new URL(link);
			// If it's not from the same origin, we don't crawl it.
			if (linkUrl.origin !== docUrl.origin) continue;
			// Further sanitization
			const normalizedLink = normalizeUrl(link);
			const allowed = robots.isAllowed(normalizedLink);
			if (!allowed) {
				console.log('Robots.txt disallowed crawling of url', normalizedLink);
				continue;
			}
			// If it's already in the register, skip it. #infiniteLoopWarning!
			if (register.has(normalizedLink)) continue;
			// Add it to the register as uncrawled.
			register.set(normalizedLink, false);
		} catch (error) {
			console.log('Could not process link', link);
		}
	}

	// Prepare search engine document
	const indexEntry = {
		id: getId(result.url),
		url: result.url,
		content: result.content,
		excerpt: result.excerpt,
		title: result.title,
		lang: result.lang,
		hostname: docUrl.hostname,
		crawledAt: Date.now(),
	};

	try {
		// Add it to the index
		await meiliClient.index(`${MEILI_INDEX_PREFIX}${index}`).updateDocuments([indexEntry]);
	} catch (error) {
		console.error(`Could not add ${result.url} to index ${index}`, error);
		throw new FailedIndexSave(`Could not add ${result.url} to index ${index}`);
	}
};
