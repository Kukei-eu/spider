import {
	getLastContact,
	getMongo,
	markCrawledUrl,
	markKnownUrls, markRootContacted, registerFailedIndexEntry,
	removeUrlFromLinks
} from './helpers/mongoRegister.js';
import {pickNeverCrawled} from './helpers/pickNeverCrawled.js';
import {crawlPage} from './helpers/crawlPage.js';
import {processResult} from './helpers/processResult.js';
import {getRobots} from './helpers/robots.js';
import {wait} from './helpers/wait.js';
import { FailedIndexSave } from './helpers/errors.js';
import {isForbidden} from './helpers/urlHelpers.js';

// 10 minutes max for a process as default
const DEFAULT_PROCESS_TIME_TO_LIVE_MS = 10 * 60 * 1000;
const envTTL = process.env.TIME_TO_LIVE ? parseInt(process.env.TIME_TO_LIVE, 10) : null;
const PROCESS_TIME_TO_LIVE_MS =	envTTL || DEFAULT_PROCESS_TIME_TO_LIVE_MS;

const tryCrawling = async (db) => {
	// Pick something that was never crawled
	const neverCrawled = await pickNeverCrawled(db);

	if (!neverCrawled) {
		console.log('No never crawled links found');
		return false;
	}

	// Check when website was contacted last.
	const lastCrawled = await getLastContact(db, neverCrawled.rootUrl);
	const robots = await getRobots(neverCrawled.rootUrl);

	if (!robots.isAllowed(neverCrawled.url)) {
		console.log(`Robots.txt disallowed crawling of ${neverCrawled.url}`);
		await markCrawledUrl(db, neverCrawled.rootUrl, neverCrawled.url, neverCrawled.index);
		return false;
	}

	if (isForbidden(neverCrawled.url)) {
		console.log(`Forbidden crawling of ${neverCrawled.url}`);
		await markCrawledUrl(db, neverCrawled.rootUrl, neverCrawled.url, neverCrawled.index);
		return false;
	}

	// Calculate how much we need to wait before crawling to avoid flooding website.
	const waitMs = (lastCrawled - Date.now()) + robots.politeWait;
	await wait(waitMs);

	// Crawl
	console.log(`Crawling ${neverCrawled.url} from ${neverCrawled.index}`);
	let results;
	try {
		results = await crawlPage(neverCrawled.url);
	} catch (error) {
		console.log('Page errored', error.toString());
		await removeUrlFromLinks(db, neverCrawled.url);
		await markRootContacted(db, {
			url: neverCrawled.rootUrl,
			index: neverCrawled.index,
		});
		return;
	}
	const register = new Map();
	try {
		await processResult(register, neverCrawled.index, results);
	} catch (error) {
		if (error instanceof FailedIndexSave) {
			await registerFailedIndexEntry(db, neverCrawled.index, neverCrawled.url);
		} else {
			throw error;
		}
	}
	await markCrawledUrl(db, neverCrawled.rootUrl, neverCrawled.url, neverCrawled.index);
	await markRootContacted(db, {
		url: neverCrawled.rootUrl,
		index: neverCrawled.index,
	});

	const links = [...register.keys()];
	await markKnownUrls(db, neverCrawled.rootUrl, neverCrawled.index, links);
};

const main = async () => {
	const started = Date.now();
	const endIn = started + PROCESS_TIME_TO_LIVE_MS;

	const [client, db] = await getMongo();
	while (Date.now() < endIn) {
		await tryCrawling(db);
		// Wait to unlock CPU for other processes.
		await wait(10);
	}

	await client.close();
	console.log('My time has come. Good bye');
};

main();
