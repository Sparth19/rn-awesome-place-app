import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

const PlaceItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: props.value.image}} />
        <Text style={styles.text}> {props.value.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    marginBottom: 5,
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 17,
  },
});

export default PlaceItem;
