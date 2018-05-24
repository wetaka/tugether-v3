import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, FlatList, AsyncStorage } from 'react-native';
// import imgposter1 from '../../Images/poster1.jpg'
// import imgposter2 from '../../Images/poster2.jpg'
// import location from '../../Images/location.png'
// import line from '../../Images/line.png'
import Buttonbar from '../../Images/bar.jpg';
// import HomeIcon from '../../Images/homeicon.png';
// import NotiIcon from '../../Images/notiicon.png';
// import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import { Actions } from "react-native-router-flux";
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

export default class HeaderText extends Component {
    render() {
        return (

            <View style={{ height: 55, width: '100%', backgroundColor: 'red', flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 10 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 30, }}>
                        {this.props.header}
                    </Text>
                </View>
                <View style={{ width: 40 }}>
                </View>

            </View>
        );
    }
}



