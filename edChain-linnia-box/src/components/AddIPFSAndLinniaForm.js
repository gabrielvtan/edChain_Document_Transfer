import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  space: {
    marginRight: theme.spacing.unit * 5,
  },
  text: {
    marginTop: 50,
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
  }
});


// TODO: set up appropriate ID for file input
// TODO: change onSubmit={handleDecrypt} to onsubimit(addRecord)
// TODO: Fix formatting on add input bar
// TODO: Figure out how to handle image files
class AddIPFSAndLinniaForm extends Component {
  render() {
    const { handleDecrypt, privateKey, onInputChange, classes } = this.props;

    return (
      <div>
        <Typography variant='body1' className={classes.text}>
          Choose a file to send to IPFS and Append to the Linnia Protocol
        </Typography>
        <form onSubmit={handleDecrypt}>
            <Input
              id = 'file'
              required
              type = "file"
              onChange = {this.captureFile}
              margin='normal'
            />
        </form>

        <Button type="submit" className={classes.button}>
        Send to IPFS and Append to Linnia
        </Button>
      </div>
    );
  }
}

AddIPFSAndLinniaForm.propTypes = {
  privateKey: PropTypes.string.isRequired,
  handleDecrypt: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddIPFSAndLinniaForm);
