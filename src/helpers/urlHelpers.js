const commonExtensions = [
	'.webp',
	'.png',
	'.jpg',
	'.jpeg',
	'.gif',
	'.svg',
	'.pdf',
	'.zip',
	'.rar',
	'.mp4',
	'.mp3',
	'.wav',
	'.ogg',
	'.webm',
	'.flv',
	'.avi',
	'.mov',
	'.wmv',
];

/**
 * Takes a raw href and decides whether it looks useful in crawling context.
 * @param {string} href
 * @returns {boolean}
 */
export const hrefSeemsUseful = (href) => {
	if (href.startsWith('/')) return true;
	if (href.startsWith('#')) return false;
	if (href.startsWith('mailto:')) return false;
	if (href.startsWith('tel:')) return false;
	if (href.startsWith('javascript:')) return false;
	if (href.startsWith('data:')) return false;
	if (href.startsWith('chrome-extension:')) return false;
	if (href.startsWith('vbscript:')) return false;
	const hasExtension = commonExtensions.some((ext) => href.endsWith(ext));

	if (hasExtension) return false;

	return true;
};

const w3Filter = (url) => {
	// Not W3, not relevant, not forbidden.
	if (url.startsWith('https://www.w3.org/') === false) return false;

	// Now we flip the login, brace your brain: return false when it's NOT forbidden
	// Return true when it IS forbidden.

	if (url.startsWith('https://www.w3.org/TR')) return false;
	if (url.startsWith('https://www.w3.org/developers')) return false;
	if (url.startsWith('https://www.w3.org/WAI')) return false;
	if (url.startsWith('https://www.w3.org/International')) return false;

	return true;
};

const githubFilter = (url) => {
	if (url.startsWith('https://docs.github.com/') === false) return false;

	if (url.includes('enterprise-server@')) return true;

	return false;
};

const phpFilter = (url) => {
	if (url.startsWith('https://www.php.net') === false) return false;

	if (url === 'https://www.php.net/') return false;
	if (url === 'https://www.php.net') return false;
	if (url.endsWith('docs.php')) return false;
	if (url.includes('manual/en')) return false;

	return true;
};

const mongoFilter = (url) => {
	if (url.startsWith('https://www.mongodb.com/') === false) return false;

	if (url === 'https://www.mongodb.com/' || url === 'https://www.mongodb.com') return false;
	if (url.startsWith('https://www.mongodb.com/docs')) return false;

	return true;
};

const postgresFilter = (url) => {
	if (url.startsWith('https://www.postgresql.org') === false) return false;

	if (url === 'https://www.postgresql.org/' || url === 'https://www.postgresql.org') return false;
	if (url.includes('docs')) return false;

	return true;
};

const curlFilter = (url) => {
	if (url.startsWith('https://curl.se/') === false) return false;

	if (url === 'https://curl.se/' || url === 'https://curl.se') return false;
	if (url.includes('/docs')) return false;

	return true;
};

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
