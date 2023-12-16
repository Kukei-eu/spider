import {MongoClient} from 'mongodb';
export const getMongo = async () => {
	const client = new MongoClient(process.env.MONGO_URI);
	await client.connect();
	const db = await client.db(process.env.MONGO_DATABASE);

	return [client, db];

};

export const getSourcesCollection = (db)  => {
	return db.collection(process.env.MONGO_COLLECTION);
};

export const getSourcesLinksCollection = (db)  => {
	return db.collection(`${process.env.MONGO_COLLECTION}-links`);
};

export const getFailedLinksCollection = db => {
	return db.collection(`${process.env.MONGO_COLLECTION}-failed`);
};


export const markRootContacted = async (db, data) => {
	const sources = await getSourcesCollection(db);

	await sources.updateOne(
		{
			url: data.url,
		},
		{
			$set: {
				...data,
				lastCrawledAt: Date.now(),
			},
		},
		{
			upsert: true,
		}
	);
};

export const markKnownUrls = async (db, rootUrl, index, urls) => {
	const linksCollection = await getSourcesLinksCollection(db);
	for (const url of urls) {
		await linksCollection.updateOne({
			url,
		}, {
			$set: {
				url,
				index,
				rootUrl,
			}
		}, {
			upsert: true,
		});
	}
};

export const markCrawledUrl = async (db, rootUrl, url, index) => {
	const linksCollections = await getSourcesLinksCollection(db);
	await linksCollections.updateOne({
		url,
		index,
		rootUrl,
	}, {
		$set: {
			lastCrawledAt: Date.now(),
		}
	}, {
		upsert: true,
	});
};

export const removeUrlFromLinks = async (db, url) => {
	const linksCollection = await getSourcesLinksCollection(db);
	await linksCollection.deleteOne({
		url,
	});
};
export const getLastContact = async (db, rootUrl) => {
	const linksCollection = await getSourcesCollection(db);
	const results = await linksCollection
		.findOne({
			url: rootUrl,
		});

	const result = results?.lastCrawledAt ?? null;

	return result;
};

export const registerFailedIndexEntry = async (db, index, url) => {
	const collection = await getFailedLinksCollection(db);
	await collection.insertOne({
		index,
		url,
		crawledAt: Date.now(),
	});
};

export const isRootUrlKnown = async (db, index, url) => {
	const linksCollection = await getSourcesCollection(db);
	const result = await linksCollection.findOne({
		index,
		url,
	});

	return !!result;
};
