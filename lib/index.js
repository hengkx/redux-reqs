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
    if (defaultUrl) return defaultUrl;
    return prefixUrl;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtZXRob2RzIiwiUmVxIiwiYWN0aW9uc0RlcHJlY2F0ZWQiLCJvcHRpb25zIiwibWV0YUNyZWF0b3IiLCJ1cmwiLCJtZXRob2QiLCJfIiwibWV0YSIsImdldENyZWF0ZUFjdGlvbiIsImFjdGlvbiIsInByZWZpeFR5cGUiLCJnZXRDcmVhdGVBY3Rpb25zIiwiYWN0aW9uQ3JlYXRvcnMiLCJhY3Rpb25zIiwiZm9yRWFjaCIsInR5cGUiLCJnZXRSZWR1Y2VycyIsInJlZHVjZXJzIiwiaXRlbSIsInN0YXRlIiwiaXNmZXRjaGluZyIsInJlc3VsdFN1Zml4IiwicGF5bG9hZCIsIm9wdHMiLCJkZWZhdWx0U3RhdGUiLCJyZXF1ZXN0IiwiZ2V0V2F0Y2hTYWdhIiwiZGF0YSIsImNvbmZpZyIsImRlZmF1bHRzIiwiZ2V0V2F0Y2hTYWdhcyIsIm1hcCIsImdldFVybCIsInByZWZpeFVybCIsImRlZmF1bHRVcmwiLCJpbmRleE9mIiwicHVzaCIsImNvbnNvbGUiLCJlcnJvciIsInByZWZpeCIsInRvVXBwZXJDYXNlIiwiaGFuZGxlQWN0aW9ucyIsIndhdGNoU2FnYXMiLCJwcm90b3R5cGUiLCJkZWwiLCJheGlvcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBSUE7Ozs7QUFDQTs7Ozs7O0FBSkE7QUFDQTtBQUNBO0FBS0EsSUFBTUEsVUFBVSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixPQUF2QixFQUFnQyxRQUFoQyxDQUFoQjs7SUFFTUMsRztBQWdGSjs7QUFFQTtBQWpGQSxhQUFZQyxpQkFBWixFQUErQkMsT0FBL0IsRUFBd0M7QUFBQTs7QUFBQTs7QUFBQSxPQTBCeENDLFdBMUJ3QyxHQTBCMUIsVUFBQ0MsR0FBRCxFQUF5QjtBQUFBLFFBQW5CQyxNQUFtQix1RUFBVixL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QUEsUUFBYndCLE1BQWEsdUVBQUosRUFBSTs7QUFDeEQsNkJBQVUsd0JBQVNiLElBQVQsQ0FBVixFQUEwQiw4QkFBMUI7QUFEd0QsaUJBRXRCLEtBQUtRLElBRmlCO0FBQUEsUUFFaERVLFNBRmdELFVBRWhEQSxTQUZnRDtBQUFBLFFBRXJDQyxVQUZxQyxVQUVyQ0EsVUFGcUM7O0FBR3hELFFBQU16QixTQUFTLEVBQUVKLGNBQUYsRUFBVUssaUJBQWUsS0FBS2EsSUFBTCxDQUFVZ0IsTUFBekIsR0FBa0N4QixJQUE1QyxFQUFvREEsVUFBcEQsRUFBMERYLEtBQUssS0FBSzRCLE1BQUwsQ0FBWTVCLEdBQVosQ0FBL0QsRUFBaUZ3QixjQUFqRixFQUFmO0FBQ0EsU0FBS2YsT0FBTCxDQUFhdUIsSUFBYixDQUFrQjNCLE1BQWxCOztBQUVBLFNBQUtHLGNBQUwsQ0FBb0IseUJBQVVHLElBQVYsQ0FBcEIsSUFBdUMsS0FBS1AsZUFBTCxDQUFxQkMsTUFBckIsQ0FBdkM7QUFDQSxTQUFLZ0MsYUFBTCxHQUFxQixLQUFLekIsV0FBTCxFQUFyQjtBQUNBLFNBQUswQixVQUFMLENBQWdCTixJQUFoQixDQUFxQixLQUFLVixZQUFMLENBQWtCakIsTUFBbEIsQ0FBckI7QUFDQSxXQUFPLElBQVA7QUFDRCxHQVZEO0FBV0QsQ0FaRDtBQWFBO0FBQ0FULElBQUkyQyxTQUFKLENBQWNDLEdBQWQsR0FBb0I1QyxJQUFJMkMsU0FBSixDQUFjLFFBQWQsQ0FBcEI7O0FBRUEzQyxJQUFJNkIsUUFBSjtBQUNBN0IsSUFBSTZDLEtBQUo7O2tCQUVlN0MsRyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc1N0cmluZyBmcm9tICdsb2Rhc2gvaXNTdHJpbmcnO1xyXG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XHJcbmltcG9ydCBjYW1lbENhc2UgZnJvbSAnbG9kYXNoL2NhbWVsQ2FzZSc7XHJcbmltcG9ydCBpc0FycmF5IGZyb20gJ2xvZGFzaC9pc0FycmF5JztcclxuaW1wb3J0IHsgY3JlYXRlQWN0aW9uLCBoYW5kbGVBY3Rpb25zIH0gZnJvbSAncmVkdXgtYWN0aW9ucyc7XHJcbmltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUV2ZXJ5IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuLy8gaW1wb3J0IHsgYmVnaW5UYXNrLCBlbmRUYXNrIH0gZnJvbSAncmVkdXgtbnByb2dyZXNzJztcclxuLy8gaW1wb3J0IHBhdGhUb1JlZ2V4cCBmcm9tICdwYXRoLXRvLXJlZ2V4cCc7XHJcbi8vIGltcG9ydCBvbWl0IGZyb20gJ29iamVjdC5vbWl0JztcclxuaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcclxuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMnO1xyXG5cclxuXHJcbmNvbnN0IG1ldGhvZHMgPSBbJ2dldCcsICdwdXQnLCAncG9zdCcsICdwYXRjaCcsICdkZWxldGUnXTtcclxuXHJcbmNsYXNzIFJlcSB7XHJcbiAgY29uc3RydWN0b3IoYWN0aW9uc0RlcHJlY2F0ZWQsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xyXG4gICAgdGhpcy5vcHRzID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIC8vIFRvIGJlIGNvbXBhdGlibGUgd2l0aCB0aGUgcHJldmlvdXMgdmVyc2lvbiBvZiAwLjMuMFxyXG4gICAgaWYgKGlzQXJyYXkoYWN0aW9uc0RlcHJlY2F0ZWQpKSB7XHJcbiAgICAgIGFjdGlvbnNEZXByZWNhdGVkLmZvckVhY2goYWN0aW9uID0+IHsgYWN0aW9uLnByZWZpeFR5cGUgPSBhY3Rpb24udHlwZTsgfSk7XHJcbiAgICAgIGFjdGlvbnMucHVzaCguLi5hY3Rpb25zRGVwcmVjYXRlZCk7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IGFjdGlvbnMgcGFyYW0gZGVwcmVjYXRlZCxXZSB3aWxsIGJlIHJlbW92ZWQgaW4gbGF0ZXIgdmVyc2lvbnMnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3B0cyA9IGFjdGlvbnNEZXByZWNhdGVkIHx8IHt9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5vcHRzLnByZWZpeFVybCA9IHRoaXMub3B0cy5wcmVmaXhVcmwgfHwgJyc7XHJcbiAgICB0aGlzLm9wdHMuZGVmYXVsdFVybCA9IHRoaXMub3B0cy5kZWZhdWx0VXJsIHx8ICcnO1xyXG5cclxuICAgIHRoaXMucmVzdWx0U3VmaXggPSB0aGlzLm9wdHMucmVzdWx0U3VmaXggfHwgJ19SRVNVTFQnO1xyXG4gICAgaWYgKHRoaXMub3B0cy5wcmVmaXgpIHtcclxuICAgICAgdGhpcy5vcHRzLnByZWZpeCA9IGAke3RoaXMub3B0cy5wcmVmaXgudG9VcHBlckNhc2UoKX1fYDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3B0cy5wcmVmaXggPSAnJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFjdGlvbkNyZWF0b3JzID0ge307XHJcbiAgICB0aGlzLmhhbmRsZUFjdGlvbnMgPSBbXTtcclxuICAgIHRoaXMud2F0Y2hTYWdhcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgbWV0YUNyZWF0b3IgPSAodXJsLCBtZXRob2QgPSAnZ2V0JykgPT4ge1xyXG4gICAgcmV0dXJuIChfLCBtZXRhKSA9PiAoe1xyXG4gICAgICB1cmwsXHJcbiAgICAgIG1ldGhvZCxcclxuICAgICAgLi4ubWV0YVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDcmVhdGVBY3Rpb24gPSAoYWN0aW9uKSA9PlxyXG4gICAgKGNyZWF0ZUFjdGlvbihhY3Rpb24ucHJlZml4VHlwZSwgbnVsbCwgdGhpcy5tZXRhQ3JlYXRvcihhY3Rpb24udXJsLCBhY3Rpb24ubWV0aG9kKSkpO1xyXG5cclxuICBnZXRDcmVhdGVBY3Rpb25zID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uQ3JlYXRvcnMgPSB7fTtcclxuICAgIHRoaXMuYWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB7XHJcbiAgICAgIGFjdGlvbkNyZWF0b3JzW2NhbWVsQ2FzZShhY3Rpb24udHlwZSldID1cclxuICAgICAgICBjcmVhdGVBY3Rpb24oYWN0aW9uLnByZWZpeFR5cGUsIG51bGwsXHJcbiAgICAgICAgICB0aGlzLm1ldGFDcmVhdG9yKGFjdGlvbi51cmwsIGFjdGlvbi5tZXRob2QpKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFjdGlvbkNyZWF0b3JzO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVkdWNlcnMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByZWR1Y2VycyA9IHt9O1xyXG4gICAgdGhpcy5hY3Rpb25zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgcHJlZml4VHlwZSwgdHlwZSB9ID0gaXRlbTtcclxuICAgICAgcmVkdWNlcnNbcHJlZml4VHlwZV0gPSAoc3RhdGUpID0+ICh7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgaXNmZXRjaGluZzogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgICAgcmVkdWNlcnNbYCR7cHJlZml4VHlwZX0ke3RoaXMucmVzdWx0U3VmaXh9YF0gPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBpc2ZldGNoaW5nOiBmYWxzZSxcclxuICAgICAgICBbY2FtZWxDYXNlKGAke3R5cGV9JHt0aGlzLnJlc3VsdFN1Zml4fWApXTogYWN0aW9uLnBheWxvYWRcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBoYW5kbGVBY3Rpb25zKHJlZHVjZXJzLCB0aGlzLm9wdHMuZGVmYXVsdFN0YXRlIHx8IHt9KTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3QgPSByZXF1ZXN0O1xyXG5cclxuICBnZXRXYXRjaFNhZ2EgPSAoYWN0aW9uKSA9PiAodGFrZUV2ZXJ5KGFjdGlvbi5wcmVmaXhUeXBlLCBmdW5jdGlvbiogKGRhdGEpIHtcclxuICAgIHlpZWxkIHJlcXVlc3QoZGF0YSwgeyAuLi5hY3Rpb24uY29uZmlnLCAuLi5SZXEuZGVmYXVsdHMgfSk7XHJcbiAgfSkpXHJcblxyXG4gIGdldFdhdGNoU2FnYXMgPSAoKSA9PiAodGhpcy5hY3Rpb25zLm1hcChhY3Rpb24gPT4gdGhpcy5nZXRXYXRjaFNhZ2EoYWN0aW9uKSkpXHJcblxyXG4gIGdldFVybCA9ICh1cmwpID0+IHtcclxuICAgIGNvbnN0IHsgcHJlZml4VXJsLCBkZWZhdWx0VXJsIH0gPSB0aGlzLm9wdHM7XHJcbiAgICBpZiAodXJsICYmICh1cmwuaW5kZXhPZignaHR0cDovLycpICE9PSAtMSB8fCB1cmwuaW5kZXhPZignaHR0cHM6Ly8nKSAhPT0gLTEpKSByZXR1cm4gdXJsO1xyXG4gICAgaWYgKHVybCkgcmV0dXJuIGAke3ByZWZpeFVybH0ke3VybH1gO1xyXG4gICAgaWYoZGVmYXVsdFVybCkgcmV0dXJuIGRlZmF1bHRVcmw7XHJcbiAgICByZXR1cm4gcHJlZml4VXJsO1xyXG4gIH1cclxuICAvLyB1c2UgPSAoKSA9PiB7XHJcblxyXG4gIC8vIH1cclxufVxyXG5cclxuXHJcblxyXG5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xyXG4gIFJlcS5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICh0eXBlLCB1cmwsIGNvbmZpZyA9IHt9KSB7XHJcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodHlwZSksICdFeHBlY3RlZCB0eXBlIHRvIGJlIGEgc3RyaW5nJyk7XHJcbiAgICBjb25zdCB7IHByZWZpeFVybCwgZGVmYXVsdFVybCB9ID0gdGhpcy5vcHRzO1xyXG4gICAgY29uc3QgYWN0aW9uID0geyBtZXRob2QsIHByZWZpeFR5cGU6IGAke3RoaXMub3B0cy5wcmVmaXh9JHt0eXBlfWAsIHR5cGUsIHVybDogdGhpcy5nZXRVcmwodXJsKSwgY29uZmlnIH07XHJcbiAgICB0aGlzLmFjdGlvbnMucHVzaChhY3Rpb24pO1xyXG5cclxuICAgIHRoaXMuYWN0aW9uQ3JlYXRvcnNbY2FtZWxDYXNlKHR5cGUpXSA9IHRoaXMuZ2V0Q3JlYXRlQWN0aW9uKGFjdGlvbik7XHJcbiAgICB0aGlzLmhhbmRsZUFjdGlvbnMgPSB0aGlzLmdldFJlZHVjZXJzKCk7XHJcbiAgICB0aGlzLndhdGNoU2FnYXMucHVzaCh0aGlzLmdldFdhdGNoU2FnYShhY3Rpb24pKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcbn0pO1xyXG4vLyBBbGlhcyBmb3IgYHJvdXRlci5kZWxldGUoKWAgYmVjYXVzZSBkZWxldGUgaXMgYSByZXNlcnZlZCB3b3JkXHJcblJlcS5wcm90b3R5cGUuZGVsID0gUmVxLnByb3RvdHlwZVsnZGVsZXRlJ107XHJcblxyXG5SZXEuZGVmYXVsdHMgPSBkZWZhdWx0cztcclxuUmVxLmF4aW9zID0gYXhpb3M7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZXE7XHJcbiJdfQ==