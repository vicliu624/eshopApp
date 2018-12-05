import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableNativeFeedback,
  Image
} from 'react-native';
import {
  Content,
  View,
  Text,
  Button,
  SwipeRow
} from 'native-base';
import { CheckBox } from 'react-native';
import { RED_COLOR, RED_COLOR_ACTIVE } from '../constants';
import MyIcons from '../components/MyIcons'

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 40,
    backgroundColor: '#fff',
    width: '100%',
    display: 'flex',
  },
  checkboxWrapper: {
    position: 'absolute',
    left: 5,
    top: 45
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    // borderBottomWidth: 2,
    // borderColor: '#f3f4f6',
    // paddingTop: 15,
    // paddingBottom: 15
  },
  image: {
    width: 60,
    height: 60,
  },
  desc: {
    width: 120,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10
  },
  descLast: {
    marginTop: 'auto',
    color: RED_COLOR_ACTIVE
  },
  control: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto'
  },
  btn: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderRadius: 2,
    paddingLeft: 1,
    paddingTop:1,
    marginTop: 'auto'
  },
  controlTextWrapper: {
    marginTop: 'auto',
    width: 35,
    height: 30,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  controlText: {
    color: '#464646',
    textAlign: 'center'
  }
})

export default class CartItem extends React.Component {
  static propTypes = {
    cart: PropTypes.object.isRequired
  }

  handleClick = () => {
    const {
      cart
    } = this.props

    this.props.handleChange(cart)
  }

  handleAdd = () => {
    const {
      cart
    } = this.props

    this.props.handleCountChange(cart, 1)
  }

  handleSub = () => {
    const {
      cart
    } = this.props

    this.props.handleCountChange(cart, -1)
  }

  handleDelete = () => {
    const {
      cart
    } = this.props

    this.props.handleDelete(cart)
  }

  renderBody = () => {
    const {
      cart
    } = this.props

    return (
      <View style={styles.wrapper}>
        <View style={styles.checkboxWrapper} >
          <CheckBox
            value={cart.checked}
            color={RED_COLOR}
            onChange={() => this.handleClick()}
          />
        </View>
        <View style={styles.body}>
          <TouchableNativeFeedback onPress={() => this.handleClick()}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: cart.good.imageUrl ? JSON.parse(JSON.stringify(cart.good.imageUrl).replace('https:','http:')) : null}}
            />
          </TouchableNativeFeedback>
          <View style={styles.desc}>
            <Text style={styles.descFirst}>{cart.good.goodsName}</Text>
            <Text style={styles.descLast}>￥ {cart.good.price}</Text>
          </View>
          <View style={styles.control}>
            <TouchableNativeFeedback onPress={this.handleSub}>
              <View style={styles.btn}>
                <MyIcons name="remove" size={33} color="#464646" />
              </View>
            </TouchableNativeFeedback>

            <View style={styles.controlTextWrapper}>
              <Text style={styles.controlText}>{cart.count}</Text>
            </View>

            <TouchableNativeFeedback onPress={this.handleAdd}>
              <View style={styles.btn}>
                <MyIcons name="addshoppingcart" size={33} color="#464646" />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const body = this.renderBody()

    return (
      <Content scrollEnabled={false}>
        <SwipeRow
            disableRightSwipe={true}
            rightOpenValue={-75}
            body={body}
            right={
              <Button
                onPress={() => this.handleDelete()}
                style={{backgroundColor: RED_COLOR_ACTIVE}}
              >
                <MyIcons active name="trash" />
              </Button>
            }
        />
      </Content>
    )
  }
}
