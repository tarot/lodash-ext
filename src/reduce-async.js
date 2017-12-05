const _ = require('lodash');

async function arrayReduceAsync(array, iteratee, accumulator) {
    let i = 0;
    if (accumulator == null) {
        accumulator = array[0];
        i = 1;
    }
    for (let n = array.length; i < n; ++i) {
        accumulator = await iteratee(accumulator, array[i], i, array);
    }
    return accumulator
}

async function objectReduceAsync(collection, iteratee, accumulator) {
    const keys = Object.keys(collection);
    if (accumulator == null) {
        accumulator = collection[keys.shift()];
    }
    for (const key of keys) {
        accumulator = await iteratee(accumulator, collection[key], key, collection);
    }
    return accumulator
}

async function reduceAsync(collection, iteratee = _.identity, accumulator) {
    if (_.isEmpty(collection)) {
        return accumulator;
    }
    const fn = _.isArray(collection) ? arrayReduceAsync : objectReduceAsync;
    return await fn(collection, iteratee, accumulator);
}

export default reduceAsync;