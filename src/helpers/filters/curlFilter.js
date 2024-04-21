export const curlFilter = (url) => {
	if (url.startsWith('https://curl.se/') === false) return false;

	if (url === 'https://curl.se/' || url === 'https://curl.se') return false;
	if (url.includes('/docs')) return false;

	return true;
};
