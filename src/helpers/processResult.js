import {normalizeUrl} from './normalizeUrl.js';
import {meiliClient} from './meili.js';

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
		url: result.url,
		content: result.content,
		excerpt: result.excerpt,
		title: result.title,
		lang: result.lang,
		crawledAt: (new Date()).toISOString(),
	};

	await meiliClient.index(index).updateDocuments([indexEntry]);
};
