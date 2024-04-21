import { w3Filter } from './filters/w3filter.js';
import { githubFilter } from './filters/githubFilter.js';
import { phpFilter } from './filters/phpFilter.js';
import { mongoFilter } from './filters/mongoFilter.js';
import { postgresFilter } from './filters/postgresFilter.js';
import { curlFilter } from './filters/curlFilter.js';

export { hrefSeemsUseful } from './filters/genericFilter.js';

const domainFilters = [
	w3Filter,
	githubFilter,
	phpFilter,
	mongoFilter,
	postgresFilter,
	curlFilter,
];

export const isForbidden = (url) => {
	for (const filter of domainFilters) {
		if (filter(url)) return true;
	}

	if (url.startsWith('https://www.zachleat.com/twitter/')) return true;

	return false;
};
