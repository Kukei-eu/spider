const getDBSources = async (collection) => {
	const result = await collection.find({}).toArray();
	const sources = result.reduce((acc, curr) => {
		acc.set(curr.url, curr);

		return acc;
	}, new Map());

	return sources;
}

export const pickOldestFromSources = async (collection, repoSources) => {
	const mongoSources = await getDBSources(collection);

	let oldestFromIndex = null;
	for (const index of Object.keys(repoSources)) {
		for (const url of repoSources[index]) {
			const mongoSource = mongoSources.get(url);
			// Never crawled, let's crawl it.
			if (!mongoSource) {
				oldestFromIndex = {
					url,
					index,
					lastCrawledAt: 0,
				}

				break;
			}

			// Nothing in the flag.
			if (!oldestFromIndex) {
				oldestFromIndex = mongoSource;
				continue;
			}

			if (mongoSource.lastCrawledAt < oldestFromIndex.lastCrawledAt) {
				oldestFromIndex = source;
			}
		}
	}

	return oldestFromIndex;
}
