import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      IconComponent={Icon}
      color={Platform.OS === 'android' ? 'white' : 'orange'}
      iconSize={30}
      {...props}
    />
  );
};

export default CustomHeaderButton;
