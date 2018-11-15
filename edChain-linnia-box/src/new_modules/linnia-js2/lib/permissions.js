"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPermission = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(permissionsContract, dataHash, viewer) {
    var res;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return permissionsContract.permissions.call(dataHash, viewer);

          case 2:
            res = _context.sent;
            return _context.abrupt("return", {
              canAccess: res[0],
              dataUri: res[1]
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getPermission(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = {
  getPermission: getPermission
};
module.exports = exports["default"];
//# sourceMappingURL=permissions.js.map