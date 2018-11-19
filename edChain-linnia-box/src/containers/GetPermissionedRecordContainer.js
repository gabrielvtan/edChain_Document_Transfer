import { connect } from 'react-redux';
import GetPermissionedRecordForm from '../components/GetPermissionedRecord';
import { getRecord, getDecryptedPermissionedRecord } from '../actions/GetPermissionedRecord';

const mapStateToProps = (state, ownProps) => {
  return { record: state.record };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPermissionedRecordSubmit: (dataHash) => {
      dispatch(getRecord(dataHash));
    },
    onGetPermissionedRecordDecrypt: (record, privateKey) => {
      dispatch(getDecryptedPermissionedRecord(record, privateKey));
    },
  };
};

const GetPermissionedRecordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetPermissionedRecordForm);

export default GetPermissionedRecordContainer;
