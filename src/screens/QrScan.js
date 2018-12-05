import React from "react";
import Barcode from 'react-native-smart-barcode';
import {
  StyleSheet,
  View,
  Alert,
  PermissionsAndroid
} from 'react-native';
import connect from "react-redux/es/connect/connect";
import { search } from "../actions";

@connect(
  dispatch => ({
    searchGoods: (good) => dispatch(search(1, 10, good)),
  })
)
export default class QrScan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      viewAppear: false,
    }
  }

  async componentWillMount(){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': '相机全选',
          'message': '扫描二维码需要获取您手机的摄像头权限'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("你已获取了相机权限")
      } else {
        console.log("未获取相机失败")
      }
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    //启动定时器
    this.timer = setTimeout(
      () => this.setState({viewAppear: true}),
      250
    );
  }
  //组件销毁生命周期
  componentWillUnmount() {
    //清楚定时器
    this.timer && clearTimeout(this.timer);
  }

  _onBarCodeRead = (e) => {
    // console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
    this._stopScan();
    Alert.alert("二维码", e.nativeEvent.data.code, [
      {text: '确认', onPress: () => this._startScan()},
    ])
    let good = { barcode : e.nativeEvent.data.code }
    this.props.navigation.navigate('GoodSearch', {
      good: good
    })
  }

  _startScan = (e) => {
    this._barCode.startScan()
  };

  _stopScan = (e) => {
    this._barCode.stopScan()
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.viewAppear ?
          <Barcode style={{flex: 1,}} ref={component => this._barCode = component}
                   onBarCodeRead={this._onBarCodeRead}/>
          : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
