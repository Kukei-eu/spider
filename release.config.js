export default {
	branches: [
		'main'
	],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		['@semantic-release/npm', {
			publish: false,
		}],
		['@semantic-release/git', {
			'assets': ['CHANGELOG.md','package.json'],
		}]
	]
};
