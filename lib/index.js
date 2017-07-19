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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtZXRob2RzIiwiUmVxIiwiYWN0aW9uc0RlcHJlY2F0ZWQiLCJvcHRpb25zIiwibWV0YUNyZWF0b3IiLCJ1cmwiLCJtZXRob2QiLCJfIiwibWV0YSIsImdldENyZWF0ZUFjdGlvbiIsImFjdGlvbiIsInByZWZpeFR5cGUiLCJnZXRDcmVhdGVBY3Rpb25zIiwiYWN0aW9uQ3JlYXRvcnMiLCJhY3Rpb25zIiwiZm9yRWFjaCIsInR5cGUiLCJnZXRSZWR1Y2VycyIsInJlZHVjZXJzIiwiaXRlbSIsInN0YXRlIiwiaXNmZXRjaGluZyIsInJlc3VsdFN1Zml4IiwicGF5bG9hZCIsIm9wdHMiLCJkZWZhdWx0U3RhdGUiLCJyZXF1ZXN0IiwiZ2V0V2F0Y2hTYWdhIiwiZGF0YSIsImNvbmZpZyIsImRlZmF1bHRzIiwiZ2V0V2F0Y2hTYWdhcyIsIm1hcCIsImdldFVybCIsInByZWZpeFVybCIsImRlZmF1bHRVcmwiLCJpbmRleE9mIiwicHVzaCIsImNvbnNvbGUiLCJlcnJvciIsInByZWZpeCIsInRvVXBwZXJDYXNlIiwiaGFuZGxlQWN0aW9ucyIsIndhdGNoU2FnYXMiLCJwcm90b3R5cGUiLCJkZWwiLCJheGlvcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBSUE7Ozs7QUFDQTs7Ozs7O0FBSkE7QUFDQTtBQUNBO0FBS0EsSUFBTUEsVUFBVSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixPQUF2QixFQUFnQyxRQUFoQyxDQUFoQjs7SUFFTUMsRztBQWdGSjs7QUFFQTtBQWpGQSxhQUFZQyxpQkFBWixFQUErQkMsT0FBL0IsRUFBd0M7QUFBQTs7QUFBQTs7QUFBQSxPQTBCeENDLFdBMUJ3QyxHQTBCMUIsVUFBQ0MsR0FBRCxFQUF5QjtBQUFBLFFBQW5CQyxNQUFtQix1RUFBVixLQUFVOztBQUNyQyxXQUFPLFVBQUNDLENBQUQsRUFBSUMsSUFBSjtBQUFBO0FBQ0xILGdCQURLO0FBRUxDO0FBRkssU0FHRkUsSUFIRTtBQUFBLEtBQVA7QUFLRCxHQWhDdUM7O0FBQUEsT0FrQ3hDQyxlQWxDd0MsR0FrQ3RCLFVBQUNDLE1BQUQ7QUFBQSxXQUNmLGdDQUFhQSxPQUFPQyxVQUFwQixFQUFnQyxJQUFoQyxFQUFzQyxNQUFLUCxXQUFMLENBQWlCTSxPQUFPTCxHQUF4QixFQUE2QkssT0FBT0osTUFBcEMsQ0FBdEMsQ0FEZTtBQUFBLEdBbENzQjs7QUFBQSxPQXFDeENNLGdCQXJDd0MsR0FxQ3JCLFlBQU07QUFDdkIsUUFBTUMsaUJBQWlCLEVBQXZCO0FBQ0EsVUFBS0MsT0FBTCxDQUFhQyxPQUFiLENBQXFCLGtCQUFVO0FBQzdCRixxQkFBZSx5QkFBVUgsT0FBT00sSUFBakIsQ0FBZixJQUNFLGdDQUFhTixPQUFPQyxVQUFwQixFQUFnQyxJQUFoQyxFQUNFLE1BQUtQLFdBQUwsQ0FBaUJNLE9BQU9MLEdBQXhCLEVBQTZCSyxPQUFPSixNQUFwQyxDQURGLENBREY7QUFHRCxLQUpEO0FBS0EsV0FBT08sY0FBUDtBQUNELEdBN0N1Qzs7QUFBQSxPQStDeENJLFdBL0N3QyxHQStDMUIsWUFBTTtBQUNsQixRQUFNQyxXQUFXLEVBQWpCO0FBQ0EsVUFBS0osT0FBTCxDQUFhQyxPQUFiLENBQXFCLGdCQUFRO0FBQUEsVUFDbkJKLFVBRG1CLEdBQ0VRLElBREYsQ0FDbkJSLFVBRG1CO0FBQUEsVUFDUEssSUFETyxHQUNFRyxJQURGLENBQ1BILElBRE87O0FBRTNCRSxlQUFTUCxVQUFULElBQXVCLFVBQUNTLEtBQUQ7QUFBQSwwQ0FDbEJBLEtBRGtCO0FBRXJCQyxzQkFBWTtBQUZTO0FBQUEsT0FBdkI7QUFJQUgsb0JBQVlQLFVBQVosR0FBeUIsTUFBS1csV0FBOUIsSUFBK0MsVUFBQ0YsS0FBRCxFQUFRVixNQUFSO0FBQUEsMENBQzFDVSxLQUQwQztBQUU3Q0Msc0JBQVk7QUFGaUMsV0FHNUMsOEJBQWFMLElBQWIsR0FBb0IsTUFBS00sV0FBekIsQ0FINEMsRUFHRlosT0FBT2EsT0FITDtBQUFBLE9BQS9DO0FBS0QsS0FYRDtBQVlBLFdBQU8saUNBQWNMLFFBQWQsRUFBd0IsTUFBS00sSUFBTCxDQUFVQyxZQUFWLElBQTBCLEVBQWxELENBQVA7QUFDRCxHQTlEdUM7O0FBQUEsT0FnRXhDQyxPQWhFd0M7O0FBQUEsT0FrRXhDQyxZQWxFd0MsR0FrRXpCLFVBQUNqQixNQUFEO0FBQUEsV0FBYSx3QkFBVUEsT0FBT0MsVUFBakIsNkJBQTZCLGlCQUFXaUIsSUFBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDakQsdUJBQVFBLElBQVIsNkJBQW1CbEIsT0FBT21CLE1BQTFCLEVBQXFDNUIsSUFBSTZCLFFBQXpDLEVBRGlEOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQTdCLEVBQWI7QUFBQSxHQWxFeUI7O0FBQUEsT0FzRXhDQyxhQXRFd0MsR0FzRXhCO0FBQUEsV0FBTyxNQUFLakIsT0FBTCxDQUFha0IsR0FBYixDQUFpQjtBQUFBLGFBQVUsTUFBS0wsWUFBTCxDQUFrQmpCLE1BQWxCLENBQVY7QUFBQSxLQUFqQixDQUFQO0FBQUEsR0F0RXdCOztBQUFBLE9Bd0V4Q3VCLE1BeEV3QyxHQXdFL0IsVUFBQzVCLEdBQUQsRUFBUztBQUFBLGdCQUNrQixNQUFLbUIsSUFEdkI7QUFBQSxRQUNSVSxTQURRLFNBQ1JBLFNBRFE7QUFBQSxRQUNHQyxVQURILFNBQ0dBLFVBREg7O0FBRWhCLFFBQUk5QixRQUFRQSxJQUFJK0IsT0FBSixDQUFZLFNBQVosTUFBMkIsQ0FBQyxDQUE1QixJQUFpQy9CLElBQUkrQixPQUFKLENBQVksVUFBWixNQUE0QixDQUFDLENBQXRFLENBQUosRUFBOEUsT0FBTy9CLEdBQVA7QUFDOUUsUUFBSUEsR0FBSixFQUFTLFlBQVU2QixTQUFWLEdBQXNCN0IsR0FBdEI7QUFDVCxRQUFHOEIsVUFBSCxFQUFlLE9BQU9BLFVBQVA7QUFDZixXQUFPRCxTQUFQO0FBQ0QsR0E5RXVDOztBQUN0QyxPQUFLcEIsT0FBTCxHQUFlLEVBQWY7QUFDQSxPQUFLVSxJQUFMLEdBQVlyQixXQUFXLEVBQXZCO0FBQ0E7QUFDQSxNQUFJLHVCQUFRRCxpQkFBUixDQUFKLEVBQWdDO0FBQUE7O0FBQzlCQSxzQkFBa0JhLE9BQWxCLENBQTBCLGtCQUFVO0FBQUVMLGFBQU9DLFVBQVAsR0FBb0JELE9BQU9NLElBQTNCO0FBQWtDLEtBQXhFO0FBQ0EseUJBQVFxQixJQUFSLGtEQUFnQm5DLGlCQUFoQjtBQUNBb0MsWUFBUUMsS0FBUixDQUFjLHdFQUFkO0FBQ0QsR0FKRCxNQUlPO0FBQ0wsU0FBS2YsSUFBTCxHQUFZdEIscUJBQXFCLEVBQWpDO0FBQ0Q7QUFDRCxPQUFLc0IsSUFBTCxDQUFVVSxTQUFWLEdBQXNCLEtBQUtWLElBQUwsQ0FBVVUsU0FBVixJQUF1QixFQUE3QztBQUNBLE9BQUtWLElBQUwsQ0FBVVcsVUFBVixHQUF1QixLQUFLWCxJQUFMLENBQVVXLFVBQVYsSUFBd0IsRUFBL0M7O0FBRUEsT0FBS2IsV0FBTCxHQUFtQixLQUFLRSxJQUFMLENBQVVGLFdBQVYsSUFBeUIsU0FBNUM7QUFDQSxNQUFJLEtBQUtFLElBQUwsQ0FBVWdCLE1BQWQsRUFBc0I7QUFDcEIsU0FBS2hCLElBQUwsQ0FBVWdCLE1BQVYsR0FBc0IsS0FBS2hCLElBQUwsQ0FBVWdCLE1BQVYsQ0FBaUJDLFdBQWpCLEVBQXRCO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsU0FBS2pCLElBQUwsQ0FBVWdCLE1BQVYsR0FBbUIsRUFBbkI7QUFDRDs7QUFFRCxPQUFLM0IsY0FBTCxHQUFzQixFQUF0QjtBQUNBLE9BQUs2QixhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNELEM7O0FBOERIM0MsUUFBUWUsT0FBUixDQUFnQixVQUFDVCxNQUFELEVBQVk7QUFDMUJMLE1BQUkyQyxTQUFKLENBQWN0QyxNQUFkLElBQXdCLFVBQVVVLElBQVYsRUFBZ0JYLEdBQWhCLEVBQWtDO0FBQUEsUUFBYndCLE1BQWEsdUVBQUosRUFBSTs7QUFDeEQsNkJBQVUsd0JBQVNiLElBQVQsQ0FBVixFQUEwQiw4QkFBMUI7QUFEd0QsaUJBRXRCLEtBQUtRLElBRmlCO0FBQUEsUUFFaERVLFNBRmdELFVBRWhEQSxTQUZnRDtBQUFBLFFBRXJDQyxVQUZxQyxVQUVyQ0EsVUFGcUM7O0FBR3hELFFBQU16QixTQUFTLEVBQUVKLGNBQUYsRUFBVUssaUJBQWUsS0FBS2EsSUFBTCxDQUFVZ0IsTUFBekIsR0FBa0N4QixJQUE1QyxFQUFvREEsVUFBcEQsRUFBMERYLEtBQUssS0FBSzRCLE1BQUwsQ0FBWTVCLEdBQVosQ0FBL0QsRUFBaUZ3QixjQUFqRixFQUFmO0FBQ0EsU0FBS2YsT0FBTCxDQUFhdUIsSUFBYixDQUFrQjNCLE1BQWxCOztBQUVBLFNBQUtHLGNBQUwsQ0FBb0IseUJBQVVHLElBQVYsQ0FBcEIsSUFBdUMsS0FBS1AsZUFBTCxDQUFxQkMsTUFBckIsQ0FBdkM7QUFDQSxTQUFLZ0MsYUFBTCxHQUFxQixLQUFLekIsV0FBTCxFQUFyQjtBQUNBLFNBQUswQixVQUFMLENBQWdCTixJQUFoQixDQUFxQixLQUFLVixZQUFMLENBQWtCakIsTUFBbEIsQ0FBckI7QUFDQSxXQUFPLElBQVA7QUFDRCxHQVZEO0FBV0QsQ0FaRDtBQWFBO0FBQ0FULElBQUkyQyxTQUFKLENBQWNDLEdBQWQsR0FBb0I1QyxJQUFJMkMsU0FBSixDQUFjLFFBQWQsQ0FBcEI7O0FBRUEzQyxJQUFJNkIsUUFBSjtBQUNBN0IsSUFBSTZDLEtBQUo7O2tCQUVlN0MsRyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc1N0cmluZyBmcm9tICdsb2Rhc2gvaXNTdHJpbmcnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IGNhbWVsQ2FzZSBmcm9tICdsb2Rhc2gvY2FtZWxDYXNlJztcbmltcG9ydCBpc0FycmF5IGZyb20gJ2xvZGFzaC9pc0FycmF5JztcbmltcG9ydCB7IGNyZWF0ZUFjdGlvbiwgaGFuZGxlQWN0aW9ucyB9IGZyb20gJ3JlZHV4LWFjdGlvbnMnO1xuaW1wb3J0IHsgY2FsbCwgcHV0LCB0YWtlRXZlcnkgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbi8vIGltcG9ydCB7IGJlZ2luVGFzaywgZW5kVGFzayB9IGZyb20gJ3JlZHV4LW5wcm9ncmVzcyc7XG4vLyBpbXBvcnQgcGF0aFRvUmVnZXhwIGZyb20gJ3BhdGgtdG8tcmVnZXhwJztcbi8vIGltcG9ydCBvbWl0IGZyb20gJ29iamVjdC5vbWl0JztcbmltcG9ydCByZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cyc7XG5cblxuY29uc3QgbWV0aG9kcyA9IFsnZ2V0JywgJ3B1dCcsICdwb3N0JywgJ3BhdGNoJywgJ2RlbGV0ZSddO1xuXG5jbGFzcyBSZXEge1xuICBjb25zdHJ1Y3RvcihhY3Rpb25zRGVwcmVjYXRlZCwgb3B0aW9ucykge1xuICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuICAgIHRoaXMub3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgLy8gVG8gYmUgY29tcGF0aWJsZSB3aXRoIHRoZSBwcmV2aW91cyB2ZXJzaW9uIG9mIDAuMy4wXG4gICAgaWYgKGlzQXJyYXkoYWN0aW9uc0RlcHJlY2F0ZWQpKSB7XG4gICAgICBhY3Rpb25zRGVwcmVjYXRlZC5mb3JFYWNoKGFjdGlvbiA9PiB7IGFjdGlvbi5wcmVmaXhUeXBlID0gYWN0aW9uLnR5cGU7IH0pO1xuICAgICAgYWN0aW9ucy5wdXNoKC4uLmFjdGlvbnNEZXByZWNhdGVkKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IGFjdGlvbnMgcGFyYW0gZGVwcmVjYXRlZCxXZSB3aWxsIGJlIHJlbW92ZWQgaW4gbGF0ZXIgdmVyc2lvbnMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRzID0gYWN0aW9uc0RlcHJlY2F0ZWQgfHwge307XG4gICAgfVxuICAgIHRoaXMub3B0cy5wcmVmaXhVcmwgPSB0aGlzLm9wdHMucHJlZml4VXJsIHx8ICcnO1xuICAgIHRoaXMub3B0cy5kZWZhdWx0VXJsID0gdGhpcy5vcHRzLmRlZmF1bHRVcmwgfHwgJyc7XG5cbiAgICB0aGlzLnJlc3VsdFN1Zml4ID0gdGhpcy5vcHRzLnJlc3VsdFN1Zml4IHx8ICdfUkVTVUxUJztcbiAgICBpZiAodGhpcy5vcHRzLnByZWZpeCkge1xuICAgICAgdGhpcy5vcHRzLnByZWZpeCA9IGAke3RoaXMub3B0cy5wcmVmaXgudG9VcHBlckNhc2UoKX1fYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRzLnByZWZpeCA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aW9uQ3JlYXRvcnMgPSB7fTtcbiAgICB0aGlzLmhhbmRsZUFjdGlvbnMgPSBbXTtcbiAgICB0aGlzLndhdGNoU2FnYXMgPSBbXTtcbiAgfVxuXG4gIG1ldGFDcmVhdG9yID0gKHVybCwgbWV0aG9kID0gJ2dldCcpID0+IHtcbiAgICByZXR1cm4gKF8sIG1ldGEpID0+ICh7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICAuLi5tZXRhXG4gICAgfSk7XG4gIH1cblxuICBnZXRDcmVhdGVBY3Rpb24gPSAoYWN0aW9uKSA9PlxuICAgIChjcmVhdGVBY3Rpb24oYWN0aW9uLnByZWZpeFR5cGUsIG51bGwsIHRoaXMubWV0YUNyZWF0b3IoYWN0aW9uLnVybCwgYWN0aW9uLm1ldGhvZCkpKTtcblxuICBnZXRDcmVhdGVBY3Rpb25zID0gKCkgPT4ge1xuICAgIGNvbnN0IGFjdGlvbkNyZWF0b3JzID0ge307XG4gICAgdGhpcy5hY3Rpb25zLmZvckVhY2goYWN0aW9uID0+IHtcbiAgICAgIGFjdGlvbkNyZWF0b3JzW2NhbWVsQ2FzZShhY3Rpb24udHlwZSldID1cbiAgICAgICAgY3JlYXRlQWN0aW9uKGFjdGlvbi5wcmVmaXhUeXBlLCBudWxsLFxuICAgICAgICAgIHRoaXMubWV0YUNyZWF0b3IoYWN0aW9uLnVybCwgYWN0aW9uLm1ldGhvZCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBhY3Rpb25DcmVhdG9ycztcbiAgfVxuXG4gIGdldFJlZHVjZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlZHVjZXJzID0ge307XG4gICAgdGhpcy5hY3Rpb25zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCB7IHByZWZpeFR5cGUsIHR5cGUgfSA9IGl0ZW07XG4gICAgICByZWR1Y2Vyc1twcmVmaXhUeXBlXSA9IChzdGF0ZSkgPT4gKHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzZmV0Y2hpbmc6IHRydWVcbiAgICAgIH0pO1xuICAgICAgcmVkdWNlcnNbYCR7cHJlZml4VHlwZX0ke3RoaXMucmVzdWx0U3VmaXh9YF0gPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzZmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgICBbY2FtZWxDYXNlKGAke3R5cGV9JHt0aGlzLnJlc3VsdFN1Zml4fWApXTogYWN0aW9uLnBheWxvYWRcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBoYW5kbGVBY3Rpb25zKHJlZHVjZXJzLCB0aGlzLm9wdHMuZGVmYXVsdFN0YXRlIHx8IHt9KTtcbiAgfVxuXG4gIHJlcXVlc3QgPSByZXF1ZXN0O1xuXG4gIGdldFdhdGNoU2FnYSA9IChhY3Rpb24pID0+ICh0YWtlRXZlcnkoYWN0aW9uLnByZWZpeFR5cGUsIGZ1bmN0aW9uKiAoZGF0YSkge1xuICAgIHlpZWxkIHJlcXVlc3QoZGF0YSwgeyAuLi5hY3Rpb24uY29uZmlnLCAuLi5SZXEuZGVmYXVsdHMgfSk7XG4gIH0pKVxuXG4gIGdldFdhdGNoU2FnYXMgPSAoKSA9PiAodGhpcy5hY3Rpb25zLm1hcChhY3Rpb24gPT4gdGhpcy5nZXRXYXRjaFNhZ2EoYWN0aW9uKSkpXG5cbiAgZ2V0VXJsID0gKHVybCkgPT4ge1xuICAgIGNvbnN0IHsgcHJlZml4VXJsLCBkZWZhdWx0VXJsIH0gPSB0aGlzLm9wdHM7XG4gICAgaWYgKHVybCAmJiAodXJsLmluZGV4T2YoJ2h0dHA6Ly8nKSAhPT0gLTEgfHwgdXJsLmluZGV4T2YoJ2h0dHBzOi8vJykgIT09IC0xKSkgcmV0dXJuIHVybDtcbiAgICBpZiAodXJsKSByZXR1cm4gYCR7cHJlZml4VXJsfSR7dXJsfWA7XG4gICAgaWYoZGVmYXVsdFVybCkgcmV0dXJuIGRlZmF1bHRVcmw7XG4gICAgcmV0dXJuIHByZWZpeFVybDtcbiAgfVxuICAvLyB1c2UgPSAoKSA9PiB7XG5cbiAgLy8gfVxufVxuXG5cblxubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgUmVxLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHR5cGUsIHVybCwgY29uZmlnID0ge30pIHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodHlwZSksICdFeHBlY3RlZCB0eXBlIHRvIGJlIGEgc3RyaW5nJyk7XG4gICAgY29uc3QgeyBwcmVmaXhVcmwsIGRlZmF1bHRVcmwgfSA9IHRoaXMub3B0cztcbiAgICBjb25zdCBhY3Rpb24gPSB7IG1ldGhvZCwgcHJlZml4VHlwZTogYCR7dGhpcy5vcHRzLnByZWZpeH0ke3R5cGV9YCwgdHlwZSwgdXJsOiB0aGlzLmdldFVybCh1cmwpLCBjb25maWcgfTtcbiAgICB0aGlzLmFjdGlvbnMucHVzaChhY3Rpb24pO1xuXG4gICAgdGhpcy5hY3Rpb25DcmVhdG9yc1tjYW1lbENhc2UodHlwZSldID0gdGhpcy5nZXRDcmVhdGVBY3Rpb24oYWN0aW9uKTtcbiAgICB0aGlzLmhhbmRsZUFjdGlvbnMgPSB0aGlzLmdldFJlZHVjZXJzKCk7XG4gICAgdGhpcy53YXRjaFNhZ2FzLnB1c2godGhpcy5nZXRXYXRjaFNhZ2EoYWN0aW9uKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG59KTtcbi8vIEFsaWFzIGZvciBgcm91dGVyLmRlbGV0ZSgpYCBiZWNhdXNlIGRlbGV0ZSBpcyBhIHJlc2VydmVkIHdvcmRcblJlcS5wcm90b3R5cGUuZGVsID0gUmVxLnByb3RvdHlwZVsnZGVsZXRlJ107XG5cblJlcS5kZWZhdWx0cyA9IGRlZmF1bHRzO1xuUmVxLmF4aW9zID0gYXhpb3M7XG5cbmV4cG9ydCBkZWZhdWx0IFJlcTtcbiJdfQ==