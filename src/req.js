import isString from 'lodash/isString';
import invariant from 'invariant';
import camelCase from 'lodash/camelCase';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// import { beginTask, endTask } from 'redux-nprogress';
import pathToRegexp from 'path-to-regexp';
import omit from 'object.omit';


const methods = ['get', 'put', 'post', 'patch', 'delete'];

export default (options) => {
  let opts = options || {};
  const resultSufix = opts.resultSufix || '_RESULT';
  if (opts.prefix) {
    opts.prefix = `${opts.prefix.toUpperCase()}_`;
  }
  const actions = [];

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
  return req;
}

