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
    var type, payload, meta, url, actionResult, toPath, res;
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
              toPath = _pathToRegexp2.default.compile(url);

              url = toPath(payload);
            }

            _context.next = 9;
            return (0, _effects.call)(_axios2.default, url, { method: meta.method, data: payload });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhY3Rpb25zIiwicmVxdWVzdCIsIm9wdHMiLCJyZXN1bHRTdWZpeCIsImdldFJlZHVjZXJzIiwicmVkdWNlcnMiLCJmb3JFYWNoIiwidHlwZSIsIml0ZW0iLCJzdGF0ZSIsImlzZmV0Y2hpbmciLCJhY3Rpb24iLCJwYXlsb2FkIiwiZGF0YSIsIm1ldGEiLCJ1cmwiLCJhY3Rpb25SZXN1bHQiLCJtZXRob2QiLCJ0b1BhdGgiLCJjb21waWxlIiwicmVzIiwibWV0YUNyZWF0b3IiLCJfIiwiZ2V0Q3JlYXRlQWN0aW9ucyIsInJlc3VsdCIsImFjdGlvbkNyZWF0b3JzIiwiZ2V0V2F0Y2hTYWdhcyIsInB1c2giLCJoYW5kbGVBY3Rpb25zIiwiZGVmYXVsdFN0YXRlIiwid2F0Y2hTYWdhcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWUsVUFBQ0EsT0FBRCxFQUF3QjtBQUFBLGlCQW1CM0JDLE9BbkIyQjs7QUFBQSxNQUFkQyxJQUFjLHVFQUFQLEVBQU87O0FBQ3JDLE1BQU1DLGNBQWNELEtBQUtDLFdBQUwsSUFBb0IsU0FBeEM7QUFDQSxXQUFTQyxXQUFULEdBQXVCO0FBQ3JCLFFBQU1DLFdBQVcsRUFBakI7QUFDQUwsWUFBUU0sT0FBUixDQUFnQixnQkFBUTtBQUFBLFVBQ2RDLElBRGMsR0FDTEMsSUFESyxDQUNkRCxJQURjOztBQUV0QkYsZUFBU0UsSUFBVCxJQUFpQixVQUFDRSxLQUFEO0FBQUEsMENBQ1pBLEtBRFk7QUFFZkMsc0JBQVk7QUFGRztBQUFBLE9BQWpCO0FBSUFMLG9CQUFZRSxJQUFaLEdBQW1CSixXQUFuQixJQUFvQyxVQUFDTSxLQUFELEVBQVFFLE1BQVI7QUFBQSwwQ0FDL0JGLEtBRCtCO0FBRWxDQyxzQkFBWTtBQUZzQixXQUdqQywyQkFBYUgsSUFBYixHQUFvQkosV0FBcEIsQ0FIaUMsRUFHSVEsT0FBT0MsT0FIWDtBQUFBLE9BQXBDO0FBS0QsS0FYRDtBQVlBLFdBQU9QLFFBQVA7QUFDRDs7QUFFRCxXQUFVSixPQUFWLENBQWtCWSxJQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVU4sZ0JBRFYsR0FDa0NNLElBRGxDLENBQ1VOLElBRFYsRUFDZ0JLLE9BRGhCLEdBQ2tDQyxJQURsQyxDQUNnQkQsT0FEaEIsRUFDeUJFLElBRHpCLEdBQ2tDRCxJQURsQyxDQUN5QkMsSUFEekI7QUFFTUMsZUFGTixHQUVZRCxLQUFLQyxHQUZqQjtBQUdRQyx3QkFIUixHQUd1QixnQ0FBZ0JULElBQWhCLGFBSHZCO0FBQUE7QUFBQTtBQUFBLG1CQUtVLGtCQUFJLGdDQUFKLENBTFY7O0FBQUE7O0FBT0ksZ0JBQUlPLEtBQUtHLE1BQUwsS0FBZ0IsS0FBcEIsRUFBMkI7QUFDbkJDLG9CQURtQixHQUNWLHVCQUFhQyxPQUFiLENBQXFCSixHQUFyQixDQURVOztBQUV6QkEsb0JBQU1HLE9BQU9OLE9BQVAsQ0FBTjtBQUNEOztBQVZMO0FBQUEsbUJBWXNCLG9DQUFZRyxHQUFaLEVBQWlCLEVBQUVFLFFBQVFILEtBQUtHLE1BQWYsRUFBdUJKLE1BQU1ELE9BQTdCLEVBQWpCLENBWnRCOztBQUFBO0FBWVVRLGVBWlY7QUFBQTtBQUFBLG1CQWNVLGtCQUFJSixhQUFhSSxHQUFiLENBQUosQ0FkVjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFnQlUsa0JBQUlKLHlCQUFKLENBaEJWOztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWtCVSxrQkFBSSw4QkFBSixDQWxCVjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBcUJBLFdBQVNLLFdBQVQsQ0FBcUJOLEdBQXJCLEVBQTBDO0FBQUEsUUFBaEJFLE1BQWdCLHVFQUFQLEtBQU87O0FBQ3hDLFdBQU8sVUFBQ0ssQ0FBRCxFQUFJUixJQUFKO0FBQUE7QUFDTEMsZ0JBREs7QUFFTEU7QUFGSyxTQUdGSCxJQUhFO0FBQUEsS0FBUDtBQUtEO0FBQ0QsV0FBU1MsZ0JBQVQsR0FBNEI7QUFDMUIsUUFBTUMsU0FBUyxFQUFmO0FBQ0F4QixZQUFRTSxPQUFSLENBQWdCLGtCQUFVO0FBQ3hCa0IsYUFBTyxzQkFBVWIsT0FBT0osSUFBakIsQ0FBUCxJQUFpQyxnQ0FBYUksT0FBT0osSUFBcEIsRUFBMEIsSUFBMUIsRUFDL0JjLFlBQVlWLE9BQU9JLEdBQW5CLEVBQXdCSixPQUFPTSxNQUEvQixDQUQrQixDQUFqQztBQUVELEtBSEQ7QUFJQSxXQUFPTyxNQUFQO0FBQ0Q7O0FBRUQsTUFBTUMsaUJBQWlCRixrQkFBdkI7O0FBRUEsV0FBU0csYUFBVCxHQUF5QjtBQUN2QixRQUFNRixTQUFTLEVBQWY7QUFDQXhCLFlBQVFNLE9BQVIsQ0FBZ0Isa0JBQVU7QUFDeEJrQixhQUFPRyxJQUFQLENBQVksd0JBQVVoQixPQUFPSixJQUFqQixFQUF1Qk4sT0FBdkIsQ0FBWjtBQUNELEtBRkQ7QUFHQSxXQUFPdUIsTUFBUDtBQUNEOztBQUVELFNBQU87QUFDTEMsa0NBREs7QUFFTEcsbUJBQWUsaUNBQWN4QixhQUFkLEVBQTZCRixLQUFLMkIsWUFBTCxJQUFxQixFQUFsRCxDQUZWO0FBR0xDLGdCQUFZSjtBQUhQLEdBQVA7QUFLRCxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQWN0aW9uLCBoYW5kbGVBY3Rpb25zIH0gZnJvbSAncmVkdXgtYWN0aW9ucyc7XG5pbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgYmVnaW5UYXNrLCBlbmRUYXNrIH0gZnJvbSAncmVkdXgtbnByb2dyZXNzJztcbmltcG9ydCBjYW1lbENhc2UgZnJvbSAnbG9kYXNoLmNhbWVsY2FzZSc7XG5pbXBvcnQgcGF0aFRvUmVnZXhwIGZyb20gJ3BhdGgtdG8tcmVnZXhwJztcblxuZXhwb3J0IGRlZmF1bHQgKGFjdGlvbnMsIG9wdHMgPSB7fSkgPT4ge1xuICBjb25zdCByZXN1bHRTdWZpeCA9IG9wdHMucmVzdWx0U3VmaXggfHwgJ19SRVNVTFQnO1xuICBmdW5jdGlvbiBnZXRSZWR1Y2VycygpIHtcbiAgICBjb25zdCByZWR1Y2VycyA9IHt9O1xuICAgIGFjdGlvbnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHsgdHlwZSB9ID0gaXRlbTtcbiAgICAgIHJlZHVjZXJzW3R5cGVdID0gKHN0YXRlKSA9PiAoe1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNmZXRjaGluZzogdHJ1ZVxuICAgICAgfSk7XG4gICAgICByZWR1Y2Vyc1tgJHt0eXBlfSR7cmVzdWx0U3VmaXh9YF0gPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzZmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgICBbY2FtZWxDYXNlKGAke3R5cGV9JHtyZXN1bHRTdWZpeH1gKV06IGFjdGlvbi5wYXlsb2FkXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVkdWNlcnM7XG4gIH1cblxuICBmdW5jdGlvbiogcmVxdWVzdChkYXRhKSB7XG4gICAgY29uc3QgeyB0eXBlLCBwYXlsb2FkLCBtZXRhIH0gPSBkYXRhO1xuICAgIGxldCB1cmwgPSBtZXRhLnVybDtcbiAgICBjb25zdCBhY3Rpb25SZXN1bHQgPSBjcmVhdGVBY3Rpb24oYCR7dHlwZX1fUkVTVUxUYCk7XG4gICAgdHJ5IHtcbiAgICAgIHlpZWxkIHB1dChiZWdpblRhc2soKSk7XG5cbiAgICAgIGlmIChtZXRhLm1ldGhvZCA9PT0gJ3B1dCcpIHtcbiAgICAgICAgY29uc3QgdG9QYXRoID0gcGF0aFRvUmVnZXhwLmNvbXBpbGUodXJsKTtcbiAgICAgICAgdXJsID0gdG9QYXRoKHBheWxvYWQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXMgPSB5aWVsZCBjYWxsKGF4aW9zLCB1cmwsIHsgbWV0aG9kOiBtZXRhLm1ldGhvZCwgZGF0YTogcGF5bG9hZCB9KTtcblxuICAgICAgeWllbGQgcHV0KGFjdGlvblJlc3VsdChyZXMpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgeWllbGQgcHV0KGFjdGlvblJlc3VsdChlcnJvcikpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB5aWVsZCBwdXQoZW5kVGFzaygpKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWV0YUNyZWF0b3IodXJsLCBtZXRob2QgPSAnZ2V0Jykge1xuICAgIHJldHVybiAoXywgbWV0YSkgPT4gKHtcbiAgICAgIHVybCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIC4uLm1ldGFcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBnZXRDcmVhdGVBY3Rpb25zKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgcmVzdWx0W2NhbWVsQ2FzZShhY3Rpb24udHlwZSldID0gY3JlYXRlQWN0aW9uKGFjdGlvbi50eXBlLCBudWxsLFxuICAgICAgICBtZXRhQ3JlYXRvcihhY3Rpb24udXJsLCBhY3Rpb24ubWV0aG9kKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGNvbnN0IGFjdGlvbkNyZWF0b3JzID0gZ2V0Q3JlYXRlQWN0aW9ucygpO1xuXG4gIGZ1bmN0aW9uIGdldFdhdGNoU2FnYXMoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgYWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB7XG4gICAgICByZXN1bHQucHVzaCh0YWtlRXZlcnkoYWN0aW9uLnR5cGUsIHJlcXVlc3QpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhY3Rpb25DcmVhdG9ycyxcbiAgICBoYW5kbGVBY3Rpb25zOiBoYW5kbGVBY3Rpb25zKGdldFJlZHVjZXJzKCksIG9wdHMuZGVmYXVsdFN0YXRlIHx8IHt9KSxcbiAgICB3YXRjaFNhZ2FzOiBnZXRXYXRjaFNhZ2FzKClcbiAgfTtcbn07XG4iXX0=