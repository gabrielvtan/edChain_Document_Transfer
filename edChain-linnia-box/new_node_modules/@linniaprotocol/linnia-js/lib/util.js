'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
var ethSigUtil = require('eth-sig-util');

var ALGO_VERSION = 'x25519-xsalsa20-poly1305';

/**
 * EIP 1098 (https://github.com/ethereum/EIPs/pull/1098)
 * Generate Keys
 * @returns {JSON} with publicKey and privateKey
 */
var genKeyPair = function genKeyPair() {
  var keys = nacl.box.keyPair();
  return {
    privateKey: nacl.util.encodeBase64(keys.secretKey),
    publicKey: nacl.util.encodeBase64(keys.publicKey)
  };
};

/**
 * EIP 1098 (https://github.com/ethereum/EIPs/pull/1098)
 * Encrypt
 * @param {String} pubKeyTo
 * @param {JSON} data Data to be encrypted (Has to be JSON Object)
 * @returns {JSON} Encrypted message
 */
var encrypt = function encrypt(pubKeyTo, data) {
  return ethSigUtil.encryptSafely(pubKeyTo, { data: data }, ALGO_VERSION);
};

/**
 * EIP 1098 (https://github.com/ethereum/EIPs/pull/1098)
 * Decrypt
 * @param {String} privKey
 * @param {String} encrypted Encrypted message
 * @returns {String} plaintext
 */
var decrypt = function decrypt(privKey, encrypted) {
  return ethSigUtil.decryptSafely(encrypted, nacl.util.decodeBase64(privKey));
};

/* eslint-disable */

var truffleHack = function truffleHack(contract) {
  if (typeof contract.currentProvider.sendAsync !== 'function') {
    contract.currentProvider.sendAsync = function () {
      return contract.currentProvider.send.apply(contract.currentProvider, arguments);
    };
  }
  return contract;
};

/* eslint-enable */

exports.default = {
  genKeyPair: genKeyPair,
  encrypt: encrypt,
  decrypt: decrypt,
  truffleHack: truffleHack
};
module.exports = exports['default'];
//# sourceMappingURL=util.js.map