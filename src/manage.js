import {meiliClient} from './helpers/meili.js';
import {MEILI_INDEX_PREFIX} from './helpers/constants.js';
import {getMongo} from './helpers/mongoRegister.js';
import {wait} from './helpers/wait.js';


const indexSettings = {
	searchableAttributes: ['url', 'title', 'content', 'excerpt'],
	displayedAttributes: ['title', 'url', 'excerpt', 'content', 'crawledAt', 'lang', 'hostname'],
	filterableAttributes: ['url', 'lang', 'hostname'],
	distinctAttribute: 'url',
	sortableAttributes: ['crawledAt'],
};

const setupIndex = async () => {
	await meiliClient.createIndex(`${MEILI_INDEX_PREFIX}blogs`);
	await meiliClient.createIndex(`${MEILI_INDEX_PREFIX}docs`);
	await meiliClient.createIndex(`${MEILI_INDEX_PREFIX}magazines`);
	await meiliClient.index(`${MEILI_INDEX_PREFIX}blogs`).updateSettings(indexSettings);
	await meiliClient.index(`${MEILI_INDEX_PREFIX}docs`).updateSettings(indexSettings);
	await meiliClient.index(`${MEILI_INDEX_PREFIX}magazines`).updateSettings(indexSettings);
};

const main = async () => {
	await setupIndex();
};

main();
