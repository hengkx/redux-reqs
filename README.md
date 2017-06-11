# redux-reqs

[![NPM version](https://img.shields.io/npm/v/redux-reqs.svg?style=flat)](https://npmjs.org/package/redux-reqs)
[![NPM downloads](http://img.shields.io/npm/dm/redux-reqs.svg?style=flat)](https://npmjs.org/package/redux-reqs)


``` javascript
import ReduxReqs from 'redux-reqs';

const reduxRequests = ReduxReqs([{
  type: 'UPDATE',
  url: '/url/:id',
  method: 'put'
}, {
  type: 'UPDATE_URL',
  url: '/url',
  method: 'put'
}]);

export const { update, updateUrl } = reduxRequests.actionCreators;

export default reduxRequests.handleActions;

export const watchSagas = reduxRequests.watchSagas;
```
