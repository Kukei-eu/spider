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
	return true;
};
