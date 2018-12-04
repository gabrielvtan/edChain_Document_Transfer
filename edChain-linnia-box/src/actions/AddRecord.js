import store from '../store';
import Linnia from '@linniaprotocol/linnia-js';

export const ADD_RECORD = 'ADD_RECORD';
export const RECORD_ERROR = 'RECORD_ERROR';
export const UPLOADING_IPFS = 'UPLOADING_IPFS';

// TODO: Figure out REDUCER for assignRecord, specifically, METADATA passed
// TODO: Tie all the functions to the front end and test
// TODO: Figure out which method takes the MetaData

const assignRecord = (record) => ({
  type: ADD_RECORD,
  payload: record,
});

const uploadError = (message) => ({
    type: RECORD_ERROR,
    isLoading: false,
    message,
});

const uploadingToIpfs = () => ({
    type: UPLOADING_IPFS,
    isLoading: true,
});


export const addRecord = (publicKey, course, loan) => async (dispatch) =>{
  let encrypted, dataUri, metadata, record, buffer;

  let content = {
    "categories": [
        {
            "name": "Index Crime", 
            "sub_categories": [
                {
                    "code": "01A", 
                    "description": "Homicide 1st & 2nd Degree"
                }
            ]
        }, 
        {
            "name": "Non-Index Crime", 
            "sub_categories": [
                {
                    "code": "01B", 
                    "description": "Involuntary Manslaughter"
                }
            ]
        }, 
        {
            "name": "Violent Crime", 
            "sub_categories": [
                {
                    "code": "01A", 
                    "description": "Homicide 1st & 2nd Degree"
                }
            ]
        }
    ]
};
  /* 
    Here, we pulled the linnia library object from the state, 
    add the record for the publicKey and the content as an argument
    from the contract state, then dispatch an action that adds the record
    to IPFS. 
  */
  // Encrypt
  const linnia = store.getState().auth.linnia;
  const ipfs = store.getState().auth.ipfs;
  try {
    console.log("connecting to IPFS")

    console.log(content)
    console.log(typeof(content))
    dispatch(uploadingToIpfs());
      encrypted = await Linnia.util.encrypt(
        publicKey,
        content,
      );
    } catch (e) {
      console.log(e)
      dispatch(uploadError("Unable to encrypt file. Check the Public Key"));
      return;
    }
  
  // Upload to IPFS
  try {
    dataUri = await new Promise((resolve, reject) => {
      ipfs.add(JSON.stringify(encrypted), (err, ipfsRed) => {
        err ? reject(err) : resolve(ipfsRed);
        });
      });
    } catch (e) {
      console.log(e)
      dispatch(uploadError("Unable to upload file to IPFS"));
      return;
    }


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
      metadata.course = course;
      metadata.loan = loan;

      record = await linnia.addRecord(
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
      dispatch(uploadError("Unable to upload file to Linnia"));
      return;
    }
};
