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

export const isForbidden = (url) => {
	if (w3Filter(url)) {
		return true;
	}
	if (url.startsWith('https://www.postgresql.org/message-id/')) return true;
	if (url.startsWith('https://www.zachleat.com/twitter/')) return true;
	if (url.startsWith('https://www.mongodb.com/blog/channel')) return true;

	return false;
};
