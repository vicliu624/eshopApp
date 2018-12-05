import React from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Body,
  Title,
  Left,
  Button,
  Right,
} from 'native-base';
import {
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native';
import { RED_COLOR } from '../constants';
import MyIcons from './MyIcons'

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: Platform.OS === 'ios' ? 25 : 5,
    paddingBottom: 10,
    height: 70,
    backgroundColor: '#fff',
  }
})

export default class HeaderDefault extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
  }

  backToHome = () => {
    //this.props.navigation.navigate('Profile')
    this.props.navigation.pop();
  }

  render() {
    const {
      title,
      icon,
      backToHome
    } = this.props

    return (
      <Header
        style={styles.wrapper}
        rounded
      >
        <StatusBar
          animated
          barStyle="dark-content"
        />
        {
          backToHome ? (
            <Left>
              <Button onPress={this.backToHome} style={{backgroundColor: RED_COLOR}}>
                <MyIcons name='houtui' size={32} color="#333" />
              </Button>
            </Left>
          ) :  <Left />
        }
        <Body>
          <Title style={{color: '#333'}}>
            {title}
          </Title>
        </Body>
        <Right>
          {icon ? (
            <MyIcons name={icon} />
          ): null}
        </Right>
      </Header>
    )
  }
}
