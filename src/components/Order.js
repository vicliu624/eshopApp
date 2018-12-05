import React from 'react';
import PropTypes from 'prop-types';
import {
  NativeModules,
  StyleSheet
} from 'react-native';
import {
  View,
  Button,
  Text
} from 'native-base';
import {
  RED_COLOR_ACTIVE, ORDER_FINISH, ORDER_REFUNDING_FAILURE, ORDER_REFUNDING, ORDER_DISPATCHING, ORDER_WAIT, ORDER_REFUND_SUCCESS, ORDER_WAIT_PAY
} from '../constants';
import {
  dateFormat
} from '../utils/index'
import ImageRow from './ImageRow';
import connect from "react-redux/es/connect/connect";
import { payOrder } from "../actions";


const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 5,
    marginBottom: 5
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
  },
  headerRight: {
    marginLeft: 'auto'
  },
  content: {
    // paddingLeft: 10,
    // paddingRight: 10
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff'
  },
  footerAction: {
    marginTop: 10,
    marginBottom: 5
  }
})

@connect(
  state => ({
    userId: state.auth.user.userId,
    token: state.auth.user.token
  }),
  dispatch => ({
    payOrder: (userId, token, orderId) => {
      dispatch(payOrder(userId, token, orderId))
    }
  })
)
export default class Order extends React.Component {
  constructor(props) {
    super(props)
    this.status = new Map([
      [ORDER_WAIT, '待发货'],
      [ORDER_DISPATCHING, '配送中'],
      [ORDER_FINISH, '已完成'],
      [ORDER_REFUNDING, '退款中'],
      [ORDER_REFUND_SUCCESS, '退款成功'],
      [ORDER_REFUNDING_FAILURE, '退款失败'],
      [ORDER_WAIT_PAY, '待支付']
    ])
  }

  handlePay = () => {
    const {
      order,
      userId,
      token,
      nav
    } = this.props
    console.log('handlePay--------->',order)

    this.props.payOrder(userId, token, order.orderId)


    nav.navigate('OrderResult')
  }

  handleRefund = () => {
    const {
      order
    } = this.props
    this.props.handleRefund(order.orderId)
  }

  renderAction = () => {
    const {
      status
    } = this.props.order

    if (status === ORDER_REFUNDING ||
      status === ORDER_REFUND_SUCCESS) {
      return null
    } else if (status === ORDER_WAIT_PAY){
      return (
        <Button
          style={{marginLeft: 'auto'}}
          light
          onPress={this.handlePay}
        >
          <Text>去支付</Text>
        </Button>
      )
    } else {
      return (
        <Button
          style={{marginLeft: 'auto'}}
          light
          onPress={this.handleRefund}
        >
          <Text>申请退款</Text>
        </Button>
      )
    }
  }

  render() {
    const {
      order
    } = this.props

    const statusContent = this.status.get(order.status)
    const orderDetails = order.orderDetails
    let count = 0
    const actionNode = this.renderAction()

    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text>
            {order.createTime}
          </Text>
          <View style={styles.headerRight}>
            <Text style={{color: RED_COLOR_ACTIVE}}>
              {statusContent}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          {
            orderDetails ?
              orderDetails.length !== 0 ? (
                orderDetails.map((item, index) => {
                  count += item.count
                  return (
                    <ImageRow
                      key={item.orderDetailId}
                      data={item.goodsInfos}
                      number={item.count}
                    />
                  )
                })
              ) : null :null
          }
        </View>
        <View style={styles.footer}>
          <Text style={{textAlign: 'right'}}>
            共{count}件商品  合计: ￥ {order.amount.toFixed(2)}
          </Text>
          <View style={styles.footerAction}>
            <View style={{flex: 1}}>
            </View>
            {actionNode}
          </View>
        </View>
      </View>
    )
  }
}
