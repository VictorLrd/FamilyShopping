import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import FamilyScreen from '../screens/FamilyScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AddArticleScreen from '../screens/AddArticleScreen';
import ScannerScreen from '../screens/ScannerScreen';
import QrCodeScreen from '../screens/QrCodeScreen';

const HomeNavigator = createStackNavigator( {
  Family: { screen: FamilyScreen },
  SignUp: { screen: SignUpScreen },
  Scanner: { screen: ScannerScreen },
  QRCode: { screen: QrCodeScreen },
  Article: { screen: AddArticleScreen },
  Home: { screen: HomeScreen },
},
  {
    initialRouteName: 'SignUp',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'green'
      },
      headerTintColor: 'yellow',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  },
);

const MainTabNavigator = createMaterialBottomTabNavigator( {
  // Scanner: {
  //   screen: HomeScreen,
  //   navigationOptions: {
  //     tabBarLabel: 'Scanner',
  //     tabBarIcon: ( { tintColor } ) => (
  //       <Icon color={ tintColor } size={ 25 } name={ 'ios-qr-scanner' } />
  //     ),
  //     barStyle: { backgroundColor: '#003f5c' }
  //   }
  // },
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ( { tintColor } ) => (
        <Icon color={ tintColor } size={ 25 } name={ 'ios-home' } />
      ),
      barStyle: { backgroundColor: '#003f5c' }
    }
  },
  // QRCode: {
  //   screen: QrCodeScreen,
  //   navigationOptions: {
  //     tabBarLabel: 'QRCode',
  //     tabBarIcon: ( { tintColor } ) => (
  //       <Icon color={ tintColor } size={ 25 } name={ 'ios-settings' } />
  //     ),
  //     barStyle: { backgroundColor: '#003f5c' }
  //   }
  // },
  // SignUp: {
  //   screen: SignUpScreen,
  //   navigationOptions: {
  //     tabBarLabel: 'Inscription',
  //     tabBarIcon: ( { tintColor } ) => (
  //       <Icon color={ tintColor } size={ 25 } name={ 'ios-settings' } />
  //     ),
  //     barStyle: { backgroundColor: '#003f5c' }
  //   }
  // },
  // Family: {
  //   screen: FamilyScreen,
  //   navigationOptions: {
  //     tabBarLabel: 'Famille',
  //     tabBarIcon: ( { tintColor } ) => (
  //       <Icon color={ tintColor } size={ 25 } name={ 'ios-settings' } />
  //     ),
  //     barStyle: { backgroundColor: '#003f5c' }
  //   }
  // }
},
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer( MainTabNavigator );