'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _reduxActions = require('redux-actions');

var _effects = require('redux-saga/effects');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { beginTask, endTask } from 'redux-nprogress';
// import pathToRegexp from 'path-to-regexp';
// import omit from 'object.omit';
var methods = ['get', 'put', 'post', 'patch', 'delete'];

var Req =
// use = () => {

// }
function Req(actionsDeprecated, options) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Req);

  this.metaCreator = function (url) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';

    return function (_, meta) {
      return (0, _extends4.default)({
        url: url,
        method: method
      }, meta);
    };
  };

  this.getCreateAction = function (action) {
    return (0, _reduxActions.createAction)(action.prefixType, null, _this.metaCreator(action.url, action.method));
  };

  this.getCreateActions = function () {
    var actionCreators = {};
    _this.actions.forEach(function (action) {
      actionCreators[(0, _camelCase2.default)(action.type)] = (0, _reduxActions.createAction)(action.prefixType, null, _this.metaCreator(action.url, action.method));
    });
    return actionCreators;
  };

  this.getReducers = function () {
    var reducers = {};
    _this.actions.forEach(function (item) {
      var prefixType = item.prefixType,
          type = item.type;

      reducers[prefixType] = function (state) {
        return (0, _extends4.default)({}, state, {
          isfetching: true
        });
      };
      reducers['' + prefixType + _this.resultSufix] = function (state, action) {
        return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({
          isfetching: false
        }, (0, _camelCase2.default)('' + type + _this.resultSufix), action.payload));
      };
    });
    return (0, _reduxActions.handleActions)(reducers, _this.opts.defaultState || {});
  };

  this.request = _request2.default;

  this.getWatchSaga = function (action) {
    return (0, _effects.takeEvery)(action.prefixType, _regenerator2.default.mark(function _callee(data) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _request2.default)(data, (0, _extends4.default)({}, action.config, Req.defaults));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
  };

  this.getWatchSagas = function () {
    return _this.actions.map(function (action) {
      return _this.getWatchSaga(action);
    });
  };

  this.getUrl = function (url) {
    var _opts = _this.opts,
        prefixUrl = _opts.prefixUrl,
        defaultUrl = _opts.defaultUrl;

    if (url && (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1)) return url;
    if (url) return '' + prefixUrl + url;
    return defaultUrl;
  };

  this.actions = [];
  this.opts = options || {};
  // To be compatible with the previous version of 0.3.0
  if ((0, _isArray2.default)(actionsDeprecated)) {
    var _actions;

    actionsDeprecated.forEach(function (action) {
      action.prefixType = action.type;
    });
    (_actions = actions).push.apply(_actions, (0, _toConsumableArray3.default)(actionsDeprecated));
    console.error('Warning: actions param deprecated,We will be removed in later versions');
  } else {
    this.opts = actionsDeprecated || {};
  }
  this.opts.prefixUrl = this.opts.prefixUrl || '';
  this.opts.defaultUrl = this.opts.defaultUrl || '';

  this.resultSufix = this.opts.resultSufix || '_RESULT';
  if (this.opts.prefix) {
    this.opts.prefix = this.opts.prefix.toUpperCase() + '_';
  } else {
    this.opts.prefix = '';
  }

  this.actionCreators = {};
  this.handleActions = [];
  this.watchSagas = [];
};

methods.forEach(function (method) {
  Req.prototype[method] = function (type, url) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    (0, _invariant2.default)((0, _isString2.default)(type), 'Expected type to be a string');
    var _opts2 = this.opts,
        prefixUrl = _opts2.prefixUrl,
        defaultUrl = _opts2.defaultUrl;

    var action = { method: method, prefixType: '' + this.opts.prefix + type, type: type, url: this.getUrl(url), config: config };
    this.actions.push(action);

    this.actionCreators[(0, _camelCase2.default)(type)] = this.getCreateAction(action);
    this.handleActions = this.getReducers();
    this.watchSagas.push(this.getWatchSaga(action));
    return this;
  };
});
// Alias for `router.delete()` because delete is a reserved word
Req.prototype.del = Req.prototype['delete'];

Req.defaults = _defaults2.default;
Req.axios = _axios2.default;

