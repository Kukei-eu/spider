export const fixHref = (origin, href) => {
	if (origin.includes('apache')) {
		if (href.startsWith('./')) {
			const parts = href.split('/');
			if (parts[1].length === 2) {
				return `.${href}`;
			}
		}
	}

	return href;
};
