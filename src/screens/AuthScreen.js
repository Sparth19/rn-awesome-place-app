import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import DefaultInput from '../components/UI/AuthInput';
import HeadingText from '../components/UI/HeadingText';
import MainText from '../components/UI/MainText';
import ButtonWithBackground from '../components/UI/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg';
import * as authActions from '../store/actions/auth';

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [passwordInput, setPasswordInput] = useState();
  const [confirmPasswordInput, setConfirmPasswordInput] = useState();
  const [formMode, setFormMode] = useState('login');

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);

  //responsive viewMode
  const [viewMode, setViewMode] = useState(
    Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
  );

  const updateStyles = (dims) => {
    setViewMode(dims.window.height > 500 ? 'portrait' : 'landscape');
  };

  useEffect(() => {
    Dimensions.addEventListener('change', updateStyles);

    return () => {
      Dimensions.removeEventListener('change', updateStyles);
    };
  });

  //form Validation Reducer
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      // confirmPassword: '',
    },
    inputValidities: {
      email: false,
      password: false,
      //confirmPassword: true,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (identifier, inputValue, inputValidity) => {
      if (identifier === 'password') {
        // console.log(inputValue);
        setPasswordInput(inputValue);
      }
      if (identifier === 'confirmPassword') {
        setConfirmPasswordInput(inputValue);
      }
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: identifier,
      });
    },
    [dispatchFormState],
  );

  const loginHandler = useCallback(() => {
    // console.log('InLoginHandler');
    // console.log(formState.formIsValid);

    if (!formState.formIsValid) {
      Alert.alert('Invalid Input', 'Please enter valid input', [
        {text: 'Okay'},
      ]);
      return;
    }
    //form state valid
    //console.log('Form mode in Auth Screen :' + formMode);
    dispatch(
      authActions.tryAuth(
        formState.inputValues.email,
        formState.inputValues.password,
        formMode,
      ),
    );
  }, [formState, formMode]);

  let headingText = null;

  if (viewMode === 'portrait') {
    headingText = (
      <MainText>
        <HeadingText>Please Log In</HeadingText>
      </MainText>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        {headingText}
        <ButtonWithBackground
          color="#29aaf4"
          onPress={() => {
            setFormMode(formMode === 'login' ? 'signin' : 'login');
          }}
          mode={formMode}>
          Switch to {formMode === 'login' ? 'Sign In' : 'Login'}
        </ButtonWithBackground>
        <View style={styles.inputContainer}>
          <DefaultInput
            id="email"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            style={styles.input}
            placeholder="Email"
          />
          <View
            style={
              viewMode === 'portrait'
                ? styles.portraitPasswordContainer
                : styles.landscapePasswordContainer
            }>
            <View
              style={
                viewMode === 'portrait' || formMode === 'login'
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
              }>
              <DefaultInput
                placeholder="Password"
                id="password"
                keyboardType="default"
                required
                minLength={6}
                autoCapitalize="none"
                errorMessage="Please enter a valid Password."
                onInputChange={inputChangeHandler}
                style={styles.input}
              />
            </View>
            {/* <View
              style={
                viewMode === 'portrait'
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
              }>
              {formMode === 'signin' ? (
                <DefaultInput
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  keyboardType="default"
                  required
                  minLength={6}
                  confirmPassword
                  passwordCheck={passwordInput}
                  confirmPasswordCheck={confirmPasswordInput}
                  autoCapitalize="none"
                  errorMessage="password does not match"
                  onInputChange={inputChangeHandler}
                  style={styles.input}
                />
              ) : (
                <View></View>
              )}
            </View> */}
          </View>
        </View>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <ButtonWithBackground color="#29aaf4" onPress={loginHandler}>
            Submit
          </ButtonWithBackground>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    flex: 1,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb',
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  landscapePasswordWrapper: {
    width: '45%',
  },
  portraitPasswordWrapper: {
    width: '100%',
  },
});

export default AuthScreen;

// import {HeaderTitle} from '@react-navigation/stack';
// import React from 'react';
// import {View, Text, Button} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const AuthScreen = (props) => {
//   const loginButtonHandler = () => {
//     props.navigation.replace('TabNavigator');
//   };
//   //props.navigation.setOptions({title: 'Auth Screen123'});
//   return (
//     <View>
//       <Text>AuthScreen</Text>
//       <Icon name="rocket" size={30} color="#900" />
//       <Button title="Login" onPress={loginButtonHandler} />
//     </View>
//   );
// };

// export default AuthScreen;
