import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import * as placeActions from '../store/actions/places';
import Icon from 'react-native-vector-icons/Ionicons';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ENV from '../env';
MapboxGL.setAccessToken(ENV.mapboxApiKey);

const PlaceDetail = (props) => {
  const [viewMode, setViewMode] = useState(
    Dimensions.get('window').height > 450 ? 'portrait' : 'landscape',
  );
  const dispatch = useDispatch();

  const {selectedPlace} = props.route.params;
  //console.log(selectedPlace);
  const deleteHandler = () => {
    dispatch(placeActions.deletePlace(selectedPlace.key));
    props.navigation.pop();
  };

  const updateStyles = (dims) => {
    setViewMode(dims.window.height > 450 ? 'portrait' : 'landscape');
  };

  useEffect(() => {
    Dimensions.addEventListener('change', updateStyles);

    return () => {
      Dimensions.removeEventListener('change', updateStyles);
    };
  }, []);

  const {navigation} = props;
  useEffect(() => {
    navigation.setOptions({title: selectedPlace.name});
  }, [navigation]);
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={
          viewMode === 'portrait'
            ? styles.mainContainerPortrait
            : styles.mainContainerLandscape
        }>
        <Image
          style={
            viewMode === 'portrait'
              ? styles.imagePortrait
              : styles.imageLandscape
          }
          source={{uri: selectedPlace.image}}
        />
        <View
          style={
            viewMode === 'portrait'
              ? styles.subContainerPortrait
              : styles.subContainerLandscape
          }>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={10}
              centerCoordinate={[
                selectedPlace.longitude,
                selectedPlace.latitude,
                0.0122,
                (Dimensions.get('window').width /
                  Dimensions.get('window').height) *
                  0.0122,
              ]}
            />
            <MapboxGL.PointAnnotation
              coordinate={[selectedPlace.longitude, selectedPlace.latitude]}
              id="a"
            />
          </MapboxGL.MapView>
        </View>
        <View
          style={
            viewMode === 'portrait' ? styles.textPortrait : styles.textLandscape
          }>
          <Text style={{fontSize: 20}}>{selectedPlace.name}</Text>
        </View>

        <TouchableOpacity onPress={deleteHandler}>
          <View style={styles.buttonContainer}>
            <Icon
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={30}
              color="red"
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {margin: 10},
  mainContainerPortrait: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContainerLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imagePortrait: {
    marginTop: 20,
    width: '100%',
    height: 200,
  },
  imageLandscape: {
    marginTop: 20,
    width: '40%',
    height: 250,
  },
  container: {
    alignItems: 'center',
  },
  textPortrait: {
    margin: 20,
    alignItems: 'center',
    width: '80%',
  },
  textLandscape: {
    margin: 10,
    alignItems: 'center',

    width: '10%',
  },
  subContainerPortrait: {
    height: 250,
    width: '100%',
    backgroundColor: 'tomato',
  },
  subContainerLandscape: {
    height: 250,
    marginTop: 20,

    width: '40%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default PlaceDetail;
