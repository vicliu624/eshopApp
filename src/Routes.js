import React from 'react';
import { View, Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Home from './screens/Home';
import Category from './screens/Category';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import Search from './screens/Search';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import GoodSearch from './screens/GoodSearch/';
import GoodDetail from './screens/GoodDetail/';
import Address from './screens/Address';
import PostAddress from './screens/AddressPostForm';
import CreateOrder from './screens/CreateOrder';
import OrderList from './screens/OrderList';
import TabBarItem from './components/TabBarItem';
import EditInfo from './screens/EditInfo';
import OrderResult from './screens/OrderResult';
import AddressUpdate from './screens/AddressUpdate';
import ForgetPassword from './screens/ForgetPassword';
import QrScan from './screens/QrScan';
import { RED_COLOR, RED_COLOR_ACTIVE } from './constants';

const Main = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      header:null,
      tabBarLabel: '首页',
      tabBarIcon: ({focused, tintColor}) => (
        <TabBarItem
          focused={focused}
          tintColor={tintColor}
          iconName="home"
        />
      )
    })
  },
  Category: {
    screen: Category,
    navigationOptions: ({navigation}) => ({
      header:null,
      tabBarLabel: '分类',
      tabBarIcon: ({focused, tintColor}) => (
        <TabBarItem
          focused={focused}
          tintColor={tintColor}
          iconName="fenlei"
        />
      )
    })
  },
  Cart: {
    screen: Cart,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '购物车',
      tabBarIcon: ({focused, tintColor}) => (
        <TabBarItem
          focused={focused}
          tintColor={tintColor}
          iconName="cart"
        />
      )
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '我的',
      tabBarIcon: ({focused, tintColor}) => (
        <TabBarItem
          focused={focused}
          tintColor={tintColor}
          iconName="wode"
        />
      )
    })
  }
}, {
  // tabBarComponent: null,
  backBehavior: 'none',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  mode: 'card',
  headerMode: 'float',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: RED_COLOR_ACTIVE,
    inactiveTintColor: '#454545',
    style: {
      backgroundColor: '#fff',
      height: 50
    },
    labelStyle: {
      marginTop: -4,
      fontSize: 14
    },
    indicatorStyle: {
      height: 0
    }
  },
  navigationOptions: {
    headerTitleAllowFontScaling: false,
    headerTintColor: '#333',
    headerLeft: null,
    headerStyle: {
      height: 20 + 44,
      paddingTop: 20,
      backgroundColor: '#fff',
    }
  }
})

const AppNavigator = createStackNavigator({
  Main: {
    screen: Main,
  },
  Signin: {
    screen: Signin
  },
  Signup: {
    screen: Signup
  },
  Search: {
    screen: Search
  },
  GoodSearch: {
    screen: GoodSearch
  },
  GoodDetail: {
    screen: GoodDetail
  },
  Address: {
    screen: Address
  },
  PostAddress: {
    screen: PostAddress
  },
  AddressUpdate: {
    screen: AddressUpdate
  },
  CreateOrder: {
    screen: CreateOrder
  },
  OrderList: {
    screen: OrderList
  },
  EditInfo: {
    screen: EditInfo
  },
  OrderResult: {
    screen: OrderResult
  },
  ForgetPassword: {
    screen: ForgetPassword
  },
  QrScan:{
    screen: QrScan
  }
}, {
  initialRouteName: 'Main',
  navigationOptions: {
    headerTitleAllowFontScaling: false,
    headerTintColor: '#333',
    headerStyle: {
      height: Platform.OS === 'ios'? 20 : 0,
      paddingTop: Platform.OS === 'ios'? 20 : 0,
      backgroundColor: '#fff',
    }
  }
})

export default class Routes extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <AppNavigator />
      </View>
    )
  }
}


