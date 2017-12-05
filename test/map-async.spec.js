import assert, { AssertionError } from 'power-assert';
import mapAsync from '../src/map-async';

describe('mapAsync', () => {
    it('should map to await result', async () => {
        const actual = await mapAsync([1, 2, 3], async (e) => (
            Promise.resolve(e + e)
        ));
        assert.deepEqual(actual, [2, 4, 6]);
    });

    it('should map if iteratee is not async', async () => {
        const actual = await mapAsync([1, 2, 3], (e) => e + e);
        assert.deepEqual(actual, [2, 4, 6]);
    });

    it('should map if collection is object', async () => {
        const actual = await mapAsync({a: 1, b: 2, c: 3}, (v, k) => (
            Promise.resolve(`${k}:${v}`)
        ));
        assert.deepEqual(actual.sort(), ['a:1', 'b:2', 'c:3']);
    });

    it('should throw exception if iteratee rejected', async () => {
        try {
            await mapAsync([1, 2, 3], async (e) => Promise.reject());
            assert.fail();
        } catch (ex) {
            assert(!(ex instanceof AssertionError));
        }
    });
});