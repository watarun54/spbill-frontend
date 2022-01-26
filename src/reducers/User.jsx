import { setStorage, getStorage, removeStorage } from "../infra/localStorage";

const initialState = {
  token: getStorage("token"),
  status: 0, //0:処理前 1:ログイン成功 -1:ログイン失敗
  uid: getStorage("uid") || 0,
  name: '',
  email: '',
  lineId: '',
  errMsg: '',
};

export default function userReducer(state = initialState, action) {
  const _state = Object.assign({}, state);
  switch (action.type) {
    case "LOGIN_REQUEST":
      _state.status = 0;
      return _state;

    case "LOGIN_RECEIVE_SUCCESS":
      _state.status = 1;
      _state.token = action.data.token;
      _state.uid = action.data.uid;
      _state.name = action.data.name;
      _state.email = action.data.email;
      setStorage("token", _state.token);
      setStorage("uid", _state.uid);
      return _state;

    case "LOGIN_RECEIVE_FAILED":
      _state.status = -1;
      return _state;

    case "LOGOUT":
      _state.token = null;
      _state.uid = 0;
      _state.name = '';
      _state.email = '';
      _state.lineId = '';
      removeStorage("token");
      removeStorage("uid");
      return _state;

    case "USER_REQUEST":
      return _state;

    case "USER_RECEIVE_SUCCESS":
      _state.name = action.data.name;
      _state.email = action.data.email;
      _state.lineId = action.data.line_id;
      return _state;

    case "USER_RECEIVE_FAILED":
      _state.errMsg = action.data;
      return _state;

    default:
      return state;
  }
}
