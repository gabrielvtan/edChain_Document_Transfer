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
  if (action.type === 'ADD_RECORD') {
    return Object.assign({}, state, {
      data: null,
    });
  } else if (action.type === 'RECORD_ERROR') {
      const { message, isLoading } = action;
      return Object.assign({}, state, {message, isLoading});
  } else if (action.type === 'UPLOADING_IPFS'){
      const isLoading = true;
      return Object.assign({}, state, { isLoading }); 
  }

  return state;
};

export default recordReducer;
