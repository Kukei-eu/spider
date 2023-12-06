import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { crawlWebsite } from './helpers/crawlWebsite.js';
import {normalizeUrl} from './helpers/normalizeUrl.js';


const argv = yargs(hideBin(process.argv)).argv;

const main = async () => {
	const url = normalizeUrl(argv.url);
	const index = argv.index;
	if (!index) {
		throw new Error('NO INDEX PASSED');
	}
	await crawlWebsite(url, index);
};

main();
