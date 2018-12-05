import React from 'react';
import {
  Content,
  Button,
  Text,
  Header,
  Body,
  Title,
  Row,
  Col,
  View
} from 'native-base';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SectionList,
  Dimensions,
  Image, Platform
} from 'react-native';
import HeaderSearchbar from '../components/HeaderSearchbar';
import categoryService from '../services/categoryService';
import SearchHeader from '../components/SearchHeader';

const styles = StyleSheet.create({
  wrapper: {
  }
})

export default class Home extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <HeaderSearchbar navigation={navigation}/>
  })

  state = {
    categories: [],
    leftFlatList:[],
    rightSectionList:[],
    selectedRootCate: 0,
  }

  componentDidMount() {
    this.fetchCategory()
  }

  fetchCategory = async () => {
    const res = await categoryService.all();
    const categories = res.data.data
    this.setState({
      categories
    })
  }

  handleGotoSearch = (categorySecondId) => {
    this.props.navigation.navigate('GoodSearch', {
      good: {
        goodsCate: categorySecondId
      }
    })
  }

  onRenderItem = (item) => (
    <TouchableOpacity
      key={item.index}
      style={[{alignItems: 'center', justifyContent: 'center', width: 100, height: 44}, this.state.selectedRootCate === item.index ? {backgroundColor: '#F5F5F5', borderLeftWidth: 3, borderLeftColor: 'red'} : {backgroundColor: 'white'}]}
      onPress={() => {
        setTimeout(() => {
          if((this.state.categories.length - item.index) * 45 > Dimensions.get('window').height - 65){
            this.state.leftFlatList.scrollToOffset({animated: true, offset: item.index * 45})
          }
          this.state.rightSectionList.scrollToLocation({itemIndex: 0, sectionIndex: 0, animated: true, viewOffset: 20})
        }, 100)
        this.setState({selectedRootCate: item.index})
      }}
    >
      <Text style={{fontSize: 13, color: this.state.selectedRootCate === item.item.key ? 'red' : '#333'}}>{item.item.title}</Text>
    </TouchableOpacity>
  )

  renderCell = (item, sectionIndex, index) => (
    <TouchableOpacity
      key={index}
      style={{height: 110, width: (Dimensions.get('window').width - 140) / 3, backgroundColor: 'white', marginBottom: 8, marginRight: 10, alignItems: 'center'}}
      onPress={() => this.handleGotoSearch(item.id)}
    >
      <Image style={{width: 60, height: 70, marginVertical: 10}} source={{uri: JSON.parse(JSON.stringify(item.imageUrl).replace('https:','http:'))}}/>
      <Text style={{color: '#ccc', fontSize: 13}}>{item.name}</Text>
    </TouchableOpacity>
  )

  renderItem(item) {
    return item.index === 0 ?
      <View key={item.index} style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {item.section.data.map((cell, index) => this.renderCell(cell, item.section.data.sectionId, index))}
      </View> : null
  }

  sectionComp = (item) => (
    <View style={{backgroundColor: '#F5F5F5', justifyContent: 'center'}}>
      <Text style={{color: 'gray', marginBottom: 8}}>{item.section.key}</Text>
    </View>
  )

  renderRootCate(categories) {
    const rootMenu = []
    categories.forEach((item, index) => {
      rootMenu.push({key: item.id, title: item.name, index: index})
    })
    return (
      <View style={{backgroundColor: '#F5F5F5'}}>
        <FlatList
          ref={(flatList) => {this.state.leftFlatList = flatList}}
          keyExtractor={(item, index) => index.toString()}
          data={rootMenu}
          ListHeaderComponent={() => (<View/>)}
          ListFooterComponent={() => (<View/>)}
          ItemSeparatorComponent={() => <View style={{height:1, backgroundColor:'#F5F5F5'}}/>}
          renderItem={this.onRenderItem}
          onEndReachedThreshold={20}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }

  renderItemCate(categories) {
    if(categories[this.state.selectedRootCate] !== undefined){
      const tempArr = categories[this.state.selectedRootCate].sonGoodsCategory.map((item, index) => {
        const tempObj = {}
        tempObj.key = item.name
        tempObj.data = item.sonGoodsCategory
        tempObj.data.sectionId = index
        return tempObj
      })
      return (
        <View style={{flex: 1, backgroundColor: '#F5F5F5', marginLeft: 10, marginTop: 8}}>
          <SectionList
            ref={(ref) => {this.state.rightSectionList = ref}}
            renderSectionHeader={this.sectionComp}
            renderItem={(data) => this.renderItem(data)}
            sections={tempArr}
            ItemSeparatorComponent={() => <View/>}
            ListHeaderComponent={() => <View/>}
            ListFooterComponent={() => <View/>}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )
    }
  }

  renderCategory() {
    const categories = this.state.categories
    return (
      <View>
        <SearchHeader
          searchAction={() => {
            this.props.navigation.navigate('Search')
          } }
          scanAction={() => alert('scan') }
        />
        <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#F5F5F5'}}>
          {this.renderRootCate(categories)}
          {this.renderItemCate(categories)}
        </View>
      </View>
    )
  }

  /*renderCategory = () => {
    const categories = this.state.categories
    const allson = []
    categories.forEach((item) => {
      item.sonGoodsCategory.forEach((son) => {
        allson.push(son)
      })
    })
    let nodes = []

    console.log('allson',allson)

    nodes = allson.map((categoryItem) => {
      const datas = categoryItem.sonGoodsCategory
      const processedCategories = []
      let rows = []

      datas.forEach((item,index)=>{
        if(index % 3 ===0){
          processedCategories.push(datas.slice(index, index + 3))
        }
      })

      rows = processedCategories.map((items, index) => {
        return (
          <Row key={index}>
            {
              items.map((item) => {
                return (
                  <Col key={item.id} style={{width: '33.33%'}}>
                    <TouchableNativeFeedback onPress={() => this.handleGotoSearch(item.id)}>
                    <ImageBox
                      key={item.id}
                      image={IMAGE_URL + item.imageUrl}
                      desc={item.name}
                    />
                    </TouchableNativeFeedback>
                  </Col>
                )
              })
            }
          </Row>
        )
      })

      return (
        <Blocks
          title={categoryItem.name}
          key={categoryItem.id}
        >
          {rows}
        </Blocks>
      )
    })

    return nodes
  }*/

  /*render() {
    const {
      goods,
      inService,
      navigation
    } = this.props

    const list = this.renderCategory()

    return (
      <Content
        showsVerticalScrollIndicator={false}
      >
        {list}
      </Content>
    )
  }*/

  render() {
    return (
      <Content>
        {this.renderCategory()}
      </Content>
    )
  }
}
