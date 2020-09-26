import {
  ADD_PLACE,
  DELETE_PLACE,
  SET_PLACE,
  PLACE_ADDED,
} from '../actions/places';
import Place from '../../models/Place';

const initialState = {
  places: [],
  placeAdded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      if (action.place.trim().toString().length == 0) {
        return state;
      }
      //const imageUrl = require('../../../assets/image.jpg');

      //   const newPlace = state.places.concat({
      //     key: Math.random().toString(),
      //     name: action.place,
      //     image: require('../../../assets/image.jpg'),
      //   });
      console.log(action.image);
      const newPlace = new Place(
        Math.random().toString(),
        action.place,
        action.image,
        action.location.latitude,
        action.location.longitude,
      );
      return {
        ...state,
        places: state.places.concat(newPlace),
      };

    case DELETE_PLACE:
      const newplace = state.places.filter((place) => {
        return place.key !== action.key;
      });

      return {
        ...state,
        places: newplace,
      };

    case SET_PLACE:
      return {
        ...state,
        places: action.places,
      };
    case PLACE_ADDED:
      return {
        ...state,
        placeAdded: action.value,
      };
    default:
      return state;
  }
};
