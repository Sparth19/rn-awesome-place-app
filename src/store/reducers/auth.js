import {TRY_AUTH, RESTORE_TOKEN, LOGOUT} from '../actions/auth';

const initialState = {
  token: null,
  isAuth: false,
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRY_AUTH:
      let authValue = false;
      if (action.token != null) {
        authValue = true;
      }
      //  console.log('id token in reducer :' + action.token);
      // console.log('Auth in reducer :' + authValue);
      return {
        ...state,
        token: action.token,
        isAuth: authValue,
        isLoading: false,
      };
    case RESTORE_TOKEN:
      let auth = false;
      if (action.token != null) {
        auth = true;
      }
      return {
        ...state,
        token: action.token,
        isLoading: false,
        isAuth: auth,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
