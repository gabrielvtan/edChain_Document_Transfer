import { connect } from 'react-redux';
import EncryptRecordForm from '../components/AddRecord';
import { addRecord } from '../actions/AddRecord';
import { ContentClear } from 'material-ui/svg-icons';

const mapStateToProps = (state, ownProps) => {
  return { record: state.record };
};

// TODO: change GetRecordDecrypt to AddPublicKeyAndMeta
const mapDispatchToProps = (dispatch) => {
  return {
    onAddRecordSubmit: (publicKey, course, loan, content) => {
      dispatch(addRecord(publicKey, course, loan, content));
    },
  };
};

const AddRecordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EncryptRecordForm);

export default AddRecordContainer;
