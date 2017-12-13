import assert, {AssertionError} from 'power-assert';
import reduceAsync from '../src/reduce-async';

describe('reduceAsync', () => {
    it('should reduce to await result', async () => {
        const actual = await reduceAsync([1, 2, 3], async (a, e) => (
            Promise.resolve(a + e)
        ));
        assert.deepEqual(actual, 6);
    });

    it('should reduce if iteratee is not async', async () => {
        const actual = await reduceAsync([1, 2, 3], (a, e) => a + e);
        assert.deepEqual(actual, 6);
    });

    it('should reduce if collection is object', async () => {
        const actual = await reduceAsync({a: 1, b: 2, c: 3}, (a, v, k) => (
            Promise.resolve(a.concat([`${k}:${v}`]))
        ), []);
        assert.deepEqual(actual.sort(), ['a:1', 'b:2', 'c:3']);
    });

    it('should throw exception if iteratee rejected', async () => {
        try {
            await reduceAsync([1, 2, 3], async (a, e) => Promise.reject());
            assert.fail();
        } catch (ex) {
            assert(!(ex instanceof AssertionError));
        }
    });
});