import { createHash } from 'crypto';
import {normalizeUrl} from './normalizeUrl.js';
import {meiliClient} from './meili.js';

const getId = (url) => {
	const hash = createHash('sha256');
	hash.update(url);
	return hash.digest('hex');
};

export const processResult = async (register, index, result) => {
	register.set(result.url, true);

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

	await meiliClient.index(index).updateDocuments([indexEntry]);
};
