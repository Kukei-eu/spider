import { describe, it } from 'node:test';
import assert from 'node:assert';
import {fixHref} from '../fixHref.js';

describe('fixHref', () => {
	it('should return the same href if origin is not apache', () => {
		const origin = 'https://example.com';
		const href = './some/path';
		const result = fixHref(origin, href);

		assert.strictEqual(result, href);
	});

	it('should return href with double dots to fix apache language switcher links', () => {
		const origin = 'https://httpd.apache.org';
		const href = './jp/sections.html';
		const result = fixHref(origin, href);
		assert.strictEqual(result, '../jp/sections.html');
	});
});
