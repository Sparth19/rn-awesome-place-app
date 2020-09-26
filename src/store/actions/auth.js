import ENV from '../../env';
import * as uiActions from './ui';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const TRY_AUTH = 'TRY_AUTH';
export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const LOGOUT = 'LOGOUT';
let timer;

export const tryAuth = (email, password, mode) => {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV.firbaseApiKey}`;
  if (mode === 'login') {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV.firbaseApiKey}`;
  }
  return async (dispatch) => {
    try {
      dispatch(uiActions.startLoading());
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        const resData = await response.json();
        console.log(resData.error.message);
        let msg = 'Something went wrong..';
        if (resData.error.message === 'EMAIL_EXISTS') {
          msg = 'Email Address already exists...';
        }
        Alert.alert('Error', msg, [{text: 'Ok'}]);
        dispatch(uiActions.stopLoading());
      }

      const resData = await response.json();
      // console.log(resData.idToken);
      dispatch(uiActions.stopLoading());

      //for autologin
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000,
      );

      saveDataToStorage(resData.idToken, resData.localId, expirationDate);

      dispatch(setLogoutTimer(parseInt(resData.expiresIn) * 1000));

      dispatch({type: TRY_AUTH, token: resData.idToken});
    } catch (e) {
      console.log(e);
      dispatch(uiActions.stopLoading());
    }
  };
};

export const restoreToken = (token) => {
  return {type: RESTORE_TOKEN, token: token};
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};
