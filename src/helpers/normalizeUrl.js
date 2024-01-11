export const normalizeUrl = (url) => {
	// Replace all trailing slashes with nothing
	return url.replace(/\/+$/, '');
};
