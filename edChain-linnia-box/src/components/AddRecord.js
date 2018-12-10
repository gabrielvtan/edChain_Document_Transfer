import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Record from './Record';
import EncryptRecordForm from './EncryptRecordForm';
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
      course: '',
      loan: '',
      buffer: '',
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


  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onAddRecordSubmit(
        this.state.publicKey, 
        this.state.course, 
        this.state.loan, 
        this.state.buffer
    );
  };


  //Take file input from user
  captureFile =(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    console.log(typeof file)
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
    console.log(typeof reader)
    };

  //Convert the file to buffer to store on IPFS
  convertToBuffer = async(reader) => {
  //file is converted to a buffer for upload to IPFS
    let buffer = await Buffer.from(reader.result);
    buffer = JSON.parse(buffer)
    console.log(buffer)
  //set this buffer-using es6 syntax
    this.setState({buffer});
    };

  // TODO: UPDATE TO INCLUDE A MESSAGE GIVING THE HASH OF THE TRANSACTION
  render () {
    const { publicKey, metadataCourse, metadataLoan, course, loan, content } = this.state;
    const { record, classes } = this.props;

    return (
      <section>
        <Typography variant='title'>
          Add Record
        </Typography>
        <EncryptRecordForm
          publicKey={publicKey}
          metadataCourse={metadataCourse}
          metadataLoan={metadataLoan}
          content={content}
          course={course}
          loan={loan}
          onInputChange={this.onInputChange}
          handleSubmit={this.handleSubmit}
          captureFile={this.captureFile}
        />
      </section>
    );
  }
}

export default withStyles(styles)(AddRecord);
