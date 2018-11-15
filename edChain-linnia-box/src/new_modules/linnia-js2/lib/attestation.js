"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Attestation = function Attestation(attestator, dataHash) {
  (0, _classCallCheck3.default)(this, Attestation);

  this.attestator = attestator;
  this.dataHash = dataHash;
};

exports.default = Attestation;
module.exports = exports["default"];
//# sourceMappingURL=attestation.js.map