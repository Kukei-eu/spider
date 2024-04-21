import { w3Filter } from './filters/w3filter.js';
import { githubFilter } from './filters/githubFilter.js';
import { phpFilter } from './filters/phpFilter.js';
import { makeAllowList } from './filters/genericFilter.js';
export { hrefSeemsUseful } from './filters/genericFilter.js';

const curlFilter = makeAllowList('curl.se', [
	'/docs',
]);

const mongoFilter = makeAllowList('www.mongodb.com', [
	'/docs',
]);

const postgresFilter = makeAllowList('www.postgresql.org', [
	'/docs',
]);

const jenkinsFilter = makeAllowList('www.jenkins.io', [
	'/doc',
	'/security'
]);

const domainFilters = [
	w3Filter,
	githubFilter,
	phpFilter,
	mongoFilter,
	postgresFilter,
	curlFilter,
	jenkinsFilter,
];

export const isForbidden = (url) => {
	for (const filter of domainFilters) {
		if (filter(url)) return true;
	}

	if (url.startsWith('https://www.zachleat.com/twitter/')) return true;

	return false;
};
