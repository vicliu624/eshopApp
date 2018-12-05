/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { Root } from 'native-base';
import Routes from './src/Routes';
import AppStorage from './src/AppStorage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './src/reducers';
import Loading from './src/screens/Loading';
import SplashScreen from 'react-native-splash-screen';

const storage = AppStorage._getStorage()
global.storage = storage

const loggerMiddleware = createLogger()

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware
      // loggerMiddleware
    )
  )
)

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  componentDidMount(){
  }

  async componentWillMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    this.setState({
      isReady: true
    })
  }

  render() {
    if (!this.state.isReady) {
      return <Loading />
    } else {
      global.storage._initMap()
      return (
        <Provider store={store}>
          <Root>
            <Routes />
          </Root>
        </Provider>
      )
    }
  }
}