exports.default = Req;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtZXRob2RzIiwiUmVxIiwiYWN0aW9uc0RlcHJlY2F0ZWQiLCJvcHRpb25zIiwibWV0YUNyZWF0b3IiLCJ1cmwiLCJtZXRob2QiLCJfIiwibWV0YSIsImdldENyZWF0ZUFjdGlvbiIsImFjdGlvbiIsInByZWZpeFR5cGUiLCJnZXRDcmVhdGVBY3Rpb25zIiwiYWN0aW9uQ3JlYXRvcnMiLCJhY3Rpb25zIiwiZm9yRWFjaCIsInR5cGUiLCJnZXRSZWR1Y2VycyIsInJlZHVjZXJzIiwiaXRlbSIsInN0YXRlIiwiaXNmZXRjaGluZyIsInJlc3VsdFN1Zml4IiwicGF5bG9hZCIsIm9wdHMiLCJkZWZhdWx0U3RhdGUiLCJyZXF1ZXN0IiwiZ2V0V2F0Y2hTYWdhIiwiZGF0YSIsImNvbmZpZyIsImRlZmF1bHRzIiwiZ2V0V2F0Y2hTYWdhcyIsIm1hcCIsImdldFVybCIsInByZWZpeFVybCIsImRlZmF1bHRVcmwiLCJpbmRleE9mIiwicHVzaCIsImNvbnNvbGUiLCJlcnJvciIsInByZWZpeCIsInRvVXBwZXJDYXNlIiwiaGFuZGxlQWN0aW9ucyIsIndhdGNoU2FnYXMiLCJwcm90b3R5cGUiLCJkZWwiLCJheGlvcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBSUE7Ozs7QUFDQTs7Ozs7O0FBSkE7QUFDQTtBQUNBO0FBS0EsSUFBTUEsVUFBVSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixPQUF2QixFQUFnQyxRQUFoQyxDQUFoQjs7SUFFTUMsRztBQStFSjs7QUFFQTtBQWhGQSxhQUFZQyxpQkFBWixFQUErQkMsT0FBL0IsRUFBd0M7QUFBQTs7QUFBQTs7QUFBQSxPQTBCeENDLFdBMUJ3QyxHQTBCMUIsVUFBQ0MsR0FBRCxFQUF5QjtBQUFBLFFBQW5CQyxNQUFtQix1RUFBVixL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LDZCQUFVLHdCQUFTYixJQUFULENBQVYsRUFBMEIsOEJBQTFCO0FBRHdELGlCQUV0QixLQUFLUSxJQUZpQjtBQUFBLFFBRWhEVSxTQUZnRCxVQUVoREEsU0FGZ0Q7QUFBQSxRQUVyQ0MsVUFGcUMsVUFFckNBLFVBRnFDOztBQUd4RCxRQUFNekIsU0FBUyxFQUFFSixjQUFGLEVBQVVLLGlCQUFlLEtBQUthLElBQUwsQ0FBVWdCLE1BQXpCLEdBQWtDeEIsSUFBNUMsRUFBb0RBLFVBQXBELEVBQTBEWCxLQUFLLEtBQUs0QixNQUFMLENBQVk1QixHQUFaLENBQS9ELEVBQWlGd0IsY0FBakYsRUFBZjtBQUNBLFNBQUtmLE9BQUwsQ0FBYXVCLElBQWIsQ0FBa0IzQixNQUFsQjs7QUFFQSxTQUFLRyxjQUFMLENBQW9CLHlCQUFVRyxJQUFWLENBQXBCLElBQXVDLEtBQUtQLGVBQUwsQ0FBcUJDLE1BQXJCLENBQXZDO0FBQ0EsU0FBS2dDLGFBQUwsR0FBcUIsS0FBS3pCLFdBQUwsRUFBckI7QUFDQSxTQUFLMEIsVUFBTCxDQUFnQk4sSUFBaEIsQ0FBcUIsS0FBS1YsWUFBTCxDQUFrQmpCLE1BQWxCLENBQXJCO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FWRDtBQVdELENBWkQ7QUFhQTtBQUNBVCxJQUFJMkMsU0FBSixDQUFjQyxHQUFkLEdBQW9CNUMsSUFBSTJDLFNBQUosQ0FBYyxRQUFkLENBQXBCOztBQUVBM0MsSUFBSTZCLFFBQUo7QUFDQTdCLElBQUk2QyxLQUFKOztrQkFFZTdDLEciLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNTdHJpbmcgZnJvbSAnbG9kYXNoL2lzU3RyaW5nJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBjYW1lbENhc2UgZnJvbSAnbG9kYXNoL2NhbWVsQ2FzZSc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICdsb2Rhc2gvaXNBcnJheSc7XG5pbXBvcnQgeyBjcmVhdGVBY3Rpb24sIGhhbmRsZUFjdGlvbnMgfSBmcm9tICdyZWR1eC1hY3Rpb25zJztcbmltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUV2ZXJ5IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG4vLyBpbXBvcnQgeyBiZWdpblRhc2ssIGVuZFRhc2sgfSBmcm9tICdyZWR1eC1ucHJvZ3Jlc3MnO1xuLy8gaW1wb3J0IHBhdGhUb1JlZ2V4cCBmcm9tICdwYXRoLXRvLXJlZ2V4cCc7XG4vLyBpbXBvcnQgb21pdCBmcm9tICdvYmplY3Qub21pdCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMnO1xuXG5cbmNvbnN0IG1ldGhvZHMgPSBbJ2dldCcsICdwdXQnLCAncG9zdCcsICdwYXRjaCcsICdkZWxldGUnXTtcblxuY2xhc3MgUmVxIHtcbiAgY29uc3RydWN0b3IoYWN0aW9uc0RlcHJlY2F0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBbXTtcbiAgICB0aGlzLm9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICAgIC8vIFRvIGJlIGNvbXBhdGlibGUgd2l0aCB0aGUgcHJldmlvdXMgdmVyc2lvbiBvZiAwLjMuMFxuICAgIGlmIChpc0FycmF5KGFjdGlvbnNEZXByZWNhdGVkKSkge1xuICAgICAgYWN0aW9uc0RlcHJlY2F0ZWQuZm9yRWFjaChhY3Rpb24gPT4geyBhY3Rpb24ucHJlZml4VHlwZSA9IGFjdGlvbi50eXBlOyB9KTtcbiAgICAgIGFjdGlvbnMucHVzaCguLi5hY3Rpb25zRGVwcmVjYXRlZCk7XG4gICAgICBjb25zb2xlLmVycm9yKCdXYXJuaW5nOiBhY3Rpb25zIHBhcmFtIGRlcHJlY2F0ZWQsV2Ugd2lsbCBiZSByZW1vdmVkIGluIGxhdGVyIHZlcnNpb25zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0cyA9IGFjdGlvbnNEZXByZWNhdGVkIHx8IHt9O1xuICAgIH1cbiAgICB0aGlzLm9wdHMucHJlZml4VXJsID0gdGhpcy5vcHRzLnByZWZpeFVybCB8fCAnJztcbiAgICB0aGlzLm9wdHMuZGVmYXVsdFVybCA9IHRoaXMub3B0cy5kZWZhdWx0VXJsIHx8ICcnO1xuXG4gICAgdGhpcy5yZXN1bHRTdWZpeCA9IHRoaXMub3B0cy5yZXN1bHRTdWZpeCB8fCAnX1JFU1VMVCc7XG4gICAgaWYgKHRoaXMub3B0cy5wcmVmaXgpIHtcbiAgICAgIHRoaXMub3B0cy5wcmVmaXggPSBgJHt0aGlzLm9wdHMucHJlZml4LnRvVXBwZXJDYXNlKCl9X2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0cy5wcmVmaXggPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLmFjdGlvbkNyZWF0b3JzID0ge307XG4gICAgdGhpcy5oYW5kbGVBY3Rpb25zID0gW107XG4gICAgdGhpcy53YXRjaFNhZ2FzID0gW107XG4gIH1cblxuICBtZXRhQ3JlYXRvciA9ICh1cmwsIG1ldGhvZCA9ICdnZXQnKSA9PiB7XG4gICAgcmV0dXJuIChfLCBtZXRhKSA9PiAoe1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kLFxuICAgICAgLi4ubWV0YVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q3JlYXRlQWN0aW9uID0gKGFjdGlvbikgPT5cbiAgICAoY3JlYXRlQWN0aW9uKGFjdGlvbi5wcmVmaXhUeXBlLCBudWxsLCB0aGlzLm1ldGFDcmVhdG9yKGFjdGlvbi51cmwsIGFjdGlvbi5tZXRob2QpKSk7XG5cbiAgZ2V0Q3JlYXRlQWN0aW9ucyA9ICgpID0+IHtcbiAgICBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHt9O1xuICAgIHRoaXMuYWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB7XG4gICAgICBhY3Rpb25DcmVhdG9yc1tjYW1lbENhc2UoYWN0aW9uLnR5cGUpXSA9XG4gICAgICAgIGNyZWF0ZUFjdGlvbihhY3Rpb24ucHJlZml4VHlwZSwgbnVsbCxcbiAgICAgICAgICB0aGlzLm1ldGFDcmVhdG9yKGFjdGlvbi51cmwsIGFjdGlvbi5tZXRob2QpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWN0aW9uQ3JlYXRvcnM7XG4gIH1cblxuICBnZXRSZWR1Y2VycyA9ICgpID0+IHtcbiAgICBjb25zdCByZWR1Y2VycyA9IHt9O1xuICAgIHRoaXMuYWN0aW9ucy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgeyBwcmVmaXhUeXBlLCB0eXBlIH0gPSBpdGVtO1xuICAgICAgcmVkdWNlcnNbcHJlZml4VHlwZV0gPSAoc3RhdGUpID0+ICh7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc2ZldGNoaW5nOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHJlZHVjZXJzW2Ake3ByZWZpeFR5cGV9JHt0aGlzLnJlc3VsdFN1Zml4fWBdID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc2ZldGNoaW5nOiBmYWxzZSxcbiAgICAgICAgW2NhbWVsQ2FzZShgJHt0eXBlfSR7dGhpcy5yZXN1bHRTdWZpeH1gKV06IGFjdGlvbi5wYXlsb2FkXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gaGFuZGxlQWN0aW9ucyhyZWR1Y2VycywgdGhpcy5vcHRzLmRlZmF1bHRTdGF0ZSB8fCB7fSk7XG4gIH1cblxuICByZXF1ZXN0ID0gcmVxdWVzdDtcblxuICBnZXRXYXRjaFNhZ2EgPSAoYWN0aW9uKSA9PiAodGFrZUV2ZXJ5KGFjdGlvbi5wcmVmaXhUeXBlLCBmdW5jdGlvbiogKGRhdGEpIHtcbiAgICB5aWVsZCByZXF1ZXN0KGRhdGEsIHsgLi4uYWN0aW9uLmNvbmZpZywgLi4uUmVxLmRlZmF1bHRzIH0pO1xuICB9KSlcblxuICBnZXRXYXRjaFNhZ2FzID0gKCkgPT4gKHRoaXMuYWN0aW9ucy5tYXAoYWN0aW9uID0+IHRoaXMuZ2V0V2F0Y2hTYWdhKGFjdGlvbikpKVxuXG4gIGdldFVybCA9ICh1cmwpID0+IHtcbiAgICBjb25zdCB7IHByZWZpeFVybCwgZGVmYXVsdFVybCB9ID0gdGhpcy5vcHRzO1xuICAgIGlmICh1cmwgJiYgKHVybC5pbmRleE9mKCdodHRwOi8vJykgIT09IC0xIHx8IHVybC5pbmRleE9mKCdodHRwczovLycpICE9PSAtMSkpIHJldHVybiB1cmw7XG4gICAgaWYgKHVybCkgcmV0dXJuIGAke3ByZWZpeFVybH0ke3VybH1gO1xuICAgIHJldHVybiBkZWZhdWx0VXJsO1xuICB9XG4gIC8vIHVzZSA9ICgpID0+IHtcblxuICAvLyB9XG59XG5cblxuXG5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICBSZXEucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodHlwZSwgdXJsLCBjb25maWcgPSB7fSkge1xuICAgIGludmFyaWFudChpc1N0cmluZyh0eXBlKSwgJ0V4cGVjdGVkIHR5cGUgdG8gYmUgYSBzdHJpbmcnKTtcbiAgICBjb25zdCB7IHByZWZpeFVybCwgZGVmYXVsdFVybCB9ID0gdGhpcy5vcHRzO1xuICAgIGNvbnN0IGFjdGlvbiA9IHsgbWV0aG9kLCBwcmVmaXhUeXBlOiBgJHt0aGlzLm9wdHMucHJlZml4fSR7dHlwZX1gLCB0eXBlLCB1cmw6IHRoaXMuZ2V0VXJsKHVybCksIGNvbmZpZyB9O1xuICAgIHRoaXMuYWN0aW9ucy5wdXNoKGFjdGlvbik7XG5cbiAgICB0aGlzLmFjdGlvbkNyZWF0b3JzW2NhbWVsQ2FzZSh0eXBlKV0gPSB0aGlzLmdldENyZWF0ZUFjdGlvbihhY3Rpb24pO1xuICAgIHRoaXMuaGFuZGxlQWN0aW9ucyA9IHRoaXMuZ2V0UmVkdWNlcnMoKTtcbiAgICB0aGlzLndhdGNoU2FnYXMucHVzaCh0aGlzLmdldFdhdGNoU2FnYShhY3Rpb24pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbn0pO1xuLy8gQWxpYXMgZm9yIGByb3V0ZXIuZGVsZXRlKClgIGJlY2F1c2UgZGVsZXRlIGlzIGEgcmVzZXJ2ZWQgd29yZFxuUmVxLnByb3RvdHlwZS5kZWwgPSBSZXEucHJvdG90eXBlWydkZWxldGUnXTtcblxuUmVxLmRlZmF1bHRzID0gZGVmYXVsdHM7XG5SZXEuYXhpb3MgPSBheGlvcztcblxuZXhwb3J0IGRlZmF1bHQgUmVxO1xuIl19