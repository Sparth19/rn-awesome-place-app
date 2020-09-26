import React from 'react';
import {Platform, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';

import AuthScreen from '../screens/AuthScreen';
import FindPlaceScreen from '../screens/FindPlaceScreen';
import SharePlaceScreen from '../screens/SharePlaceScreen';
import PlaceDetail from '../screens/PlaceDetail';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultHeaderConfig = {
  headerTintColor: Platform.OS === 'android' ? 'white' : 'orange',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? 'orange' : 'white',
  },
};
const AuthNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderConfig}>
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{title: 'Login'}}
      />
    </Stack.Navigator>
  );
};

const FindPlaceNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderConfig}>
      <Stack.Screen name="FindPlaceScreen" component={FindPlaceScreen} />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetail}
        options={{title: 'Place Detail'}}
      />
    </Stack.Navigator>
  );
};

const SharePlaceNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderConfig}>
      <Stack.Screen name="SharePlaceScreen" component={SharePlaceScreen} />
    </Stack.Navigator>
  );
};

const tabScreenConfig = ({route}) => ({
  tabBarIcon: ({focused, size, color}) => {
    //   console.log(color);
    let iconName;
    if (route.name === 'FindPlaceScreen') {
      iconName = Platform.OS === 'android' ? 'md-map' : 'ios-map';
    } else if (route.name === 'SharePlaceScreen') {
      iconName = Platform.OS === 'android' ? 'md-share' : 'ios-share';
    }
    return <Icon name={iconName} size={28} color={color} />;
  },
});

const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={tabScreenConfig}
      tabBarOptions={{
        activeTintColor: 'orange',
        labelStyle: {fontSize: 15, fontWeight: 'bold'},
      }}
      //for android device
      activeColor="white"
      shifting={true}>
      <Tab.Screen name="FindPlaceScreen" component={FindPlaceNavigator} />
      <Tab.Screen name="SharePlaceScreen" component={SharePlaceNavigator} />
    </Tab.Navigator>
  );
};

const DrawerNavigator = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    console.log('LOGOUT');
    dispatch(authActions.logout());
    //  dispatch(authActions.restoreToken(null));
  };
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: 'blue',
        labelStyle: {fontSize: 16},
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="LOGOUT"
              style={{flex: 1, alignItems: 'center'}}
              onPress={logoutHandler}
              icon={({color}) => (
                <Icon color="red" size={30} name={'ios-close-outline'} />
              )}
            />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({color}) => (
            <Icon
              name={
                Platform.OS === 'android'
                  ? 'md-home-outline'
                  : 'ios-home-outline'
              }
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = (props) => {
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return (
      <NavigationContainer>
        <StartupScreen />
      </NavigationContainer>
    );
  }

  if (token == null) {
    return (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    );
  }
};
export default AppNavigator;
