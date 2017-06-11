import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import camelCase from 'lodash.camelcase';
import pathToRegexp from 'path-to-regexp';
import omit from 'object.omit';

export default (actions, opts = {}) => {
  const resultSufix = opts.resultSufix || '_RESULT';
  function getReducers() {
    const reducers = {};
    actions.forEach(item => {
      const { type } = item;
      reducers[type] = (state) => ({
        ...state,
        isfetching: true
      });
      reducers[`${type}${resultSufix}`] = (state, action) => ({
        ...state,
        isfetching: false,
        [camelCase(`${type}${resultSufix}`)]: action.payload
      });
    });
    return reducers;
  }

  function* request(data) {
    const { type, payload, meta } = data;
    let url = meta.url;
    const actionResult = createAction(`${type}_RESULT`);
    try {
      yield put(beginTask());

      const keys = [];
      const omitKeys = [];
      pathToRegexp(url, keys);
      keys.forEach(key => omitKeys.push(key.name));
      const toPath = pathToRegexp.compile(url);
      url = toPath(payload);

      const res = yield call(axios, url,
        { method: meta.method, data: omit(payload, omitKeys) });

      yield put(actionResult(res));
    } catch (error) {
      yield put(actionResult(error));
    } finally {
      yield put(endTask());
    }
  }
  function metaCreator(url, method = 'get') {
    return (_, meta) => ({
      url,
      method,
      ...meta
    });
  }
  function getCreateActions() {
    const result = {};
    actions.forEach(action => {
      result[camelCase(action.type)] = createAction(action.type, null,
        metaCreator(action.url, action.method));
    });
    return result;
  }

  const actionCreators = getCreateActions();

  function getWatchSagas() {
    const result = [];
    actions.forEach(action => {
      result.push(takeEvery(action.type, request));
    });
    return result;
  }

  return {
    actionCreators,
    handleActions: handleActions(getReducers(), opts.defaultState || {}),
    watchSagas: getWatchSagas()
  };
};
