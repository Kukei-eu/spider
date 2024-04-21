export const mongoFilter = (url) => {
	if (url.startsWith('https://www.mongodb.com/') === false) return false;

	if (url === 'https://www.mongodb.com/' || url === 'https://www.mongodb.com') return false;
	if (url.startsWith('https://www.mongodb.com/docs')) return false;

	return true;
};
