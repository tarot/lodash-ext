import assert from 'power-assert';
import wrapArray from '../src/wrap-array';

describe('wrapArray', () => {
    it('should return empty array if null passed', async () => {
        assert.deepEqual(wrapArray(null), []);
    });

    it('should return empty array if undefined passed', async () => {
        assert.deepEqual(wrapArray(), []);
    });

    it('should not wrap if array passed', async () => {
        assert.deepEqual(wrapArray([1, 2, 3]), [1, 2, 3]);
    });

    it('should not wrap if empty array passed', async () => {
        assert.deepEqual(wrapArray([]), []);
    });

    it('should wrap array if object passed', async () => {
        assert.deepEqual(wrapArray({}), [{}]);
    });

    it('should wrap array if number passed', async () => {
        assert.deepEqual(wrapArray(123), [123]);
    });

    it('should wrap array if string passed', async () => {
        assert.deepEqual(wrapArray('abc'), ['abc']);
    });

    it('should wrap array if array-like passed', async () => {
        const actual = wrapArray({'0': 'a', '1': 'b', length: 2});
        assert.deepEqual(actual, [{'0': 'a', '1': 'b', length: 2}]);
    });
});