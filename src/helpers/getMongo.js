import {MongoClient} from 'mongodb';


export const getDb = async () => {
	const client = new MongoClient(process.env.MONGO_URI);
	await client.connect();
	const db = await client.db(process.env.MONGO_DATABASE);
	const collection = await db.collection(process.env.MONGO_COLLECTION);

	return [client, collection];

};
