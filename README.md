# redux-reqs

[![NPM version](https://img.shields.io/npm/v/redux-reqs.svg?style=flat)](https://npmjs.org/package/redux-reqs)
[![NPM downloads](http://img.shields.io/npm/dm/redux-reqs.svg?style=flat)](https://npmjs.org/package/redux-reqs)

``` javascript
import ReduxReqs from 'redux-reqs';

const reduxReqs = new ReduxReqs();

reduxReqs
  .get('getUrlGroupByProject', Api.ProjectUrlGroup)
  .post('Add', Api.ProjectUrlGroup)
  .put('UPDATE', Api.UrlGroupOper)
  .del('DELETE_URL_GROUP', Api.ProjectUrlGroup)
  .put('UPDATE_URL', Api.EditUrl);

export const { update, updateUrl, add, deleteUrlGroup,
  getUrlGroupByProject } = reduxReqs.getCreateActions();

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
