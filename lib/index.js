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

  this.getWatchSagas = function () {
    return _this.actions.map(function (action) {
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
    });
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
  }
};

methods.forEach(function (method) {
  Req.prototype[method] = function (type, url) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    (0, _invariant2.default)((0, _isString2.default)(type), 'Expected type to be a string');
    var _opts = this.opts,
        prefixUrl = _opts.prefixUrl,
        defaultUrl = _opts.defaultUrl;

    this.actions.push({ method: method, prefixType: '' + this.opts.prefix + type, type: type, url: url || '' + prefixUrl + defaultUrl, config: config });
    this.actionCreators = this.getCreateActions();
    this.handleActions = this.getReducers();
    this.watchSagas = this.getWatchSagas();
    return this;
  };
});
// Alias for `router.delete()` because delete is a reserved word
Req.prototype.del = Req.prototype['delete'];

Req.defaults = _defaults2.default;
Req.axios = _axios2.default;

exports.default = Req;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtZXRob2RzIiwiUmVxIiwiYWN0aW9uc0RlcHJlY2F0ZWQiLCJvcHRpb25zIiwibWV0YUNyZWF0b3IiLCJ1cmwiLCJtZXRob2QiLCJfIiwibWV0YSIsImdldENyZWF0ZUFjdGlvbnMiLCJhY3Rpb25DcmVhdG9ycyIsImFjdGlvbnMiLCJmb3JFYWNoIiwiYWN0aW9uIiwidHlwZSIsInByZWZpeFR5cGUiLCJnZXRSZWR1Y2VycyIsInJlZHVjZXJzIiwiaXRlbSIsInN0YXRlIiwiaXNmZXRjaGluZyIsInJlc3VsdFN1Zml4IiwicGF5bG9hZCIsIm9wdHMiLCJkZWZhdWx0U3RhdGUiLCJyZXF1ZXN0IiwiZ2V0V2F0Y2hTYWdhcyIsIm1hcCIsImRhdGEiLCJjb25maWciLCJkZWZhdWx0cyIsInB1c2giLCJjb25zb2xlIiwiZXJyb3IiLCJwcmVmaXhVcmwiLCJkZWZhdWx0VXJsIiwicHJlZml4IiwidG9VcHBlckNhc2UiLCJwcm90b3R5cGUiLCJoYW5kbGVBY3Rpb25zIiwid2F0Y2hTYWdhcyIsImRlbCIsImF4aW9zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFJQTs7OztBQUNBOzs7Ozs7QUFKQTtBQUNBO0FBQ0E7QUFLQSxJQUFNQSxVQUFVLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxNQUFmLEVBQXVCLE9BQXZCLEVBQWdDLFFBQWhDLENBQWhCOztJQUVNQyxHOztBQStESjs7QUFFQTtBQWhFQSxhQUFZQyxpQkFBWixFQUErQkMsT0FBL0IsRUFBd0M7QUFBQTs7QUFBQTs7QUFBQSxPQW9CeENDLFdBcEJ3QyxHQW9CMUIsVUFBQ0MsR0FBRCxFQUF5QjtBQUFBLFFBQW5CQyxNQUFtQix1RUFBVixLQUFVOztBQUNyQyxXQUFPLFVBQUNDLENBQUQsRUFBSUMsSUFBSjtBQUFBO0FBQ0xILGdC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Q0FBZ0IsVUFBQ04sTUFBRCxFQUFZO0FBQzFCTCxNQUFJcUMsU0FBSixDQUFjaEMsTUFBZCxJQUF3QixVQUFVUSxJQUFWLEVBQWdCVCxHQUFoQixFQUFrQztBQUFBLFFBQWJ3QixNQUFhLHVFQUFKLEVBQUk7O0FBQ3hELDZCQUFVLHdCQUFTZixJQUFULENBQVYsRUFBMEIsOEJBQTFCO0FBRHdELGdCQUV0QixLQUFLUyxJQUZpQjtBQUFBLFFBRWhEVyxTQUZnRCxTQUVoREEsU0FGZ0Q7QUFBQSxRQUVyQ0MsVUFGcUMsU0FFckNBLFVBRnFDOztBQUd4RCxTQUFLeEIsT0FBTCxDQUFhb0IsSUFBYixDQUFrQixFQUFFekIsY0FBRixFQUFVUyxpQkFBZSxLQUFLUSxJQUFMLENBQVVhLE1BQXpCLEdBQWtDdEIsSUFBNUMsRUFBb0RBLFVBQXBELEVBQTBEVCxLQUFLQSxZQUFVNkIsU0FBVixHQUFzQkMsVUFBckYsRUFBbUdOLGNBQW5HLEVBQWxCO0FBQ0EsU0FBS25CLGNBQUwsR0FBc0IsS0FBS0QsZ0JBQUwsRUFBdEI7QUFDQSxTQUFLOEIsYUFBTCxHQUFxQixLQUFLdkIsV0FBTCxFQUFyQjtBQUNBLFNBQUt3QixVQUFMLEdBQWtCLEtBQUtkLGFBQUwsRUFBbEI7QUFDQSxXQUFPLElBQVA7QUFDRCxHQVJEO0FBU0QsQ0FWRDtBQVdBO0FBQ0F6QixJQUFJcUMsU0FBSixDQUFjRyxHQUFkLEdBQW9CeEMsSUFBSXFDLFNBQUosQ0FBYyxRQUFkLENBQXBCOztBQUVBckMsSUFBSTZCLFFBQUo7QUFDQTdCLElBQUl5QyxLQUFKOztrQkFFZXpDLEciLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNTdHJpbmcgZnJvbSAnbG9kYXNoL2lzU3RyaW5nJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBjYW1lbENhc2UgZnJvbSAnbG9kYXNoL2NhbWVsQ2FzZSc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICdsb2Rhc2gvaXNBcnJheSc7XG5pbXBvcnQgeyBjcmVhdGVBY3Rpb24sIGhhbmRsZUFjdGlvbnMgfSBmcm9tICdyZWR1eC1hY3Rpb25zJztcbmltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUV2ZXJ5IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG4vLyBpbXBvcnQgeyBiZWdpblRhc2ssIGVuZFRhc2sgfSBmcm9tICdyZWR1eC1ucHJvZ3Jlc3MnO1xuLy8gaW1wb3J0IHBhdGhUb1JlZ2V4cCBmcm9tICdwYXRoLXRvLXJlZ2V4cCc7XG4vLyBpbXBvcnQgb21pdCBmcm9tICdvYmplY3Qub21pdCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMnO1xuXG5cbmNvbnN0IG1ldGhvZHMgPSBbJ2dldCcsICdwdXQnLCAncG9zdCcsICdwYXRjaCcsICdkZWxldGUnXTtcblxuY2xhc3MgUmVxIHtcbiAgY29uc3RydWN0b3IoYWN0aW9uc0RlcHJlY2F0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBbXTtcbiAgICB0aGlzLm9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICAgIC8vIFRvIGJlIGNvbXBhdGlibGUgd2l0aCB0aGUgcHJldmlvdXMgdmVyc2lvbiBvZiAwLjMuMFxuICAgIGlmIChpc0FycmF5KGFjdGlvbnNEZXByZWNhdGVkKSkge1xuICAgICAgYWN0aW9uc0RlcHJlY2F0ZWQuZm9yRWFjaChhY3Rpb24gPT4geyBhY3Rpb24ucHJlZml4VHlwZSA9IGFjdGlvbi50eXBlOyB9KTtcbiAgICAgIGFjdGlvbnMucHVzaCguLi5hY3Rpb25zRGVwcmVjYXRlZCk7XG4gICAgICBjb25zb2xlLmVycm9yKCdXYXJuaW5nOiBhY3Rpb25zIHBhcmFtIGRlcHJlY2F0ZWQsV2Ugd2lsbCBiZSByZW1vdmVkIGluIGxhdGVyIHZlcnNpb25zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0cyA9IGFjdGlvbnNEZXByZWNhdGVkIHx8IHt9O1xuICAgIH1cbiAgICB0aGlzLm9wdHMucHJlZml4VXJsID0gdGhpcy5vcHRzLnByZWZpeFVybCB8fCAnJztcbiAgICB0aGlzLm9wdHMuZGVmYXVsdFVybCA9IHRoaXMub3B0cy5kZWZhdWx0VXJsIHx8ICcnO1xuXG4gICAgdGhpcy5yZXN1bHRTdWZpeCA9IHRoaXMub3B0cy5yZXN1bHRTdWZpeCB8fCAnX1JFU1VMVCc7XG4gICAgaWYgKHRoaXMub3B0cy5wcmVmaXgpIHtcbiAgICAgIHRoaXMub3B0cy5wcmVmaXggPSBgJHt0aGlzLm9wdHMucHJlZml4LnRvVXBwZXJDYXNlKCl9X2A7XG4gICAgfVxuICB9XG5cbiAgbWV0YUNyZWF0b3IgPSAodXJsLCBtZXRob2QgPSAnZ2V0JykgPT4ge1xuICAgIHJldHVybiAoXywgbWV0YSkgPT4gKHtcbiAgICAgIHVybCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIC4uLm1ldGFcbiAgICB9KTtcbiAgfVxuXG4gIGdldENyZWF0ZUFjdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgYWN0aW9uQ3JlYXRvcnMgPSB7fTtcbiAgICB0aGlzLmFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgYWN0aW9uQ3JlYXRvcnNbY2FtZWxDYXNlKGFjdGlvbi50eXBlKV0gPVxuICAgICAgICBjcmVhdGVBY3Rpb24oYWN0aW9uLnByZWZpeFR5cGUsIG51bGwsXG4gICAgICAgICAgdGhpcy5tZXRhQ3JlYXRvcihhY3Rpb24udXJsLCBhY3Rpb24ubWV0aG9kKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFjdGlvbkNyZWF0b3JzO1xuICB9XG5cbiAgZ2V0UmVkdWNlcnMgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVkdWNlcnMgPSB7fTtcbiAgICB0aGlzLmFjdGlvbnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHsgcHJlZml4VHlwZSwgdHlwZSB9ID0gaXRlbTtcbiAgICAgIHJlZHVjZXJzW3ByZWZpeFR5cGVdID0gKHN0YXRlKSA9PiAoe1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNmZXRjaGluZzogdHJ1ZVxuICAgICAgfSk7XG4gICAgICByZWR1Y2Vyc1tgJHtwcmVmaXhUeXBlfSR7dGhpcy5yZXN1bHRTdWZpeH1gXSA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNmZXRjaGluZzogZmFsc2UsXG4gICAgICAgIFtjYW1lbENhc2UoYCR7dHlwZX0ke3RoaXMucmVzdWx0U3VmaXh9YCldOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGhhbmRsZUFjdGlvbnMocmVkdWNlcnMsIHRoaXMub3B0cy5kZWZhdWx0U3RhdGUgfHwge30pO1xuICB9XG5cbiAgcmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGdldFdhdGNoU2FnYXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5tYXAoYWN0aW9uID0+IHRha2VFdmVyeShhY3Rpb24ucHJlZml4VHlwZSwgZnVuY3Rpb24qIChkYXRhKSB7XG4gICAgICB5aWVsZCByZXF1ZXN0KGRhdGEsIHsgLi4uYWN0aW9uLmNvbmZpZywgLi4uUmVxLmRlZmF1bHRzIH0pO1xuICAgIH0pKTtcbiAgfVxuXG4gIC8vIHVzZSA9ICgpID0+IHtcblxuICAvLyB9XG59XG5cblxubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgUmVxLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHR5cGUsIHVybCwgY29uZmlnID0ge30pIHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodHlwZSksICdFeHBlY3RlZCB0eXBlIHRvIGJlIGEgc3RyaW5nJyk7XG4gICAgY29uc3QgeyBwcmVmaXhVcmwsIGRlZmF1bHRVcmwgfSA9IHRoaXMub3B0cztcbiAgICB0aGlzLmFjdGlvbnMucHVzaCh7IG1ldGhvZCwgcHJlZml4VHlwZTogYCR7dGhpcy5vcHRzLnByZWZpeH0ke3R5cGV9YCwgdHlwZSwgdXJsOiB1cmwgfHwgYCR7cHJlZml4VXJsfSR7ZGVmYXVsdFVybH1gLCBjb25maWcgfSk7XG4gICAgdGhpcy5hY3Rpb25DcmVhdG9ycyA9IHRoaXMuZ2V0Q3JlYXRlQWN0aW9ucygpO1xuICAgIHRoaXMuaGFuZGxlQWN0aW9ucyA9IHRoaXMuZ2V0UmVkdWNlcnMoKTtcbiAgICB0aGlzLndhdGNoU2FnYXMgPSB0aGlzLmdldFdhdGNoU2FnYXMoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbn0pO1xuLy8gQWxpYXMgZm9yIGByb3V0ZXIuZGVsZXRlKClgIGJlY2F1c2UgZGVsZXRlIGlzIGEgcmVzZXJ2ZWQgd29yZFxuUmVxLnByb3RvdHlwZS5kZWwgPSBSZXEucHJvdG90eXBlWydkZWxldGUnXTtcblxuUmVxLmRlZmF1bHRzID0gZGVmYXVsdHM7XG5SZXEuYXhpb3MgPSBheGlvcztcblxuZXhwb3J0IGRlZmF1bHQgUmVxO1xuIl19