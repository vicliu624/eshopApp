import areaData from './citys';
export const areas = areaData.provinces;
export const API = 'http://192.168.201.216:7000/user/v1';
export const IMAGE_URL = 'https://www.eshoptech.cn/goods/';
export const USER_ID = 'userId';
export const TOKEN = 'token';
export const PRIMARY_COLOR = '#3f51b5';
export const RED_COLOR = '#f56c6c';
export const GREEN_COLOR = '#1af538';
export const RED_COLOR_ACTIVE = '#ff5a5f';
export const BORDER_COLOR = '#efeff4';
export const RE_USERNAME = /^[a-zA-Z]\w{6,25}$/
export const RE_PHONE = /^1\d{10}$/;
export const SERVICE_CONTENT = `客服电话:1234567`;


/**
  * 订单待发货状态
  */
export const ORDER_WAIT = 0;

/**
  * 订单配送中状态
  */
export const ORDER_DISPATCHING = 1;

/**
  * 订单确认送达状态
  */
export const ORDER_FINISH = 2;

/**
  * 订单退款中状态
  */
export const ORDER_REFUNDING = 3;

/**
  * 订单退款完成
  */
export const ORDER_REFUND_SUCCESS = -1;

/**
  * 订单退款失败
  */
export const ORDER_REFUNDING_FAILURE = -2;

/**
 * 订单待付款
 */
export const ORDER_WAIT_PAY = 4;
