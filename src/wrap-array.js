import _ from 'lodash';

function wrapArray(considerArray) {
    return considerArray == null ? [] : _.castArray(considerArray);
}

export default wrapArray;