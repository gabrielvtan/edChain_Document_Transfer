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

var _truffleContract = require('truffle-contract');

var _truffleContract2 = _interopRequireDefault(_truffleContract);

var _LinniaHub = require('@linniaprotocol/linnia-smart-contracts/build/contracts//LinniaHub.json');

var _LinniaHub2 = _interopRequireDefault(_LinniaHub);

var _LinniaUsers = require('@linniaprotocol/linnia-smart-contracts/build/contracts//LinniaUsers.json');

var _LinniaUsers2 = _interopRequireDefault(_LinniaUsers);

var _LinniaRecords = require('@linniaprotocol/linnia-smart-contracts/build/contracts//LinniaRecords.json');

var _LinniaRecords2 = _interopRequireDefault(_LinniaRecords);

var _LinniaPermissions = require('@linniaprotocol/linnia-smart-contracts/build/contracts//LinniaPermissions.json');

var _LinniaPermissions2 = _interopRequireDefault(_LinniaPermissions);

var _record = require('./record');

var _record2 = _interopRequireDefault(_record);

var _records2 = require('./records');

var _records3 = _interopRequireDefault(_records2);

var _permissions2 = require('./permissions');

var _permissions3 = _interopRequireDefault(_permissions2);

var _util2 = require('./util');

var _util3 = _interopRequireDefault(_util2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Linnia API object
 */
var Linnia2 = function () {
  /**
   * Create a new Linnia API object
   * @param {Object} web3 An instantiated web3 API object
   * @param {?{?linniaContractUpgradeHubAddress: String}} opt Optional constructor options
   * @returns {Linnia} Created Linnia API object
   */
  function Linnia2(web3) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Linnia2);

    this.web3 = web3;
    // truffle contracts
    var _hub = (0, _truffleContract2.default)(_LinniaHub2.default);
    var _users = (0, _truffleContract2.default)(_LinniaUsers2.default);
    var _records = (0, _truffleContract2.default)(_LinniaRecords2.default);
    var _permissions = (0, _truffleContract2.default)(_LinniaPermissions2.default);
    _hub.setProvider(web3.currentProvider);
    _users.setProvider(web3.currentProvider);
    _records.setProvider(web3.currentProvider);
    _permissions.setProvider(web3.currentProvider);
    this._hub = _util3.default.truffleHack(_hub);
    this._users = _util3.default.truffleHack(_users);
    this._records = _util3.default.truffleHack(_records);
    this._permissions = _util3.default.truffleHack(_permissions);
    // set linniaContractUpgradeHubAddress address
    // using user defined address
    this._hubAddress = opt.linniaContractUpgradeHubAddress;
    this._tokenAddress = opt.linniaTokenContractAddress;
  }

  /**
   * Get Linnia contract instances, wrapped in truffle contract
   * @returns {Promise<{hub: Object, users: Object, records: Object, permissions: Object}>}
   */


  (0, _createClass3.default)(Linnia2, [{
    key: 'getContractInstances',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var hubInstance, usersAddress, recordsAddress, permissionsAddress;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._getHubInstance();

              case 2:
                hubInstance = _context.sent;
                _context.next = 5;
                return hubInstance.usersContract();

              case 5:
                usersAddress = _context.sent;
                _context.next = 8;
                return hubInstance.recordsContract();

              case 8:
                recordsAddress = _context.sent;
                _context.next = 11;
                return hubInstance.permissionsContract();

              case 11:
                permissionsAddress = _context.sent;
                _context.t0 = hubInstance;
                _context.next = 15;
                return this._users.at(usersAddress);

              case 15:
                _context.t1 = _context.sent;
                _context.next = 18;
                return this._records.at(recordsAddress);

              case 18:
                _context.t2 = _context.sent;
                _context.next = 21;
                return this._permissions.at(permissionsAddress);

              case 21:
                _context.t3 = _context.sent;
                return _context.abrupt('return', {
                  _linniaContractUpgradeHub: _context.t0,
                  users: _context.t1,
                  records: _context.t2,
                  permissions: _context.t3
                });

              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getContractInstances() {
        return _ref.apply(this, arguments);
      }

      return getContractInstances;
    }()

    /**
     * Get a record from Linnia by data hash
     * @param {String} dataHash hex-encoded data hash, 0x prefixed
     * @returns {Promise<Record>}
     */

  }, {
    key: 'getRecord',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dataHash) {
        var _ref3, records, permissions;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getContractInstances();

              case 2:
                _ref3 = _context2.sent;
                records = _ref3.records;
                permissions = _ref3.permissions;
                return _context2.abrupt('return', _record2.default.fromContract(records, permissions, dataHash));

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getRecord(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getRecord;
    }()

    /**
     * Add a record from Linnia by data hash
     * @param {String} dataHash hash of the plain text data + metadata
     * @param {Object} metadata public information about the data
     * @param {String} dataUri link to the data (eg. the IPFS hash)
     * @param {Object} ethParams ethereum account params
     * @returns {Promise<Record>}
     */

  }, {
    key: 'getPermissionedRecord',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dataHash) {
        var _ref3, records, permissions;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getContractInstances();

              case 2:
                _ref3 = _context2.sent;
                records = _ref3.records;
                permissions = _ref3.permissions;
                return _context2.abrupt('return', _record2.default.fromContract(records, permissions, dataHash));

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getPermissionedRecord(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getPermissionedRecord;
    }()

    /**
     * Add a record from Linnia by data hash
     * @param {String} dataHash hash of the plain text data + metadata
     * @param {Object} metadata public information about the data
     * @param {String} dataUri link to the data (eg. the IPFS hash)
     * @param {Object} ethParams ethereum account params
     * @returns {Promise<Record>}
     */

  },{
    key: 'addRecord',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dataHash, metadata, dataUri, ethParams) {
        var _ref5, records, users;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getContractInstances();

              case 2:
                _ref5 = _context3.sent;
                records = _ref5.records;
                users = _ref5.users;
                return _context3.abrupt('return', _records3.default.addRecord(records, users, dataHash, metadata, dataUri, ethParams));

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addRecord(_x3, _x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return addRecord;
    }()

    /**
     * Add a record from Linnia by data hash
     * @param {String} dataHash hash of the plain text data + metadata
     * @param {Object} metadata public information about the data
     * @param {String} dataUri link to the data (eg. the IPFS hash)
     * @param {Object} ethParams ethereum account params
     * @returns {Promise<Record>}
     */

  }, {
    key: 'addRecordWithReward',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dataHash, metadata, dataUri, ethParams) {
        var _ref7, records, users;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getContractInstances();

              case 2:
                _ref7 = _context4.sent;
                records = _ref7.records;
                users = _ref7.users;
                return _context4.abrupt('return', _records3.default.addRecordWithReward(records, users, dataHash, metadata, dataUri, this._tokenAddress, ethParams));

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function addRecordWithReward(_x7, _x8, _x9, _x10) {
        return _ref6.apply(this, arguments);
      }

      return addRecordWithReward;
    }()

    /**
      * Get record attestation from Linnia
      * @param {String} dataHash hex-encoded data hash, 0x prefixed
      * @returns {Promise<Boolean>} True if attested by specified user
     */

  }, {
    key: 'getAttestation',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(dataHash, attestatorAddress) {
        var _ref9, records;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getContractInstances();

              case 2:
                _ref9 = _context5.sent;
                records = _ref9.records;
                return _context5.abrupt('return', _records3.default.getAttestation(records, dataHash, attestatorAddress));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getAttestation(_x11, _x12) {
        return _ref8.apply(this, arguments);
      }

      return getAttestation;
    }()

    /**
     * Sign a record (add attestation)
     * @param {String} dataHash hex-encoded data hash, 0x prefixed
     * @param {Object} ethParams ethereum account params
     * @returns {Promise<Attestation>}
     */

  }, {
    key: 'signRecord',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(dataHash, ethParams) {
        var _ref11, records, users;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getContractInstances();

              case 2:
                _ref11 = _context6.sent;
                records = _ref11.records;
                users = _ref11.users;
                return _context6.abrupt('return', _records3.default.signRecord(records, users, dataHash, ethParams));

              case 6:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function signRecord(_x13, _x14) {
        return _ref10.apply(this, arguments);
      }

      return signRecord;
    }()

    /**
     * Get permission information of a record
     * @param {String} dataHash hex-encoded data hash, 0x prefixed
     * @param {String} viewerAddress hex-encoded ethereum address
     * @returns {Promise<{canAccess: Boolean, dataUri: String}>}
     */

  }, {
    key: 'getPermission',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(dataHash, viewerAddress) {
        var _ref13, permissions;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getContractInstances();

              case 2:
                _ref13 = _context7.sent;
                permissions = _ref13.permissions;
                return _context7.abrupt('return', _permissions3.default.getPermission(permissions, dataHash, viewerAddress));

              case 5:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getPermission(_x15, _x16) {
        return _ref12.apply(this, arguments);
      }

      return getPermission;
    }()

    /**
     * Internal DO NOT USE
     * @returns {Promise<*>}
     * @private
     */

  }, {
    key: '_getHubInstance',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this._hubAddress) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt('return', this._hub.at(this._hubAddress));

              case 2:
                return _context8.abrupt('return', this._hub.deployed());

              case 3:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _getHubInstance() {
        return _ref14.apply(this, arguments);
      }

      return _getHubInstance;
    }()
  }]);
  return Linnia2;
}();

Linnia2.util = _util3.default;

exports.default = Linnia2;
module.exports = exports['default'];
//# sourceMappingURL=linnia.js.map