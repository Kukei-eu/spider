import {pickOldestFromSources} from './helpers/pickOldestFromSources.js';
import {MongoClient} from 'mongodb';
import repoSources from '../index-sources.json' assert { type: 'json' };
import {crawlWebsite} from "./helpers/crawlWebsite.js";

const getDb = async () => {
	const client = new MongoClient(process.env.MONGO_URI);
	await client.connect();
	const db = await client.db(process.env.MONGO_DB);
	const collection = await db.collection(process.env.MONGO_COLLECTION);

	return [client, collection];

}

const MINIMUM_DELAY_BEFORE_CRAWLING_MS = 86400000; // 24 hours

const main = async () => {
	const [client, collection] = await getDb();
	const oldestFromIndex = await pickOldestFromSources(collection, repoSources);

	if (
		oldestFromIndex.lastCrawledAt
		&& Date.now() - oldestFromIndex.lastCrawledAt < MINIMUM_DELAY_BEFORE_CRAWLING_MS
	) {
		console.log('Nothing to crawl. All too fresh.');

		return;
	}

	console.log(`
		Crawling ${oldestFromIndex.url} from ${oldestFromIndex.index},
	 	last crawled at ${oldestFromIndex.lastCrawledAt ? (new Date(oldestFromIndex.lastCrawledAt)).toISOString() : 'never'}.
	`);

	await crawlWebsite(oldestFromIndex.url, oldestFromIndex.index);

	await collection.insertOne({
		...oldestFromIndex,
		lastCrawledAt: Date.now(),
	});

	await client.close();
};

main();
