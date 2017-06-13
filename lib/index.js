'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _reduxNprogress = require('redux-nprogress');

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _object = require('object.omit');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = ['get', 'put', 'post', 'patch', 'delete'];

var Req = function Req(actionsDeprecated, options) {
  var _marked = [request].map(_regenerator2.default.mark);

  (0, _classCallCheck3.default)(this, Req);

  var actions = [];
  var opts = options || {};
  // To be compatible with the previous version of 0.3.0
  if ((0, _isArray2.default)(actionsDeprecated)) {
    actionsDeprecated.forEach(function (action) {
      action.prefixType = action.type;
    });
    actions.push.apply(actions, (0, _toConsumableArray3.default)(actionsDeprecated));
    console.error('Warning: actions param deprecated,We will be removed in later versions');
  } else {
    opts = actionsDeprecated || {};
  }

  var resultSufix = opts.resultSufix || '_RESULT';
  if (opts.prefix) {
    opts.prefix = opts.prefix.toUpperCase() + '_';
  }

  var req = {};

  methods.forEach(function (method) {
    req[method] = function (type, url) {
      (0, _invariant2.default)((0, _isString2.default)(type) && (0, _isString2.default)(url), 'Expected type, url to be a string');
      console.log(Req.defaultConfig);
      actions.push({ method: method, prefixType: '' + opts.prefix + type, type: type, url: url });

      req.actionCreators = req.getCreateActions();
      req.handleActions = req.getReducers();
      req.watchSagas = req.getWatchSagas();
      return req;
    };
  });
  // Alias for `router.delete()` because delete is a reserved word
  req.del = req['delete'];

  function metaCreator(url) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';

    return function (_, meta) {
      return (0, _extends4.default)({
        url: url,
        method: method
      }, meta);
    };
  }

  req.getCreateActions = function () {
    var actionCreators = {};
    actions.forEach(function (action) {
      actionCreators[(0, _camelCase2.default)(action.type)] = (0, _reduxActions.createAction)(action.prefixType, null, metaCreator(action.url, action.method));
    });
    return actionCreators;
  };

  req.getReducers = function () {
    var reducers = {};
    actions.forEach(function (item) {
      var prefixType = item.prefixType,
          type = item.type;

      reducers[prefixType] = function (state) {
        return (0, _extends4.default)({}, state, {
          isfetching: true
        });
      };
      reducers['' + prefixType + resultSufix] = function (state, action) {
        return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({
          isfetching: false
        }, (0, _camelCase2.default)('' + type + resultSufix), action.payload));
      };
    });
    return (0, _reduxActions.handleActions)(reducers, opts.defaultState || {});
  };

  function request(data) {
    var type, payload, meta, url, actionResult, keys, omitKeys, toPath, axiosConfig, res;
    return _regenerator2.default.wrap(function request$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = data.type, payload = data.payload, meta = data.meta;
            url = meta.url;
            actionResult = (0, _reduxActions.createAction)(type + '_RESULT');
            _context.prev = 3;
            _context.next = 6;
            return (0, _effects.put)((0, _reduxNprogress.beginTask)());

          case 6:
            keys = [];
            omitKeys = [];

            (0, _pathToRegexp2.default)(url, keys);
            keys.forEach(function (key) {
              return omitKeys.push(key.name);
            });
            toPath = _pathToRegexp2.default.compile(url);

            url = toPath(payload);
            axiosConfig = { method: meta.method };

            if (meta.method === 'get') {
              axiosConfig.params = (0, _object2.default)(payload, omitKeys);
            } else {
              axiosConfig.data = (0, _object2.default)(payload, omitKeys);
            }
            _context.next = 16;
            return (0, _effects.call)(_axios2.default, url, axiosConfig);

          case 16:
            res = _context.sent;
            _context.next = 19;
            return (0, _effects.put)(actionResult(res));

          case 19:
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context['catch'](3);
            _context.next = 25;
            return (0, _effects.put)(actionResult(_context.t0));

          case 25:
            _context.prev = 25;
            _context.next = 28;
            return (0, _effects.put)((0, _reduxNprogress.endTask)());

          case 28:
            return _context.finish(25);

          case 29:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[3, 21, 25, 29]]);
  }

  req.getWatchSagas = function () {
    return actions.map(function (action) {
      return (0, _effects.takeEvery)(action.prefixType, request);
    });
  };
  return req;
};

