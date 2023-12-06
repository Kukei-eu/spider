import { MeiliSearch } from 'meilisearch';

export const meiliClient = new MeiliSearch({
	host: process.env.MEILI_HOST,
	apiKey: process.env.MEILI_MASTER_KEY,
});



