import {Dimensions} from 'react-native';

let window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

let storeKeys = {
  SEARCH_HISTORY_KEY: 'SEARCH_HISTORY_KEY',
};

export default {
  window: window,
  storeKeys: storeKeys
};
