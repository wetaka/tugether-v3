import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import kaimook from '../../Images/mook.jpg'
import wi from '../../Images/wi.jpg'
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
const { width, height } = Dimensions.get('window');
import {Navigation, SharedElementTransition} from 'react-native-navigation';


const users = [
    {
        Topic: 'Edit Profile',  
    },
    {
      Topic: 'Edit Setting',  
    },
    {
      Topic: 'Log out',  
    },
]

class LogOut extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>

            <View style={{ flexDirection: 'column', height: 55, width: '100%' }}>

                <Image source={Buttonbar}
                    style={{ position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' }}
                />

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
                        
                    </View>
                </View>
            </View>
            <ScrollView style={{ flexDirection: 'column', backgroundColor: "white", flex: 1 }}>
                <View style={{ padding: 50 }}>

                    {
                        users.map((user) => {
                            return (
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={user.img} style={{ alignSelf: 'flex-start', width: 50, height: 50 }} />
                                        <View>
                                            <Text style={{ fontSize: 20,height:60,fontWeight:'bold'}}>{user.Topic}</Text>                                   
                                        </View>
                                    </View>
                                    {/* <Text style={{ fontSize: 25 }}>____________________________</Text> */}
                                </View>
                            );
                        })
                    }
                </View>
            </ScrollView>

            <View style={{ flexDirection: 'column', height: 55 }}>

                <Image source={Buttonbar}
                    style={{ position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' }}
                />

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
                        <Image source={HomeIcon} style={{ width: '20%', height: '50%' }} />
                        {/* <Text style={{ fontSize: 20 }}>  Home </Text> */}
                    </View>

                    <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
                        <Image source={NotiIcon} style={{ width: '20%', height: '50%' }} />
                        {/* <Text style={{ fontSize: 20 }}>  Notification </Text> */}
                    </View>

                    <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
                        <Image source={ProfileIcon} style={{ width: '20%', height: '50%' }} />
                        {/* <Text style={{ fontSize: 20 }}>  Profile </Text> */}
                    </View>
                </View>
            </View>
</View >
            

        )
    }

}
export default LogOut;