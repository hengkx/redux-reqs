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

var _marked = [request].map(_regenerator2.default.mark);

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
  }, _marked[0], this, [[3, 32, 36, 41]]);
}

exports.default = request;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJkYXRhIiwiY29uZmlnIiwidHlwZSIsInBheWxvYWQiLCJtZXRhIiwidXJsIiwiYWN0aW9uUmVzdWx0IiwiYmVmb3JlQWN0aW9uIiwicmVzIiwia2V5cyIsIm9taXRLZXlzIiwiZm9yRWFjaCIsInB1c2giLCJrZXkiLCJuYW1lIiwidG9QYXRoIiwiY29tcGlsZSIsImVycm9yIiwiY29uc29sZSIsImF4aW9zQ29uZmlnIiwibWV0aG9kIiwicGFyYW1zIiwicHJvY2Vzc1Jlc3VsdCIsImFmdGVyQWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztlQUVVQSxPOztBQUFWLFNBQVVBLE9BQVYsQ0FBa0JDLElBQWxCO0FBQUEsTUFBd0JDLE1BQXhCLHVFQUFpQyxFQUFqQzs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxjQURWLEdBQ2tDRixJQURsQyxDQUNVRSxJQURWLEVBQ2dCQyxPQURoQixHQUNrQ0gsSUFEbEMsQ0FDZ0JHLE9BRGhCLEVBQ3lCQyxJQUR6QixHQUNrQ0osSUFEbEMsQ0FDeUJJLElBRHpCO0FBRU1DLGFBRk4sR0FFWUQsS0FBS0MsR0FGakI7QUFHUUMsc0JBSFIsR0FHdUIsZ0NBQWdCSixJQUFoQixhQUh2QjtBQUFBOztBQUFBLGVBS1FELE9BQU9NLFlBTGY7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxpQkFLbUMsa0JBQUlOLE9BQU9NLFlBQVgsQ0FMbkM7O0FBQUE7QUFBQSxnQkFNUU4sT0FBT0YsT0FBUCxJQUFrQiwwQkFBV0UsT0FBT0YsT0FBbEIsQ0FOMUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxpQkFPd0IsbUJBQUtFLE9BQU9GLE9BQVosRUFBcUJDLElBQXJCLENBUHhCOztBQUFBO0FBT1lRLGFBUFo7QUFBQTtBQUFBLGlCQVFZLGtCQUFJRixhQUFhRSxHQUFiLENBQUosQ0FSWjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFVWUMsY0FWWixHQVVtQixFQVZuQjtBQVdZQyxrQkFYWixHQVd1QixFQVh2Qjs7QUFZTSxjQUFJO0FBQ0Ysd0NBQWFMLEdBQWIsRUFBa0JJLElBQWxCO0FBQ0FBLGlCQUFLRSxPQUFMLENBQWE7QUFBQSxxQkFBT0QsU0FBU0UsSUFBVCxDQUFjQyxJQUFJQyxJQUFsQixDQUFQO0FBQUEsYUFBYjtBQUNNQyxrQkFISixHQUdhLHVCQUFhQyxPQUFiLENBQXFCWCxHQUFyQixDQUhiOztBQUlGQSxrQkFBTVUsT0FBT1osT0FBUCxDQUFOO0FBQ0QsV0FMRCxDQUtFLE9BQU9jLEtBQVAsRUFBYztBQUNkQyxvQkFBUUQsS0FBUixDQUFjLDBCQUFkO0FBQ0Q7O0FBRUdFLHFCQXJCVixHQXFCd0IsRUFBRUMsUUFBUWhCLEtBQUtnQixNQUFmLEVBckJ4Qjs7QUFzQk0sY0FBSWhCLEtBQUtnQixNQUFMLEtBQWdCLEtBQXBCLEVBQTJCO0FBQ3pCRCx3QkFBWUUsTUFBWixHQUFxQixzQkFBS2xCLE9BQUwsRUFBY08sUUFBZCxDQUFyQjtBQUNELFdBRkQsTUFFTztBQUNMUyx3QkFBWW5CLElBQVosR0FBbUIsc0JBQUtHLE9BQUwsRUFBY08sUUFBZCxDQUFuQjtBQUNEO0FBMUJQO0FBQUEsaUJBMkJ3QixvQ0FBWUwsR0FBWixFQUFpQmMsV0FBakIsQ0EzQnhCOztBQUFBO0FBMkJZWCxjQTNCWjs7QUFBQSxnQkE0QlVQLE9BQU9xQixhQUFQLElBQXdCLDBCQUFXckIsT0FBT3FCLGFBQWxCLENBNUJsQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGlCQTZCYyxrQkFBSWhCLGFBQWFMLE9BQU9xQixhQUFQLENBQXFCZCxJQUFyQixDQUFiLENBQUosQ0E3QmQ7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxpQkErQmMsa0JBQUlGLGFBQWFFLElBQWIsQ0FBSixDQS9CZDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFzQ1Usa0JBQUlGLHlCQUFKLENBdENWOztBQUFBO0FBQUE7O0FBQUEsZUF3Q1FMLE9BQU9zQixXQXhDZjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGlCQXdDa0Msa0JBQUl0QixPQUFPc0IsV0FBWCxDQXhDbEM7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7a0JBNENleEIsTyIsImZpbGUiOiJyZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQWN0aW9uLCBoYW5kbGVBY3Rpb25zIH0gZnJvbSAncmVkdXgtYWN0aW9ucyc7XHJcbmltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUV2ZXJ5IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcclxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnbG9kYXNoL2lzRnVuY3Rpb24nO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgcGF0aFRvUmVnZXhwIGZyb20gJ3BhdGgtdG8tcmVnZXhwJztcclxuaW1wb3J0IG9taXQgZnJvbSAnb2JqZWN0Lm9taXQnO1xyXG5cclxuZnVuY3Rpb24qIHJlcXVlc3QoZGF0YSwgY29uZmlnID0ge30pIHtcclxuICBjb25zdCB7IHR5cGUsIHBheWxvYWQsIG1ldGEgfSA9IGRhdGE7XHJcbiAgbGV0IHVybCA9IG1ldGEudXJsO1xyXG4gIGNvbnN0IGFjdGlvblJlc3VsdCA9IGNyZWF0ZUFjdGlvbihgJHt0eXBlfV9SRVNVTFRgKTtcclxuICB0cnkge1xyXG4gICAgaWYgKGNvbmZpZy5iZWZvcmVBY3Rpb24pIHlpZWxkIHB1dChjb25maWcuYmVmb3JlQWN0aW9uKTtcclxuICAgIGlmIChjb25maWcucmVxdWVzdCAmJiBpc0Z1bmN0aW9uKGNvbmZpZy5yZXF1ZXN0KSkge1xyXG4gICAgICBjb25zdCByZXMgPSB5aWVsZCBjYWxsKGNvbmZpZy5yZXF1ZXN0LCBkYXRhKTtcclxuICAgICAgeWllbGQgcHV0KGFjdGlvblJlc3VsdChyZXMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBbXTtcclxuICAgICAgY29uc3Qgb21pdEtleXMgPSBbXTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBwYXRoVG9SZWdleHAodXJsLCBrZXlzKTtcclxuICAgICAgICBrZXlzLmZvckVhY2goa2V5ID0+IG9taXRLZXlzLnB1c2goa2V5Lm5hbWUpKTtcclxuICAgICAgICBjb25zdCB0b1BhdGggPSBwYXRoVG9SZWdleHAuY29tcGlsZSh1cmwpO1xyXG4gICAgICAgIHVybCA9IHRvUGF0aChwYXlsb2FkKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCd1cmwgcGF0aC10by1yZWdleHAgdGhyb3cnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IGF4aW9zQ29uZmlnID0geyBtZXRob2Q6IG1ldGEubWV0aG9kIH07XHJcbiAgICAgIGlmIChtZXRhLm1ldGhvZCA9PT0gJ2dldCcpIHtcclxuICAgICAgICBheGlvc0NvbmZpZy5wYXJhbXMgPSBvbWl0KHBheWxvYWQsIG9taXRLZXlzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBheGlvc0NvbmZpZy5kYXRhID0gb21pdChwYXlsb2FkLCBvbWl0S2V5cyk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcmVzID0geWllbGQgY2FsbChheGlvcywgdXJsLCBheGlvc0NvbmZpZyk7XHJcbiAgICAgIGlmIChjb25maWcucHJvY2Vzc1Jlc3VsdCAmJiBpc0Z1bmN0aW9uKGNvbmZpZy5wcm9jZXNzUmVzdWx0KSkge1xyXG4gICAgICAgIHlpZWxkIHB1dChhY3Rpb25SZXN1bHQoY29uZmlnLnByb2Nlc3NSZXN1bHQocmVzKSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHlpZWxkIHB1dChhY3Rpb25SZXN1bHQocmVzKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnZXJyb3InKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIHlpZWxkIHB1dChhY3Rpb25SZXN1bHQoZXJyb3IpKTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgaWYgKGNvbmZpZy5hZnRlckFjdGlvbikgeWllbGQgcHV0KGNvbmZpZy5hZnRlckFjdGlvbik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXF1ZXN0O1xyXG4iXX0=