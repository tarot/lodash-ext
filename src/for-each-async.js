const _ = require('lodash');

async function arrayForEachAsync(array, iteratee) {
    for (let i = 0, n = array.length; i < n; ++i) {
        if (await iteratee(array[i], i, array) === false) {
            return array;
        }
    }
    return array
}

async function objectForEachAsync(collection, iteratee) {
    for (const key of Object.keys(collection)) {
        if (await iteratee(collection[key], key, collection) === false) {
            return collection;
        }
    }
    return collection
}

async function forEachAsync(collection, iteratee = _.identity) {
    if (_.isEmpty(collection)) {
        return collection;
    }
    const fn = _.isArray(collection) ? arrayForEachAsync : objectForEachAsync;
    return await fn(collection, iteratee);
}

export default forEachAsync;