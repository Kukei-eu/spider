import { describe, it } from 'node:test';
import assert from 'node:assert';

import { normalizeUrl } from '../normalizeUrl.js';

describe('normalizeUrl', () => {
	it('should remove trailing slash', () => {
		assert.strictEqual(normalizeUrl('https://example.com/'), 'https://example.com');
		assert.strictEqual(normalizeUrl('https://example.com/foo/'), 'https://example.com/foo');
		assert.strictEqual(normalizeUrl('https://example.com/foo/bar/'), 'https://example.com/foo/bar');
	});

	it('should remove multiple trailing slashes', () => {
		assert.strictEqual(normalizeUrl('https://example.com//'), 'https://example.com');
		assert.strictEqual(normalizeUrl('https://example.com/foo//'), 'https://example.com/foo');
		assert.strictEqual(normalizeUrl('https://example.com/foo/bar//'), 'https://example.com/foo/bar');
	})
});
