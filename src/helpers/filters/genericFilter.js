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

export const makeAllowList = (hostname, allowedPathsInclude)	=> (url) => {
	// Not from the same hostname
	if (url.startsWith(`https://${hostname}`) === false) return false;

	// Allow home page
	if (url === `https://${hostname}/` || url === `https://${hostname}`) return false;

	for (const path of allowedPathsInclude) {
		if (url.includes(path)) return false;
	}

	// Deny
	return true;
};
