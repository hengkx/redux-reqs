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
    var type, payload, meta, url, actionResult, keys, omitKeys, toPath, res;
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

            _context.next = 14;
            return (0, _effects.call)(_axios2.default, url, { method: meta.method, data: (0, _object2.default)(payload, omitKeys) });

          case 14:
            res = _context.sent;
            _context.next = 17;
            return (0, _effects.put)(actionResult(res));

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context['catch'](3);
            _context.next = 23;
            return (0, _effects.put)(actionResult(_context.t0));

          case 23:
            _context.prev = 23;
            _context.next = 26;
            return (0, _effects.put)((0, _reduxNprogress.endTask)());

          case 26:
            return _context.finish(23);

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[3, 19, 23, 27]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhY3Rpb25zIiwicmVxdWVzdCIsIm9wdHMiLCJyZXN1bHRTdWZpeCIsImdldFJlZHVjZXJzIiwicmVkdWNlcnMiLCJmb3JFYWNoIiwidHlwZSIsIml0ZW0iLCJzdGF0ZSIsImlzZmV0Y2hpbmciLCJhY3Rpb24iLCJwYXlsb2FkIiwiZGF0YSIsIm1ldGEiLCJ1cmwiLCJhY3Rpb25SZXN1bHQiLCJrZXlzIiwib21pdEtleXMiLCJwdXNoIiwia2V5IiwibmFtZSIsInRvUGF0aCIsImNvbXBpbGUiLCJtZXRob2QiLCJyZXMiLCJtZXRhQ3JlYXRvciIsIl8iLCJnZXRDcmVhdGVBY3Rpb25zIiwicmVzdWx0IiwiYWN0aW9uQ3JlYXRvcnMiLCJnZXRXYXRjaFNhZ2FzIiwiaGFuZGxlQWN0aW9ucyIsImRlZmF1bHRTdGF0ZSIsIndhdGNoU2FnYXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWUsVUFBQ0EsT0FBRCxFQUF3QjtBQUFBLGlCQW1CM0JDLE9BbkIyQjs7QUFBQSxNQUFkQyxJQUFjLHVFQUFQLEVBQU87O0FBQ3JDLE1BQU1DLGNBQWNELEtBQUtDLFdBQUwsSUFBb0IsU0FBeEM7QUFDQSxXQUFTQyxXQUFULEdBQXVCO0FBQ3JCLFFBQU1DLFdBQVcsRUFBakI7QUFDQUwsWUFBUU0sT0FBUixDQUFnQixnQkFBUTtBQUFBLFVBQ2RDLElBRGMsR0FDTEMsSUFESyxDQUNkRCxJQURjOztBQUV0QkYsZUFBU0UsSUFBVCxJQUFpQixVQUFDRSxLQUFEO0FBQUEsMENBQ1pBLEtBRFk7QUFFZkMsc0JBQVk7QUFGRztBQUFBLE9BQWpCO0FBSUFMLG9CQUFZRSxJQUFaLEdBQW1CSixXQUFuQixJQUFvQyxVQUFDTSxLQUFELEVBQVFFLE1BQVI7QUFBQSwwQ0FDL0JGLEtBRCtCO0FBRWxDQyxzQkFBWTtBQUZzQixXQUdqQywyQkFBYUgsSUFBYixHQUFvQkosV0FBcEIsQ0FIaUMsRUFHSVEsT0FBT0MsT0FIWDtBQUFBLE9BQXBDO0FBS0QsS0FYRDtBQVlBLFdBQU9QLFFBQVA7QUFDRDs7QUFFRCxXQUFVSixPQUFWLENBQWtCWSxJQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVU4sZ0JBRFYsR0FDa0NNLElBRGxDLENBQ1VOLElBRFYsRUFDZ0JLLE9BRGhCLEdBQ2tDQyxJQURsQyxDQUNnQkQsT0FEaEIsRUFDeUJFLElBRHpCLEdBQ2tDRCxJQURsQyxDQUN5QkMsSUFEekI7QUFFTUMsZUFGTixHQUVZRCxLQUFLQyxHQUZqQjtBQUdRQyx3QkFIUixHQUd1QixnQ0FBZ0JULElBQWhCLGFBSHZCO0FBQUE7QUFBQTtBQUFBLG1CQUtVLGtCQUFJLGdDQUFKLENBTFY7O0FBQUE7QUFPVVUsZ0JBUFYsR0FPaUIsRUFQakI7QUFRVUMsb0JBUlYsR0FRcUIsRUFSckI7O0FBU0ksd0NBQWFILEdBQWIsRUFBa0JFLElBQWxCO0FBQ0FBLGlCQUFLWCxPQUFMLENBQWE7QUFBQSxxQkFBT1ksU0FBU0MsSUFBVCxDQUFjQyxJQUFJQyxJQUFsQixDQUFQO0FBQUEsYUFBYjtBQUNNQyxrQkFYVixHQVdtQix1QkFBYUMsT0FBYixDQUFxQlIsR0FBckIsQ0FYbkI7O0FBWUlBLGtCQUFNTyxPQUFPVixPQUFQLENBQU47O0FBWko7QUFBQSxtQkFjc0Isb0NBQVlHLEdBQVosRUFDaEIsRUFBRVMsUUFBUVYsS0FBS1UsTUFBZixFQUF1QlgsTUFBTSxzQkFBS0QsT0FBTCxFQUFjTSxRQUFkLENBQTdCLEVBRGdCLENBZHRCOztBQUFBO0FBY1VPLGVBZFY7QUFBQTtBQUFBLG1CQWlCVSxrQkFBSVQsYUFBYVMsR0FBYixDQUFKLENBakJWOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQW1CVSxrQkFBSVQseUJBQUosQ0FuQlY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBcUJVLGtCQUFJLDhCQUFKLENBckJWOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF3QkEsV0FBU1UsV0FBVCxDQUFxQlgsR0FBckIsRUFBMEM7QUFBQSxRQUFoQlMsTUFBZ0IsdUVBQVAsS0FBTzs7QUFDeEMsV0FBTyxVQUFDRyxDQUFELEVBQUliLElBQUo7QUFBQTtBQUNMQyxnQkFESztBQUVMUztBQUZLLFNBR0ZWLElBSEU7QUFBQSxLQUFQO0FBS0Q7QUFDRCxXQUFTYyxnQkFBVCxHQUE0QjtBQUMxQixRQUFNQyxTQUFTLEVBQWY7QUFDQTdCLFlBQVFNLE9BQVIsQ0FBZ0Isa0JBQVU7QUFDeEJ1QixhQUFPLHNCQUFVbEIsT0FBT0osSUFBakIsQ0FBUCxJQUFpQyxnQ0FBYUksT0FBT0osSUFBcEIsRUFBMEIsSUFBMUIsRUFDL0JtQixZQUFZZixPQUFPSSxHQUFuQixFQUF3QkosT0FBT2EsTUFBL0IsQ0FEK0IsQ0FBakM7QUFFRCxLQUhEO0FBSUEsV0FBT0ssTUFBUDtBQUNEOztBQUVELE1BQU1DLGlCQUFpQkYsa0JBQXZCOztBQUVBLFdBQVNHLGFBQVQsR0FBeUI7QUFDdkIsUUFBTUYsU0FBUyxFQUFmO0FBQ0E3QixZQUFRTSxPQUFSLENBQWdCLGtCQUFVO0FBQ3hCdUIsYUFBT1YsSUFBUCxDQUFZLHdCQUFVUixPQUFPSixJQUFqQixFQUF1Qk4sT0FBdkIsQ0FBWjtBQUNELEtBRkQ7QUFHQSxXQUFPNEIsTUFBUDtBQUNEOztBQUVELFNBQU87QUFDTEMsa0NBREs7QUFFTEUsbUJBQWUsaUNBQWM1QixhQUFkLEVBQTZCRixLQUFLK0IsWUFBTCxJQUFxQixFQUFsRCxDQUZWO0FBR0xDLGdCQUFZSDtBQUhQLEdBQVA7QUFLRCxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQWN0aW9uLCBoYW5kbGVBY3Rpb25zIH0gZnJvbSAncmVkdXgtYWN0aW9ucyc7XG5pbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgYmVnaW5UYXNrLCBlbmRUYXNrIH0gZnJvbSAncmVkdXgtbnByb2dyZXNzJztcbmltcG9ydCBjYW1lbENhc2UgZnJvbSAnbG9kYXNoLmNhbWVsY2FzZSc7XG5pbXBvcnQgcGF0aFRvUmVnZXhwIGZyb20gJ3BhdGgtdG8tcmVnZXhwJztcbmltcG9ydCBvbWl0IGZyb20gJ29iamVjdC5vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgKGFjdGlvbnMsIG9wdHMgPSB7fSkgPT4ge1xuICBjb25zdCByZXN1bHRTdWZpeCA9IG9wdHMucmVzdWx0U3VmaXggfHwgJ19SRVNVTFQnO1xuICBmdW5jdGlvbiBnZXRSZWR1Y2VycygpIHtcbiAgICBjb25zdCByZWR1Y2VycyA9IHt9O1xuICAgIGFjdGlvbnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHsgdHlwZSB9ID0gaXRlbTtcbiAgICAgIHJlZHVjZXJzW3R5cGVdID0gKHN0YXRlKSA9PiAoe1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNmZXRjaGluZzogdHJ1ZVxuICAgICAgfSk7XG4gICAgICByZWR1Y2Vyc1tgJHt0eXBlfSR7cmVzdWx0U3VmaXh9YF0gPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzZmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgICBbY2FtZWxDYXNlKGAke3R5cGV9JHtyZXN1bHRTdWZpeH1gKV06IGFjdGlvbi5wYXlsb2FkXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVkdWNlcnM7XG4gIH1cblxuICBmdW5jdGlvbiogcmVxdWVzdChkYXRhKSB7XG4gICAgY29uc3QgeyB0eXBlLCBwYXlsb2FkLCBtZXRhIH0gPSBkYXRhO1xuICAgIGxldCB1cmwgPSBtZXRhLnVybDtcbiAgICBjb25zdCBhY3Rpb25SZXN1bHQgPSBjcmVhdGVBY3Rpb24oYCR7dHlwZX1fUkVTVUxUYCk7XG4gICAgdHJ5IHtcbiAgICAgIHlpZWxkIHB1dChiZWdpblRhc2soKSk7XG5cbiAgICAgIGNvbnN0IGtleXMgPSBbXTtcbiAgICAgIGNvbnN0IG9taXRLZXlzID0gW107XG4gICAgICBwYXRoVG9SZWdleHAodXJsLCBrZXlzKTtcbiAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4gb21pdEtleXMucHVzaChrZXkubmFtZSkpO1xuICAgICAgY29uc3QgdG9QYXRoID0gcGF0aFRvUmVnZXhwLmNvbXBpbGUodXJsKTtcbiAgICAgIHVybCA9IHRvUGF0aChwYXlsb2FkKTtcblxuICAgICAgY29uc3QgcmVzID0geWllbGQgY2FsbChheGlvcywgdXJsLFxuICAgICAgICB7IG1ldGhvZDogbWV0YS5tZXRob2QsIGRhdGE6IG9taXQocGF5bG9hZCwgb21pdEtleXMpIH0pO1xuXG4gICAgICB5aWVsZCBwdXQoYWN0aW9uUmVzdWx0KHJlcykpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB5aWVsZCBwdXQoYWN0aW9uUmVzdWx0KGVycm9yKSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHlpZWxkIHB1dChlbmRUYXNrKCkpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtZXRhQ3JlYXRvcih1cmwsIG1ldGhvZCA9ICdnZXQnKSB7XG4gICAgcmV0dXJuIChfLCBtZXRhKSA9PiAoe1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kLFxuICAgICAgLi4ubWV0YVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGdldENyZWF0ZUFjdGlvbnMoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgYWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB7XG4gICAgICByZXN1bHRbY2FtZWxDYXNlKGFjdGlvbi50eXBlKV0gPSBjcmVhdGVBY3Rpb24oYWN0aW9uLnR5cGUsIG51bGwsXG4gICAgICAgIG1ldGFDcmVhdG9yKGFjdGlvbi51cmwsIGFjdGlvbi5tZXRob2QpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgY29uc3QgYWN0aW9uQ3JlYXRvcnMgPSBnZXRDcmVhdGVBY3Rpb25zKCk7XG5cbiAgZnVuY3Rpb24gZ2V0V2F0Y2hTYWdhcygpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBhY3Rpb25zLmZvckVhY2goYWN0aW9uID0+IHtcbiAgICAgIHJlc3VsdC5wdXNoKHRha2VFdmVyeShhY3Rpb24udHlwZSwgcmVxdWVzdCkpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFjdGlvbkNyZWF0b3JzLFxuICAgIGhhbmRsZUFjdGlvbnM6IGhhbmRsZUFjdGlvbnMoZ2V0UmVkdWNlcnMoKSwgb3B0cy5kZWZhdWx0U3RhdGUgfHwge30pLFxuICAgIHdhdGNoU2FnYXM6IGdldFdhdGNoU2FnYXMoKVxuICB9O1xufTtcbiJdfQ==