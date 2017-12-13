import assert, {AssertionError} from 'power-assert';
import forEachAsync from '../src/for-each-async';

describe('forEachAsync', () => {
    it('should await each iteratee', async () => {
        const actual = [];
        await forEachAsync([1, 2, 3], async (e) => (
            Promise.resolve().then(() => actual.push(e))
        ));
        assert.deepEqual(actual, [1, 2, 3]);
    });

    it('should call iteratee even if not async', async () => {
        const actual = [];
        await forEachAsync([1, 2, 3], (e) => actual.push(e));
        assert.deepEqual(actual, [1, 2, 3]);
    });

    it('should iterate if collection is object', async () => {
        const actual = [];
        await forEachAsync({a: 1, b: 2, c: 3}, (v, k) => (
            Promise.resolve().then(() => actual.push(`${k}:${v}`))
        ));
        assert.deepEqual(actual.sort(), ['a:1', 'b:2', 'c:3']);
    });

    it('should throw exception if iteratee rejected', async () => {
        try {
            await forEachAsync([1, 2, 3], async (e) => Promise.reject());
            assert.fail();
        } catch (ex) {
            assert(!(ex instanceof AssertionError));
        }
    });
});