import {
  FETCH_TOKEN,
  AUTH_ERROR,
  SET_CURRENT_USER
} from './types';
import {
  service,
  serviceFailure,
  serviceSuccess
} from './index';
import authService from '../services/authService';
import userService from '../services/userService';

function fetchToken() {
  return {
    type: FETCH_TOKEN
  }
}

function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

function authError(message) {
  return {
    type: AUTH_ERROR,
    errorMessage: message
  }
}

function signout() {
  return dispatch => {
    return dispatch(authError())
  }
}

function signin(username, password) {
  return async dispatch => {
    dispatch(fetchToken())
    try {
      const res = await authService.post(username, password)
      const token = res.data.data.token
      const userId = res.data.data.userId

      return dispatch(setCurrentUser({
        userId,
        token
      }))
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }

      if (err.response.status === 400) {
        const errorMessage = err.response.data.message
        return dispatch(authError(errorMessage))
      }
    }
  }
}

function reqSmsCode(phone) {
  return async dispatch => {
    dispatch(service())
    try {
      const res = await userService.postSms(phone)
      dispatch(serviceSuccess())
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(serviceFailure(errorMessage))
      }

      if (err.response.status === 400) {
        const errorMessage = err.response.data.message
        return dispatch(serviceFailure(errorMessage))
      }
    }
  }
}

function resetPass(password, phone, smsCode){
  return async dispatch => {
    dispatch(service())
    try {
      const res = await userService.postRestSms(password, phone, smsCode)
      dispatch(serviceSuccess())
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(serviceFailure(errorMessage))
      }

      if (err.response.status === 400) {
        const errorMessage = err.response.data.message
        return dispatch(serviceFailure(errorMessage))
      }
    }
  }
}

function signup(username, password, phone, inviteCode, smsCode) {
  return async dispatch => {
    dispatch(service())
    try {
      const res = await userService.post(username, password, phone, inviteCode, smsCode)

      const userId = res.data.data.userId
      const token = res.data.data.token

      dispatch(serviceSuccess())
      return dispatch(setCurrentUser({
        userId,
        token
      }))
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(serviceFailure(errorMessage))
      }

      if (err.response.status === 400) {
        const errorMessage = err.response.data.message
        return dispatch(serviceFailure(errorMessage))
      }
    }
  }
}

export {
  fetchToken,
  setCurrentUser,
  signin,
  signout,
  signup,
  reqSmsCode,
  resetPass
}
