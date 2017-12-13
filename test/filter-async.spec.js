import assert, {AssertionError} from 'power-assert';
import filterAsync from '../src/filter-async';

describe('filterAsync', () => {
    it('should filter with await result', async () => {
        const actual = await filterAsync([1, 2, 3, 4], async (e) => (
            Promise.resolve(e % 2 === 0)
        ));
        assert.deepEqual(actual, [2, 4]);
    });

    it('should filter if iteratee is not async', async () => {
        const actual = await filterAsync([1, 2, 3, 4], (e) => e % 2 === 0);
        assert.deepEqual(actual, [2, 4]);
    });

    it('should filter if collection is object', async () => {
        const actual = await filterAsync({a: 1, b: 2, c: 3, d: 4}, (v, k) => (
            Promise.resolve(v === 2 || k === 'c')
        ));
        assert.deepEqual(actual.sort(), [2, 3]);
    });

    it('should throw exception if iteratee rejected', async () => {
        try {
            await filterAsync([1, 2, 3, 4], async (e) => Promise.reject());
            assert.fail();
        } catch (ex) {
            assert(!(ex instanceof AssertionError));
        }
    });
});