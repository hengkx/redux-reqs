'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxActions = require('redux-actions');

var _effects = require('redux-saga/effects');

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _object = require('object.omit');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(request);

function request(data) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var type, payload, meta, url, actionResult, res, keys, omitKeys, toPath, axiosConfig, _res;

  return _regenerator2.default.wrap(function request$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          type = data.type, payload = data.payload, meta = data.meta;
          url = meta.url;
          actionResult = (0, _reduxActions.createAction)(type + '_RESULT');
          _context.prev = 3;

          if (!config.beforeAction) {
            _context.next = 7;
            break;
          }

          _context.next = 7;
          return (0, _effects.put)(config.beforeAction);

        case 7:
          if (!(config.request && (0, _isFunction2.default)(config.request))) {
            _context.next = 15;
            break;
          }

          _context.next = 10;
          return (0, _effects.call)(config.request, data);

        case 10:
          res = _context.sent;
          _context.next = 13;
          return (0, _effects.put)(actionResult(res));

        case 13:
          _context.next = 30;
          break;

        case 15:
          keys = [];
          omitKeys = [];

          try {
            (0, _pathToRegexp2.default)(url, keys);
            keys.forEach(function (key) {
              return omitKeys.push(key.name);
            });
            toPath = _pathToRegexp2.default.compile(url);

            url = toPath(payload);
          } catch (error) {
            console.error('url path-to-regexp throw');
          }

          axiosConfig = { method: meta.method };

          if (meta.method === 'get') {
            axiosConfig.params = (0, _object2.default)(payload, omitKeys);
          } else {
            axiosConfig.data = (0, _object2.default)(payload, omitKeys);
          }
          _context.next = 22;
          return (0, _effects.call)(_axios2.default, url, axiosConfig);

        case 22:
          _res = _context.sent;

          if (!(config.processResult && (0, _isFunction2.default)(config.processResult))) {
            _context.next = 28;
            break;
          }

          _context.next = 26;
          return (0, _effects.put)(actionResult(config.processResult(_res)));

        case 26:
          _context.next = 30;
          break;

        case 28:
          _context.next = 30;
          return (0, _effects.put)(actionResult(_res));

        case 30:
          _context.next = 36;
          break;

        case 32:
          _context.prev = 32;
          _context.t0 = _context['catch'](3);
          _context.next = 36;
          return (0, _effects.put)(actionResult(_context.t0));

        case 36:
          _context.prev = 36;

          if (!config.afterAction) {
            _context.next = 40;
            break;
          }

          _context.next = 40;
          return (0, _effects.put)(config.afterAction);

        case 40:
          return _context.finish(36);

        case 41:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[3, 32, 36, 41]]);
}

