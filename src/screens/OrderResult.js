import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  NativeModules
} from 'react-native';
import { connect } from 'react-redux';
import {
  Content,
  Text,
  View,
  Button, Spinner, Toast
} from 'native-base';
import HeaderDefault from '../components/HeaderDefault';
import Loading from '../components/Loading';
import {BORDER_COLOR, RED_COLOR} from '../constants';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 20
  },
  headerContent: {
    textAlign: 'center',
    fontSize: 20
  },
  flexWrapper: {
    backgroundColor: '#fff'
  },
  paddingBox: {
    flexDirection: 'row',
    padding: 15
  },
  left: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: BORDER_COLOR,
    paddingTop: 3,
    paddingBottom: 3
  },
  right: {
    flex: 1,
    // borderLeftWidth: 1,
    // borderLeftColor: '#333',
    paddingTop: 3,
    paddingBottom: 3
  },
  btnText: {
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: RED_COLOR
  },
})

@connect(
  state => ({
    order:state.orders.currentOrder,
    postError: state.orders.postError,
    isPosting: state.orders.isPosting
  })
)
export default class OrderResult extends React.Component {
  static navigationOptions = ({ navigation, postError, isPosting }) => ({
    header: <HeaderDefault title="订单结果" navigation={navigation} backToHome />
  })

  handleGotoHome = (e) => {
    e.persist()
    const {
      navigation
    } = this.props

    navigation.navigate('Home')
  }

  handleGotoOrder = (e) => {
    e.persist()
    const {
      navigation
    } = this.props

    navigation.navigate('OrderList')
  }

  _showToast = (text, type = "warning") => {
    Toast.show({
      text,
      type,
      position: 'top'
    })
  }

  handleAlipay = (e) => {
    const {
      order
    } = this.props

    if(order){
      console.log('--------------to pay-----------',order.payStr)
      // 跳转到原生activity
      NativeModules.MyNativeModule.rnCallNative(order.payStr)
    }else{
      this._showToast('跳转出错，请返回首页')
    }
  }

  renderResult = () => {
    const {
      postError,
      order
    } = this.props

    const text = postError === '' ? '下单成功' : '下单失败：' + postError

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerContent}>
            {text}
          </Text>
        </View>
        <Button
          style={styles.submitButton}
          block
          onPress={this.handleAlipay}
        >
          <Text>去支付</Text>
        </Button>
        <View style={styles.flexWrapper}>
          <View style={styles.paddingBox}>
            <TouchableNativeFeedback onPress={this.handleGotoOrder}>
              <View style={styles.left}>
                <Text style={styles.btnText}>
                  查看我的订单
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={this.handleGotoHome}>
              <View style={styles.right}>
                <Text style={styles.btnText}>
                  返回主页
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const {
      isPosting
    } = this.props

    return (
      <Content>
        {
          isPosting ? (
            <Loading />
          ) : (
            this.renderResult()
          )
        }
      </Content>
    )
  }
}
