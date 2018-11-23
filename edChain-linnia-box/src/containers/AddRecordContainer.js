import { connect } from 'react-redux';
import AddIPFSAndLinniaForm from '../components/AddRecord';
import { getRecord, getDecryptedRecord } from '../actions/GetRecord';

const mapStateToProps = (state, ownProps) => {
  return { record: state.record };
};

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
)(AddIPFSAndLinniaForm);

export default AddRecordContainer;
