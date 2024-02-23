import sources from '../index-sources.js';
import {crawlPage} from './helpers/crawlPage.js';
import {processResult} from './helpers/processResult.js';
import {
	markKnownUrls,
	markRootContacted,
	getMongo,
	markCrawledUrl, isRootUrlKnown
} from './helpers/mongoRegister.js';
import {getRobots} from './helpers/robots.js';
import {wait} from './helpers/wait.js';

const all = !!process.argv.find(a => a === '--all');

const main = async () => {
	const [client, db] = await getMongo();
	let ignored = 0;
	let added = 0;
	let forbidden = [];
	let errored = [];

	for (const index of Object.keys(sources)) {
		for (const url of sources[index]) {
			if (!all) {
				const isKnown = await isRootUrlKnown(db, index, url);
				if (isKnown) {
					ignored++;
					console.log(`${url} from ${index} already known. Crawler runs without --all flag. Skipping`);
					continue;
				}
			}
			const robots = await getRobots(url);
			if (!robots.isAllowed(url)) {
				console.log(`Robots.txt disallowed crawling of ${url}`);
				forbidden.push(url);
				continue;
			}
			console.log(`Crawling root page of ${url} from ${index}`);
			const register = new Map();
			try {
				// Crawl root (entry) page for new links
				const result = await crawlPage(url);
				await processResult(register, index, result);
				await markRootContacted(db, {
					url,
					index
				});
				await markCrawledUrl(db, url, url, index);

				const links = [...register.keys()];
				await markKnownUrls(db, url, index, links, true);
				added++;
			} catch (error) {
				errored.push(url);
				console.error(`Error while crawling ${url}`, error);
			}

			await wait(100);
		}
	}

	await client.close();

	console.log(`Done, added ${added} urls, ignored ${ignored} urls, forbidden ${forbidden.join(',')} urls, errored ${errored} urls`);
};

main();
