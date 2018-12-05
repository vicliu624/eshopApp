import {
  API
} from '../constants'
import axios from 'axios';
import {
  rest,
  postData
} from '../utils';

const URL = `${API}/user`
const SMS_URL = `${URL}/sms`
const RESET_PASS_URL = `${URL}/reset`

const get = async (userId, token) => {
  return await rest.get(userId, token)(
    `${URL}/${userId}`
  )
}

const post = async (userName, passWord, phone, inviteCode, smsCode) => {
  return await axios.post(URL, postData({
    userName,
    passWord,
    phone,
    inviteCode,
    smsCode
  }))
}

const postSms = async (phone) => {
  return await axios.post(SMS_URL, postData({
    phone
  }))
}

const postRestSms = async (passWord, phone, smsCode) => {
  return await axios.post(RESET_PASS_URL, postData({
    phone,
    passWord,
    smsCode
  }))
}

const patch = async (userId, token, user = {}) => {
  const postData = {}
  if (user.nickName) {
    postData.nickName = user.nickName
  }
  if (user.sex) {
    postData.sex = user.sex
  }
  if (user.phone) {
    postData.phone = parseInt(user.phone, 10)
  }
  return await rest.post(userId, token)(
    `${URL}/${userId}`,
    postData
  )
}

export default {
  get,
  post,
  postSms,
  postRestSms,
  patch
}
