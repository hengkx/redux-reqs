import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import isFunction from 'lodash/isFunction';
import axios from 'axios';
import pathToRegexp from 'path-to-regexp';
import omit from 'object.omit';

function* request(data, config) {

  const { type, payload, meta } = data;
  let url = meta.url;
  const actionResult = createAction(`${type}_RESULT`);
  try {
    if (config.beforeAction) yield put(config.beforeAction);
    if (config.request && isFunction(config.request)) {
      const res = yield call(config.request);
      yield put(actionResult(res));
    } else {
      const keys = [];
      const omitKeys = [];
      pathToRegexp(url, keys);
      keys.forEach(key => omitKeys.push(key.name));
      const toPath = pathToRegexp.compile(url);
      url = toPath(payload);
      let axiosConfig = { method: meta.method };
      if (meta.method === 'get') {
        axiosConfig.params = omit(payload, omitKeys);
      } else {
        axiosConfig.data = omit(payload, omitKeys);
      }
      const res = yield call(axios, url, axiosConfig);
      if (config.processResult && isFunction(config.processResult)) {
        yield put(actionResult(config.processResult(res)));
      } else {
        yield put(actionResult(res));
      }
    }
  } catch (error) {
    console.log(data);
    console.log('error');
    console.log(error);
    yield put(actionResult(error));
  } finally {
    if (config.afterAction) yield put(config.afterAction);
  }
}

export default request;
