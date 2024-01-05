import {getMongo, getSourcesLinksCollection, getStatsCollection} from './helpers/mongoRegister.js';
import { meiliClient } from './helpers/meili.js';

const { MEILI_INDEX_PREFIX } = process.env;

const main = async () => {
	const [client, db] = await getMongo();
	const sourcesLinks = await getSourcesLinksCollection(db);
	const [countResult] = await sourcesLinks.aggregate(
		[
			{
				$match: {
					lastCrawledAt: { $exists: false }
				}
			},
			{ $count: 'unCrawled' }
		],
		{ maxTimeMS: 60000, allowDiskUse: true }
	).toArray();
	const unCrawledCount = countResult?.unCrawled ?? 0;

	const [crawledResult] = await sourcesLinks.aggregate(
		[
			{
				$match: {
					lastCrawledAt: { $exists: true }
				}
			},
			{ $count: 'crawled' }
		],
		{ maxTimeMS: 60000, allowDiskUse: true }
	).toArray();

	const crawledCount = crawledResult.crawled;
	const { numberOfDocuments: blogIndex} = await meiliClient.index(`${MEILI_INDEX_PREFIX}blogs`).getStats();
	const { numberOfDocuments: docsIndex} = await meiliClient.index(`${MEILI_INDEX_PREFIX}docs`).getStats();
	const { numberOfDocuments: magazinesIndex} = await meiliClient.index(`${MEILI_INDEX_PREFIX}magazines`).getStats();
	const totalIndex = blogIndex + docsIndex + magazinesIndex;

	const stats = {
		crawledCount,
		unCrawledCount,
		totalIndex,
		blogIndex,
		docsIndex,
		magazinesIndex,
		created: Date.now(),
	};


	const statsCollection = await getStatsCollection(db);
	await statsCollection.insertOne(stats);
	await client.close();
};

main();
