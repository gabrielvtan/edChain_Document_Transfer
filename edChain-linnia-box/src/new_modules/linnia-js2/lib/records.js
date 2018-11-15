'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _attestation = require('./attestation');

var _attestation2 = _interopRequireDefault(_attestation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRecord = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(recordsContract, dataHash) {
    var res, owner, metadataHash, sigCount, irisScore, dataUri, timestamp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return recordsContract.records.call(dataHash);

          case 2:
            res = _context.sent;
            owner = res[0];
            metadataHash = res[1];
            sigCount = res[2];
            irisScore = res[3];
            dataUri = res[4];
            timestamp = new Date(res[5] * 1000);
            return _context.abrupt('return', {
              owner: owner,
              metadataHash: metadataHash,
              sigCount: sigCount,
              irisScore: irisScore,
              dataUri: dataUri,
              timestamp: timestamp
            });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getRecord(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getPermissionedRecord = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(recordsContract, dataHash) {
      var res, owner, metadataHash, sigCount, irisScore, dataUri, timestamp;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return recordsContract.records.call(dataHash);
  
            case 2:
              res = _context.sent;
              owner = res[0];
              metadataHash = res[1];
              sigCount = res[2];
              irisScore = res[3];
              dataUri = res[4];
              timestamp = new Date(res[5] * 1000);
              return _context.abrupt('return', {
                owner: owner,
                metadataHash: metadataHash,
                sigCount: sigCount,
                irisScore: irisScore,
                dataUri: dataUri,
                timestamp: timestamp
              });
  
            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  
    return function getPermissionedRecord(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

var addRecordWithReward = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(recordsContract, usersContract, dataHash, metadata, dataUri, tokenAddress, ethParams) {
    var isUser;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (tokenAddress) {
              _context2.next = 2;
              break;
            }

            throw new Error('tokenAddress not valid.  It is likely not set in linnia constructor');

          case 2:
            if (ethParams.from) {
              _context2.next = 4;
              break;
            }

            throw new Error('ethParams object does not contain a "from" key');

          case 4:
            _context2.next = 6;
            return usersContract.isUser(ethParams.from);

          case 6:
            isUser = _context2.sent;

            if (isUser) {
              _context2.next = 9;
              break;
            }

            throw new Error('the address is not registered in Linnia');

          case 9:
            if (!((typeof metadata === 'undefined' ? 'undefined' : (0, _typeof3.default)(metadata)) !== 'object')) {
              _context2.next = 11;
              break;
            }

            throw new Error('Metadata has to be a JSON object');

          case 11:
            _context2.prev = 11;
            _context2.next = 14;
            return recordsContract.addRecordwithReward(dataHash, (0, _stringify2.default)(metadata), dataUri, tokenAddress, ethParams);

          case 14:
            return _context2.abrupt('return', getRecord(recordsContract, dataHash));

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2['catch'](11);

            if (!(_context2.t0.message === 'sender account not recognized')) {
              _context2.next = 23;
              break;
            }

            throw new Error('The web3 Instance that you pass to Linnia cannot sign a transaction for this address');

          case 23:
            throw _context2.t0;

          case 24:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[11, 17]]);
  }));

  return function addRecordWithReward(_x3, _x4, _x5, _x6, _x7, _x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();

var addRecord = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(recordsContract, usersContract, dataHash, metadata, dataUri, ethParams) {
    var isUser;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (ethParams.from) {
              _context3.next = 2;
              break;
            }

            throw new Error('ethParams object does not contain a "from" key');

          case 2:
            _context3.next = 4;
            return usersContract.isUser(ethParams.from);

          case 4:
            isUser = _context3.sent;

            if (isUser) {
              _context3.next = 7;
              break;
            }

            throw new Error('the address is not registered in Linnia');

          case 7:
            if (!((typeof metadata === 'undefined' ? 'undefined' : (0, _typeof3.default)(metadata)) !== 'object')) {
              _context3.next = 9;
              break;
            }

            throw new Error('Metadata has to be a JSON object');

          case 9:
            _context3.prev = 9;
            _context3.next = 12;
            return recordsContract.addRecord(dataHash, (0, _stringify2.default)(metadata), dataUri, ethParams);

          case 12:
            return _context3.abrupt('return', getRecord(recordsContract, dataHash));

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3['catch'](9);

            if (!(_context3.t0.message === 'sender account not recognized')) {
              _context3.next = 21;
              break;
            }

            throw new Error('The web3 Instance that you pass to Linnia cannot sign a transaction for this address');

          case 21:
            throw _context3.t0;

          case 22:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[9, 15]]);
  }));

  return function addRecord(_x10, _x11, _x12, _x13, _x14, _x15) {
    return _ref3.apply(this, arguments);
  };
}();

var signRecord = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(recordsContract, usersContract, dataHash, ethParams) {
    var isUser, provenance, record, sigExists;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (ethParams.from) {
              _context4.next = 2;
              break;
            }

            throw new Error('ethParams object does not contain a "from" key');

          case 2:
            _context4.next = 4;
            return usersContract.isUser(ethParams.from);

          case 4:
            isUser = _context4.sent;

            if (isUser) {
              _context4.next = 7;
              break;
            }

            throw new Error('the address is not registered in Linnia');

          case 7:
            _context4.next = 9;
            return usersContract.provenanceOf(ethParams.from);

          case 9:
            provenance = _context4.sent;

            if (provenance > 0) {
              _context4.next = 12;
              break;
            }

            throw new Error('The attestor does not have provenance (Invalid Attestator)');

          case 12:
            _context4.next = 14;
            return getRecord(recordsContract, dataHash);

          case 14:
            record = _context4.sent;

            if (!(record.owner === '0x0000000000000000000000000000000000000000')) {
              _context4.next = 17;
              break;
            }

            throw new Error('The record does not exists');

          case 17:
            _context4.next = 19;
            return recordsContract.sigExists(dataHash, ethParams.from);

          case 19:
            sigExists = _context4.sent;

            if (!sigExists) {
              _context4.next = 22;
              break;
            }

            throw new Error('The attestor have already signed this record');

          case 22:
            _context4.prev = 22;
            _context4.next = 25;
            return recordsContract.addSigByProvider(dataHash, ethParams);

          case 25:
            return _context4.abrupt('return', new _attestation2.default(ethParams.from, dataHash));

          case 28:
            _context4.prev = 28;
            _context4.t0 = _context4['catch'](22);

            if (!(_context4.t0.message === 'sender account not recognized')) {
              _context4.next = 34;
              break;
            }

            throw new Error('The web3 Instance that you pass to Linnia cannot sign a transaction for this address');

          case 34:
            throw _context4.t0;

          case 35:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[22, 28]]);
  }));

  return function signRecord(_x16, _x17, _x18, _x19) {
    return _ref4.apply(this, arguments);
  };
}();

var getAttestation = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(recordsContract, dataHash, attestator) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', recordsContract.sigExists.call(dataHash, attestator));

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getAttestation(_x20, _x21, _x22) {
    return _ref5.apply(this, arguments);
  };
}();

exports.default = {
  getRecord: getRecord,
  getPermissionedRecord: getPermissionedRecord,
  addRecord: addRecord,
  addRecordWithReward: addRecordWithReward,
  getAttestation: getAttestation,
  signRecord: signRecord
};
module.exports = exports['default'];
//# sourceMappingURL=records.js.map