Req.defaultConfig = { a: 1 };
exports.default = Req;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtZXRob2RzIiwiUmVxIiwiYWN0aW9uc0RlcHJlY2F0ZWQiLCJvcHRpb25zIiwicmVxdWVzdCIsImFjdGlvbnMiLCJvcHRzIiwiZm9yRWFjaCIsImFjdGlvbiIsInByZWZpeFR5cGUiLCJ0eXBlIiwicHVzaCIsImNvbnNvbGUiLCJlcnJvciIsInJlc3VsdFN1Zml4IiwicHJlZml4IiwidG9VcHBlckNhc2UiLCJyZXEiLCJtZXRob2QiLCJ1cmwiLCJsb2ciLCJkZWZhdWx0Q29uZmlnIiwiYWN0aW9uQ3JlYXRvcnMiLCJnZXRDcmVhdGVBY3Rpb25zIiwiaGFuZGxlQWN0aW9ucyIsImdldFJlZHVjZXJzIiwid2F0Y2hTYWdhcyIsImdldFdhdGNoU2FnYXMiLCJkZWwiLCJtZXRhQ3JlYXRvciIsIl8iLCJtZXRhIiwicmVkdWNlcnMiLCJpdGVtIiwic3RhdGUiLCJpc2ZldGNoaW5nIiwicGF5bG9hZCIsImRlZmF1bHRTdGF0ZSIsImRhdGEiLCJhY3Rpb25SZXN1bHQiLCJrZXlzIiwib21pdEtleXMiLCJrZXkiLCJuYW1lIiwidG9QYXRoIiwiY29tcGlsZSIsImF4aW9zQ29uZmlnIiwicGFyYW1zIiwicmVzIiwibWFwIiwiYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBR0EsSUFBTUEsVUFBVSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixPQUF2QixFQUFnQyxRQUFoQyxDQUFoQjs7SUFFTUMsRyxHQUVKLGFBQVlDLGlCQUFaLEVBQStCQyxPQUEvQixFQUF3QztBQUFBLGlCQXlFNUJDLE9BekU0Qjs7QUFBQTs7QUFDdEMsTUFBTUMsVUFBVSxFQUFoQjtBQUNBLE1BQUlDLE9BQU9ILFdBQVcsRUFBdEI7QUFDQTtBQUNBLE1BQUks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QUFBQTtBQUFBLG1CQXlCVSxrQkFBSSw4QkFBSixDQXpCVjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTZCQXRCLE1BQUlVLGFBQUosR0FBb0IsWUFBTTtBQUN4QixXQUFPdEIsUUFBUTRDLEdBQVIsQ0FBWTtBQUFBLGFBQVUsd0JBQVV6QyxPQUFPQyxVQUFqQixFQUE2QkwsT0FBN0IsQ0FBVjtBQUFBLEtBQVosQ0FBUDtBQUNELEdBRkQ7QUFHQSxTQUFPYSxHQUFQO0FBQ0QsQzs7QUE1R0doQixHLENBQ0dvQixhLEdBQWdCLEVBQUU2QixHQUFHLENBQUwsRTtrQkE4R1ZqRCxHIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzU3RyaW5nIGZyb20gJ2xvZGFzaC9pc1N0cmluZyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgY2FtZWxDYXNlIGZyb20gJ2xvZGFzaC9jYW1lbENhc2UnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnbG9kYXNoL2lzQXJyYXknO1xuaW1wb3J0IHsgY3JlYXRlQWN0aW9uLCBoYW5kbGVBY3Rpb25zIH0gZnJvbSAncmVkdXgtYWN0aW9ucyc7XG5pbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgYmVnaW5UYXNrLCBlbmRUYXNrIH0gZnJvbSAncmVkdXgtbnByb2dyZXNzJztcbmltcG9ydCBwYXRoVG9SZWdleHAgZnJvbSAncGF0aC10by1yZWdleHAnO1xuaW1wb3J0IG9taXQgZnJvbSAnb2JqZWN0Lm9taXQnO1xuXG5cbmNvbnN0IG1ldGhvZHMgPSBbJ2dldCcsICdwdXQnLCAncG9zdCcsICdwYXRjaCcsICdkZWxldGUnXTtcblxuY2xhc3MgUmVxIHtcbiAgc3RhdGljIGRlZmF1bHRDb25maWcgPSB7IGE6IDEgfVxuICBjb25zdHJ1Y3RvcihhY3Rpb25zRGVwcmVjYXRlZCwgb3B0aW9ucykge1xuICAgIGNvbnN0IGFjdGlvbnMgPSBbXTtcbiAgICBsZXQgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgLy8gVG8gYmUgY29tcGF0aWJsZSB3aXRoIHRoZSBwcmV2aW91cyB2ZXJzaW9uIG9mIDAuMy4wXG4gICAgaWYgKGlzQXJyYXkoYWN0aW9uc0RlcHJlY2F0ZWQpKSB7XG4gICAgICBhY3Rpb25zRGVwcmVjYXRlZC5mb3JFYWNoKGFjdGlvbiA9PiB7IGFjdGlvbi5wcmVmaXhUeXBlID0gYWN0aW9uLnR5cGU7IH0pO1xuICAgICAgYWN0aW9ucy5wdXNoKC4uLmFjdGlvbnNEZXByZWNhdGVkKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IGFjdGlvbnMgcGFyYW0gZGVwcmVjYXRlZCxXZSB3aWxsIGJlIHJlbW92ZWQgaW4gbGF0ZXIgdmVyc2lvbnMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0cyA9IGFjdGlvbnNEZXByZWNhdGVkIHx8IHt9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdFN1Zml4ID0gb3B0cy5yZXN1bHRTdWZpeCB8fCAnX1JFU1VMVCc7XG4gICAgaWYgKG9wdHMucHJlZml4KSB7XG4gICAgICBvcHRzLnByZWZpeCA9IGAke29wdHMucHJlZml4LnRvVXBwZXJDYXNlKCl9X2A7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxID0ge307XG5cbiAgICBtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgICAgcmVxW21ldGhvZF0gPSAodHlwZSwgdXJsKSA9PiB7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICBpc1N0cmluZyh0eXBlKSAmJiBpc1N0cmluZyh1cmwpLFxuICAgICAgICAgICdFeHBlY3RlZCB0eXBlLCB1cmwgdG8gYmUgYSBzdHJpbmcnXG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKFJlcS5kZWZhdWx0Q29uZmlnKTtcbiAgICAgICAgYWN0aW9ucy5wdXNoKHsgbWV0aG9kLCBwcmVmaXhUeXBlOiBgJHtvcHRzLnByZWZpeH0ke3R5cGV9YCwgdHlwZSwgdXJsIH0pO1xuXG4gICAgICAgIHJlcS5hY3Rpb25DcmVhdG9ycyA9IHJlcS5nZXRDcmVhdGVBY3Rpb25zKCk7XG4gICAgICAgIHJlcS5oYW5kbGVBY3Rpb25zID0gcmVxLmdldFJlZHVjZXJzKCk7XG4gICAgICAgIHJlcS53YXRjaFNhZ2FzID0gcmVxLmdldFdhdGNoU2FnYXMoKTtcbiAgICAgICAgcmV0dXJuIHJlcTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgLy8gQWxpYXMgZm9yIGByb3V0ZXIuZGVsZXRlKClgIGJlY2F1c2UgZGVsZXRlIGlzIGEgcmVzZXJ2ZWQgd29yZFxuICAgIHJlcS5kZWwgPSByZXFbJ2RlbGV0ZSddO1xuXG4gICAgZnVuY3Rpb24gbWV0YUNyZWF0b3IodXJsLCBtZXRob2QgPSAnZ2V0Jykge1xuICAgICAgcmV0dXJuIChfLCBtZXRhKSA9PiAoe1xuICAgICAgICB1cmwsXG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgLi4ubWV0YVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVxLmdldENyZWF0ZUFjdGlvbnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHt9O1xuICAgICAgYWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB7XG4gICAgICAgIGFjdGlvbkNyZWF0b3JzW2NhbWVsQ2FzZShhY3Rpb24udHlwZSldID1cbiAgICAgICAgICBjcmVhdGVBY3Rpb24oYWN0aW9uLnByZWZpeFR5cGUsIG51bGwsXG4gICAgICAgICAgICBtZXRhQ3JlYXRvcihhY3Rpb24udXJsLCBhY3Rpb24ubWV0aG9kKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBhY3Rpb25DcmVhdG9ycztcbiAgICB9XG5cbiAgICByZXEuZ2V0UmVkdWNlcnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCByZWR1Y2VycyA9IHt9O1xuICAgICAgYWN0aW9ucy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCB7IHByZWZpeFR5cGUsIHR5cGUgfSA9IGl0ZW07XG4gICAgICAgIHJlZHVjZXJzW3ByZWZpeFR5cGVdID0gKHN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGlzZmV0Y2hpbmc6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJlZHVjZXJzW2Ake3ByZWZpeFR5cGV9JHtyZXN1bHRTdWZpeH1gXSA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGlzZmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgICAgIFtjYW1lbENhc2UoYCR7dHlwZX0ke3Jlc3VsdFN1Zml4fWApXTogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoYW5kbGVBY3Rpb25zKHJlZHVjZXJzLCBvcHRzLmRlZmF1bHRTdGF0ZSB8fCB7fSk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiogcmVxdWVzdChkYXRhKSB7XG4gICAgICBjb25zdCB7IHR5cGUsIHBheWxvYWQsIG1ldGEgfSA9IGRhdGE7XG4gICAgICBsZXQgdXJsID0gbWV0YS51cmw7XG4gICAgICBjb25zdCBhY3Rpb25SZXN1bHQgPSBjcmVhdGVBY3Rpb24oYCR7dHlwZX1fUkVTVUxUYCk7XG4gICAgICB0cnkge1xuICAgICAgICB5aWVsZCBwdXQoYmVnaW5UYXNrKCkpO1xuXG4gICAgICAgIGNvbnN0IGtleXMgPSBbXTtcbiAgICAgICAgY29uc3Qgb21pdEtleXMgPSBbXTtcbiAgICAgICAgcGF0aFRvUmVnZXhwKHVybCwga2V5cyk7XG4gICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4gb21pdEtleXMucHVzaChrZXkubmFtZSkpO1xuICAgICAgICBjb25zdCB0b1BhdGggPSBwYXRoVG9SZWdleHAuY29tcGlsZSh1cmwpO1xuICAgICAgICB1cmwgPSB0b1BhdGgocGF5bG9hZCk7XG4gICAgICAgIGxldCBheGlvc0NvbmZpZyA9IHsgbWV0aG9kOiBtZXRhLm1ldGhvZCB9O1xuICAgICAgICBpZiAobWV0YS5tZXRob2QgPT09ICdnZXQnKSB7XG4gICAgICAgICAgYXhpb3NDb25maWcucGFyYW1zID0gb21pdChwYXlsb2FkLCBvbWl0S2V5cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXhpb3NDb25maWcuZGF0YSA9IG9taXQocGF5bG9hZCwgb21pdEtleXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIGNhbGwoYXhpb3MsIHVybCwgYXhpb3NDb25maWcpO1xuXG4gICAgICAgIHlpZWxkIHB1dChhY3Rpb25SZXN1bHQocmVzKSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB5aWVsZCBwdXQoYWN0aW9uUmVzdWx0KGVycm9yKSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB5aWVsZCBwdXQoZW5kVGFzaygpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXEuZ2V0V2F0Y2hTYWdhcyA9ICgpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb25zLm1hcChhY3Rpb24gPT4gdGFrZUV2ZXJ5KGFjdGlvbi5wcmVmaXhUeXBlLCByZXF1ZXN0KSk7XG4gICAgfVxuICAgIHJldHVybiByZXE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVxO1xuIl19