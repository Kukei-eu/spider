import {getSourcesLinksCollection} from './mongoRegister.js';


export const pickNeverCrawled = async (db) => {
	const collection = await getSourcesLinksCollection(db);
	const neverCrawledResult = await collection.findOne({
		lastCrawledAt: {
			$exists: false,
		},
	});

	return neverCrawledResult;
};
