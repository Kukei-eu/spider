import {pickOldestFromSources} from './helpers/pickOldestFromSources.js';
import {MongoClient} from 'mongodb';
import repoSources from '../index-sources.json' assert { type: 'json' };
import {crawlWebsite} from "./helpers/crawlWebsite.js";

const getDb = async () => {
	const client = new MongoClient(process.env.MONGO_URI);
	await client.connect();
	const db = await client.db(process.env.MONGO_DATABASE);
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

	await collection.updateOne(
		{
			url: oldestFromIndex.url,
		},
		{
			$set: {
				...oldestFromIndex,
				lastCrawledAt: Date.now(),
			},
		},
		{
			upsert: true,
		}
	);

	console.log(`
		Crawling ${oldestFromIndex.url} from ${oldestFromIndex.index},
	 	last crawled at ${oldestFromIndex.lastCrawledAt ? (new Date(oldestFromIndex.lastCrawledAt)).toISOString() : 'never'}.
	`);

	/**
	 * Sets lastCrawledAt to now after every contact to crawled website.
	 * This way as long as some crawler is running, we would never crawl the same website twice.
	 * If crawler dies for some reason in the middle of crawling, we would crawl it again after 24 hours.
	 */
	const onCrawlCallback = async () => {
		await collection.updateOne({
			url: oldestFromIndex.url,
			index: oldestFromIndex.index,
		}, {
			$set: {
				lastCrawledAt: Date.now(),
			},
		});
	}
	await crawlWebsite(oldestFromIndex.url, oldestFromIndex.index, onCrawlCallback);

	await collection.insertOne({
		...oldestFromIndex,
		lastCrawledAt: Date.now(),
	});

	await client.close();
};

main();
