import {JSDOM} from 'jsdom';
import {Readability} from '@mozilla/readability';
import {KUKEI_BOT_UA} from './constants.js';
import {normalizeLang} from './normalizeLang.js';
/**
 * @typedef {Object} CrawlResult
 * @property {string} url
 * @property {string[]} links
 * @property {string} content
 * @property {string} excerpt
 * @property {string} title
 * @property {string} lang
 * @property {string} hostname
 * @property {number} crawledAt
 */

/**
 * Crawls a page and returns the result.
 * @param {string} url
 * @returns {Promise<CrawlResult>}
 */
export const crawlPage = async (url) => {
	// Initial fetch
	const fetched = await fetch(url, {
		headers: {
			'User-Agent': KUKEI_BOT_UA,
		},
	});

	// If it's not html, we don't index it.
	if (!fetched.headers.get('content-type')?.includes('text/html')) {
		throw new Error('Invalid type');
	}

	// Let's get the content
	const content = await fetched.text();
	// Parse it almost like a browser would.
	const doc = new JSDOM(content, { url });
	// Get all the links from the page.
	const linksElements = doc.window.document.querySelectorAll('a');
	// Process links
	const links = [...linksElements].reduce((acc, curr) => {
		try {
			// Parse the href to URL
			const url = new URL(curr.href);
			// Normalize it.
			acc.push(`${url.origin}${url.pathname}`);
		} catch (error) {
			console.log('Could not parse link', curr.href, error);
		} finally {
			return acc;
		}
	}, []);

	// Normalize the content
	const reader = new Readability(doc.window.document);
	const article = reader.parse();
	// Get the lang
	const lang = normalizeLang(doc.window.document.querySelector('html').lang);

	return {
		url,
		links,
		content: article?.textContent ?? '',
		excerpt: article?.excerpt ?? '',
		title: doc.window.document.title,
		lang,
		crawledAt: Date.now(),
	};
};