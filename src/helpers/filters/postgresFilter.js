export const postgresFilter = (url) => {
	if (url.startsWith('https://www.postgresql.org') === false) return false;

	if (url === 'https://www.postgresql.org/' || url === 'https://www.postgresql.org') return false;
	if (url.includes('docs')) return false;

	return true;
};
