import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import ContentHeader from './ContentHeader';
import ContentRecommend from './ContentRecommend';
import SearchHeader from '../../components/SearchHeader';
import {
  loadAllAddesses,
  loadGoods, loadUser, signin
} from '../../actions';
import {Toast} from "native-base";

@connect(
  state => ({
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    errorMessage: state.auth.errorMessage,
    goods: state.goods.goods,
    inService: state.service.inService
  }),
  dispatch => ({
    signin: (username, password) => dispatch(signin(username, password)),
    loadUser: (userId, token) => dispatch(loadUser(userId, token)),
    fetchAddress: (userId, token) => dispatch(loadAllAddesses(userId, token)),
    loadGoods: () => dispatch(loadGoods(1, 16, 'sold_count desc'))
  })
)
export default class Home extends React.Component {
  static navigationOptions = ({navigation}) => (
    {
      header: navigation.header
    }
  )

  handlerSignin =  (userId,token,username,password) => {
    //this.props.signin(username, password)
    //console.log('-----this.props.errorMessage----',this.props.errorMessage)
    if (this.props.errorMessage === "") {
      const {
        navigation,
      } = this.props

      this.props.fetchAddress(userId, token)
      this.props.loadUser(userId, token)
    }else{
      Toast.show({
        text: this.props.errorMessage,
        position: 'top',
        type: 'danger'
      })
    }
  }

  componentDidMount() {
    const {
      userId,
      token,
      signin,
      errorMessage
    } = this.props

    global.storage.load({
      key: 'loginParam',
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      autoSync: true,

      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
      syncInBackground: true,

      // 你还可以给sync方法传递额外的参数
      syncParams: {
        extraFetchOptions: {
          // 各种参数
        },
        someFlag: true,
      },
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
      // 你只能在then这个方法内继续处理ret数据
      // 而不能在then以外处理
      // 也没有办法“变成”同步返回
      // 你也可以使用“看似”同步的async/await语法
      this.handlerSignin(ret.userId,ret.token,ret.username,ret.password)
    }).catch(err => {
      //如果没有找到数据且没有sync方法，
      //或者有其他异常，则在catch中返回
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          console.log('-------NotFoundError-------')
          break;
        case 'ExpiredError':
          console.log('-------ExpiredError-------')
          break;
      }
    })

    this.props.loadGoods()
  }



  render() {
    const {
      goods,
      navigation
    } = this.props

    return (
      <View style={styles.container}>
        <SearchHeader
          searchAction={() => {
            this.props.navigation.navigate('Search')
          } }
          scanAction={() => {
            this.props.navigation.navigate('QrScan')
          } }
        />
        <ScrollView style={styles.scroll}>
          <ContentHeader
            style={styles.advertisement}
            navigation={navigation}
          />
          <ContentRecommend
            goods={goods}
            navigation={navigation}
          />
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop:Platform.OS === 'ios' ? 20 : 0,
    flex:1
  },
  scroll: {
    flex:1
  },
  advertisement:{
    height:180,
    justifyContent:'center',
    alignItems:'center'
  },
})
