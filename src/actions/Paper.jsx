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

export const getPapers = () => {
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
        const paperList = res.data.data.filter(paper => !paper.is_deleted).reverse();
        dispatch(receiveData(null, paperList));
        console.log("fetch and set");
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
        console.log("fetch and set");
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

    axios.post(`${apiURL}/api/papers`,
      data, { headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        console.log(res.data);
        if (res.data.data) {
          paper.paperList.unshift(res.data.data);
          dispatch(receiveData(null, paper.paperList));
          console.log("create and set");
        } else {
          dispatch(receiveTokenExpired(user));
        }
      }).catch(err => {
        dispatch(receiveData(err))
        console.log(err);
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

    axios.put(`${apiURL}/api/papers/${data.id}`,
      data, { headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        console.log(res.data);
        if (res.data.data) {
          const newPaperList = paper.paperList.map(v => {
            if (v.id === data.id) { return res.data.data; }
            return v;
          });
          dispatch(receiveData(null, newPaperList));
          console.log("update and set");
        } else {
          dispatch(receiveTokenExpired(user));
        }
      }).catch(err => {
        dispatch(receiveData(err))
        console.log(err);
      })

    dispatch(finishRequest(paper));
  }
}

export const recoverPaper = (id) => {
  return async (dispatch, getState) => {
    const paper = getState().paper;
    const user = getState().user;
    const token = user.token;
    const data = {id: id, is_deleted: false};

    dispatch(startRequest(paper));

    axios.put(`${apiURL}/api/papers/${data.id}`,
      data, { headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        console.log(res.data);
        if (res.data.data) {
          const paperIdx = paper.paperList.findIndex(v => v.id === id)
          paper.paperList.splice(paperIdx, 1)
          dispatch(receiveData(null, paper.paperList));
          console.log("recover and set");
        } else {
          dispatch(receiveTokenExpired(user));
        }
      }).catch(err => {
        dispatch(receiveData(err))
        console.log(err);
      })

    dispatch(finishRequest(paper));
  }
}

export const deletePaper = (id) => {
  return async (dispatch, getState) => {
    const paper = getState().paper;
    const user = getState().user;
    let token = user.token;

    axios.delete(`${apiURL}/api/papers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.data) {
          const paperIdx = paper.paperList.findIndex(v => v.id === id)
          paper.paperList.splice(paperIdx, 1)
          dispatch(receiveData(null, paper.paperList));
          console.log("delete and set");
        } else {
          dispatch(receiveTokenExpired(user));
        }
      })
      .catch((err) => {
        dispatch(receiveData(err));
      })

    dispatch(finishRequest(paper));
  }
}

export const deletePaperCompletely = (id) => {
  return async (dispatch, getState) => {
    const paper = getState().paper;
    const user = getState().user;
    let token = user.token;

    axios.delete(`${apiURL}/api/papers/${id}/complete`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.data) {
          const paperIdx = paper.paperList.findIndex(v => v.id === id)
          paper.paperList.splice(paperIdx, 1)
          dispatch(receiveData(null, paper.paperList));
          console.log("delete and set");
        } else {
          dispatch(receiveTokenExpired(user));
        }
      })
      .catch((err) => {
        dispatch(receiveData(err));
      })

    dispatch(finishRequest(paper));
  }
}
