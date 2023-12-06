import {JSDOM} from 'jsdom';
import {Readability} from '@mozilla/readability';
import {KUKEI_BOT_UA} from './constants.js';
import {normalizeLang} from "./normalizeLang.js";

export const crawlPage = async (url) => {
	const fetched = await fetch(url, {
		headers: {
			'User-Agent': KUKEI_BOT_UA,
		},
	});

	if (!fetched.headers.get('content-type')?.includes('text/html')) {
		throw new Error('Invalid type');
	}

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
	const lang = normalizeLang(doc.window.document.querySelector('html').lang);

	return {
		url,
		links,
		content: article?.textContent ?? '',
		excerpt: article?.excerpt ?? '',
		title: doc.window.document.title,
		lang,
	};
};
