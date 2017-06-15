import isString from 'lodash/isString';
import invariant from 'invariant';
import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// import { beginTask, endTask } from 'redux-nprogress';
// import pathToRegexp from 'path-to-regexp';
// import omit from 'object.omit';
import request from './request';
import defaults from './defaults';


const methods = ['get', 'put', 'post', 'patch', 'delete'];

class Req {
  constructor(actionsDeprecated, options) {
    this.actions = [];
    this.opts = options || {};
    // To be compatible with the previous version of 0.3.0
    if (isArray(actionsDeprecated)) {
      actionsDeprecated.forEach(action => { action.prefixType = action.type; });
      actions.push(...actionsDeprecated);
      console.error('Warning: actions param deprecated,We will be removed in later versions');
    } else {
      this.opts = actionsDeprecated || {};
    }
    this.opts.prefixUrl = this.opts.prefixUrl || '';
    this.opts.defaultUrl = this.opts.defaultUrl || '';

    this.resultSufix = this.opts.resultSufix || '_RESULT';
    if (this.opts.prefix) {
      this.opts.prefix = `${this.opts.prefix.toUpperCase()}_`;
    }
  }

  metaCreator = (url, method = 'get') => {
    return (_, meta) => ({
      url,
      method,
      ...meta
    });
  }

  getCreateActions = () => {
    const actionCreators = {};
    this.actions.forEach(action => {
      actionCreators[camelCase(action.type)] =
        createAction(action.prefixType, null,
          this.metaCreator(action.url, action.method));
    });
    return actionCreators;
  }

  getReducers = () => {
    const reducers = {};
    this.actions.forEach(item => {
      const { prefixType, type } = item;
      reducers[prefixType] = (state) => ({
        ...state,
        isfetching: true
      });
      reducers[`${prefixType}${this.resultSufix}`] = (state, action) => ({
        ...state,
        isfetching: false,
        [camelCase(`${type}${this.resultSufix}`)]: action.payload
      });
    });
    return handleActions(reducers, this.opts.defaultState || {});
  }

  request = request;
  getWatchSagas = () => {
    return this.actions.map(action => takeEvery(action.prefixType, function* (data) {
      yield request(data, { ...action.config, ...Req.defaults });
    }));
  }

  // use = () => {

  // }
}


methods.forEach((method) => {
  Req.prototype[method] = function (type, url, config = {}) {
    invariant(isString(type), 'Expected type to be a string');
    const { prefixUrl, defaultUrl } = this.opts;
    this.actions.push({ method, prefixType: `${this.opts.prefix}${type}`, type, url: url || `${prefixUrl}${defaultUrl}`, config });
    this.actionCreators = this.getCreateActions();
    this.handleActions = this.getReducers();
    this.watchSagas = this.getWatchSagas();
    return this;
  };
});
// Alias for `router.delete()` because delete is a reserved word
Req.prototype.del = Req.prototype['delete'];

Req.defaults = defaults;
Req.axios = axios;

export default Req;
