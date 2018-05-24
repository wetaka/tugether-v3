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

export default class SearchHeader extends Component {
    render() {
        return (

            <View style={{ flexDirection: 'column', height: 55, width: '100%' }}>

                <Image source={Buttonbar}
                    style={{ position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' }}
                />

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
                        <TextInput style={{ fontSize: 20, flex: 1 }} placeholder="Search" />
                        <TouchableOpacity
                            style={{ width: '20%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}
                        >
                            <Image source={FindIcon} style={{ width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }} />
                        </TouchableOpacity>

                        {
                            (this.props.isMainPage)
                                ? (
                                    <TouchableOpacity
                                        style={{ width: '20%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}
                                        onPress={() => {
                                            // Actions.CreateEvent();
                                            this.props.navigate('CreateEvent')
                                        }}

                                    >
                                        <Image source={FindIcon} style={{ width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }} />
                                    </TouchableOpacity>
                                )
                                : null
                        }

                        {
                            (this.props.isMainPage)
                                ? (
                                    <TouchableOpacity
                                        style={{ width: '20%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}
                                        onPress={() => {
                                            this.props.navigate('UserSetting')

                                        }}

                                    >
                                        <Image source={FindIcon} style={{ width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }} />
                                    </TouchableOpacity>
                                )
                                : null
                        }

                    </View>
                </View>
            </View>
        );
    }
}

SearchHeader.defaultProps = {
    isMainPage: false,
};


