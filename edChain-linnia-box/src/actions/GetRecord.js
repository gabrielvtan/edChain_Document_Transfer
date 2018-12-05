import store from '../store';
import Linnia from '@linniaprotocol/linnia-js';
import config from '../config';
import request from 'request';

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
  let req = config.LINNIA_SEARCH_URI + "/records";
  
  const { linnia } = store.getState().auth;
  const record = await linnia.getRecord(dataHash);
  
  //TODO: UPDATE THIS WITH THE SEARCH FUNCTIONALITY. FIGURE OUT HOW TO PARSE METADATA
  let x = record.dataHash;
  record.metadataHash = "FIX ME"
  console.log(x)
  req = request(req + '/' + x);
  console.log(req);

  dispatch(assignRecord(record));
};

export const getDecryptedRecord = (record, privateKey) => async (dispatch) => {

  /*
    We start by pulling the IPFS api wrapper from the state. Then,
    we use the wrapper to pull the encrypted data at the dataUri down from IPFS.
    Finally, we attempt to decrypt the data using the provided private key. If
    it's successful, we add the decrypted data to the state. If not, we display an
    error.
  */

  const { ipfs } = store.getState().auth;

  if (record.owner === '0x0000000000000000000000000000000000000000') {
    return (alert('Error: owner address is zero. does the file exist?'));
  }

  // Use ipfs library to pull the encrypted data down from IPFS
  ipfs.cat(record.dataUri, async (err, ipfsRes) => {
    if (err) {
      console.log(err);
    } else {
      const encrypted = JSON.parse(ipfsRes);

      // Try to decrypt with the provided key
      try {
        const decrypted = await Linnia.util.decrypt(privateKey, encrypted);
        record.decrypted = JSON.stringify(decrypted);
        dispatch(assignRecord(record));
      } catch (e) {
        console.log(e);
        return (alert('Error decrypting data. Probably wrong private key'));
      }
    }
  });
};
