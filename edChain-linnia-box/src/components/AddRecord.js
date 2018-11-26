import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Record from './Record';
import EncryptRecordForm from './EncryptRecordForm';
import AddIPFSAndLinniaForm from './AddIPFSAndLinniaForm';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  text: {
    marginTop: 20,
  },
};

class AddRecord extends Component {
  constructor (props) {
    super(props);

    this.state = {
      publicKey: '',
      firstName: '',
      lastName: '',
      course: '',
      loan: '',
      file: '',
      buffer:'',
    };

    // Set variables pass as url arguments
    window.location.search.substr(1).split('&').forEach((param) => {
      const key = param.split('=')[0];
      const val = param.split('=')[1];
      if (this.state[key] !== undefined) {
        this.state[key] = val;
      }
    });
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value;
    this.setState({ [property]: value });
  };

  // TODO: handleSubmit should handle for adding the public key and the metadata to a file
  handleSubmit = (event) => {
    event.preventDefault();
    const dataHash = event.target.elements.dataHash.value;
    this.props.onAddRecordSubmit(dataHash);
  };

  // TODO change to handleEncrypt and grab metadata from handleSubmit
  handleDecrypt = (event) => {
    event.preventDefault();
    const privateKey = event.target.elements.privateKey.value;
    this.props.onGetRecordDecrypt(this.props.record.data, privateKey);
  };

  //Take file input from user
  captureFile =(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
    };

    //Convert the file to buffer to store on IPFS
    convertToBuffer = async(reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax
    this.setState({buffer});
    };

  render () {
    const { publicKey, firstName, lastName, course, loan } = this.state;
    const { record, classes } = this.props;

    return (
      <section>
        <Typography variant='title'>
          Add Record
        </Typography>
        <EncryptRecordForm
          publicKey={publicKey}
          firstName={firstName}
          lastName={lastName}
          course={course}
          loan={loan}
          onInputChange={this.onInputChange}
          handleSubmit={this.handleSubmit}
        />
        <AddIPFSAndLinniaForm
          publicKey={publicKey}
          onInputChange={this.onInputChange}
          handleDecrypt={this.handleDecrypt}
        />
        {record.data && record.data.decrypted && <div>
          <Typography variant='title' className={classes.text}>
            Success! Here is our decrypted data
          </Typography>
          <Typography variant='body2' className={classes.text}>
            {this.props.record.data.decrypted}
          </Typography>
        </div>}
      </section>
    );
  }
}

export default withStyles(styles)(AddRecord);
