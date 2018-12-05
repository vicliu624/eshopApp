import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import HeaderSearchbar from "./HeaderSearchbar";

let window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

export default class SearchHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      viewAppear: false,
    };
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <Image source={require('../image/logo.gif')} style={styles.logo}/>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.searchBox}
          onPress={this.props.searchAction}
        >
          <Text style={styles.searchPlaceholder}>请输入商品名关键字</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.scanAction}>
          <Image source={require('../image/icon_qr.png')} style={styles.scanIcon}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  logo: {// 图片logo
    height: 24,
    width: 24,
    resizeMode: 'stretch'  // 设置拉伸模式
  },
  searchBar: {
    flexDirection: 'row',   // 水平排布
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 0,  // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 48 : 48,   // 处理iOS状态栏
    backgroundColor: '#d74047',
    alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    width: window.width - 60 - 15 * 2,
    margin: 6,
    padding: 10,
    backgroundColor: 'rgb(245, 246, 247)',
    borderRadius: 2,
  },
  searchBox:{// 搜索框
    height:30,
    flexDirection: 'row',   // 水平排布
    flex:1,
    borderRadius: 5,  // 设置圆角边
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  searchIcon: {
    width: 50,
    height: 30,
  },
  scanIcon: {// 搜索图标
    height: 26.7,
    width: 26.7,
    resizeMode: 'stretch'
  },
  searchPlaceholder: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 12,
    color: 'gray'
  }
})
