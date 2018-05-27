import { createStackNavigator } from 'react-navigation';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './pages/Login'
import Category from './pages/Category'
import Description from './pages/Description'
import Joined from './pages/Joined'
import CreateEvent from './pages/CreateEvent'
import Home from './pages/Home'
import Main from './pages/Main'
// import MasonryPage from './pages/MasonryPage'
// import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import UserSetting from './pages/UserSetting';
import Notificate from './pages/Notificate';
import UpdateEvent from './pages/UpdateEvent';



// import Splash from './screens/splash'
// import Screen1 from './screens/screen1'
// import Screen2 from './screens/screen2'
// import Screen3 from './screens/screen3'
// import modalScreen from './screens/modalScreen'

// export default () => {
//   Navigation.registerComponent('Splash', () => Splash);
//   Navigation.registerComponent('Screen1', () => Screen1);
//   Navigation.registerComponent('Screen2', () => Screen2);
//   Navigation.registerComponent('Screen3', () => Screen3);
//   Navigation.registerComponent('modalScreen', () => modalScreen);

//   Navigation.startSingleScreenApp({
//     screen:{
//       screen: 'Splash',
//       navigatorStyle: {},
//       navigatorButtons: {}
//     }
//   })
// }


// export default () => {

//   // Navigation.registerComponent('MasonryPage', () => MasonryPage);
  
//   Navigation.registerComponent('Home', () => Home);

//   Navigation.registerComponent('UserSetting', () => UserSetting);
//   Navigation.registerComponent('Main', () => Main);
//   Navigation.registerComponent('UpdateEvent', () => UpdateEvent);
//   Navigation.registerComponent('CreateEvent', () => CreateEvent);
//   Navigation.registerComponent('Notificate', () => Notificate);
//   Navigation.registerComponent('Description', () => Description);
//   Navigation.registerComponent('Login', () => Login);
//   Navigation.registerComponent('Category', () => Category);
//   Navigation.registerComponent('Joined', () => Joined);
//   // Navigation.registerComponent('Splash', () => Splash);
//   // Navigation.registerComponent('Splash', () => Splash);

//   Navigation.startSingleScreenApp({
//     screen: {
//       screen: 'Home',
//       navigatorStyle: {},
//       navigatorButtons: {}
//     }
//   })
// }

const RootNavigator = createStackNavigator({
  UserSetting: { screen: UserSetting },
  Main: { screen: Main },
  UpdateEvent: { screen: UpdateEvent },
  CreateEvent: { screen: CreateEvent },
  Home: { screen: Home },
  Notificate: { screen: Notificate },
  Description: { screen: Description },
  Login: { screen: Login },
  Category: { screen: Category },
  Joined: { screen: Joined },
  // MasonryPage: { screen: MasonryPage },
}, {
  initialRouteName: 'Home',
  headerMode: 'Screen'
})

export default RootNavigator;

// export default () => (
//   <Navigator />
// );