'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
                return (0, _extends3.default)({}, state, {
                    isfetching: true
                });
            };
            reducers['' + type + resultSufix] = function (state, action) {
                return (0, _extends3.default)({}, state, {
                    isfetching: false,
                    updateResult: action.payload
                });
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
                        console.log(data);
                        type = data.type, payload = data.payload, meta = data.meta;
                        url = meta.url;
                        actionResult = (0, _reduxActions.createAction)(type + '_RESULT');
                        _context.prev = 4;
                        _context.next = 7;
                        return (0, _effects.put)((0, _reduxNprogress.beginTask)());

                    case 7:

                        if (meta.method === 'put') {
                            toPath = _pathToRegexp2.default.compile(url);

                            url = toPath(payload);
                        }

                        _context.next = 10;
                        return (0, _effects.call)(_axios2.default, url, { method: meta.method, data: payload });

                    case 10:
                        res = _context.sent;
                        _context.next = 13;
                        return (0, _effects.put)(actionResult(res));

                    case 13:
                        _context.next = 19;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](4);
                        _context.next = 19;
                        return (0, _effects.put)(actionResult(_context.t0));

                    case 19:
                        _context.prev = 19;
                        _context.next = 22;
                        return (0, _effects.put)((0, _reduxNprogress.endTask)());

                    case 22:
                        return _context.finish(19);

                    case 23:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked[0], this, [[4, 15, 19, 23]]);
    }
    function metaCreator(url) {
        var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';

        return function (_, meta) {
            return (0, _extends3.default)({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhY3Rpb25zIiwicmVxdWVzdCIsIm9wdHMiLCJyZXN1bHRTdWZpeCIsImdldFJlZHVjZXJzIiwicmVkdWNlcnMiLCJmb3JFYWNoIiwidHlwZSIsIml0ZW0iLCJzdGF0ZSIsImlzZmV0Y2hpbmciLCJhY3Rpb24iLCJ1cGRhdGVSZXN1bHQiLCJwYXlsb2FkIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJtZXRhIiwidXJsIiwiYWN0aW9uUmVzdWx0IiwibWV0aG9kIiwidG9QYXRoIiwiY29tcGlsZSIsInJlcyIsIm1ldGFDcmVhdG9yIiwiXyIsImdldENyZWF0ZUFjdGlvbnMiLCJyZXN1bHQiLCJhY3Rpb25DcmVhdG9ycyIsImdldFdhdGNoU2FnYXMiLCJwdXNoIiwiaGFuZGxlQWN0aW9ucyIsImRlZmF1bHRTdGF0ZSIsIndhdGNoU2FnYXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWUsVUFBQ0EsT0FBRCxFQUF3QjtBQUFBLG1CQW1CekJDLE9BbkJ5Qjs7QUFBQSxRQUFkQyxJQUFjLHVFQUFQLEVBQU87O0FBQ25DLFFBQU1DLGNBQWNELEtBQUtDLFdBQUwsSUFBb0IsU0FBeEM7QUFDQSxhQUFTQyxXQUFULEdBQXVCO0FBQ25CLFlBQU1DLFdBQVcsRUFBakI7QUFDQUwsZ0JBQVFNLE9BQVIsQ0FBZ0IsZ0JBQVE7QUFBQSxnQkFDWkMsSUFEWSxHQUNIQyxJQURHLENBQ1pELElBRFk7O0FBRXBCRixxQkFBU0UsSUFBVCxJQUFpQixVQUFDRSxLQUFEO0FBQUEsa0RBQ1ZBLEtBRFU7QUFFYkMsZ0NBQVk7QUFGQztBQUFBLGFBQWpCO0FBSUFMLDBCQUFZRSxJQUFaLEdBQW1CSixXQUFuQixJQUFvQyxVQUFDTSxLQUFELEVBQVFFLE1BQVI7QUFBQSxrREFDN0JGLEtBRDZCO0FBRWhDQyxnQ0FBWSxLQUZvQjtBQUdoQ0Usa0NBQWNELE9BQU9FO0FBSFc7QUFBQSxhQUFwQztBQUtILFNBWEQ7QUFZQSxlQUFPUixRQUFQO0FBQ0g7O0FBRUQsYUFBVUosT0FBVixDQUFrQmEsSUFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0lDLGdDQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDUVAsNEJBRlosR0FFb0NPLElBRnBDLENBRVlQLElBRlosRUFFa0JNLE9BRmxCLEdBRW9DQyxJQUZwQyxDQUVrQkQsT0FGbEIsRUFFMkJJLElBRjNCLEdBRW9DSCxJQUZwQyxDQUUyQkcsSUFGM0I7QUFHUUMsMkJBSFIsR0FHY0QsS0FBS0MsR0FIbkI7QUFJVUMsb0NBSlYsR0FJeUIsZ0NBQWdCWixJQUFoQixhQUp6QjtBQUFBO0FBQUE7QUFBQSwrQkFNYyxrQkFBSSxnQ0FBSixDQU5kOztBQUFBOztBQVFRLDRCQUFJVSxLQUFLRyxNQUFMLEtBQWdCLEtBQXBCLEVBQTJCO0FBQ2pCQyxrQ0FEaUIsR0FDUix1QkFBYUMsT0FBYixDQUFxQkosR0FBckIsQ0FEUTs7QUFFdkJBLGtDQUFNRyxPQUFPUixPQUFQLENBQU47QUFDSDs7QUFYVDtBQUFBLCtCQWEwQixvQ0FBWUssR0FBWixFQUFpQixFQUFFRSxRQUFRSCxLQUFLRyxNQUFmLEVBQXVCTixNQUFNRCxPQUE3QixFQUFqQixDQWIxQjs7QUFBQTtBQWFjVSwyQkFiZDtBQUFBO0FBQUEsK0JBZWMsa0JBQUlKLGFBQWFJLEdBQWIsQ0FBSixDQWZkOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQWlCYyxrQkFBSUoseUJBQUosQ0FqQmQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEsK0JBbUJjLGtCQUFJLDhCQUFKLENBbkJkOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFzQkEsYUFBU0ssV0FBVCxDQUFxQk4sR0FBckIsRUFBMEM7QUFBQSxZQUFoQkUsTUFBZ0IsdUVBQVAsS0FBTzs7QUFDdEMsZUFBTyxVQUFDSyxDQUFELEVBQUlSLElBQUo7QUFBQTtBQUNIQyx3QkFERztBQUVIRTtBQUZHLGVBR0FILElBSEE7QUFBQSxTQUFQO0FBS0g7QUFDRCxhQUFTUyxnQkFBVCxHQUE0QjtBQUN4QixZQUFNQyxTQUFTLEVBQWY7QUFDQTNCLGdCQUFRTSxPQUFSLENBQWdCLGtCQUFVO0FBQ3RCcUIsbUJBQU8sc0JBQVVoQixPQUFPSixJQUFqQixDQUFQLElBQWlDLGdDQUFhSSxPQUFPSixJQUFwQixFQUEwQixJQUExQixFQUM3QmlCLFlBQVliLE9BQU9PLEdBQW5CLEVBQXdCUCxPQUFPUyxNQUEvQixDQUQ2QixDQUFqQztBQUVILFNBSEQ7QUFJQSxlQUFPTyxNQUFQO0FBQ0g7O0FBRUQsUUFBTUMsaUJBQWlCRixrQkFBdkI7O0FBRUEsYUFBU0csYUFBVCxHQUF5QjtBQUNyQixZQUFNRixTQUFTLEVBQWY7QUFDQTNCLGdCQUFRTSxPQUFSLENBQWdCLGtCQUFVO0FBQ3RCcUIsbUJBQU9HLElBQVAsQ0FBWSx3QkFBVW5CLE9BQU9KLElBQWpCLEVBQXVCTixPQUF2QixDQUFaO0FBQ0gsU0FGRDtBQUdBLGVBQU8wQixNQUFQO0FBQ0g7O0FBRUQsV0FBTztBQUNIQyxzQ0FERztBQUVIRyx1QkFBZSxpQ0FBYzNCLGFBQWQsRUFBNkJGLEtBQUs4QixZQUFMLElBQXFCLEVBQWxELENBRlo7QUFHSEMsb0JBQVlKO0FBSFQsS0FBUDtBQUtILEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBY3Rpb24sIGhhbmRsZUFjdGlvbnMgfSBmcm9tICdyZWR1eC1hY3Rpb25zJztcclxuaW1wb3J0IHsgY2FsbCwgcHV0LCB0YWtlRXZlcnkgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBiZWdpblRhc2ssIGVuZFRhc2sgfSBmcm9tICdyZWR1eC1ucHJvZ3Jlc3MnO1xyXG5pbXBvcnQgY2FtZWxDYXNlIGZyb20gJ2xvZGFzaC5jYW1lbGNhc2UnO1xyXG5pbXBvcnQgcGF0aFRvUmVnZXhwIGZyb20gJ3BhdGgtdG8tcmVnZXhwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChhY3Rpb25zLCBvcHRzID0ge30pID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdFN1Zml4ID0gb3B0cy5yZXN1bHRTdWZpeCB8fCAnX1JFU1VMVCc7XHJcbiAgICBmdW5jdGlvbiBnZXRSZWR1Y2VycygpIHtcclxuICAgICAgICBjb25zdCByZWR1Y2VycyA9IHt9O1xyXG4gICAgICAgIGFjdGlvbnMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeyB0eXBlIH0gPSBpdGVtO1xyXG4gICAgICAgICAgICByZWR1Y2Vyc1t0eXBlXSA9IChzdGF0ZSkgPT4gKHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgaXNmZXRjaGluZzogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVkdWNlcnNbYCR7dHlwZX0ke3Jlc3VsdFN1Zml4fWBdID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgIGlzZmV0Y2hpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlUmVzdWx0OiBhY3Rpb24ucGF5bG9hZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVkdWNlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24qIHJlcXVlc3QoZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIGNvbnN0IHsgdHlwZSwgcGF5bG9hZCwgbWV0YSB9ID0gZGF0YTtcclxuICAgICAgICBsZXQgdXJsID0gbWV0YS51cmw7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uUmVzdWx0ID0gY3JlYXRlQWN0aW9uKGAke3R5cGV9X1JFU1VMVGApO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHlpZWxkIHB1dChiZWdpblRhc2soKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWV0YS5tZXRob2QgPT09ICdwdXQnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b1BhdGggPSBwYXRoVG9SZWdleHAuY29tcGlsZSh1cmwpO1xyXG4gICAgICAgICAgICAgICAgdXJsID0gdG9QYXRoKHBheWxvYWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXMgPSB5aWVsZCBjYWxsKGF4aW9zLCB1cmwsIHsgbWV0aG9kOiBtZXRhLm1ldGhvZCwgZGF0YTogcGF5bG9hZCB9KTtcclxuXHJcbiAgICAgICAgICAgIHlpZWxkIHB1dChhY3Rpb25SZXN1bHQocmVzKSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgeWllbGQgcHV0KGFjdGlvblJlc3VsdChlcnJvcikpO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHlpZWxkIHB1dChlbmRUYXNrKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG1ldGFDcmVhdG9yKHVybCwgbWV0aG9kID0gJ2dldCcpIHtcclxuICAgICAgICByZXR1cm4gKF8sIG1ldGEpID0+ICh7XHJcbiAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgICAgICAuLi5tZXRhXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRDcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIGFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICByZXN1bHRbY2FtZWxDYXNlKGFjdGlvbi50eXBlKV0gPSBjcmVhdGVBY3Rpb24oYWN0aW9uLnR5cGUsIG51bGwsXHJcbiAgICAgICAgICAgICAgICBtZXRhQ3JlYXRvcihhY3Rpb24udXJsLCBhY3Rpb24ubWV0aG9kKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IGdldENyZWF0ZUFjdGlvbnMoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRXYXRjaFNhZ2FzKCkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0YWtlRXZlcnkoYWN0aW9uLnR5cGUsIHJlcXVlc3QpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWN0aW9uQ3JlYXRvcnMsXHJcbiAgICAgICAgaGFuZGxlQWN0aW9uczogaGFuZGxlQWN0aW9ucyhnZXRSZWR1Y2VycygpLCBvcHRzLmRlZmF1bHRTdGF0ZSB8fCB7fSksXHJcbiAgICAgICAgd2F0Y2hTYWdhczogZ2V0V2F0Y2hTYWdhcygpXHJcbiAgICB9O1xyXG59O1xyXG4iXX0=