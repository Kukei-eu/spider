import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { createHash } from 'node:crypto';
import { normalizeUrl } from './normalizeUrl.js';
import { meiliClient } from './meili.js';

/**
 * Creates sha256 hash from url
 * @param {string} url
 * @returns {string}
 */
const getId = (url) => {
	const hash = createHash('sha256');
	hash.update(url);
	return hash.digest('hex');
};

const crawlPage = async (url) => {
	const fetched = await fetch(url, {
		headers: {
			'User-Agent': 'Mozilla/5.0 (compatible; Kukei.eu/Bot/0.1; +https://kukei.eu)',
		},
	});

	const content = await fetched.text();
	const doc = new JSDOM(content, { url });
	const linksElements = doc.window.document.querySelectorAll('a');
	const links = [...linksElements].reduce((acc, curr) => {
		try {
			const url = new URL(curr.href);

			acc.push(`${url.origin}${url.pathname}`);
		} catch (error) {

		} finally {
			return acc;
		}
	}, []);

	const reader = new Readability(doc.window.document);
	const article = reader.parse();

	return {
		url,
		links,
		content: article?.textContent ?? '',
		excerpt: article?.excerpt ?? '',
		title: doc.window.document.title,
	};
};

const processResult = async (register, index, result) => {
	register.set(result.url, true);

	const indexEntry = {
		id: getId(result.url),
		url: result.url,
		content: result.content,
		excerpt: result.excerpt,
		title: result.title,
	};

	const docUrl = new URL(result.url);

	for (const link of result.links) {
		try {
			const linkUrl = new URL(link);
			if (linkUrl.origin !== docUrl.origin) continue;

			const normalizedLink = normalizeUrl(link);
			if (register.has(normalizedLink)) continue;
			register.set(normalizedLink, false);
		} catch (error) {
			console.log('Could not process link', link, error);
		}
	}

	await meiliClient.index(index).updateDocuments([indexEntry]);
};

const getUnprocessedUrl = (register) => {
	for (const [url, isCrawled] of register) {
		if (!isCrawled) return url;
	}
	return null;
};

const politeWait = (waitTime = 100) => new Promise((resolve) => setTimeout(resolve, waitTime));

export const crawlWebsite = async (rootUrl, index, waitTime) => {
	/**
   * Url -> isCrawled
   * @type {Map<string, boolean>}
   */
	const register = new Map();


	const firstResult = await crawlPage(rootUrl);
	await processResult(register, index, firstResult);

	let iteration = 0;
	while (getUnprocessedUrl(register)) {
		iteration++;
		const url = getUnprocessedUrl(register);
		console.log(`Crawling ${url}, step ${iteration}/${register.size}`);

		const result = await crawlPage(url);
		await processResult(register, index, result);
		await politeWait(waitTime);
	}

};
