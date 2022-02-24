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
const receiveUserPayments = (error, response) => ({
  type: 'RECEIVE_USER_PAYMENTS',
  payload: { error, response },
});
// リクエスト完了
const finishRequest = paper => ({
  type: 'FINISH_REQUEST',
  payload: { paper },
});

const resetData = () => ({
  type: 'RESET_DATA',
});

const receiveTokenExpired = user => ({
  type: 'RECEIVE_TOKEN_EXPIRED',
  payload: { user }
});

export const resetDataBills = () => {
  return async (dispatch, getState) => {
    dispatch(resetData());
  }
}

export const createBill = (data) => {
  return async (dispatch, getState) => {
    const bill = getState().bill;
    const paper = getState().paper;
    const user = getState().user;
    let token = user.token;

    dispatch(startRequest(bill));

    axios.post(`${apiURL}/api/bills`,
      data, { headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        console.log(res.data);
        if (res.data) {
          bill.billList.unshift(res.data);
          dispatch(receiveData(null, bill.billList));
          dispatch(getUserPaymentsByRoomId(paper.paper.id))
        } else {
          dispatch(receiveTokenExpired(user));
        }
      }).catch(err => {
        dispatch(receiveData(err))
      })

    dispatch(finishRequest(bill));
  }
}

export const editBill = (data) => {
  return async (dispatch, getState) => {
    const bill = getState().bill;
    const paper = getState().paper;
    const user = getState().user;
    let token = user.token;

    dispatch(startRequest(bill));

    axios.put(`${apiURL}/api/bills/${data.id}`,
      data, { headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        console.log(res.data);
        if (res.data) {
          const newBillList = bill.billList.map(v => {
            if (v.id === data.id) { return res.data; }
            return v;
          })
          dispatch(receiveData(null, newBillList));
          dispatch(getUserPaymentsByRoomId(paper.paper.id))
        } else {
          dispatch(receiveTokenExpired(user));
        }
      }).catch(err => {
        dispatch(receiveData(err))
      })

    dispatch(finishRequest(bill));
  }
}

export const deleteBill = (id) => {
  return async (dispatch, getState) => {
    const bill = getState().bill;
    const paper = getState().paper;
    const user = getState().user;
    let token = user.token;

    axios.delete(`${apiURL}/api/bills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          const billIdx = bill.billList.findIndex(v => v.id === id)
          bill.billList.splice(billIdx, 1)
          dispatch(receiveData(null, bill.billList));
          dispatch(getUserPaymentsByRoomId(paper.paper.id))
        } else {
          dispatch(receiveTokenExpired(user));
        }
      })
      .catch((err) => {
        dispatch(receiveData(err));
      })

    dispatch(finishRequest(bill));
  }
}

export const getBillsByRoomId = (roomId) => {
  return async (dispatch, getState) => {
    const bill = getState().bill;
    const user = getState().user;
    const token = user.token;

    dispatch(startRequest(bill));

    axios.get(`${apiURL}/api/rooms/${roomId}/bills`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(res => {
      console.log(res.data);
      if (res.data) {
        const list = res.data.reverse();
        dispatch(receiveData(null, list));
      } else {
        dispatch(receiveTokenExpired(user));
      }
    }).catch(err =>
      dispatch(receiveData(err))
    )

    dispatch(finishRequest(bill));
  }
}

export const getUserPaymentsByRoomId = (roomId) => {
  return async (dispatch, getState) => {
    const bill = getState().bill;
    const user = getState().user;
    const token = user.token;

    dispatch(startRequest(bill));

    axios.get(`${apiURL}/api/rooms/${roomId}/user_payments`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(res => {
      console.log(res.data);
      if (res.data) {
        const list = res.data.reverse();
        dispatch(receiveUserPayments(null, list));
      } else {
        dispatch(receiveTokenExpired(user));
      }
    }).catch(err =>
      dispatch(receiveUserPayments(err))
    )

    dispatch(finishRequest(bill));
  }
}
