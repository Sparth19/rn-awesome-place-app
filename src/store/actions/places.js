import Place from '../../models/Place';
export const ADD_PLACE = 'ADD_PLACE';
export const DELETE_PLACE = 'DELETE_PLACE';
export const SET_PLACE = 'SET_PLACE';
export const PLACE_ADDED = 'PLACE_ADDED';
// export const SELECT_PLACE = 'SELECT_PLACE';
// export const DESELECT_PLACE = 'DESELECT_PLACE';

export const placeAdded = (value) => {
  return {type: PLACE_ADDED, value: value};
};

export const fetchPlaces = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      'https://rn-place-app-without-expo.firebaseio.com/places.json?auth=' +
        token,
    );

    if (!response.ok) {
      const resData = await response.json();
      console.log(resData);
    }

    const resData = await response.json();

    //  console.log(resData);
    const loadedPlaces = [];
    for (const key in resData) {
      loadedPlaces.push(
        new Place(
          key,
          resData[key].place,
          resData[key].image,
          resData[key].location.latitude,
          resData[key].location.longitude,
        ),
      );
    }
    dispatch({type: SET_PLACE, places: loadedPlaces});
  };
};

export const addPlace = (place, image, location) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      'https://rn-place-app-without-expo.firebaseio.com/places.json?auth=' +
        token,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          place: place,
          image:
            'https://www.kannadigaworld.com/wp-content/uploads/2014/11/some-peoplefff.jpg',
          location: location,
        }),
      },
    );

    if (!response.ok) {
      const resData = await response.json();

      console.log(resData);
    }

    const resData = await response.json();

    // console.log(resData);
    //no need to add place in redux bcz it will fetch from firebase
    //dispatch({type: ADD_PLACE, place: place, image: image, location: location});
  };
};

export const deletePlace = (key) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      'https://rn-place-app-without-expo.firebaseio.com/places/' +
        key +
        '.json' +
        '?auth=' +
        token,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      const resData = await response.json();
      console.log(resData);
    }
    const resData = await response.json();
  };
};
