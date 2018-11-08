const initialState = {
  data: null,
};

const recordReducer = (state = initialState, action) => {
  if (action.type === 'GET_RECORD') {
    return Object.assign({}, state, {
      data: action.payload,
    });
  }
  if (action.type === 'REMOVE_RECORD') {
    return Object.assign({}, state, {
      data: null,
    });
  }
  if (action.type === 'GET_PERMISSIONED_RECORD') {
    return Object.assign({}, state, {
      data: action.payload,
    });
  }
  return state;
};

export default recordReducer;
