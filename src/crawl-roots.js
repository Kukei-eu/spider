import sources from '../index-sources.js';
import {crawlPage} from './helpers/crawlPage.js';
import {processResult} from './helpers/processResult.js';
import {
	markKnownUrls,
	markRootContacted,
	getMongo,
	markCrawledUrl
} from './helpers/mongoRegister.js';
import {getRobots} from './robots.js';
import {wait} from './helpers/wait.js';

const main = async () => {
	const [client, db] = await getMongo();

	for (const index of Object.keys(sources)) {
		for (const url of sources[index]) {
			const robots = await getRobots(url);
			if (!robots.isAllowed(url)) {
				console.log(`Robots.txt disallowed crawling of ${url}`);
				continue;
			}
			console.log(`Crawling root page of ${url} from ${index}`);
			const register = new Map();
			// Crawl root (entry) page for new links
			const result = await crawlPage(url);
			await processResult(register, index, result);
			await markRootContacted(db, {
				url,
				index
			});
			await markCrawledUrl(db, url, url, index);

			const links = [...register.keys()];
			await markKnownUrls(db, url, index, links);

			await wait(100);
		}
	}

	await client.close();
};

main();
