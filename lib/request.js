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

function request(data, config) {
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
          return (0, _effects.call)(config.request);

        case 10:
          res = _context.sent;
          _context.next = 13;
          return (0, _effects.put)(actionResult(res));

        case 13:
          _context.next = 33;
          break;

        case 15:
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
          _context.next = 25;
          return (0, _effects.call)(_axios2.default, url, axiosConfig);

        case 25:
          _res = _context.sent;

          if (!(config.processResult && (0, _isFunction2.default)(config.processResult))) {
            _context.next = 31;
            break;
          }

          _context.next = 29;
          return (0, _effects.put)(actionResult(config.processResult(_res)));

        case 29:
          _context.next = 33;
          break;

        case 31:
          _context.next = 33;
          return (0, _effects.put)(actionResult(_res));

        case 33:
          _context.next = 39;
          break;

        case 35:
          _context.prev = 35;
          _context.t0 = _context['catch'](3);
          _context.next = 39;
          return (0, _effects.put)(actionResult(_context.t0));

        case 39:
          _context.prev = 39;

          if (!config.afterAction) {
            _context.next = 43;
            break;
          }

          _context.next = 43;
          return (0, _effects.put)(config.afterAction);

        case 43:
          return _context.finish(39);

        case 44:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[3, 35, 39, 44]]);
}

