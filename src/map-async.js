const _ = require('lodash');

async function arrayMapAsync(array, iteratee) {
    const result = [];
    for (let i = 0, n = array.length; i < n; ++i) {
        result.push(await iteratee(array[i], i, array));
    }
    return result
}

async function objectMapAsync(collection, iteratee) {
    const result = [];
    for (const key of Object.keys(collection)) {
        result.push(await iteratee(collection[key], key, collection));
    }
    return result
}

async function mapAsync(collection, iteratee = _.identity) {
    if (_.isEmpty(collection)) {
        return _.clone(collection);
    }
    const fn = _.isArray(collection) ? arrayMapAsync : objectMapAsync;
    return await fn(collection, iteratee);
}

export default mapAsync;