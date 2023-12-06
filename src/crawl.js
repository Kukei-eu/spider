import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { crawlWebsite } from './helpers/crawlWebsite.js';
import {normalizeUrl} from './helpers/normalizeUrl.js';


const argv = yargs(hideBin(process.argv)).argv;

const main = async () => {
	const url = normalizeUrl(argv.url);
	const index = argv.index;
	const wait = argv.wait ? parseInt(argv.wait, 10) : undefined;
	await crawlWebsite(url, index, wait);
};

main();
