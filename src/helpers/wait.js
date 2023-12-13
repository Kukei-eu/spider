export const wait = (ms) => {
	console.log(`Waiting ${ms}ms`);
	return new Promise(resolve => setTimeout(resolve, ms));
};
