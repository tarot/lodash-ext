const _ = require('lodash');

async function arrayFilterAsync(array, predicate) {
    const result = [];
    for (let i = 0, n = array.length; i < n; ++i) {
        if (await predicate(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result
}

async function objectFilterAsync(collection, predicate) {
    const result = [];
    for (const key of Object.keys(collection)) {
        if (await predicate(collection[key], key, collection)) {
            result.push(collection[key]);
        }
    }
    return result
}

async function filterAsync(collection, predicate = _.identity) {
    if (_.isEmpty(collection)) {
        return _.clone(collection);
    }
    const fn = _.isArray(collection) ? arrayFilterAsync : objectFilterAsync;
    return await fn(collection, predicate);
}

export default filterAsync;