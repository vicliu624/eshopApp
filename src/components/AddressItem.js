import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  CheckBox
} from 'react-native';
import {
  View,
  Row,
  Col,
  Button,
  Text
} from 'native-base';
import { RED_COLOR } from '../constants';
import MyIcons from '../components/MyIcons'

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 15,
    borderColor: '#efeff4'
  },
  content: {
    paddingTop: 10,
    paddingRight: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#efeff4'
  }
})

export default class extends React.Component {
  static propTypes = {
    address: PropTypes.object.isRequired
  }

  handleUpdate = () => {
    this.props.handleUpdate(this.props.address)
  }

  handleDelete = () => {
    this.props.handleDelete(this.props.address.addressId)
  }

  handleCheck = () => {
    if (!this.props.address.isDefault) {
      this.props.handleChecked(this.props.address.addressId)
    }
  }

  render() {
    const {
      address
    } = this.props

    return (
      <View style={styles.wrapper}>
        <Row>
          <Col><Text>{address.consignee}</Text></Col>
          <Col style={{marginLeft: 'auto'}}><Text style={{textAlign: 'right'}}>{address.phone}</Text></Col>
        </Row>
        <View style={styles.content}>
          <Text>
            {address.city}{address.address}{address.streetNumber}
          </Text>
        </View>
        <Row style={{paddingTop: 15, paddingBottom: 5}}>
          <Col style={{display: 'flex', flexDirection: 'row'}}>
            <CheckBox value={address.isDefault} color={RED_COLOR} onChange={this.handleCheck}/>
            {
              address.isDefault ? (
                <Text style={{color: RED_COLOR, marginLeft: 20}}>默认地址</Text>
              ) : <Text style={{marginLeft: 20}}>设为默认</Text>
            }
          </Col>
          <Col style={{display: 'flex', flexDirection: 'row'}}>
            <Button
              small
              style={{marginLeft: 'auto', marginRight: 5, backgroundColor: RED_COLOR}}
              onPress={this.handleUpdate}
            >
              <MyIcons name="createicon" size={32} />
            </Button>
            <Button
              small
              warning
              onPress={this.handleDelete}
            >
              <MyIcons name="trash" size={32} />
            </Button>
          </Col>
        </Row>
      </View>
    )
  }
}
