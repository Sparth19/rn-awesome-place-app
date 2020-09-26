import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  Platform,
} from 'react-native';

const buttonWithBackground = (props) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android') {
    TextComponent = TouchableNativeFeedback;
  }

  return (
    <TouchableComponent onPress={props.onPress}>
      <View style={[styles.button, {backgroundColor: props.color}]}>
        <Text>{props.children}</Text>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default buttonWithBackground;
