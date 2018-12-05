import React from 'react';
import PropTypes from 'prop-types';
import MyIcons from './MyIcons'


const TabBarItem = ({focused, tintColor, iconName}) => (
  focused ? (
    <MyIcons name={iconName} style={{color: tintColor, fontSize: 22, marginTop: -4}} />
  ) : (
    <MyIcons name={iconName} style={{color: tintColor, fontSize: 22, marginTop: -4}} />
  )
)

TabBarItem.propTypes = {
  focused: PropTypes.bool.isRequired,
  tintColor: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired
}

export default TabBarItem
