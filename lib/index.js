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

exports.default = function (actionsDeprecated, options) {
  var _marked = [request].map(_regenerator2.default.mark);

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

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtZXRob2RzIiwiYWN0aW9uc0RlcHJlY2F0ZWQiLCJvcHRpb25zIiwicmVxdWVzdCIsImFjdGlvbnMiLCJvcHRzIiwiZm9yRWFjaCIsImFjdGlvbiIsInByZWZpeFR5cGUiLCJ0eXBlIiwicHVzaCIsImNvbnNvbGUiLCJlcnJvciIsInJlc3VsdFN1Zml4IiwicHJlZml4IiwidG9VcHBlckNhc2UiLCJyZXEiLCJtZXRob2QiLCJ1cmwiLCJhY3Rpb25DcmVhdG9ycyIsImdldENyZWF0ZUFjdGlvbnMiLCJoYW5kbGVBY3Rpb25zIiwiZ2V0UmVkdWNlcnMiLCJ3YXRjaFNhZ2FzIiwiZ2V0V2F0Y2hTYWdhcyIsImRlbCIsIm1ldGFDcmVhdG9yIiwiXyIsIm1ldGEiLCJyZWR1Y2VycyIsIml0ZW0iLCJzdGF0ZSIsImlzZmV0Y2hpbmciLCJwYXlsb2FkIiwiZGVmYXVsdFN0YXRlIiwiZGF0YSIsImFjdGlvblJlc3VsdCIsImtleXMiLCJvbWl0S2V5cyIsImtleSIsIm5hbWUiLCJ0b1BhdGgiLCJjb21waWxlIiwiYXhpb3NDb25maWciLCJwYXJhbXMiLCJyZXMiLCJtYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBR0EsSUFBTUEsVUFBVSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixPQUF2QixFQUFnQyxRQUFoQyxDQUFoQjs7a0JBRWUsVUFBQ0MsaUJBQUQsRUFBb0JDLE9BQXBCLEVBQWdDO0FBQUEsaUJBd0VuQ0MsT0F4RW1DOztBQUM3QyxNQUFNQyxVQUFVLEVBQWhCO0FBQ0EsTUFBSUMsT0FBT0gsV0FBVyxFQUF0QjtBQUNBO0FBQ0EsTUFBSSx1QkFBUUQsaUJBQVIsQ0FBSixFQUFnQztBQUM5QkEsc0JBQWtCSyxPQUFsQixDQUEw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cEIsTUFBSVEsYUFBSixHQUFvQixZQUFNO0FBQ3hCLFdBQU9wQixRQUFRMEMsR0FBUixDQUFZO0FBQUEsYUFBVSx3QkFBVXZDLE9BQU9DLFVBQWpCLEVBQTZCTCxPQUE3QixDQUFWO0FBQUEsS0FBWixDQUFQO0FBQ0QsR0FGRDtBQUdBLFNBQU9hLEdBQVA7QUFDRCxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzU3RyaW5nIGZyb20gJ2xvZGFzaC9pc1N0cmluZyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgY2FtZWxDYXNlIGZyb20gJ2xvZGFzaC9jYW1lbENhc2UnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnbG9kYXNoL2lzQXJyYXknO1xuaW1wb3J0IHsgY3JlYXRlQWN0aW9uLCBoYW5kbGVBY3Rpb25zIH0gZnJvbSAncmVkdXgtYWN0aW9ucyc7XG5pbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgYmVnaW5UYXNrLCBlbmRUYXNrIH0gZnJvbSAncmVkdXgtbnByb2dyZXNzJztcbmltcG9ydCBwYXRoVG9SZWdleHAgZnJvbSAncGF0aC10by1yZWdleHAnO1xuaW1wb3J0IG9taXQgZnJvbSAnb2JqZWN0Lm9taXQnO1xuXG5cbmNvbnN0IG1ldGhvZHMgPSBbJ2dldCcsICdwdXQnLCAncG9zdCcsICdwYXRjaCcsICdkZWxldGUnXTtcblxuZXhwb3J0IGRlZmF1bHQgKGFjdGlvbnNEZXByZWNhdGVkLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBbXTtcbiAgbGV0IG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICAvLyBUbyBiZSBjb21wYXRpYmxlIHdpdGggdGhlIHByZXZpb3VzIHZlcnNpb24gb2YgMC4zLjBcbiAgaWYgKGlzQXJyYXkoYWN0aW9uc0RlcHJlY2F0ZWQpKSB7XG4gICAgYWN0aW9uc0RlcHJlY2F0ZWQuZm9yRWFjaChhY3Rpb24gPT4geyBhY3Rpb24ucHJlZml4VHlwZSA9IGFjdGlvbi50eXBlOyB9KTtcbiAgICBhY3Rpb25zLnB1c2goLi4uYWN0aW9uc0RlcHJlY2F0ZWQpO1xuICAgIGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IGFjdGlvbnMgcGFyYW0gZGVwcmVjYXRlZCxXZSB3aWxsIGJlIHJlbW92ZWQgaW4gbGF0ZXIgdmVyc2lvbnMnKTtcbiAgfSBlbHNlIHtcbiAgICBvcHRzID0gYWN0aW9uc0RlcHJlY2F0ZWQgfHwge307XG4gIH1cblxuICBjb25zdCByZXN1bHRTdWZpeCA9IG9wdHMucmVzdWx0U3VmaXggfHwgJ19SRVNVTFQnO1xuICBpZiAob3B0cy5wcmVmaXgpIHtcbiAgICBvcHRzLnByZWZpeCA9IGAke29wdHMucHJlZml4LnRvVXBwZXJDYXNlKCl9X2A7XG4gIH1cblxuICBjb25zdCByZXEgPSB7fTtcblxuICBtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgIHJlcVttZXRob2RdID0gKHR5cGUsIHVybCkgPT4ge1xuICAgICAgaW52YXJpYW50KFxuICAgICAgICBpc1N0cmluZyh0eXBlKSAmJiBpc1N0cmluZyh1cmwpLFxuICAgICAgICAnRXhwZWN0ZWQgdHlwZSwgdXJsIHRvIGJlIGEgc3RyaW5nJ1xuICAgICAgKTtcbiAgICAgIGFjdGlvbnMucHVzaCh7IG1ldGhvZCwgcHJlZml4VHlwZTogYCR7b3B0cy5wcmVmaXh9JHt0eXBlfWAsIHR5cGUsIHVybCB9KTtcblxuICAgICAgcmVxLmFjdGlvbkNyZWF0b3JzID0gcmVxLmdldENyZWF0ZUFjdGlvbnMoKTtcbiAgICAgIHJlcS5oYW5kbGVBY3Rpb25zID0gcmVxLmdldFJlZHVjZXJzKCk7XG4gICAgICByZXEud2F0Y2hTYWdhcyA9IHJlcS5nZXRXYXRjaFNhZ2FzKCk7XG4gICAgICByZXR1cm4gcmVxO1xuICAgIH07XG4gIH0pO1xuICAvLyBBbGlhcyBmb3IgYHJvdXRlci5kZWxldGUoKWAgYmVjYXVzZSBkZWxldGUgaXMgYSByZXNlcnZlZCB3b3JkXG4gIHJlcS5kZWwgPSByZXFbJ2RlbGV0ZSddO1xuXG4gIGZ1bmN0aW9uIG1ldGFDcmVhdG9yKHVybCwgbWV0aG9kID0gJ2dldCcpIHtcbiAgICByZXR1cm4gKF8sIG1ldGEpID0+ICh7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICAuLi5tZXRhXG4gICAgfSk7XG4gIH1cblxuICByZXEuZ2V0Q3JlYXRlQWN0aW9ucyA9ICgpID0+IHtcbiAgICBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHt9O1xuICAgIGFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgYWN0aW9uQ3JlYXRvcnNbY2FtZWxDYXNlKGFjdGlvbi50eXBlKV0gPVxuICAgICAgICBjcmVhdGVBY3Rpb24oYWN0aW9uLnByZWZpeFR5cGUsIG51bGwsXG4gICAgICAgICAgbWV0YUNyZWF0b3IoYWN0aW9uLnVybCwgYWN0aW9uLm1ldGhvZCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBhY3Rpb25DcmVhdG9ycztcbiAgfVxuXG4gIHJlcS5nZXRSZWR1Y2VycyA9ICgpID0+IHtcbiAgICBjb25zdCByZWR1Y2VycyA9IHt9O1xuICAgIGFjdGlvbnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHsgcHJlZml4VHlwZSwgdHlwZSB9ID0gaXRlbTtcbiAgICAgIHJlZHVjZXJzW3ByZWZpeFR5cGVdID0gKHN0YXRlKSA9PiAoe1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNmZXRjaGluZzogdHJ1ZVxuICAgICAgfSk7XG4gICAgICByZWR1Y2Vyc1tgJHtwcmVmaXhUeXBlfSR7cmVzdWx0U3VmaXh9YF0gPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzZmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgICBbY2FtZWxDYXNlKGAke3R5cGV9JHtyZXN1bHRTdWZpeH1gKV06IGFjdGlvbi5wYXlsb2FkXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gaGFuZGxlQWN0aW9ucyhyZWR1Y2Vycywgb3B0cy5kZWZhdWx0U3RhdGUgfHwge30pO1xuICB9XG5cblxuICBmdW5jdGlvbiogcmVxdWVzdChkYXRhKSB7XG4gICAgY29uc3QgeyB0eXBlLCBwYXlsb2FkLCBtZXRhIH0gPSBkYXRhO1xuICAgIGxldCB1cmwgPSBtZXRhLnVybDtcbiAgICBjb25zdCBhY3Rpb25SZXN1bHQgPSBjcmVhdGVBY3Rpb24oYCR7dHlwZX1fUkVTVUxUYCk7XG4gICAgdHJ5IHtcbiAgICAgIHlpZWxkIHB1dChiZWdpblRhc2soKSk7XG5cbiAgICAgIGNvbnN0IGtleXMgPSBbXTtcbiAgICAgIGNvbnN0IG9taXRLZXlzID0gW107XG4gICAgICBwYXRoVG9SZWdleHAodXJsLCBrZXlzKTtcbiAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4gb21pdEtleXMucHVzaChrZXkubmFtZSkpO1xuICAgICAgY29uc3QgdG9QYXRoID0gcGF0aFRvUmVnZXhwLmNvbXBpbGUodXJsKTtcbiAgICAgIHVybCA9IHRvUGF0aChwYXlsb2FkKTtcbiAgICAgIGxldCBheGlvc0NvbmZpZyA9IHsgbWV0aG9kOiBtZXRhLm1ldGhvZCB9O1xuICAgICAgaWYgKG1ldGEubWV0aG9kID09PSAnZ2V0Jykge1xuICAgICAgICBheGlvc0NvbmZpZy5wYXJhbXMgPSBvbWl0KHBheWxvYWQsIG9taXRLZXlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF4aW9zQ29uZmlnLmRhdGEgPSBvbWl0KHBheWxvYWQsIG9taXRLZXlzKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIGNhbGwoYXhpb3MsIHVybCwgYXhpb3NDb25maWcpO1xuXG4gICAgICB5aWVsZCBwdXQoYWN0aW9uUmVzdWx0KHJlcykpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB5aWVsZCBwdXQoYWN0aW9uUmVzdWx0KGVycm9yKSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHlpZWxkIHB1dChlbmRUYXNrKCkpO1xuICAgIH1cbiAgfVxuXG4gIHJlcS5nZXRXYXRjaFNhZ2FzID0gKCkgPT4ge1xuICAgIHJldHVybiBhY3Rpb25zLm1hcChhY3Rpb24gPT4gdGFrZUV2ZXJ5KGFjdGlvbi5wcmVmaXhUeXBlLCByZXF1ZXN0KSk7XG4gIH1cbiAgcmV0dXJuIHJlcTtcbn1cblxuIl19