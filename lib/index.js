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

var _reduxActions = require('redux-actions');

var _effects = require('redux-saga/effects');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reduxNprogress = require('redux-nprogress');

var _lodash = require('lodash.camelcase');

var _lodash2 = _interopRequireDefault(_lodash);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _object = require('object.omit');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (actions) {
  var _marked = [request].map(_regenerator2.default.mark);

  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var resultSufix = opts.resultSufix || '_RESULT';
  function getReducers() {
    var reducers = {};
    actions.forEach(function (item) {
      var type = item.type;

      reducers[type] = function (state) {
        return (0, _extends4.default)({}, state, {
          isfetching: true
        });
      };
      reducers['' + type + resultSufix] = function (state, action) {
        return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({
          isfetching: false
        }, (0, _lodash2.default)('' + type + resultSufix), action.payload));
      };
    });
    return reducers;
  }

  function request(data) {
    var type, payload, meta, url, actionResult, keys, _omitKeys, toPath, res;

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

            if (meta.method === 'put') {
              keys = [];
              _omitKeys = [];

              (0, _pathToRegexp2.default)(url, keys);
              keys.forEach(function (key) {
                return _omitKeys.push(key.name);
              });
              toPath = _pathToRegexp2.default.compile(url);

              url = toPath(payload);
            }

            _context.next = 9;
            return (0, _effects.call)(_axios2.default, url, { method: meta.method, data: (0, _object2.default)(payload, omitKeys) });

          case 9:
            res = _context.sent;
            _context.next = 12;
            return (0, _effects.put)(actionResult(res));

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](3);
            _context.next = 18;
            return (0, _effects.put)(actionResult(_context.t0));

          case 18:
            _context.prev = 18;
            _context.next = 21;
            return (0, _effects.put)((0, _reduxNprogress.endTask)());

          case 21:
            return _context.finish(18);

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[3, 14, 18, 22]]);
  }
  function metaCreator(url) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';

    return function (_, meta) {
      return (0, _extends4.default)({
        url: url,
        method: method
      }, meta);
    };
  }
  function getCreateActions() {
    var result = {};
    actions.forEach(function (action) {
      result[(0, _lodash2.default)(action.type)] = (0, _reduxActions.createAction)(action.type, null, metaCreator(action.url, action.method));
    });
    return result;
  }

  var actionCreators = getCreateActions();

  function getWatchSagas() {
    var result = [];
    actions.forEach(function (action) {
      result.push((0, _effects.takeEvery)(action.type, request));
    });
    return result;
  }

  return {
    actionCreators: actionCreators,
    handleActions: (0, _reduxActions.handleActions)(getReducers(), opts.defaultState || {}),
    watchSagas: getWatchSagas()
  };
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhY3Rpb25zIiwicmVxdWVzdCIsIm9wdHMiLCJyZXN1bHRTdWZpeCIsImdldFJlZHVjZXJzIiwicmVkdWNlcnMiLCJmb3JFYWNoIiwidHlwZSIsIml0ZW0iLCJzdGF0ZSIsImlzZmV0Y2hpbmciLCJhY3Rpb24iLCJwYXlsb2FkIiwiZGF0YSIsIm1ldGEiLCJ1cmwiLCJhY3Rpb25SZXN1bHQiLCJtZXRob2QiLCJrZXlzIiwib21pdEtleXMiLCJwdXNoIiwia2V5IiwibmFtZSIsInRvUGF0aCIsImNvbXBpbGUiLCJyZXMiLCJtZXRhQ3JlYXRvciIsIl8iLCJnZXRDcmVhdGVBY3Rpb25zIiwicmVzdWx0IiwiYWN0aW9uQ3JlYXRvcnMiLCJnZXRXYXRjaFNhZ2FzIiwiaGFuZGxlQWN0aW9ucyIsImRlZmF1bHRTdGF0ZSIsIndhdGNoU2FnYXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWUsVUFBQ0EsT0FBRCxFQUF3QjtBQUFBLGlCQW1CM0JDLE9BbkIyQjs7QUFBQSxNQUFkQyxJQUFjLHVFQUFQLEVBQU87O0FBQ3JDLE1BQU1DLGNBQWNELEtBQUtDLFdBQUwsSUFBb0IsU0FBeEM7QUFDQSxXQUFTQyxXQUFULEdBQXVCO0FBQ3JCLFFBQU1DLFdBQVcsRUFBakI7QUFDQUwsWUFBUU0sT0FBUixDQUFnQixnQkFBUTtBQUFBLFVBQ2RDLElBRGMsR0FDTEMsSUFESyxDQUNkRCxJQURjOztBQUV0QkYsZUFBU0UsSUFBVCxJQUFpQixVQUFDRSxLQUFEO0FBQUEsMENBQ1pBLEtBRFk7QUFFZkMsc0JBQVk7QUFGRztBQUFBLE9BQWpCO0FBSUFMLG9CQUFZRSxJQUFaLEdBQW1CSixXQUFuQixJQUFvQyxVQUFDTSxLQUFELEVBQVFFLE1BQVI7QUFBQSwwQ0FDL0JGLEtBRCtCO0FBRWxDQyxzQkFBWTtBQUZzQixXQUdqQywyQkFBYUgsSUFBYixHQUFvQkosV0FBcEIsQ0FIaUMsRUFHSVEsT0FBT0MsT0FIWDtBQUFBLE9BQXBDO0FBS0QsS0FYRDtBQVlBLFdBQU9QLFFBQVA7QUFDRDs7QUFFRCxXQUFVSixPQUFWLENBQWtCWSxJQUFsQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1VOLGdCQURWLEdBQ2tDTSxJQURsQyxDQUNVTixJQURWLEVBQ2dCSyxPQURoQixHQUNrQ0MsSUFEbEMsQ0FDZ0JELE9BRGhCLEVBQ3lCRSxJQUR6QixHQUNrQ0QsSUFEbEMsQ0FDeUJDLElBRHpCO0FBRU1DLGVBRk4sR0FFWUQsS0FBS0MsR0FGakI7QUFHUUMsd0JBSFIsR0FHdUIsZ0NBQWdCVCxJQUFoQixhQUh2QjtBQUFBO0FBQUE7QUFBQSxtQkFLVSxrQkFBSSxnQ0FBSixDQUxWOztBQUFBOztBQU9JLGdCQUFJTyxLQUFLRyxNQUFMLEtBQWdCLEtBQXBCLEVBQTJCO0FBQ25CQyxrQkFEbUIsR0FDWixFQURZO0FBRW5CQyx1QkFGbUIsR0FFUixFQUZROztBQUd6QiwwQ0FBYUosR0FBYixFQUFrQkcsSUFBbEI7QUFDQUEsbUJBQUtaLE9BQUwsQ0FBYTtBQUFBLHVCQUFPYSxVQUFTQyxJQUFULENBQWNDLElBQUlDLElBQWxCLENBQVA7QUFBQSxlQUFiO0FBQ01DLG9CQUxtQixHQUtWLHVCQUFhQyxPQUFiLENBQXFCVCxHQUFyQixDQUxVOztBQU16QkEsb0JBQU1RLE9BQU9YLE9BQVAsQ0FBTjtBQUNEOztBQWRMO0FBQUEsbUJBZ0JzQixvQ0FBWUcsR0FBWixFQUNoQixFQUFFRSxRQUFRSCxLQUFLRyxNQUFmLEVBQXVCSixNQUFNLHNCQUFLRCxPQUFMLEVBQWNPLFFBQWQsQ0FBN0IsRUFEZ0IsQ0FoQnRCOztBQUFBO0FBZ0JVTSxlQWhCVjtBQUFBO0FBQUEsbUJBbUJVLGtCQUFJVCxhQUFhUyxHQUFiLENBQUosQ0FuQlY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBcUJVLGtCQUFJVCx5QkFBSixDQXJCVjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkF1QlUsa0JBQUksOEJBQUosQ0F2QlY7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTBCQSxXQUFTVSxXQUFULENBQXFCWCxHQUFyQixFQUEwQztBQUFBLFFBQWhCRSxNQUFnQix1RUFBUCxLQUFPOztBQUN4QyxXQUFPLFVBQUNVLENBQUQsRUFBSWIsSUFBSjtBQUFBO0FBQ0xDLGdCQURLO0FBRUxFO0FBRkssU0FHRkgsSUFIRTtBQUFBLEtBQVA7QUFLRDtBQUNELFdBQVNjLGdCQUFULEdBQTRCO0FBQzFCLFFBQU1DLFNBQVMsRUFBZjtBQUNBN0IsWUFBUU0sT0FBUixDQUFnQixrQkFBVTtBQUN4QnVCLGFBQU8sc0JBQVVsQixPQUFPSixJQUFqQixDQUFQLElBQWlDLGdDQUFhSSxPQUFPSixJQUFwQixFQUEwQixJQUExQixFQUMvQm1CLFlBQVlmLE9BQU9JLEdBQW5CLEVBQXdCSixPQUFPTSxNQUEvQixDQUQrQixDQUFqQztBQUVELEtBSEQ7QUFJQSxXQUFPWSxNQUFQO0FBQ0Q7O0FBRUQsTUFBTUMsaUJBQWlCRixrQkFBdkI7O0FBRUEsV0FBU0csYUFBVCxHQUF5QjtBQUN2QixRQUFNRixTQUFTLEVBQWY7QUFDQTdCLFlBQVFNLE9BQVIsQ0FBZ0Isa0JBQVU7QUFDeEJ1QixhQUFPVCxJQUFQLENBQVksd0JBQVVULE9BQU9KLElBQWpCLEVBQXVCTixPQUF2QixDQUFaO0FBQ0QsS0FGRDtBQUdBLFdBQU80QixNQUFQO0FBQ0Q7O0FBRUQsU0FBTztBQUNMQyxrQ0FESztBQUVMRSxtQkFBZSxpQ0FBYzVCLGFBQWQsRUFBNkJGLEtBQUsrQixZQUFMLElBQXFCLEVBQWxELENBRlY7QUFHTEMsZ0JBQVlIO0FBSFAsR0FBUDtBQUtELEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBY3Rpb24sIGhhbmRsZUFjdGlvbnMgfSBmcm9tICdyZWR1eC1hY3Rpb25zJztcbmltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUV2ZXJ5IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBiZWdpblRhc2ssIGVuZFRhc2sgfSBmcm9tICdyZWR1eC1ucHJvZ3Jlc3MnO1xuaW1wb3J0IGNhbWVsQ2FzZSBmcm9tICdsb2Rhc2guY2FtZWxjYXNlJztcbmltcG9ydCBwYXRoVG9SZWdleHAgZnJvbSAncGF0aC10by1yZWdleHAnO1xuaW1wb3J0IG9taXQgZnJvbSAnb2JqZWN0Lm9taXQnO1xuXG5leHBvcnQgZGVmYXVsdCAoYWN0aW9ucywgb3B0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IHJlc3VsdFN1Zml4ID0gb3B0cy5yZXN1bHRTdWZpeCB8fCAnX1JFU1VMVCc7XG4gIGZ1bmN0aW9uIGdldFJlZHVjZXJzKCkge1xuICAgIGNvbnN0IHJlZHVjZXJzID0ge307XG4gICAgYWN0aW9ucy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgeyB0eXBlIH0gPSBpdGVtO1xuICAgICAgcmVkdWNlcnNbdHlwZV0gPSAoc3RhdGUpID0+ICh7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc2ZldGNoaW5nOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHJlZHVjZXJzW2Ake3R5cGV9JHtyZXN1bHRTdWZpeH1gXSA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNmZXRjaGluZzogZmFsc2UsXG4gICAgICAgIFtjYW1lbENhc2UoYCR7dHlwZX0ke3Jlc3VsdFN1Zml4fWApXTogYWN0aW9uLnBheWxvYWRcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZWR1Y2VycztcbiAgfVxuXG4gIGZ1bmN0aW9uKiByZXF1ZXN0KGRhdGEpIHtcbiAgICBjb25zdCB7IHR5cGUsIHBheWxvYWQsIG1ldGEgfSA9IGRhdGE7XG4gICAgbGV0IHVybCA9IG1ldGEudXJsO1xuICAgIGNvbnN0IGFjdGlvblJlc3VsdCA9IGNyZWF0ZUFjdGlvbihgJHt0eXBlfV9SRVNVTFRgKTtcbiAgICB0cnkge1xuICAgICAgeWllbGQgcHV0KGJlZ2luVGFzaygpKTtcblxuICAgICAgaWYgKG1ldGEubWV0aG9kID09PSAncHV0Jykge1xuICAgICAgICBjb25zdCBrZXlzID0gW107XG4gICAgICAgIGNvbnN0IG9taXRLZXlzID0gW107XG4gICAgICAgIHBhdGhUb1JlZ2V4cCh1cmwsIGtleXMpO1xuICAgICAgICBrZXlzLmZvckVhY2goa2V5ID0+IG9taXRLZXlzLnB1c2goa2V5Lm5hbWUpKTtcbiAgICAgICAgY29uc3QgdG9QYXRoID0gcGF0aFRvUmVnZXhwLmNvbXBpbGUodXJsKTtcbiAgICAgICAgdXJsID0gdG9QYXRoKHBheWxvYWQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXMgPSB5aWVsZCBjYWxsKGF4aW9zLCB1cmwsXG4gICAgICAgIHsgbWV0aG9kOiBtZXRhLm1ldGhvZCwgZGF0YTogb21pdChwYXlsb2FkLCBvbWl0S2V5cykgfSk7XG5cbiAgICAgIHlpZWxkIHB1dChhY3Rpb25SZXN1bHQocmVzKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHlpZWxkIHB1dChhY3Rpb25SZXN1bHQoZXJyb3IpKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgeWllbGQgcHV0KGVuZFRhc2soKSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1ldGFDcmVhdG9yKHVybCwgbWV0aG9kID0gJ2dldCcpIHtcbiAgICByZXR1cm4gKF8sIG1ldGEpID0+ICh7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICAuLi5tZXRhXG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0Q3JlYXRlQWN0aW9ucygpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBhY3Rpb25zLmZvckVhY2goYWN0aW9uID0+IHtcbiAgICAgIHJlc3VsdFtjYW1lbENhc2UoYWN0aW9uLnR5cGUpXSA9IGNyZWF0ZUFjdGlvbihhY3Rpb24udHlwZSwgbnVsbCxcbiAgICAgICAgbWV0YUNyZWF0b3IoYWN0aW9uLnVybCwgYWN0aW9uLm1ldGhvZCkpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IGdldENyZWF0ZUFjdGlvbnMoKTtcblxuICBmdW5jdGlvbiBnZXRXYXRjaFNhZ2FzKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgcmVzdWx0LnB1c2godGFrZUV2ZXJ5KGFjdGlvbi50eXBlLCByZXF1ZXN0KSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYWN0aW9uQ3JlYXRvcnMsXG4gICAgaGFuZGxlQWN0aW9uczogaGFuZGxlQWN0aW9ucyhnZXRSZWR1Y2VycygpLCBvcHRzLmRlZmF1bHRTdGF0ZSB8fCB7fSksXG4gICAgd2F0Y2hTYWdhczogZ2V0V2F0Y2hTYWdhcygpXG4gIH07XG59O1xuIl19