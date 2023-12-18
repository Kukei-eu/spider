import {JSDOM} from 'jsdom';
import {Readability} from '@mozilla/readability';
import {KUKEI_BOT_UA} from './constants.js';
import {normalizeLang} from './normalizeLang.js';
import { hrefSeemsUseful } from './urlHelpers.js';

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
	const response = await fetch(url, {
		headers: {
			'User-Agent': KUKEI_BOT_UA,
		},
		signal: AbortSignal.timeout(10000), // 10 seconds timeout
	});


	// If it's not html, we don't index it.
	if (!response.headers.get('content-type')?.includes('text/html')) {
		console.log('invalid');

		throw new Error('Invalid type');
	}

	if (!response.ok) {
		console.log(`${url} returned non 200 code, skipping`);
		throw new Error('Non 200 code');
	}

	// Let's get the content
	const content = await response.text();
	// Parse it almost like a browser would.
	const doc = new JSDOM(content, { url });
	// Get all the links from the page.
	const linksElements = doc.window.document.querySelectorAll('a');
	// Process links
	const links = [...linksElements].reduce((acc, curr) => {
		try {
			const href = curr.href.trim();

			const seemsUseful = hrefSeemsUseful(href);
			if (seemsUseful === false) {
				console.log(`Href ${href} seems useless, skipping`);
				return acc;
			}

			// Parse the href to URL
			const parsedUrl = new URL(curr.href, url);
			// Normalize it.
			acc.push(`${parsedUrl.origin}${parsedUrl.pathname}`);
		} catch (error) {
			console.log('Could not parse link', curr, error);
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
		resolvedUrl: response.redirected ? response.url: url,
		links,
		content: article?.textContent ?? '',
		excerpt: article?.excerpt ?? '',
		title: doc.window.document.title,
		lang,
		crawledAt: Date.now(),
	};
};
