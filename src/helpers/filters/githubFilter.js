export const githubFilter = (url) => {
	if (url.startsWith('https://docs.github.com/') === false) return false;

	if (url.includes('enterprise-server@')) return true;

	return false;
};
