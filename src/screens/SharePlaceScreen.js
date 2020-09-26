import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import * as uiActions from '../store/actions/ui';
import * as placeActions from '../store/actions/places';
import HeaderButton from '../components/UI/HeaderButton';
import HeadingText from '../components/UI/HeadingText';
import MainText from '../components/UI/MainText';
import PickImage from '../components/UI/PickImage';
import PickLocation from '../components/UI/PickLocation';
import {TextInput} from 'react-native-gesture-handler';
import {useEffect} from 'react';

const SharePlaceScreen = (props) => {
  const [placeName, setPlaceName] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const isLoading = useSelector((state) => state.ui.isLoading);

  const dispatch = useDispatch();

  const {navigation} = props;
  useEffect(() => {
    props.navigation.setOptions({
      title: 'Share Place',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const placeAddedHandler = async () => {
    dispatch(uiActions.startLoading());
    try {
      if (placeName.trim() == '' || !image || !location) {
        console.log('error');
        Alert.alert('Error', 'Please enter valid data...', [{text: 'okay'}]);
        dispatch(uiActions.stopLoading());
        return;
      }
      await dispatch(placeActions.addPlace(placeName, image.uri, location));
      dispatch(uiActions.stopLoading());
      setPlaceName('');
      props.navigation.navigate('FindPlaceScreen');
    } catch (e) {
      console.log(e);
    }
  };

  const placeNameChangedHandler = (text) => {
    setPlaceName(text);
  };

  const imagePickedHandler = (image) => {
    setImage(image);
  };

  const locationPickHandler = (location) => {
    //console.log(location);
    setLocation(location);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <MainText>
          <HeadingText>Share a Place with us!</HeadingText>
        </MainText>
        <PickImage onImagePicked={imagePickedHandler} />
        <PickLocation onLocationPick={locationPickHandler} />
        <TextInput
          value={placeName}
          placeholder="Enter place name"
          onChangeText={placeNameChangedHandler}
          style={styles.input}
          underlineColorAndroid="transparent"
        />
        <View style={styles.button}>
          {isLoading ? (
            <ActivityIndicator color="orange" />
          ) : (
            <Button title="Share the Place!" onPress={placeAddedHandler} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150,
  },
  button: {
    margin: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 15,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 8,
  },
});
export default SharePlaceScreen;
