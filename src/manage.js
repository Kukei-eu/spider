import {meiliClient} from './helpers/meili.js';


const indexSettings = {
	searchableAttributes: ['url', 'title', 'content', 'excerpt'],
	displayedAttributes: ['title', 'url', 'excerpt', 'content', 'crawledAt', 'lang', 'hostname'],
	filterableAttributes: ['url', 'lang', 'hostname'],
	distinctAttribute: 'url',
	sortableAttributes: ['crawledAt'],
};

const main = async () => {
	await meiliClient.createIndex('blogs');
	await meiliClient.createIndex('docs');
	await meiliClient.createIndex('magazines');
	await meiliClient.index('blogs').updateSettings(indexSettings);
	await meiliClient.index('docs').updateSettings(indexSettings);
	await meiliClient.index('magazines').updateSettings(indexSettings);
};

main();
