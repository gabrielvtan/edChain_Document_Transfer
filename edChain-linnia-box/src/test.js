    //Encrypt
    try {
        dispatch(uploadingToIpfs());
        encrypted = await Linnia.util.encrypt(
           publicKey,
           content,
        );
      } catch (e) {
        dispatch(uploadError("Unable to encrypt file. Check the Public Key"));
        return
      }
  
      //Upload to IPFS
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
      } catch (e) {
        console.log(e)
        dispatch(uploadError("Unable to upload file to Linnia"));
        return;
      }