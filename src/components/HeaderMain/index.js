import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, FlatList, AsyncStorage } from 'react-native';
import Buttonbar from '../../Images/bar.jpg';
import FindIcon from '../../Images/findicon.png';
import { Actions } from "react-native-router-flux";
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

export default class HeaderMain extends Component {
    render() {
        return (

            <View style={{ height: 55, width: '100%', backgroundColor: 'red' }}>


                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>

                        <View style={{width:105}}>

                        </View>

                        <View style={{ flex: 1 , justifyContent: 'center',flexDirection:'row'}}>
                            <Icon name='plus-circle' type='feather' size={40} color='white'
                                />
                            <Text style={{ color: 'white', fontSize: 30}}>
                               Main
                            </Text>
                            
                        </View>
                        <TouchableOpacity
                            style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}
                            onPress={() => {
                                // Actions.CreateEvent();
                                // this.props.navigate('CreateEvent')

                                
                                this.props.navigator.push({
                                    screen: 'CreateEvent',
                                    passProps: {
                                        navigator: this.props.navigator,
                                      },
                                  });
                            }}

                        >
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <Icon name='plus-circle' type='feather' size={40} color='white'
                                />
                            </View>
                            {/* <Image source={FindIcon} style={{ width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }} /> */}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'flex-end', justifyContent: 'flex-end', paddingHorizontal: 10 }}
                            onPress={() => {
                                // Actions.CreateEvent();
                                // this.props.navigate('UserSetting')

                                this.props.navigator.push({
                                    screen: 'UserSetting',
                                    passProps: {
                                      
                                        navigator: this.props.navigator,
                                      },
                                  });
                            }}

                        >
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <Icon name='settings' type='simple-line-icons' size={45} color='white'
                                />
                            </View>
                            {/* <Image source={FindIcon} style={{ width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }} /> */}
                        </TouchableOpacity>



                    </View>
                </View>
            </View>
        );
    }
}



