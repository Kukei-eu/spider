import { describe, it } from 'node:test';
import assert from 'node:assert';
import { makeAllowList } from '../genericFilter.js';

describe('makeAllowList', () => {
	describe('example.com', () => {
		let tester;
		it('should make a function', () => {
			tester = makeAllowList('example.com', [
				'/docs',
				'/blog',
			]);
			assert.strictEqual(typeof tester, 'function');
		});

		it('should abstain when different host', () => {
			const result = tester('https://example.org');
			assert.strictEqual(result, false);
		});

		it('should deny when different pathname', () => {
			const result = tester('https://example.com/about');
			assert.strictEqual(result, true);
		});

		it('should allow when allowed pathname', () => {
			const result = tester('https://example.com/blog');
			assert.strictEqual(result, false);
		});

		it('should allow when pathname is long', () => {
			const result = tester('https://example.com/blog/2021/12/31');
			assert.strictEqual(result, false);
		});

	});
});
