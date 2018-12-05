import {Component} from "react";
import { Card, WhiteSpace,Flex,Tag } from 'antd-mobile-rn';
import {View, Text, Image, StyleSheet} from "react-native";
import React from "react";
import PropTypes from "prop-types";


export default class GoodsItem extends Component{
  static propTypes = {
    goods: PropTypes.object
  }

  render() {
    const {
      goods
    } = this.props

    let good = goods == undefined ? {} : goods

    return (
      <View>
        <WhiteSpace size="xs" />
        <Card full key={good.id}>
          <Card.Body>
            <Flex wrap="wrap">
              <Image
                style={styles.image}
                resizeMode="stretch"
                source={{uri: good.imageUrl !== undefined ? JSON.parse(JSON.stringify(good.imageUrl).replace('https:','http:')) : null}}/>
              <Flex direction="column">
                <Flex align="start">
                  <Text numberOfLines={3} style={{fontSize: 14}}>{good.goodsName}</Text>
                </Flex>
                <Flex>
                  <WhiteSpace size="xl" />
                </Flex>
                <Flex>
                  <WhiteSpace size="xl" />
                </Flex>
                <Flex>
                  <WhiteSpace size="xl" />
                </Flex>
                <Flex>
                  <Tag small>原价:￥{good.originalPrice}</Tag>
                </Flex>
              </Flex>
            </Flex>
          </Card.Body>
          <Card.Footer content={'规格:' +good.spec + '/' + good.unit}
                       extra={
                         <Text style={{color:'red', fontSize: 20}}>￥{good.price}</Text>}
          />
        </Card>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 120,
    marginBottom: 10,
    borderRadius: 4
  }
})
