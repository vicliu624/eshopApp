import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  CheckBox
} from 'react-native';
import {
  View,
  Content,
  Left,
  Right,
  Item,
  Input,
  Toast,
  Text
} from 'native-base';
import {
  Overlay
} from 'react-native-elements';
import {
  editUserInfo
} from '../actions';
import { RED_COLOR_ACTIVE } from '../constants';
import List from '../components/List';
import MyIcons from '../components/MyIcons';
import HeaderDefault from "../components/HeaderDefault";

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageWrapper: {
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 250
  },
  imageDesc: {
    textAlign: 'center',
    padding: 10,
    fontSize: 26,
    fontWeight: '400'
  },
  actionBorder: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15
  },
  actionBorderLast: {
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15
  }
})

@connect(
  state => ({
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    user: state.userInfo.user,
    errorMessage: state.userInfo.errorMessage
  }),
  dispatch => ({
    editInfo: (userId, token, user) => dispatch(editUserInfo(userId, token, user))
  })
)
export default class EditInfo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    /*title: '编辑个人资料',
    tabBarComponent: null*/
    header: () => {
      const backToHome = navigation.state.params ?
        navigation.state.params.backToHome === false ? false : true
        : true
      return (
        <HeaderDefault title="编辑个人资料" backToHome={backToHome} navigation={navigation} />
      )
    }
  })

  state = {
    overlayVisible: true,
    editName: false,
    editSex: false,
    editPhone: false,
    nickName: '',
    sex: '男',
    phone: ''
  }

  constructor(props) {
    super(props)
    this.state.sex = this.props.user ? this.props.user.sex ? this.props.user.sex: '男' : '男'
  }

  handleEditName = (e) => {
    e.preventDefault()
    this.setState({
      editName: true
    })
  }

  handleCancelEditName = (e) => {
    e.preventDefault()
    this.setState({
      editName: false
    })
  }

  handleEditAll = (e) => {
    e.preventDefault()
    this.setState({
      editPhone: true,
      editSex: true
    })
  }

  handleCancelEditSex = (e) => {
    e.preventDefault()
    this.setState({
      editSex: false
    })
  }

  handleCancelEditPhone = (e) => {
    e.preventDefault()
    this.setState({
      editPhone: false
    })
  }

  /**
   * editInfo
   */
  handleEditInfo = (type = "") => {
    const {
      userId,
      token
    } = this.props

    if (type === "") {
      return ;
    }

    if (type === "nickName") {
      this.props.editInfo(userId, token, {nickName: this.state.nickName})
    }

    if (type === "phone") {
      this.props.editInfo(userId, token, {phone: this.state.phone})
    }

    if (type === "sex") {
      this.props.editInfo(userId, token, {sex: this.state.sex})
    }

    if (this.props.errorMessage !== "") {
      Toast.show({
        text: this.props.errorMessage,
        position: 'top',
        type: 'danger'
      })
    } else {
      Toast.show({
        text: '修改成功',
        position: 'top',
        type: 'success'
      })
    }

    this.setState({
      editName: false,
      editPhone: false,
      editSex: false
    })
  }

  render() {
    const {
      user
    } = this.props

    return (
      <Content style={styles.wrapper}>
        <TouchableNativeFeedback onPress={this.handleEditName}>
          <View style={styles.actionBorder}>
            {
              this.state.editName ? (
                <Item>
                  <Input
                    placeholder='请输入您要修改的昵称'
                    onChangeText={(text) => this.setState({nickName: text})}
                  />
                  <View style={{position:fixed,right:0,textAlign:center}}>
                    <TouchableNativeFeedback onPress={this.handleCancelEditName}>
                      <MyIcons active name='close-circle' size={30} />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.handleEditInfo('nickName')}>
                      <MyIcons active name='checkmark' size={30} />
                    </TouchableNativeFeedback>
                  </View>
                </Item>
              ) : (
                <Text style={{textAlign: 'center', color: RED_COLOR_ACTIVE, fontSize: 18}}>
                  编辑昵称
                </Text>
              )
            }
          </View>
        </TouchableNativeFeedback>
        <Text style={{padding: 12, textAlign: 'center', color: '#333', fontSize: 18}}>
          个人信息
        </Text>
        <List>
          <TouchableNativeFeedback onPress={this.handleEditSex}>
              {
                this.state.editSex ? (
                  <Item>
                    <CheckBox
                      value={this.state.sex === '男'}
                      style={{marginRight: 12}}
                      onChange={() => this.setState({sex: '男'})}
                    /><Text style={{marginRight: 20}}>男</Text>
                    <CheckBox
                      value={this.state.sex === '女'}
                      style={{marginRight: 12}}
                      onChange={() => this.setState({sex: '女'})}
                    /><Text style={{marginRight: 20,width: 95}}>女</Text>
                    <TouchableNativeFeedback onPress={this.handleCancelEditSex}>
                      <MyIcons active name='close-circle' size={30} />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.handleEditInfo('sex')}>
                      <MyIcons active name='checkmark' size={30} />
                    </TouchableNativeFeedback>
                  </Item>
                ) : (
                  <List.Item >
                    <Left>
                      <Text>性别</Text>
                    </Left>
                    <Right>
                      <Text style={{color: RED_COLOR_ACTIVE}}>{user.sex}</Text>
                    </Right>
                  </List.Item>
                )
              }
          </TouchableNativeFeedback>
            {
              this.state.editPhone ? (
                <Item>
                  <Input
                    placeholder='请输入电话号码'
                    onChangeText={(text) => this.setState({phone: text})}
                  />
                  <TouchableNativeFeedback onPress={this.handleCancelEditPhone}>
                    <MyIcons active name='close-circle' size={30}/>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback onPress={() => this.handleEditInfo('phone')}>
                    <MyIcons active name='checkmark' size={30}/>
                  </TouchableNativeFeedback>
                </Item>
              ) : (
              <List.Item last touchalbe>
                <Left>
                  <Text>联系电话</Text>
                </Left>
                <Right>
                  <Text style={{color: RED_COLOR_ACTIVE}}>{user.phone}</Text>
                </Right>
              </List.Item>
              )
            }
        </List>
        <TouchableNativeFeedback onPress={this.handleEditAll}>
          <View style={styles.actionBorderLast}>
            <Text style={{textAlign: 'center', color: RED_COLOR_ACTIVE, fontSize: 18}}>
              编辑个人信息
            </Text>
          </View>
        </TouchableNativeFeedback>
      </Content>
    )
  }
}
