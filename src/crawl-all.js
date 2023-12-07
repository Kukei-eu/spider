import sources from '../index-sources.json' assert { type: 'json' };
import {crawlWebsite} from "./helpers/crawlWebsite.js";

const main = async () => {
	for (const index in sources) {
		for (const url of sources[index]) {
			console.log(`Crawling ${url} for index ${index}`);
			await crawlWebsite(url, index);
		}
	}
}

main();
