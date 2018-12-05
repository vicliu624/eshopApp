import React from 'react';
import {
  StatusBar,
  TouchableOpacity
} from 'react-native';
import {
  Header,
  Item,
  Input,
} from 'native-base';
import MyIcons from './MyIcons';

export default class HeaderSearchbar extends React.Component {

  handleGoToSearch = () => {
    this.props.navigation.navigate('Search')
  }

  handleGoToHome = (e) => {
    e.preventDefault()
    this.props.navigation.navigate('Home')
  }

  render() {
    const {
      back
    } = this.props

    return (
      <Header searchBar rounded style={{paddingTop: 25, paddingBottom: 10, height: 70, backgroundColor: '#fff'}}>
        <StatusBar
          animated
          barStyle="dark-content"
        />
        <Item onPress={this.handleGoToSearch}>
          {
            back ? (
              <TouchableOpacity activeOpacity={0.7} onPress={this.handleGoToHome} >
                <MyIcons name="houtui" size={16}/>
              </TouchableOpacity>
            ) : (
              <MyIcons name="search" />
            )
          }
          <Input placeholder="搜索试试" disabled/>
        </Item>
      </Header>
    )
  }
}
