import {getSourcesLinksCollection} from './mongoRegister.js';


export const pickNeverCrawled = async (db) => {
	const collection = await getSourcesLinksCollection(db);
	const neverCrawledResult = await collection.aggregate([
		{
			$match: {
				lastCrawledAt: {
					$exists: false,
				},
			},
		},
		{
			$sample: {
				size: 1,
			}
		},
	]).toArray();

	const final = neverCrawledResult?.[0] ?? null;

	return final;
};
