import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import PlaceItem from './PlaceItem';
const PlaceList = (props) => {
  return (
    // <View style={styles.main}>
    //   {props.value.map((place, i) => (
    //     <PlaceItem
    //       key={i}
    //       value={place}
    //       remove={() => {
    //         props.onRemove(i);
    //       }}
    //     />
    //   ))}
    // </View>
    <FlatList
      style={styles.main}
      data={props.value}
      keyExtractor={(i) => i.key}
      renderItem={(itemData) => (
        <PlaceItem
          value={itemData.item}
          onSelect={() => props.onSelect(itemData.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    margin: 15,
  },
});

export default PlaceList;
