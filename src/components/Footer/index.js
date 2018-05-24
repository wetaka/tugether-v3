import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, FlatList, AsyncStorage } from 'react-native';
import imgposter1 from '../../Images/poster1.jpg'
import imgposter2 from '../../Images/poster2.jpg'
import location from '../../Images/location.png'
import line from '../../Images/line.png'
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import { Actions } from "react-native-router-flux";
import React, { Component } from 'react';


export default class Footer extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}
          onPress={() => { 
            // Actions.Home({ userid: this.props.pm }) 
            
            // this.props.navigator.push('Home',{
            //   userid: this.props.pm
            // })
            this.props.navigate({
            // this.props.navigator.push({
              screen: 'Home',
              passProps: {
                userid: this.props.pm
              },
            });
          }}
        >
          <Image source={HomeIcon} style={{ width: '20%', height: '50%' }}
          />

          {/* <Text style={{ fontSize: 20 }}>  Home </Text> */}


        </TouchableOpacity>


        <TouchableOpacity
          style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}
          onPress={() => { 

            // Actions.Main({ userid: this.props.pm })
            // this.props.navigator.push('Notificate',{
            //   userid: this.props.pm
            // })

            // this.props.navigator.push({
            this.props.navigate({
              screen: 'Notificate',
              passProps: {
                userid: this.props.pm,
                navigator: this.props.navigator,
              },
            });

          }}
        >
          <Image source={NotiIcon} style={{ width: '20%', height: '50%' }} />
          {/* <Text style={{ fontSize: 20 }}>  Notification </Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}
          onPress={() => { 
            // Actions.Main({ userid: this.props.pm })

            // this.props.navigator.push('Main',{
            //   userid: this.props.pm
            // })

            // this.props.navigator.push({
              this.props.navigate({
              screen: 'Main',
              passProps: {
                userid: this.props.pm,
                navigator: this.props.navigator,
              },
            });
          }}
        >
          <Image source={ProfileIcon} style={{ width: '20%', height: '50%' }} />
          {/* <Text style={{ fontSize: 20 }}>  Profile </Text> */}
        </TouchableOpacity>
      </View>
    );
  }
}


