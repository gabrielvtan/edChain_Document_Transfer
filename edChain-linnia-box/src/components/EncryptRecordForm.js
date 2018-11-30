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
class EncryptRecordForm extends Component {
  render() {
    const { publicKey, firstName, lastName, course, loan, onInputChange, handleSubmit, classes } = this.props;

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
            id='publicKey'
            label='Public Key'
            required
            fullWidth
            className={classes.space}
            value={publicKey.replace(/\s/g, '')}
            onChange={onInputChange('publicKey')}
            margin='normal'
          />
          <Typography variant='body1' className={classes.text}>
          <span className={classes.important}>Metadata</span> should be what people will use to find your data. What will be useful for you to query later?        
          </Typography>
        <form>
        <TextField
            id='firstName'
            label='First Name'
            //required
            className={classes.space}
            value={firstName.replace(/\s/g, '')}
            onChange={onInputChange('firstName')}
            margin='normal'
          />
          <TextField
            id='lastName'
            label='Last Name'
            //required
            className={classes.space}
            value={lastName.replace(/\s/g, '')}
            onChange={onInputChange('lastName')}
            margin='normal'
          />
        </form>
        <form>
        <TextField
            id='course'
            label='Course'
            //required
            className={classes.space}
            value={course.replace(/\s/g, '')}
            onChange={onInputChange('course')}
            margin='normal'
          />
          <TextField
            id='loan'
            label='Loan Amount'
            //required
            className={classes.space}
            value={loan.replace(/\s/g, '')}
            onChange={onInputChange('loan')}
            margin='normal'
          />
        </form>
        <p></p>
        <Button
            type='submit'
          >
            Add Key
        </Button>
        </form>
      </div>
    );
  }
}

EncryptRecordForm.propTypes = {
  publicKey: PropTypes.string.isRequired,
//   firstName: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired,
//   course: PropTypes.string.isRequired,
//   loan: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(EncryptRecordForm);