exports.default = request;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJkYXRhIiwiY29uZmlnIiwidHlwZSIsInBheWxvYWQiLCJtZXRhIiwidXJsIiwiYWN0aW9uUmVzdWx0IiwiYmVmb3JlQWN0aW9uIiwicmVzIiwia2V5cyIsIm9taXRLZXlzIiwiZm9yRWFjaCIsInB1c2giLCJrZXkiLCJuYW1lIiwidG9QYXRoIiwicGF0aFRvUmVnZXhwIiwiY29tcGlsZSIsImVycm9yIiwiY29uc29sZSIsImF4aW9zQ29uZmlnIiwibWV0aG9kIiwicGFyYW1zIiwiYXhpb3MiLCJwcm9jZXNzUmVzdWx0IiwiYWZ0ZXJBY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O3NEQUVVQSxPOztBQUFWLFNBQVVBLE9BQVYsQ0FBa0JDLElBQWxCO0FBQUEsTUFBd0JDLE1BQXhCLHVFQUFpQyxFQUFqQzs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxjQURWLEdBQ2tDRixJQURsQyxDQUNVRSxJQURWLEVBQ2dCQyxPQURoQixHQUNrQ0gsSUFEbEMsQ0FDZ0JHLE9BRGhCLEVBQ3lCQyxJQUR6QixHQUNrQ0osSUFEbEMsQ0FDeUJJLElBRHpCO0FBRU1DLGFBRk4sR0FFWUQsS0FBS0MsR0FGakI7QUFHUUMsc0JBSFIsR0FHdUIsZ0NBQWdCSixJQUFoQixhQUh2QjtBQUFBOztBQUFBLGVBS1FELE9BQU9NLFlBTGY7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxpQkFLbUMsa0JBQUlOLE9BQU9NLFlBQVgsQ0FMbkM7O0FBQUE7QUFBQSxnQkFNUU4sT0FBT0YsT0FBUCxJQUFrQiwwQkFBV0UsT0FBT0YsT0FBbEIsQ0FOMUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxpQkFPd0IsbUJBQUtFLE9BQU9GLE9BQVosRUFBcUJDLElBQXJCLENBUHhCOztBQUFBO0FBT1lRLGFBUFo7QUFBQTtBQUFBLGlCQVFZLGtCQUFJRixhQUFhRSxHQUFiLENBQUosQ0FSWjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFVWUMsY0FWWixHQVVtQixFQVZuQjtBQVdZQyxrQkFYWixHQVd1QixFQVh2Qjs7QUFZTSxjQUFJO0FBQ0Ysd0NBQWFMLEdBQWIsRUFBa0JJLElBQWxCO0FBQ0FBLGlCQUFLRSxPQUFMLENBQWE7QUFBQSxxQkFBT0QsU0FBU0UsSUFBVCxDQUFjQyxJQUFJQyxJQUFsQixDQUFQO0FBQUEsYUFBYjtBQUNNQyxrQkFISixHQUdhQyx1QkFBYUMsT0FBYixDQUFxQlosR0FBckIsQ0FIYjs7QUFJRkEsa0JBQU1VLE9BQU9aLE9BQVAsQ0FBTjtBQUNELFdBTEQsQ0FLRSxPQUFPZSxLQUFQLEVBQWM7QUFDZEMsb0JBQVFELEtBQVIsQ0FBYywwQkFBZDtBQUNEOztBQUVHRSxxQkFyQlYsR0FxQndCLEVBQUVDLFFBQVFqQixLQUFLaUIsTUFBZixFQXJCeEI7O0FBc0JNLGNBQUlqQixLQUFLaUIsTUFBTCxLQUFnQixLQUFwQixFQUEyQjtBQUN6QkQsd0JBQVlFLE1BQVosR0FBcUIsc0JBQUtuQixPQUFMLEVBQWNPLFFBQWQsQ0FBckI7QUFDRCxXQUZELE1BRU87QUFDTFUsd0JBQVlwQixJQUFaLEdBQW1CLHNCQUFLRyxPQUFMLEVBQWNPLFFBQWQsQ0FBbkI7QUFDRDtBQTFCUDtBQUFBLGlCQTJCd0IsbUJBQUthLGVBQUwsRUFBWWxCLEdBQVosRUFBaUJlLFdBQWpCLENBM0J4Qjs7QUFBQTtBQTJCWVosY0EzQlo7O0FBQUEsZ0JBNEJVUCxPQUFPdUIsYUFBUCxJQUF3QiwwQkFBV3ZCLE9BQU91QixhQUFsQixDQTVCbEM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxpQkE2QmMsa0JBQUlsQixhQUFhTCxPQUFPdUIsYUFBUCxDQUFxQmhCLElBQXJCLENBQWIsQ0FBSixDQTdCZDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGlCQStCYyxrQkFBSUYsYUFBYUUsSUFBYixDQUFKLENBL0JkOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQXNDVSxrQkFBSUYseUJBQUosQ0F0Q1Y7O0FBQUE7QUFBQTs7QUFBQSxlQXdDUUwsT0FBT3dCLFdBeENmO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsaUJBd0NrQyxrQkFBSXhCLE9BQU93QixXQUFYLENBeENsQzs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztrQkE0Q2UxQixPIiwiZmlsZSI6InJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBY3Rpb24sIGhhbmRsZUFjdGlvbnMgfSBmcm9tICdyZWR1eC1hY3Rpb25zJztcbmltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUV2ZXJ5IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJ2xvZGFzaC9pc0Z1bmN0aW9uJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgcGF0aFRvUmVnZXhwIGZyb20gJ3BhdGgtdG8tcmVnZXhwJztcbmltcG9ydCBvbWl0IGZyb20gJ29iamVjdC5vbWl0JztcblxuZnVuY3Rpb24qIHJlcXVlc3QoZGF0YSwgY29uZmlnID0ge30pIHtcbiAgY29uc3QgeyB0eXBlLCBwYXlsb2FkLCBtZXRhIH0gPSBkYXRhO1xuICBsZXQgdXJsID0gbWV0YS51cmw7XG4gIGNvbnN0IGFjdGlvblJlc3VsdCA9IGNyZWF0ZUFjdGlvbihgJHt0eXBlfV9SRVNVTFRgKTtcbiAgdHJ5IHtcbiAgICBpZiAoY29uZmlnLmJlZm9yZUFjdGlvbikgeWllbGQgcHV0KGNvbmZpZy5iZWZvcmVBY3Rpb24pO1xuICAgIGlmIChjb25maWcucmVxdWVzdCAmJiBpc0Z1bmN0aW9uKGNvbmZpZy5yZXF1ZXN0KSkge1xuICAgICAgY29uc3QgcmVzID0geWllbGQgY2FsbChjb25maWcucmVxdWVzdCwgZGF0YSk7XG4gICAgICB5aWVsZCBwdXQoYWN0aW9uUmVzdWx0KHJlcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBrZXlzID0gW107XG4gICAgICBjb25zdCBvbWl0S2V5cyA9IFtdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcGF0aFRvUmVnZXhwKHVybCwga2V5cyk7XG4gICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4gb21pdEtleXMucHVzaChrZXkubmFtZSkpO1xuICAgICAgICBjb25zdCB0b1BhdGggPSBwYXRoVG9SZWdleHAuY29tcGlsZSh1cmwpO1xuICAgICAgICB1cmwgPSB0b1BhdGgocGF5bG9hZCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCd1cmwgcGF0aC10by1yZWdleHAgdGhyb3cnKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGF4aW9zQ29uZmlnID0geyBtZXRob2Q6IG1ldGEubWV0aG9kIH07XG4gICAgICBpZiAobWV0YS5tZXRob2QgPT09ICdnZXQnKSB7XG4gICAgICAgIGF4aW9zQ29uZmlnLnBhcmFtcyA9IG9taXQocGF5bG9hZCwgb21pdEtleXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXhpb3NDb25maWcuZGF0YSA9IG9taXQocGF5bG9hZCwgb21pdEtleXMpO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzID0geWllbGQgY2FsbChheGlvcywgdXJsLCBheGlvc0NvbmZpZyk7XG4gICAgICBpZiAoY29uZmlnLnByb2Nlc3NSZXN1bHQgJiYgaXNGdW5jdGlvbihjb25maWcucHJvY2Vzc1Jlc3VsdCkpIHtcbiAgICAgICAgeWllbGQgcHV0KGFjdGlvblJlc3VsdChjb25maWcucHJvY2Vzc1Jlc3VsdChyZXMpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5aWVsZCBwdXQoYWN0aW9uUmVzdWx0KHJlcykpO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAvLyBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgeWllbGQgcHV0KGFjdGlvblJlc3VsdChlcnJvcikpO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChjb25maWcuYWZ0ZXJBY3Rpb24pIHlpZWxkIHB1dChjb25maWcuYWZ0ZXJBY3Rpb24pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlcXVlc3Q7XG4iXX0=