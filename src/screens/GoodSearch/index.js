import React from 'react';
import { connect } from 'react-redux';
import {
  FlatList, TouchableOpacity,View,Text,ActivityIndicator
} from 'react-native';
import { Toast }  from 'antd-mobile-rn';
import {
  Overlay
} from 'react-native-elements';
import HeaderSearchbar from '../../components/HeaderSearchbar';
import {
  addGoodToCart, getCart,
  getCartByGoodId,
  search
} from '../../actions';
import { RED_COLOR } from '../../constants';
import GoodsItem from '../../components/GoodsItem';

const styles = {
  desc: {
    display: 'flex',
    alignItems: 'center',
    height: 40
  },
  descFirst: {
    fontSize: 18
  },
  descSecond: {
    fontSize: 16,
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through'
  },
  buyBtn: {
    marginTop: 10,
    backgroundColor: RED_COLOR
  },
  notFound: {
    display: 'flex',
    height: 500,
    alignItems: 'center'
  },
  itemStyle: {
    // 主轴方向
    flexDirection:'row',
    // 下边框
    borderBottomWidth:1,
    borderBottomColor:'gray'
  },
  imageStyle: {
    // 尺寸
    width:100,
    height:100,
    // 边距
    marginLeft:2,
    margin:2
  },
  subItemStyle: {
    // 对齐方式
    justifyContent:'flex-start'
  }
}

const NUM_ROWS = 20;
let pageIndex = 0;

@connect(
  state => ({
    isAuthorized: state.auth.isAuthorized,
    userId: state.auth.user.userId,
    token: state.auth.user.token,
    isFetching: state.service.isFetching,
    inService: state.service.inService,
    goods: state.goods.searchs
  }),
  dispatch => ({
    searchGoods: (page, size , good) => dispatch(search(page, size, good)),
    getCartDetail: (userId, token, goodId) => dispatch(getCartByGoodId(userId, token, goodId)),
    addCart: (userId, token, goodId, count) => dispatch(addGoodToCart(userId, token, goodId, count)),
    getCart: (userId) => dispatch(getCart(userId)),
  })
)
export default class extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <HeaderSearchbar back navigation={navigation}/>
    )
  })

  constructor(props) {
    super(props)
    this.state = {
      error: false,
      page: 1,
      refreshing: false,
      loading: false,
      data: {},
    };
  }

  componentDidMount(){
    this.requestData()
  }

  requestData = () => {
    this.props.searchGoods(this.state.page,10,this.props.navigation.state.params.good)
    this.setState({
      refreshing: false,
      loading: false,
      data: [...this.state.data, ...this.props.goods],
    });
    console.log('--------requestData------',this.props.goods)
  }

  handleClick = (good) => {
    this.props.navigation.navigate('GoodDetail', {
      goodId: good.id
    })
  }

  handleUpdateCart = async (count,goodId) => {
    const {
      isAuthorized,
      navigation,
      addCart,
      userId,
      token,
      getCartDetail
    } = this.props

    if (!isAuthorized) {
      navigation.navigate('Signin', {
        from: 'GoodDetail',
        params: {
          goodId: goodId
        }
      })
    } else {
      await addCart(userId, token, goodId, count)
      await getCartDetail(userId, token, goodId)
      await getCart(userId)
      Toast.success('添加到购物车成功',1)
    }

  }

  renderGoodsItem = (item) =>{
    return (
      <TouchableOpacity style={{flex:1}} onPress = {() => this.handleClick(item)}>
        <GoodsItem goods={item.item}/>
      </TouchableOpacity>
    )
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      loading: false,
      data: [],
    }, () => {
      this.requestData();
    });
  }

  handleLoadMore = () => {
    this.setState({
      page: 1 + this.state.page,
      refreshing: false,
      loading: true,
    }, () => {
      this.requestData();
    });
    console.log('----------handleLoadMore-------------',this.state.page)
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}} containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        {
          <FlatList
            keyExtractor={item => item.id}
            data={this.state.data}
            renderItem={this.renderGoodsItem}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter()}
          />
        }
      </View>
    )
  }
}
