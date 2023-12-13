import {meiliClient} from './helpers/meili.js';
import {MEILI_INDEX_PREFIX} from './helpers/constants.js';


const indexSettings = {
	searchableAttributes: ['url', 'title', 'content', 'excerpt'],
	displayedAttributes: ['title', 'url', 'excerpt', 'content', 'crawledAt', 'lang', 'hostname'],
	filterableAttributes: ['url', 'lang', 'hostname'],
	distinctAttribute: 'url',
	sortableAttributes: ['crawledAt'],
};

const main = async () => {
	await meiliClient.createIndex(`${MEILI_INDEX_PREFIX}blogs`);
	await meiliClient.createIndex(`${MEILI_INDEX_PREFIX}docs`);
	await meiliClient.createIndex(`${MEILI_INDEX_PREFIX}magazines`);
	await meiliClient.index(`${MEILI_INDEX_PREFIX}blogs`).updateSettings(indexSettings);
	await meiliClient.index(`${MEILI_INDEX_PREFIX}docs`).updateSettings(indexSettings);
	await meiliClient.index(`${MEILI_INDEX_PREFIX}magazines`).updateSettings(indexSettings);
};

main();
