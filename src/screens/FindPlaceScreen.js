import React, {useState, useCallback, useEffect} from 'react';
import {View, ActivityIndicator, Platform} from 'react-native';
import PlaceList from '../components/PlaceList';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import * as placeActions from '../store/actions/places';
import * as uiActions from '../store/actions/ui';
import {useNavigation} from '@react-navigation/native';

const FindPlaceScreen = (props) => {
  const placesData = useSelector((state) => state.places.places);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  const loadPlaces = useCallback(async () => {
    try {
      dispatch(uiActions.startLoading());
      await dispatch(placeActions.fetchPlaces());
    } catch (err) {
      console.log(err);
    }
    dispatch(uiActions.stopLoading());
  }, [dispatch]);

  useEffect(() => {
    props.navigation.addListener('focus', loadPlaces);
    return () => {
      props.navigation.removeListener('focus', loadPlaces);
      // willFocusSub.remove()
    };
  }, [loadPlaces]);

  useEffect(() => {
    loadPlaces().then(() => {});
  }, [dispatch, loadPlaces]);

  //const navigation = useNavigation();

  const {navigation} = props;
  useEffect(() => {
    props.navigation.setOptions({
      title: 'Find Place',
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

  itemSelectedHandler = (key) => {
    const selPlace = placesData.find((place) => {
      return place.key === key;
    });
    props.navigation.navigate('PlaceDetail', {selectedPlace: selPlace});
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="orange"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <PlaceList value={placesData} onSelect={itemSelectedHandler} />
      )}
    </View>
  );
};

export default FindPlaceScreen;
