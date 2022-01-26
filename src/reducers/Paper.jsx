const initialState = {
  paperList: [],
  tokenExpired: 0,
  error: false,
  isFetching: false,
}

export default function paperReducer(state = initialState, action) {
  switch (action.type) {

    case 'START_REQUEST':
      return {
        ...state,
        isFetching: true,
      };

    case 'RECEIVE_DATA':
      return action.payload.error
        ? { ...state, error: true, isFetching: false }
        : {
            ...state,
            paperList: action.payload.response,
            isFetching: false,
          };

    case 'FINISH_REQUEST':
      return state;

    case 'RESET_DATA_PAPERS':
      return {
        paperList: [],
        tokenExpired: 0,
        error: false
      };

    case 'RECEIVE_TOKEN_EXPIRED':
      return {
        paperList: [],
        tokenExpired: 1
      };

    default:
      return state;
  }
};