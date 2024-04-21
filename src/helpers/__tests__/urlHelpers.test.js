import { describe, it } from 'node:test';
import assert from 'node:assert';

import { hrefSeemsUseful, isForbidden } from '../urlHelpers.js';

describe('hrefSeemsUseful', () => {
	it('should return true for relative links', () => {
		assert.strictEqual(hrefSeemsUseful('/'), true);
		assert.strictEqual(hrefSeemsUseful('/foo'), true);
		assert.strictEqual(hrefSeemsUseful('/foo/bar'), true);
		assert.strictEqual(hrefSeemsUseful('/foo/bar/#'), true);
	});
	it('should return false for anchors', () => {
		assert.strictEqual(hrefSeemsUseful('#'), false);
		assert.strictEqual(hrefSeemsUseful('#foo'), false);
		assert.strictEqual(hrefSeemsUseful('#foo/bar'), false);
	});
	it('should return false for mailto', () => {
		assert.strictEqual(hrefSeemsUseful('mailto:'), false);
		assert.strictEqual(hrefSeemsUseful('mailto:foo'), false);
		assert.strictEqual(hrefSeemsUseful('mailto:foo/bar'), false);
	});
	it('should return false for tel', () => {
		assert.strictEqual(hrefSeemsUseful('tel:'), false);
		assert.strictEqual(hrefSeemsUseful('tel:foo'), false);
		assert.strictEqual(hrefSeemsUseful('tel:foo/bar'), false);
	});
	it('should return false for javascript', () => {
		assert.strictEqual(hrefSeemsUseful('javascript:'), false);
		assert.strictEqual(hrefSeemsUseful('javascript:foo'), false);
		assert.strictEqual(hrefSeemsUseful('javascript:foo/bar'), false);
	});
	it('should return true for absolute links', () => {
		assert.strictEqual(hrefSeemsUseful('https://example.com'), true);
		assert.strictEqual(hrefSeemsUseful('https://example.com/foo'), true);
		assert.strictEqual(hrefSeemsUseful('https://example.com/foo/bar'), true);
		assert.strictEqual(hrefSeemsUseful('https://example.com/foo/bar/#'), true);
	});
	it('should return true for protocol relative links', () => {
		assert.strictEqual(hrefSeemsUseful('//example.com'), true);
		assert.strictEqual(hrefSeemsUseful('//example.com/foo'), true);
		assert.strictEqual(hrefSeemsUseful('//example.com/foo/bar'), true);
		assert.strictEqual(hrefSeemsUseful('//example.com/foo/bar/#'), true);
	});
	it('should return false for data links', () => {
		assert.strictEqual(hrefSeemsUseful('data:'), false);
		assert.strictEqual(hrefSeemsUseful('data:foo'), false);
		assert.strictEqual(hrefSeemsUseful('data:foo/bar'), false);
	});
});

describe('isForbidden', () => {
	describe('curl.se', () => {
		it('should allow home page', () => {
			assert.strictEqual(isForbidden('https://curl.se/'), false);
			assert.strictEqual(isForbidden('https://curl.se'), false);
		});
		it('should allow docs', () => {
			assert.strictEqual(isForbidden('https://curl.se/docs'), false);
			assert.strictEqual(isForbidden('https://curl.se/docs/'), false);
			assert.strictEqual(isForbidden('https://curl.se/docs/foo'), false);
		});

		it('should deny else', () => {
			assert.strictEqual(isForbidden('https://curl.se/foo'), true);
			assert.strictEqual(isForbidden('https://curl.se/foo/bar'), true);
		});
	});

	describe('jenkins.io', () => {
		it('should allow /doc', () => {
			assert.strictEqual(isForbidden('https://www.jenkins.io/doc'), false);
			assert.strictEqual(isForbidden('https://www.jenkins.io/doc/'), false);
			assert.strictEqual(isForbidden('https://www.jenkins.io/doc/foo'), false);
		});
		it('should allow /security', () => {
			assert.strictEqual(isForbidden('https://www.jenkins.io/security'), false);
			assert.strictEqual(isForbidden('https://www.jenkins.io/security/'), false);
			assert.strictEqual(isForbidden('https://www.jenkins.io/security/foo'), false);
		});
		it('should deny /projects', () => {
			assert.strictEqual(isForbidden('https://www.jenkins.io/projects'), true);
			assert.strictEqual(isForbidden('https://www.jenkins.io/projects/'), true);
			assert.strictEqual(isForbidden('https://www.jenkins.io/projects/foo'), true);
		});
	});
});
