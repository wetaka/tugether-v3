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

export default class HeaderBack extends Component {
    render() {
        console.log("Prop jaaaa ",this.props)

        return (

            <View style={{ height: 55, width: '100%', backgroundColor: 'rgb(225,101,74)', flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 10 }}>
                <TouchableOpacity

                    onPress={() => {
                        this.props.navigator.goBack()
                    }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Icon name='ios-arrow-back' type='ionicon' size={40} color='white'
                        />
                    </View>
                </TouchableOpacity>
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