exports.default = request;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJkYXRhIiwiY29uZmlnIiwidHlwZSIsInBheWxvYWQiLCJtZXRhIiwidXJsIiwiYWN0aW9uUmVzdWx0IiwiYmVmb3JlQWN0aW9uIiwicmVzIiwia2V5cyIsIm9taXRLZXlzIiwiZm9yRWFjaCIsInB1c2giLCJrZXkiLCJuYW1lIiwidG9QYXRoIiwiY29tcGlsZSIsImF4aW9zQ29uZmlnIiwibWV0aG9kIiwicGFyYW1zIiwicHJvY2Vzc1Jlc3VsdCIsImFmdGVyQWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztlQUVVQSxPOztBQUFWLFNBQVVBLE9BQVYsQ0FBa0JDLElBQWxCLEVBQXdCQyxNQUF4QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRVVDLGNBRlYsR0FFa0NGLElBRmxDLENBRVVFLElBRlYsRUFFZ0JDLE9BRmhCLEdBRWtDSCxJQUZsQyxDQUVnQkcsT0FGaEIsRUFFeUJDLElBRnpCLEdBRWtDSixJQUZsQyxDQUV5QkksSUFGekI7QUFHTUMsYUFITixHQUdZRCxLQUFLQyxHQUhqQjtBQUlRQyxzQkFKUixHQUl1QixnQ0FBZ0JKLElBQWhCLGFBSnZCO0FBQUE7O0FBQUEsZUFNUUQsT0FBT00sWUFOZjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGlCQU1tQyxrQkFBSU4sT0FBT00sWUFBWCxDQU5uQzs7QUFBQTtBQUFBLGdCQU9RTixPQUFPRixPQUFQLElBQWtCLDBCQUFXRSxPQUFPRixPQUFsQixDQVAxQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGlCQVF3QixtQkFBS0UsT0FBT0YsT0FBWixDQVJ4Qjs7QUFBQTtBQVFZUyxhQVJaO0FBQUE7QUFBQSxpQkFTWSxrQkFBSUYsYUFBYUUsR0FBYixDQUFKLENBVFo7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBV1lDLGNBWFosR0FXbUIsRUFYbkI7QUFZWUMsa0JBWlosR0FZdUIsRUFadkI7O0FBYU0sc0NBQWFMLEdBQWIsRUFBa0JJLElBQWxCO0FBQ0FBLGVBQUtFLE9BQUwsQ0FBYTtBQUFBLG1CQUFPRCxTQUFTRSxJQUFULENBQWNDLElBQUlDLElBQWxCLENBQVA7QUFBQSxXQUFiO0FBQ01DLGdCQWZaLEdBZXFCLHVCQUFhQyxPQUFiLENBQXFCWCxHQUFyQixDQWZyQjs7QUFnQk1BLGdCQUFNVSxPQUFPWixPQUFQLENBQU47QUFDSWMscUJBakJWLEdBaUJ3QixFQUFFQyxRQUFRZCxLQUFLYyxNQUFmLEVBakJ4Qjs7QUFrQk0sY0FBSWQsS0FBS2MsTUFBTCxLQUFnQixLQUFwQixFQUEyQjtBQUN6QkQsd0JBQVlFLE1BQVosR0FBcUIsc0JBQUtoQixPQUFMLEVBQWNPLFFBQWQsQ0FBckI7QUFDRCxXQUZELE1BRU87QUFDTE8sd0JBQVlqQixJQUFaLEdBQW1CLHNCQUFLRyxPQUFMLEVBQWNPLFFBQWQsQ0FBbkI7QUFDRDtBQXRCUDtBQUFBLGlCQXVCd0Isb0NBQVlMLEdBQVosRUFBaUJZLFdBQWpCLENBdkJ4Qjs7QUFBQTtBQXVCWVQsY0F2Qlo7O0FBQUEsZ0JBd0JVUCxPQUFPbUIsYUFBUCxJQUF3QiwwQkFBV25CLE9BQU9tQixhQUFsQixDQXhCbEM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxpQkF5QmMsa0JBQUlkLGFBQWFMLE9BQU9tQixhQUFQLENBQXFCWixJQUFyQixDQUFiLENBQUosQ0F6QmQ7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxpQkEyQmMsa0JBQUlGLGFBQWFFLElBQWIsQ0FBSixDQTNCZDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkErQlUsa0JBQUlGLHlCQUFKLENBL0JWOztBQUFBO0FBQUE7O0FBQUEsZUFpQ1FMLE9BQU9vQixXQWpDZjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGlCQWlDa0Msa0JBQUlwQixPQUFPb0IsV0FBWCxDQWpDbEM7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7a0JBcUNldEIsTyIsImZpbGUiOiJyZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQWN0aW9uLCBoYW5kbGVBY3Rpb25zIH0gZnJvbSAncmVkdXgtYWN0aW9ucyc7XG5pbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICdsb2Rhc2gvaXNGdW5jdGlvbic7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHBhdGhUb1JlZ2V4cCBmcm9tICdwYXRoLXRvLXJlZ2V4cCc7XG5pbXBvcnQgb21pdCBmcm9tICdvYmplY3Qub21pdCc7XG5cbmZ1bmN0aW9uKiByZXF1ZXN0KGRhdGEsIGNvbmZpZykge1xuXG4gIGNvbnN0IHsgdHlwZSwgcGF5bG9hZCwgbWV0YSB9ID0gZGF0YTtcbiAgbGV0IHVybCA9IG1ldGEudXJsO1xuICBjb25zdCBhY3Rpb25SZXN1bHQgPSBjcmVhdGVBY3Rpb24oYCR7dHlwZX1fUkVTVUxUYCk7XG4gIHRyeSB7XG4gICAgaWYgKGNvbmZpZy5iZWZvcmVBY3Rpb24pIHlpZWxkIHB1dChjb25maWcuYmVmb3JlQWN0aW9uKTtcbiAgICBpZiAoY29uZmlnLnJlcXVlc3QgJiYgaXNGdW5jdGlvbihjb25maWcucmVxdWVzdCkpIHtcbiAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIGNhbGwoY29uZmlnLnJlcXVlc3QpO1xuICAgICAgeWllbGQgcHV0KGFjdGlvblJlc3VsdChyZXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qga2V5cyA9IFtdO1xuICAgICAgY29uc3Qgb21pdEtleXMgPSBbXTtcbiAgICAgIHBhdGhUb1JlZ2V4cCh1cmwsIGtleXMpO1xuICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiBvbWl0S2V5cy5wdXNoKGtleS5uYW1lKSk7XG4gICAgICBjb25zdCB0b1BhdGggPSBwYXRoVG9SZWdleHAuY29tcGlsZSh1cmwpO1xuICAgICAgdXJsID0gdG9QYXRoKHBheWxvYWQpO1xuICAgICAgbGV0IGF4aW9zQ29uZmlnID0geyBtZXRob2Q6IG1ldGEubWV0aG9kIH07XG4gICAgICBpZiAobWV0YS5tZXRob2QgPT09ICdnZXQnKSB7XG4gICAgICAgIGF4aW9zQ29uZmlnLnBhcmFtcyA9IG9taXQocGF5bG9hZCwgb21pdEtleXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXhpb3NDb25maWcuZGF0YSA9IG9taXQocGF5bG9hZCwgb21pdEtleXMpO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzID0geWllbGQgY2FsbChheGlvcywgdXJsLCBheGlvc0NvbmZpZyk7XG4gICAgICBpZiAoY29uZmlnLnByb2Nlc3NSZXN1bHQgJiYgaXNGdW5jdGlvbihjb25maWcucHJvY2Vzc1Jlc3VsdCkpIHtcbiAgICAgICAgeWllbGQgcHV0KGFjdGlvblJlc3VsdChjb25maWcucHJvY2Vzc1Jlc3VsdChyZXMpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5aWVsZCBwdXQoYWN0aW9uUmVzdWx0KHJlcykpO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB5aWVsZCBwdXQoYWN0aW9uUmVzdWx0KGVycm9yKSk7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGNvbmZpZy5hZnRlckFjdGlvbikgeWllbGQgcHV0KGNvbmZpZy5hZnRlckFjdGlvbik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVxdWVzdDtcbiJdfQ==