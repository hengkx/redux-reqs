# redux-reqs

[![NPM version](https://img.shields.io/npm/v/redux-reqs.svg?style=flat)](https://npmjs.org/package/redux-reqs)
[![NPM downloads](http://img.shields.io/npm/dm/redux-reqs.svg?style=flat)](https://npmjs.org/package/redux-reqs)


### defaults config

``` javascript
import ReduxReqs from 'redux-reqs';
import { beginTask, endTask } from 'redux-nprogress';

ReduxReqs.defaults = {
  beforeAction: beginTask(),
  afterAction: endTask(),
  request:function* request() {
    // custom request
  },
  processResult: function() {
    // request result process,If exists request will disabled.
  }
};
```

``` javascript
import ReduxReqs from 'redux-reqs';

const reduxReqs = new ReduxReqs(
  {
    prefix:'STU', // action type prefix,
    prefixUrl:'/api',
    defaultUrl:'/stu/:id'
  }
);

reduxReqs
  .get('GET', Api.ProjectUrlGroup, config)
  .post('ADD', Api.ProjectUrlGroup)
  .put('UPDATE', Api.UrlGroupOper)
  .del('DELETE_URL_GROUP', Api.ProjectUrlGroup);

export const { update, updateUrl, add, deleteUrlGroup,
  get } = reduxReqs.getCreateActions();

export default reduxReqs.getReducers();

export const watchSagas = reduxReqs.getWatchSagas();
```



### Deprecated
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
