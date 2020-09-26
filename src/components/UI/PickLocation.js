import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Dimensions} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ENV from '../../env';
MapboxGL.setAccessToken(ENV.mapboxApiKey);

const PickLocation = (props) => {
  const [coordinates, setCoordinates] = useState([72.8311, 21.1702]);
  const [currentLocation, setCurrentLocation] = useState();

  const locationPickedHandler = (e) => {
    //console.log(e.geometry.coordinates);
    setCoordinates(e.geometry.coordinates);
    const coordinate = {
      latitude: e.geometry.coordinates[1],
      longitude: e.geometry.coordinates[0],
    };
    props.onLocationPick(coordinate);
  };

  const currentLocationHandler = (e) => {
    if (e) {
      const coordinate = {
        latitude: e.coords.latitude,
        longitude: e.coords.longitude,
      };
      setCurrentLocation(coordinate);
      //console.log(coordinate);
    }
  };

  const reset = () => {
    setCoordinates([72.8311, 21.1702]);
    setCurrentLocation();
  };

  const locateMeHandler = () => {
    setCoordinates([currentLocation.longitude, currentLocation.latitude]);
    props.onLocationPick(currentLocation);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} onPress={locationPickedHandler}>
            <MapboxGL.Camera zoomLevel={9} centerCoordinate={coordinates} />
            <MapboxGL.PointAnnotation coordinate={coordinates} id="Test" />
            <MapboxGL.UserLocation
              visible={true}
              showsUserHeadingIndicator={true}
              onUpdate={currentLocationHandler}
            />
          </MapboxGL.MapView>
        </View>
      </View>
      <View style={styles.button}>
        <Button title="Locate Me" onPress={locateMeHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: 350,
    alignItems: 'center',
  },

  button: {
    margin: 8,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 300,
    width: 350,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default PickLocation;

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   container: {
//     height: 300,
//     width: 300,
//     backgroundColor: 'tomato',
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default class App extends Component {
//   // componentDidMount() {
//   //   MapboxGL.setTelemetryEnabled(false);
//   // }

//   render() {
//     return (
//       <View style={styles.page}>
//         <View style={styles.container}>
//           <MapboxGL.MapView style={styles.map} />
//         </View>
//       </View>
//     );
//   }
// }
