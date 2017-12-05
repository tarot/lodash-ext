import assert from 'power-assert';
import _ from '../src/index';

describe('lodash mixin', () => {
    it('should mixin filterAsync', async () => {
        const actual = await _.filterAsync([1, 2, 3, 4], async (e) => (
            Promise.resolve(e % 2 === 0)
        ));
        assert.deepEqual(actual, [2, 4]);
    });

    it('should mixin forEachAsync', async () => {
        const actual = [];
        await _.forEachAsync([1, 2, 3], async (e) => (
            Promise.resolve().then(() => actual.push(e))
        ));
        assert.deepEqual(actual, [1, 2, 3]);
    });

    it('should mixin mapAsync', async () => {
        const actual = await _.mapAsync([1, 2, 3], async (e) => (
            Promise.resolve(e + e)
        ));
        assert.deepEqual(actual, [2, 4, 6]);
    });

    it('should mixin reduceAsync', async () => {
        const actual = await _.reduceAsync([1, 2, 3], async (a, e) => (
            Promise.resolve(a + e)
        ));
        assert.deepEqual(actual, 6);
    });

    it('should mixin wrapArray', async () => {
        assert.deepEqual(_.wrapArray(), []);
        assert.deepEqual(_.wrapArray('abc'), ['abc']);
        assert.deepEqual(_.wrapArray([1, 2, 3]), [1, 2, 3]);
        assert.deepEqual(_.wrapArray([]), []);
    });
});