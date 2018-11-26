import { connect } from 'react-redux';
import EncryptRecordForm from '../components/AddRecord';
import { getRecord, getDecryptedRecord } from '../actions/GetRecord';

const mapStateToProps = (state, ownProps) => {
  return { record: state.record };
};

// TODO: change GetRecordDecrypt to AddPublicKeyAndMeta
const mapDispatchToProps = (dispatch) => {
  return {
    onAddRecordSubmit: (dataHash) => {
      dispatch(getRecord(dataHash));
    },
    onGetRecordDecrypt: (record, privateKey) => {
      dispatch(getDecryptedRecord(record, privateKey));
    },
  };
};

const AddRecordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EncryptRecordForm);

export default AddRecordContainer;
