import axios from "axios";
import jwt_decode from "jwt-decode";
import { restfulApiConfig } from "../config.js";

export function login(email, password) {
  return dispatch => {
    dispatch(requestLogin());
    const data = {email: email, password: password};
    axios.post(restfulApiConfig.apiURL + "/login", data)
      .then(response => {
        const decodedJWT = jwt_decode(response.data.token);
        const data = {
          token: response.data.token,
          uid: decodedJWT.uid,
          name: decodedJWT.name,
          email: email,
        }
        dispatch(receiveLoginSuccess(data));
      })
      .catch(e => {
        dispatch(receiveLoginFailed());
      });
  };
}

export function signup(name, email, password) {
  return dispatch => {
    dispatch(requestUser());
    const data = {name: name, email: email, password: password};
    axios.post(restfulApiConfig.apiURL + "/signup", data)
      .then(response => {
        dispatch(receiveUserSuccess(response.data.data));
      })
      .catch(e => {
        dispatch(receiveUserFailed(e.response.data.message));
      });
  };
}

export function getUser() {
  return (dispatch, getState) => {
    const user = getState().user;

    dispatch(requestUser());
    axios.get(restfulApiConfig.apiURL + "/api/users/" + user.uid, {
      headers: {Authorization: `Bearer ${user.token}`}
    })
    .then(response => {
      dispatch(receiveUserSuccess(response.data.data));
    })
    .catch(e => {
      dispatch(receiveUserFailed(e.response.data.message));
    });
  };
}

export function updateUser(name, lineId) {
  return (dispatch, getState) => {
    const user = getState().user;

    dispatch(requestUser());
    const data = {name: name, line_id: lineId};
    axios.put(restfulApiConfig.apiURL + "/api/users/" + user.uid,
      data,
      {headers: {Authorization: `Bearer ${user.token}`},
    })
    .then(response => {
      dispatch(receiveUserSuccess(response.data.data));
    })
    .catch(e => {
      dispatch(receiveUserFailed(e.response.data.message));
    });
  };
}

export function deleteUser() {
  return (dispatch, getState) => {
    const user = getState().user;

    dispatch(requestUser());
    axios.delete(restfulApiConfig.apiURL + "/api/users/" + user.uid,
      {headers: {Authorization: `Bearer ${user.token}`},
    })
    .then(response => {
      dispatch(logout());
    })
    .catch(e => {
      dispatch(receiveUserFailed(e.response.data.message));
    });
  };
}

export function logout() {
  return { type: "LOGOUT" };
}

// 以下はプライベート関数                                                                                                                                                                                          
function requestLogin() {
  return { type: "LOGIN_REQUEST" };
}

function receiveLoginSuccess(data) {
  return {
    type: "LOGIN_RECEIVE_SUCCESS",
    data: data
  };
}

function receiveLoginFailed() {
  return {
    type: "LOGIN_RECEIVE_FAILED"
  };
}

function requestUser() {
  return { type: "USER_REQUEST" };
}

function receiveUserSuccess(data) {
  return {
    type: "USER_RECEIVE_SUCCESS",
    data: data
  };
}

function receiveUserFailed(errMsg) {
  return {
    type: "USER_RECEIVE_FAILED",
    data: errMsg
  };
}
