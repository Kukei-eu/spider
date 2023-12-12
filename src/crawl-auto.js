import {pickOldestFromSources} from './helpers/pickOldestFromSources.js';
import repoSources from '../index-sources.json' assert { type: 'json' };
import {crawlWebsite} from "./helpers/crawlWebsite.js";
import {getDb} from "./helpers/getMongo.js";


const MINIMUM_DELAY_BEFORE_CRAWLING_MS = 86400000 * 2; // 24 hours * 2

const tryCrawling = async (collection) => {
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
		}, {
			$set: {
				lastCrawledAt: Date.now(),
			},
		});
	}
	await crawlWebsite(oldestFromIndex.url, oldestFromIndex.index, onCrawlCallback);
};

const main = async () => {
	const [client, collection] = await getDb();
	await tryCrawling(collection)

	await client.close();
};

main();
