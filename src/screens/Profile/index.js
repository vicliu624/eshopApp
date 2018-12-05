import React from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Grid,
  Col,
  Button,
  Text,
  View,
  Toast,
  H3
} from 'native-base';
import {
  StyleSheet,
  StatusBar,
  TouchableNativeFeedback
} from 'react-native';
import { PRIMARY_COLOR, SERVICE_CONTENT, SUGGEST_CONTENT, GITHUB_CONTENT, ORDER_DISPATCHING, ORDER_REFUNDING, ORDER_WAIT, ORDER_WAIT_PAY } from '../../constants';
import UserInfoHeader from './UserInfoHeader';
import {
  loadUser,
  signout
} from '../../actions';
import MyIcons from '../../components/MyIcons'

const Circle = (props: any) => {
  const size = props.size || 20;
  const style = {
    borderRadius: size / 2,
    backgroundColor: '#527fe4',
    width: size,
    height: size,
    margin: 1,
  };
  return <View style={style} />;
};

const styles = StyleSheet.create({
  absoluteTop: {
    position: 'absolute',
    top: 0,
    height: 50,
    width: '100%',
    backgroundColor: PRIMARY_COLOR
  },
  signinBtn: {
    padding: 20,
    marginTop: 60,
    marginBottom: 20
  },
  contentHeader: {
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonItem: {
    flex: 1,
  },
  buttonItemText: {
    fontSize: 10,
    color: '#333333'
  },
  firstListRow: {
    marginTop: 40,
    borderTopWidth: 1,
    borderColor: '#efeff4',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 20,
    paddingRight: 5,
    paddingBottom: 20,
  },
  listRow: {
    borderTopWidth: 1,
    borderColor: '#efeff4',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 20,
    paddingRight: 5,
    paddingBottom: 20
  }
})

// const HeaderRight = ({ isAuthorized }) => {
//   if (isAuthorized) {
//     return <Icon name="settings" style={{color: '#fff'}} />
//   } else {
//     return <View></View>
//   }
// }

@connect(
  state => ({
    isAuthorized: state.auth.isAuthorized,
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    user: state.userInfo.user
  }),
  dispatch => ({
    loadUser: (userId, token) => dispatch(loadUser(userId, token)),
    logout: () => dispatch(signout())
  })
)
export default class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: <StatusBar animated barStyle="dark-content" />
  })

  constructor(props) {
    super(props)
    // 为了每次购物车要获得焦点就刷新数据
    props.navigation.addListener('willFocus', () => this._refreshData());
  }

  _refreshData = () => {
    if (this.props.isAuthorized) {
      loadUser(this.props.userId, this.props.token)
    }
  }

  handleGotoSignin = () => {
    this.props.navigation.navigate('Signin')
  }

  handleSignout = () => {
    this.props.logout()
    this._showToast('退出成功', 'success')
  }

  handleGotoAddress = () => {
    if (this._checkAuthorization()) {
      this.props.navigation.navigate('Address')
    } else {
      this._showToast('请先登录')
      this.handleGotoSignin()
    }
  }

  handleGotoOrderList = () => {
    if (this._checkAuthorization()) {
      this.props.navigation.navigate('OrderList')
    } else {
      this._showToast('请先登录')
      this.handleGotoSignin()
    }
  }

  handleGotoOrderDispatching = () => {
    if (this._checkAuthorization()) {
      this.props.navigation.navigate('OrderList', { status: ORDER_DISPATCHING })
    } else {
      this._showToast('请先登录')
      this.handleGotoSignin()
    }
  }

  handleGotoOrderRefunding = () => {
    if (this._checkAuthorization()) {
      this.props.navigation.navigate('OrderList', { status: ORDER_REFUNDING })
    } else {
      this._showToast('请先登录')
      this.handleGotoSignin()
    }
  }

  handleGotoOrderWait = () => {
    if (this._checkAuthorization()) {
      this.props.navigation.navigate('OrderList', { status: ORDER_WAIT })
    } else {
      this._showToast('请先登录')
      this.handleGotoSignin()
    }
  }

  handleGotoOrderWaitPay = () => {
    if (this._checkAuthorization()) {
      this.props.navigation.navigate('OrderList', { status: ORDER_WAIT_PAY })
    } else {
      this._showToast('请先登录')
      this.handleGotoSignin()
    }
  }

  handleGotoEditInfo = () => {
    this.props.navigation.navigate('EditInfo')
  }

  componentDidMount() {
    const {
      isAuthorized,
      userId,
      token,
      loadUser
    } = this.props

    if (isAuthorized) {
      loadUser(userId, token)
    }
  }

  _checkAuthorization = () => {
    if (this.props.isAuthorized) {
      return true
    } else {
      return false
    }
  }

  _showToast = (text, type = "warning") => {
    Toast.show({
      text,
      type,
      position: 'top'
    })
  }

  _concatWithService = () => {
    alert(SERVICE_CONTENT)
  }

  renderSigninButton = () => {
    return (
      <Button
        transparent
        style={styles.signinBtn}
        onPress={this.handleGotoSignin}
      >
        <H3 style={{color: '#222222'}}>
          点击登录
        </H3>
      </Button>
    )
  }

  render() {
    const {
      isAuthorized,
      user
    } = this.props

    const signinBtn = this.renderSigninButton()

    return (
      <Content padder style={{backgroundColor: '#fff'}}>
        {
          !isAuthorized ? (
            signinBtn
          ) : (
            <UserInfoHeader user={user} onPress={this.handleGotoEditInfo}/>
          )
        }
        <View style={styles.contentHeader}>
          <View style={styles.buttonGroup}>
            <Button vertical transparent dark style={styles.buttonItem} onPress={this.handleGotoOrderWaitPay}>
              <MyIcons name="fukuan" style={{color: '#646464', fontSize: 32}} />
              <Text style={styles.buttonItemText}>待付款</Text>
            </Button>
            <Button vertical transparent dark style={styles.buttonItem} onPress={this.handleGotoOrderWait}>
              <MyIcons name="daifahuo" style={{color: '#646464', fontSize: 32}} />
              <Text style={styles.buttonItemText}>待发货</Text>
            </Button>
            <Button vertical transparent dark style={styles.buttonItem} onPress={this.handleGotoOrderDispatching}>
              <MyIcons name="daishouhuo" style={{color: '#646464', fontSize: 32}} />
              <Text style={styles.buttonItemText}>待收货</Text>
            </Button>
            <Button vertical transparent dark style={styles.buttonItem} onPress={this.handleGotoOrderRefunding}>
              <MyIcons name="tuikuan" style={{color: '#646464', fontSize: 32}} />
              <Text style={styles.buttonItemText}>退款中</Text>
            </Button>
            <Button vertical transparent dark style={styles.buttonItem} onPress={this.handleGotoOrderList}>
              <MyIcons name="orderlist" style={{color: '#646464', fontSize: 32}} />
              <Text style={styles.buttonItemText}>全部</Text>
            </Button>
          </View>
        </View>
        <TouchableNativeFeedback onPress={this.handleGotoAddress}>
          <Grid style={styles.firstListRow}>
            <Col>
              <Text>地址管理</Text>
            </Col>
            <Col>
              <Text style={{textAlign: 'right'}}>
                <MyIcons name="dizhi" style={{ fontSize: 32}}/>
              </Text>
            </Col>
          </Grid>
        </TouchableNativeFeedback>
        {/* <TouchableNativeFeedback onPress={this._concatWithService}>
          <Grid style={styles.listRow}>
            <Col>
              <Text>联系客服</Text>
            </Col>
            <Col>
              <Text style={{textAlign: 'right'}}>
                <Icon name="ios-chatbubbles-outline" />
              </Text>
            </Col>
          </Grid>
        </TouchableNativeFeedback> */}
        {/* <Grid style={styles.listRow}>
          <Col>
            <Text>推荐好友</Text>
          </Col>
          <Col>
            <Text style={{textAlign: 'right'}}>
              <Icon name="ios-share-alt-outline" />
            </Text>
          </Col>
        </Grid> */}
        {/* <TouchableNativeFeedback onPress={this._handleSuggest}>
          <Grid style={styles.listRow}>
            <Col>
              <Text>意见反馈</Text>
            </Col>
            <Col>
              <Text style={{textAlign: 'right'}}>
                <Icon name="ios-text-outline" />
              </Text>
            </Col>
          </Grid>
        </TouchableNativeFeedback> */}
        {/* <Grid style={styles.listRow}>
          <Col>
            <Text>喜欢我们</Text>
          </Col>
          <Col>
            <Text style={{textAlign: 'right'}}>
              <Icon name="ios-star-outline" />
            </Text>
          </Col>
        </Grid> */}
        { isAuthorized ? (
          <TouchableNativeFeedback onPress={this.handleSignout}>
            <Grid style={styles.listRow}>
              <Col>
                <Text>退出账号</Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'right'}}>
                  <MyIcons name="setting" style={{ fontSize: 32}}/>
                </Text>
              </Col>
            </Grid>
          </TouchableNativeFeedback> ) : null
        }
        {/* <TouchableNativeFeedback onPress={this._handleGithubLink}>
          <Grid style={styles.listRow}>
            <Col>
              <Text>Github</Text>
            </Col>
            <Col>
              <Text style={{textAlign: 'right'}}>
                <Icon name="logo-github" />
              </Text>
            </Col>
          </Grid>
        </TouchableNativeFeedback> */}
      </Content>
    )
  }
}
