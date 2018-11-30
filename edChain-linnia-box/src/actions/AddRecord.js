import store from '../store';
import Linnia from '@linniaprotocol/linnia-js';

export const ADD_RECORD = 'ADD_RECORD';
export const RECORD_ERROR = 'RECORD_ERROR'

// TODO: Figure out REDUCER for assignRecord, specifically, METADATA passed
// TODO: Tie all the functions to the front end and test
// TODO: Figure out which method takes the MetaData

const assignRecord = (record) => ({
  type: ADD_RECORD,
  payload: record,
});


export const handleEncrypt = (publicKey, content) => async (dispatch) =>{
  
  /* 
    Here, we pulled the linnia library object from the state, 
    add the record for the publicKey and the content as an argument
    from the contract state, then dispatch an action that adds the record
    to IPFS. 
  */
 
  try {
    console.log("connecting to IPFS")
    dispatch(uploadingToIpfs());
      encrypted = await Linnia.util.encrypt(
        publicKey,
        content,
      );
    } catch (e) {
      return(alert("Unable to encrypt file. Check the Public Key"));
    }
  };

export const uploadingToIpfs = () => async (dispatch) => {
  try {
    dataUri = await new Promise((resolve, reject) => {
      ipfs.add(JSON.stringify(encrypted), (err, ipfsRed) => {
        err ? reject(err) : resolve(ipfsRed);
        });
      });
    } catch (e) {
      console.log(e)
      return(alert("Unable to upload file to IPFS"));
    }
  };

export const addRecord = (ownerProps, content) => async (dispatch) => {
    const [owner] = await store.getState().auth.web3.eth.getAccounts();
  
    content.nonce = crypto.randomBytes(256).toString('hex');
    // hash of the plain file
    const hash = linnia.web3.utils.sha3(JSON.stringify(content));

    //Upload file to Linnia
    try {
      metadata.dataFormat = "json";
      metadata.storage = "IPFS";
      // TODO, get the encryption scheme and the linnia js version from linnia js object
      // Add those 2 has static variables of the Linnia js class
      metadata.encryptionScheme = "x25519-xsalsa20-poly1305";
      metadata.linniajsVersion = "0.3.0";
      metadata.encryptionPublicKey = publicKey;

      await linnia.addRecord(
         hash,
         metadata,
         dataUri,
         {
           from: owner,
           gas: 500000,
           gasPrice: 20000000000
         },
      );
      dispatch(assignRecord(record));
    } catch (e) {
      console.log(e)
      return(alert("Unable to upload file to Linnia"));
    }
};
