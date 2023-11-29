import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { crawlWebsite } from './helpers/crawlWebsite.js';


const argv = yargs(hideBin(process.argv)).argv;

const main = async () => {
  const url = argv.url;
  const indexEntries = await crawlWebsite(url);

  // const xata = getXataClient();
  // await xata.db.index.createOrReplace(indexEntry);
}

main();