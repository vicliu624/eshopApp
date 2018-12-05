import React from 'react';
import {
  Image,
  TouchableNativeFeedback,
  Platform,
  View
} from 'react-native';
import advService from '../../services/advService';
import { Toast, Carousel }  from 'antd-mobile-rn';

export default class extends React.Component {
  state = {
    advs: []
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchAdvs()
    }, 100);
  }

  goToSearch = (categorySecondId) => {
    this.props.navigation.navigate('GoodSearch', {
      good: {
        categorySecondId: categorySecondId
      }
    })
  }

  fetchAdvs = async () => {
    try {
      const res = await advService.all()
      const advs = res.data.data
      this.setState({
        advs: advs
      })
    } catch(err) {
      Toast.offline('网络异常', 1)
    }
  }

  render() {
    const advs = this.state.advs
    return (
      advs === undefined ? null :
        <View>
          <Carousel
            autoplay={true}
            infinite
          >
            {advs.map((item) => (
              <TouchableNativeFeedback onPress={() => this.goToSearch(item.categorySecondId)} key={item.advSwiperId}>
                <Image
                  resizeMode="stretch"
                  style={{ width: '100%', height: 180,flex: 1 }}
                  source={Platform.OS === 'ios' ? {uri: item.image} : {uri: item.image !== undefined ? JSON.parse(JSON.stringify(item.image).replace('https:','http:')) : null}}
                />
              </TouchableNativeFeedback>
            ))}
          </Carousel>
        </View>
    )
  }
}
