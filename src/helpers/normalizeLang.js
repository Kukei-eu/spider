export const normalizeLang = (lang) => {
	if (!lang) {
		return null;
	}

	if (lang.includes('-')) {
		return lang.split('-')[0];
	}

	return lang;
};
