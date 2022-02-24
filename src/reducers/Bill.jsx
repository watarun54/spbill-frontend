const initialState = {
  billList: [],
  userPayments: [],
  tokenExpired: 0,
  error: false,
  isFetching: false,
}

export default function billReducer(state = initialState, action) {
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
            billList: action.payload.response,
            isFetching: false,
          };

    case 'RECEIVE_USER_PAYMENTS':
      return action.payload.error
        ? { ...state, error: true, isFetching: false }
        : {
            ...state,
            userPayments: action.payload.response,
            isFetching: false,
          };

    case 'FINISH_REQUEST':
      return state;

    case 'RESET_DATA':
      return {
        bill: null,
        billList: [],
        tokenExpired: 0,
        error: false
      };

    case 'RECEIVE_TOKEN_EXPIRED':
      return {
        bill: null,
        billList: [],
        tokenExpired: 1
      };

    default:
      return state;
  }
};