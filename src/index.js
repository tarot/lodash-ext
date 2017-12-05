import _ from 'lodash';
import filterAsync from './filter-async';
import forEachAsync from './for-each-async';
import mapAsync from './map-async';
import reduceAsync from './reduce-async';
import wrapArray from './wrap-array';

_.mixin({filterAsync, forEachAsync, mapAsync, reduceAsync, wrapArray});

export default _;