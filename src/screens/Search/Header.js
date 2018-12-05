import React from 'react';
import {
  StyleSheet,
  StatusBar
} from 'react-native';
import {
  View,
  Header,
  Input,
  Button,
} from 'native-base';
import MyIcons from '../../components/MyIcons'

const styles = StyleSheet.create({
  wrapper: {
    height: 130,
    paddingTop: 30,
    paddingLeft: 20,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column'
  },
  searchIcon: {
    fontSize: 16,
    color: '#000'
  },
  input: {
    paddingLeft: 15,
    fontSize: 20,
    fontWeight: '600'
  }
})

export default class extends React.Component {
  state = {
    search: ""
  }

  handleBack = () => {
    this.props.navigation.goBack()
  }

  handleSearchChange = (text) => {
    this.setState({
      search: text
    })
  }

  handleSubmit = () => {
    this.props.navigation.navigate('GoodSearch', {
      good: {
        goodsName: this.state.search
      }
    })
  }

  render() {
    return (
      <Header rounded style={styles.wrapper}>
        <StatusBar
          animated
          barStyle="dark-content"
        />
        <View>
          <Button transparent onPress={this.handleBack}>
            <MyIcons name="search" style={styles.searchIcon} />
          </Button>
        </View>
        <Input
          autoFocus
          style={styles.input}
          placeholder="想要什么？"
          value={this.state.search}
          onChangeText={text => this.handleSearchChange(text)}
          onSubmitEditing={this.handleSubmit}
        />
        {/* <Item onPress={() => {console.log(666)}}>
          <Icon name="ios-search" />
          <Input placeholder="搜索试试" autoFocus/>
          <Icon name="ios-people" />
        </Item> */}
      </Header>
    )
  }
}
