import { connect } from 'react-redux';
import GetPermissionedRecordForm from '../components/GetPermissionedRecord';
import { getPermissionedRecord, getDecryptedRecord } from '../actions/GetPermissionedRecord';

const mapStateToProps = (state, ownProps) => {
  return { record: state.record };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPermissionedRecordSubmit: (dataHash) => {
      dispatch(getPermissionedRecord(dataHash));
    },
    onGetPermissionedRecordDecrypt: (record, privateKey) => {
      dispatch(getDecryptedRecord(record, privateKey));
    },
  };
};

const GetPermissionedRecordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetPermissionedRecordForm);

export default GetPermissionedRecordContainer;
