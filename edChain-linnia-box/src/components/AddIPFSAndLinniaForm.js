import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  space: {
    marginRight: theme.spacing.unit * 5,
  },
  important: {
    fontFamily: 'Heavitas',
    display: 'inline',
  },
  text: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    marginTop: 50,
    marginBottom: 20,
    fontFamily: 'Heavitas',
  },
});

// TODO: Convert variables to the relevant ones
class AddIPFSAndLinniaForm extends Component {
  render() {
    const { dataHash, onInputChange, handleSubmit, classes } = this.props;

    return (
      <div>
        <Typography variant='body1' className={classes.text}>
          Now that we have generated a set of Encryption keys, lets add a document to IPFS and Linnia
        </Typography>
        <Typography variant='body1'>
        This should be the <span className={classes.important}>public key</span> you generated in the previous step. This key will encrypt our file so only our private encryption key can decrypt it!
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            id='dataHash'
            label='Public Key'
            required
            fullWidth
            className={classes.space}
            value={dataHash.replace(/\s/g, '')}
            onChange={onInputChange}
            margin='normal'
          />
          <Typography variant='body1' className={classes.text}>
          <span className={classes.important}>Metadata</span> should be what people will use to find your data. What will be useful for you to query later?        
          </Typography>
        <form>
        <TextField
            id='dataHash'
            label='DOMAIN'
            required
            className={classes.space}
            value={dataHash.replace(/\s/g, '')}
            onChange={onInputChange}
            margin='normal'
          />
          <TextField
            id='dataHash'
            label='Value'
            required
            className={classes.space}
            value={dataHash.replace(/\s/g, '')}
            onChange={onInputChange}
            margin='normal'
          />
        </form>
        <form>
        <TextField
            id='dataHash'
            label='KEYWORDS'
            required
            className={classes.space}
            value={dataHash.replace(/\s/g, '')}
            onChange={onInputChange}
            margin='normal'
          />
          <TextField
            id='dataHash'
            label='Value'
            required
            className={classes.space}
            value={dataHash.replace(/\s/g, '')}
            onChange={onInputChange}
            margin='normal'
          />
        </form>
        </form>
        <p></p>
        <Button
            type='submit'
          >
            Add Key
        </Button>
        <Typography variant='body1' className={classes.title}>
          Upload Data
        </Typography>
        <Typography variant='body1'>
        This is where we add the document upload section
        </Typography>
        <form>  
        <Button
            type='submit'
          >
            Upload to IPFS and Append to Linnia Protocol
        </Button>
        </form>
      </div>
    );
  }
}

AddIPFSAndLinniaForm.propTypes = {
  dataHash: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddIPFSAndLinniaForm);
