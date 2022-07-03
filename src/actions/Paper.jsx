import axios from 'axios'
import { restfulApiConfig } from "../config.js";

const apiURL = restfulApiConfig.apiURL;

//　リクエスト開始
const startRequest = paper => ({
  type: 'START_REQUEST',
  payload: { paper },
});
//　レスポンス受信
const receiveData = (error, response) => ({
  type: 'RECEIVE_DATA',
  payload: { error, response },
});
const receivePaper = (error, response) => ({
  type: 'RECEIVE_PAPER',
  payload: { error, response },
});
// リクエスト完了
const finishRequest = paper => ({
  type: 'FINISH_REQUEST',
  payload: { paper },
});

const resetData = () => ({
  type: 'RESET_DATA_PAPERS',
});

const receiveTokenExpired = user => ({
  type: 'RECEIVE_TOKEN_EXPIRED',
  payload: { user }
});

export const resetDataPapers = () => {
  return async (dispatch, getState) => {
    dispatch(resetData());
  }
}

export const setPaper = (paper) => {
  return async (dispatch, getState) => {
    dispatch(receivePaper(null, paper));
  }
} 

export const getPaper = (id) => {
  return async (dispatch, getState) => {
    const paper = getState().paper;
    const user = getState().user;
    let token = user.token;

    dispatch(startRequest(paper));

    axios.get(`${apiURL}/api/rooms/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(res => {
      console.log(res.data);
      if (res.data) {
        dispatch(receivePaper(null, res.data));
      } else {
        dispatch(receiveTokenExpired(user));
      }
    }).catch(err =>
      dispatch(receiveData(err))
    )

    dispatch(finishRequest(paper));
  };
};

export function addUser(userId) {
  return (dispatch, getState) => {
    const user = getState().user;
    const paper = getState().paper;
    let token = user.token;

    dispatch(startRequest(paper));

    axios.get(`${apiURL}/api/users/${userId}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(res => {
      if (!paper.paper.users.some(u => u.id === res.data.data.id)) {
        paper.paper.users.push(res.data.data)
      }
      if (res.data) {
        dispatch(receivePaper(null, paper.paper));
      } else {
        dispatch(receiveTokenExpired(user));
      }
    }).catch(err =>
      dispatch(receiveData(err))
    )

    dispatch(finishRequest(paper));
  };
}

export function addMember(name) {
  return (dispatch, getState) => {
    const user = getState().user;
    const paper = getState().paper;
    let token = user.token;

    dispatch(startRequest(paper));

    axios.post(`${apiURL}/api/rooms/${paper.paper.id}/members`,
      { name }, { headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        if (res.data) {
          dispatch(receivePaper(null, res.data));
        } else {
          dispatch(receiveTokenExpired(user));
        }
      }).catch(err => {
        // TODO: エラーハンドリング(data.messageが存在する場合としない場合)
        alert(err.response.data.message)
        dispatch(receiveData(err))
      })

    dispatch(finishRequest(paper));
  };
}

export function deleteMember(id) {
  return (dispatch, getState) => {
    const user = getState().user;
    const paper = getState().paper;
    let token = user.token;

    dispatch(startRequest(paper));

    axios.delete(`${apiURL}/api/rooms/${paper.paper.id}/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        if (res.data) {
          dispatch(receivePaper(null, res.data));
        } else {
          dispatch(receiveTokenExpired(user));
        }
      }).catch(err => {
        alert(err.response.data.message)
        dispatch(receiveData(err))
      })

    dispatch(finishRequest(paper));
  };
}

export const getPapers = () => {
  return async (dispatch, getState) => {
    const paper = getState().paper;
    const user = getState().user;
    let token = user.token;

    dispatch(startRequest(paper));

    axios.get(`${apiURL}/api/rooms`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(res => {
      console.log(res.data);
      if (res.data) {
        const paperList = res.data.reverse();
        dispatch(receiveData(null, paperList));
      } else {
        dispatch(receiveTokenExpired(user));
      }
    }).catch(err =>
      dispatch(receiveData(err))
    )

    dispatch(finishRequest(paper));
  };
};

export const getDeletedPapers = () => {
  return async (dispatch, getState) => {
    const paper = getState().paper;
    const user = getState().user;
    let token = user.token;

    dispatch(startRequest(paper));

    axios.get(`${apiURL}/api/papers`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(res => {
      console.log(res.data);
      if (res.data.data) {
        const paperList = res.data.data.filter(paper => paper.is_deleted).reverse();
        dispatch(receiveData(null, paperList));
      } else {
        dispatch(receiveTokenExpired(user));
      }
    }).catch(err =>
      dispatch(receiveData(err))
    )

    dispatch(finishRequest(paper));
  };
};

export const createPaper = (data) => {
  return async (dispatch, getState) => {
    const paper = getState().paper;
    const user = getState().user;
    let token = user.token;

    dispatch(startRequest(paper));

    axios.post(`${apiURL}/api/rooms`,
      data, { headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        console.log(res.data);
        if (res.data) {
          paper.paperList.unshift(res.data);
          dispatch(receiveData(null, paper.paperList));
          dispatch(receivePaper(null, res.data));
          window.location.href = `/rooms/${res.data.id}`
        }
      }).catch(err => {
        dispatch(receiveData(err))
      })

    dispatch(finishRequest(paper));
  }
}

export const editPaper = (data) => {
  return async (dispatch, getState) => {
    const paper = getState().paper;
    const user = getState().user;
    let token = user.token;

    dispatch(startRequest(paper));

    axios.put(`${apiURL}/api/rooms/${data.id}`,
      data, { headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        console.log(res.data);
        if (res.data) {
          const newPaperList = paper.paperList.map(v => {
            if (v.id === data.id) { return res.data; }
            return v;
          });
          dispatch(receiveData(null, newPaperList));
          dispatch(receivePaper(null, res.data));
        } else {
          dispatch(receiveTokenExpired(user));
        }
      }).catch(err => {
        dispatch(receiveData(err))
      })

    dispatch(finishRequest(paper));
  }
}

export const deletePaper = (id) => {
  return async (dispatch, getState) => {
    const paper = getState().paper;
    const user = getState().user;
    let token = user.token;

    axios.delete(`${apiURL}/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const paperIdx = paper.paperList.findIndex(v => v.id === id)
        paper.paperList.splice(paperIdx, 1)
        dispatch(receiveData(null, paper.paperList));
      })
      .catch((err) => {
        dispatch(receiveData(err));
      })

    dispatch(finishRequest(paper));
  }
}
