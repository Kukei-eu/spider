export const phpFilter = (url) => {
	if (url.startsWith('https://www.php.net') === false) return false;

	if (url === 'https://www.php.net/') return false;
	if (url === 'https://www.php.net') return false;
	if (url.endsWith('docs.php')) return false;
	if (url.includes('manual/en')) return false;

	return true;
};
