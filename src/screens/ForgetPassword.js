import React from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  Toast,
  Spinner, Left, Right
} from 'native-base';
import { StyleSheet } from 'react-native';
import {
  resetPass,
  reqSmsCode
} from '../actions';
import {
  RE_PHONE,
  RED_COLOR
} from '../constants';
import MyIcons from '../components/MyIcons';
import HeaderDefault from '../components/HeaderDefault';
import CountDownButton from '../components/RNCountDown';
import List from "../components/List";

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 30,
    backgroundColor: RED_COLOR,
  },
  smsButton: {
    marginTop: 30,
  },
  content: {
    backgroundColor: '#fff'
  },
  control: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
    paddingLeft: 10
  },
})

@connect(
  state => ({
    inService: state.service.inService,
    errorMessage: state.service.errorMessage
  }),
  dispatch => ({
    resetPass: (password, phone, smsCode) => dispatch(resetPass(password, phone, smsCode)),
    reqSmsCode: (phone) => dispatch(reqSmsCode(phone))
  })
)
export default class ForgetPassword extends React.Component {
  state = {
    username: '',
    password: '',
    rpassword: '',
    phone: null,
    smsCode: null,
    usernameErr: false,
    passwordErr: false,
    phoneErr: false
  }

  static navigationOptions = ({navigation}) => ({
    header: () => {
      const backToHome = navigation.state.params ?
        navigation.state.params.backToHome === false ? false : true
        : true
      return (
        <HeaderDefault title="忘记密码" backToHome={backToHome} navigation={navigation} />
      )
    }
  })

  handleSubmit = (e) => {
    e.preventDefault()

    const {
      usernameErr,
      passwordErr,
      rpasswordErr,
      phoneErr
    } = this.state

    if(this.handleValidate()) {
      this.resetPass()
    }
  }

  handleGetSmsCode = (value) => {
    this.props.reqSmsCode(this.state.phone)

    const {
      errorMessage
    } = this.props

    if (errorMessage !== "") {
      this.showToast(errorMessage)
      return false
    }else {
      return true
    }
  }

  resetPass = async () => {
    this.state.username = this.state.phone
    await this.props.resetPass(this.state.password, this.state.phone, this.state.smsCode);

    const {
      errorMessage,
      navigation
    } = this.props

    if (errorMessage !== "") {
      this.showToast(errorMessage)
    } else {
      this.showToast('修改成功！', 'success')

      if (navigation.state.params) {
        if (navigation.state.params.from) {
          navigation.navigate(navigation.state.params.from)
        } else {
          navigation.navigate('Signin')
        }
      } else {
        navigation.navigate('Signin')
      }
    }
  }

  handleValidate = () => {
    const {
      password,
      rpassword,
      phone,
      smsCode
    } = this.state

    let validMessage = ""

    this.setState({
      passwordErr: false,
      rpasswordErr: false,
      phoneErr: false,
      smsCodeErr:false
    })

    if (null === password || password.length < 6) {
      this.setState({
        passwordErr: true,
      })
      validMessage = '密码不能少于6位数'
      this.showToast(validMessage)
      return false;
    }

    if (null === rpassword) {
      this.setState({
        rpasswordErr: true,
      })
      validMessage = '请输入确认密码'
      this.showToast(validMessage)
      return false;
    }

    if (password !== rpassword) {
      this.setState({
        passwordErr: true,
      })
      validMessage = '密码和确认密码不一致'
      this.showToast(validMessage)
      return false;
    }

    if (!RE_PHONE.test(phone)) {
      this.setState({
        phoneErr: true,
      })
      validMessage = '不是有效的手机号码'
      this.showToast(validMessage)
      return false;
    }

    if (smsCode === undefined) {
      this.setState({
        smsCodeErr: true,
      })
      validMessage = '验证码不能为空'
      this.showToast(validMessage)
      return false;
    }

    return true
  }

  showToast = (message, type = 'danger') => {
    Toast.show({
      text: message,
      type,
      position: 'top'
    })
  }

  render() {
    return (
      <Content padder style={styles.content}>
        <Form>
          <Item floatingLabel error={this.state.phoneErr}>
            <Label>手机号码[用户名]</Label>
            <Input
              value={this.state.phone}
              onChangeText={(text) => this.setState({phone: text})}
              number
              keyboardType="number-pad"
            />
            {
              this.state.phoneErr ? (
                <MyIcons name='close-circle' />
              ) : null
            }
          </Item>
          <Item floatingLabel error={this.state.passwordErr}>
            <Label>新密码</Label>
            <Input
              value={this.state.password}
              type="password"
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
            />
            {
              this.state.passwordErr? (
                <MyIcons name='close-circle' />
              ) : null
            }
          </Item>
          <Item floatingLabel error={this.state.rpasswordErr}>
            <Label>确认新密码</Label>
            <Input
              value={this.state.rpassword}
              type="password"
              onChangeText={(text) => this.setState({rpassword: text})}
              secureTextEntry={true}
            />
            {
              this.state.passwordErr? (
                <MyIcons name='close-circle' />
              ) : null
            }
          </Item>
          <List.Item touchalbe>
            <Left>
              <Item floatingLabel error={this.state.smsCodeErr}>
                <Label>短信验证码</Label>
                <Input
                  value={this.state.smsCode}
                  onChangeText={(text) => this.setState({smsCode: text})}
                  // numberOfLine={11}
                  number
                  keyboardType="number-pad"
                />
                {
                  this.state.smsCodeErr ? (
                    <MyIcons name='close-circle' />
                  ) : null
                }
              </Item>
            </Left>
            <Right>
              <CountDownButton
                style={styles.smsButton}
                textStyle={{color: 'blue'}}
                timerCount={60}
                timerTitle={'获取验证码'}
                enable={this.state.phone ? this.state.phone.length > 10 : false}
                onClick={(shouldStartCountting)=>{
                  const requestSucc = this.handleGetSmsCode(this.state.phone) ? true : false
                  shouldStartCountting(requestSucc)
                }}
                timerEnd={()=>{
                  this.setState({
                    state: '倒计时结束'
                  })
                }}/>
            </Right>
          </List.Item>
          <Button
            style={styles.submitButton}
            block
            onPress={this.handleSubmit}
          >
            {
              this.state.inService ? (
                <Spinner />
              ) : null
            }
            <Text>修改</Text>
          </Button>
        </Form>
      </Content>
    )
  }
}
