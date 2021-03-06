import store from '../store';
import Linnia from '@linniaprotocol/linnia-js';
import Record from '@linniaprotocol/linnia-js/src/record';

export const GET_RECORD = 'GET_RECORD';

const assignRecord = (record) => ({
  type: GET_RECORD,
  payload: record,
});

export const getRecord = (dataHash) => async (dispatch) => {

  /*
    Here, we pulled the linnia libray object from the state,
    get the record for the dataHash provided as an argument
    from the contract state, the dispatch an action that adds
    the record to the state.
  */

  const { linnia } = store.getState().auth;
  const record = await linnia.getRecord(dataHash);
  dispatch(assignRecord(record)); 
};

// #TODO - this needs to incorporate the privateKey of the PERMISSIONED VIEWER
export const getDecryptedPermissionedRecord = (record, privateKey) => async (dispatch) => {

  /*
    We start by pulling the IPFS api wrapper from the state. Then,
    we use the wrapper to pull the encrypted data at the dataUri down from IPFS.
    Finally, we attempt to decrypt the data using the provided private key. If
    it's successful, we add the decrypted data to the state. If not, we display an
    error.
  */

  const { ipfs } = store.getState().auth;
  const [ownerAddress] = await store.getState().auth.web3.eth.getAccounts();


  if (record.owner === '0x0000000000000000000000000000000000000000') {
    return (alert('Error: owner address is zero. does the file exist?'));
  }

  // Use ipfs library to pull the encrypted data down from IPFS
  ipfs.cat(record.dataUri, async (err, ipfsRes) => {
    if (err) {
      console.log(err);
    } else {
      const encrypted = JSON.parse(ipfsRes);
      const perm = await record.getPermission(ownerAddress);
      if (!perm.canAccess) {
          throw new Error('You do not have permission to view the data')
      }
      const ciphertext = encrypted.ciphertext;
      console.log(encrypted)
      console.log(perm)
      console.log(ciphertext)

      // Try to decraypt with the provided key
      // FIX ME Linnia.record.decryptPermissioned does not work. 
      try {
        const decrypted = await Linnia.util.decrypt(privateKey, encrypted);
        console.log(decrypted)
        record.decrypted = JSON.stringify(decrypted);
        dispatch(assignRecord(record));
      } catch (e) {
        console.log(e);
        return (alert('Error DUMMY'));
      }
    }
  });
};
