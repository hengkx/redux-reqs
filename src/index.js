import isString from 'lodash/isString';
import invariant from 'invariant';
import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import pathToRegexp from 'path-to-regexp';
import omit from 'object.omit';


const methods = ['get', 'put', 'post', 'patch', 'delete'];

export default (actionsDeprecated, options) => {
  const actions = [];
  let opts = options || {};
  // To be compatible with the previous version of 0.3.0
  if (isArray(actionsDeprecated)) {
    actionsDeprecated.forEach(action => { action.prefixType = action.type; });
    actions.push(...actionsDeprecated);
    console.error('Warning: actions param deprecated,We will be removed in later versions');
  } else {
    opts = actionsDeprecated || {};
  }

  const resultSufix = opts.resultSufix || '_RESULT';
  if (opts.prefix) {
    opts.prefix = `${opts.prefix.toUpperCase()}_`;
  }

  const req = {};

  methods.forEach((method) => {
    req[method] = (type, url) => {
      invariant(
        isString(type) && isString(url),
        'Expected type, url to be a string'
      );
      actions.push({ method, prefixType: `${opts.prefix}${type}`, type, url });
      return req;
    };
  });
  // Alias for `router.delete()` because delete is a reserved word
  req.del = req['delete'];

  function metaCreator(url, method = 'get') {
    return (_, meta) => ({
      url,
      method,
      ...meta
    });
  }

  req.getCreateActions = () => {
    const actionCreators = {};
    actions.forEach(action => {
      actionCreators[camelCase(action.type)] =
        createAction(action.prefixType, null,
          metaCreator(action.url, action.method));
    });
    return actionCreators;
  }

  req.actionCreators = req.getCreateActions();
  req.getReducers = () => {
    const reducers = {};
    actions.forEach(item => {
      const { prefixType, type } = item;
      reducers[prefixType] = (state) => ({
        ...state,
        isfetching: true
      });
      reducers[`${prefixType}${resultSufix}`] = (state, action) => ({
        ...state,
        isfetching: false,
        [camelCase(`${type}${resultSufix}`)]: action.payload
      });
    });
    return handleActions(reducers, opts.defaultState || {});
  }
  req.handleActions = req.getReducers();

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
      let axiosConfig = { method: meta.method };
      if (meta.method === 'get') {
        axiosConfig.params = omit(payload, omitKeys);
      } else {
        axiosConfig.data = omit(payload, omitKeys);
      }
      const res = yield call(axios, url, axiosConfig);

      yield put(actionResult(res));
    } catch (error) {
      yield put(actionResult(error));
    } finally {
      yield put(endTask());
    }
  }

  req.getWatchSagas = () => {
    return actions.map(action => takeEvery(action.prefixType, request));
  }
  req.watchSagas = req.getWatchSagas();
  return req;
}

