export const w3Filter = (url) => {
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
