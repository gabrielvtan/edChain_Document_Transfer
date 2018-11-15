'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ethereumjsUtil = require('ethereumjs-util');

var _ethereumjsUtil2 = _interopRequireDefault(_ethereumjsUtil);

var _records = require('./records');

var _records2 = _interopRequireDefault(_records);

var _permissions = require('./permissions');

var _permissions2 = _interopRequireDefault(_permissions);

var _util2 = require('./util');

var _util3 = _interopRequireDefault(_util2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Record = function () {
  function Record(contracts, dataHash, owner, metadataHash, sigCount, irisScore, dataUri, timestamp) {
    (0, _classCallCheck3.default)(this, Record);

    this.contracts = contracts;
    this.dataHash = dataHash;
    this.owner = owner;
    this.metadataHash = metadataHash;
    this.sigCount = sigCount;
    this.irisScore = irisScore;
    this.dataUri = dataUri;
    this.timestamp = timestamp;
  }

  /**
   * Get the attestation of the record from a specified attestator
   * @param {String} attestator Address of the attestator
   * @returns {Promise<Boolean>}
   */


  (0, _createClass3.default)(Record, [{
    key: 'getAttestation',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(attestator) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _records2.default.getAttestation(this.contracts.records, this.dataHash, attestator));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAttestation(_x) {
        return _ref.apply(this, arguments);
      }

      return getAttestation;
    }()

    /**
     * Get the permission of the record for a viewer
     * @param {String} viewer Address of the viewer
     * @returns {Promise<{canAccess: Boolean, dataUri: String}>}
     */

  }, {
    key: 'getPermission',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(viewer) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', _permissions2.default.getPermission(this.contracts.permissions, this.dataHash, viewer));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getPermission(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getPermission;
    }()

    /**
     * Gets the plaintext data of this record
     * @param {String} privKey Private key to decrypt the data
     * @param {Function} uriResolver Async function that takes a data URI string and returns the data
     * @returns {String} Plaintext data
     */

  }, {
    key: 'decryptData',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(privKey, uriResolver) {
        var ciphertext, plaintext;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return uriResolver(this.dataUri);

              case 2:
                ciphertext = _context3.sent;
                plaintext = _util3.default.decrypt(privKey, ciphertext);
                // check hash

                if (this.verifyData(plaintext)) {
                  _context3.next = 6;
                  break;
                }

                throw new Error('plaintext data hash mismatch');

              case 6:
                return _context3.abrupt('return', plaintext);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function decryptData(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return decryptData;
    }()

    /**
     * Gets the plaintext data of a permissioned copy of the record
     * @param {String} viewer Address of the viewer
     * @param {String} privKey Private key to decrypt the data
     * @param {Function} uriResolver Async function that takes a data URI string and returns the data
     * @returns {String} Plaintext data
     */

  }, {
    key: 'decryptPermissioned',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(viewer, privKey, uriResolver) {
        var perm, ciphertext, plaintext;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getPermission(viewer);

              case 2:
                perm = _context4.sent;

                if (perm.canAccess) {
                  _context4.next = 5;
                  break;
                }

                throw new Error('viewer has no permission to view the data');

              case 5:
                _context4.next = 7;
                return uriResolver(perm.dataUri);

              case 7:
                ciphertext = _context4.sent;
                plaintext = _util3.default.decrypt(privKey, ciphertext);

                if (this.verifyData(plaintext)) {
                  _context4.next = 11;
                  break;
                }

                throw new Error('plaintext data hash mismatch');

              case 11:
                return _context4.abrupt('return', plaintext);

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function decryptPermissioned(_x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
      }

      return decryptPermissioned;
    }()

    /**
     * Verifies data against the data hash in Linnia
     * @param {Buffer|String} plaintext Plaintext data to be verified
     * @returns {Boolean} True if data hash matches
     */

  }, {
    key: 'verifyData',
    value: function verifyData(plaintext) {
      return _ethereumjsUtil2.default.bufferToHex(_ethereumjsUtil2.default.keccak256(plaintext)) === this.dataHash;
    }

    /**
     * Re-encrypts the data to another public key
     * @param {String} pubKey Public key to re-encrypt the data to
     * @param {String} privKey Private key to decrypt the record data
     * @param {Function} uriResolver Async function that takes a data URI string and returns the data
     * @returns {String} Re-encrypted data
     */

  }, {
    key: 'reencryptData',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(pubKey, privKey, uriResolver) {
        var plaintext, encryptedData;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.decryptData(privKey, uriResolver);

              case 2:
                plaintext = _context5.sent;
                encryptedData = _util3.default.encrypt(pubKey, plaintext);
                return _context5.abrupt('return', encryptedData);

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function reencryptData(_x8, _x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return reencryptData;
    }()
  }], [{
    key: 'fromContract',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(recordsContract, permissionsContract, dataHash) {
        var r, contracts;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _records2.default.getRecord(recordsContract, dataHash);

              case 2:
                r = _context6.sent;
                contracts = {
                  records: recordsContract,
                  permissions: permissionsContract
                };
                return _context6.abrupt('return', new Record(contracts, dataHash, r.owner, r.metadataHash, r.sigCount, r.irisScore, r.dataUri, r.timestamp));

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function fromContract(_x11, _x12, _x13) {
        return _ref6.apply(this, arguments);
      }

      return fromContract;
    }()
  }]);
  return Record;
}();

exports.default = Record;
module.exports = exports['default'];
//# sourceMappingURL=record.js.map