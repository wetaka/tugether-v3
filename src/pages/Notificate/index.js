import React from 'react';
import idx from 'idx';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import kaimook from '../../Images/mook.jpg'
import wi from '../../Images/wi.jpg'
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import calendar from '../../Images/calendar.png';
import imgposter1 from '../../Images/poster1.jpg';
import imgposter2 from '../../Images/poster2.jpg';
import location from '../../Images/location.png';
import Footer from "../../components/Footer";
import { Icon } from 'react-native-elements';
import HeaderText from "../../components/HeaderText";


const { width, height } = Dimensions.get('window');


const users = [
    {
        id: '1',
        img: imgposter1,
        date: 'NOV 16',
        // place: 'Gym 5',
        types: 'EVENT_UPCOMING',
        userid: '5709650278',
        text: 'TU Freshynight',
        active: true
    },

    {
        id: '2',
        img: imgposter1,
        date: 'NOV 16',
        types: 'NEW_CATEGORY',
        userid: '5709650278',
        text: 'Computer',
        active: true
    },

    {
        id: '3',
        img: imgposter2,
        date: 'AUG 1',
        types: 'COMMENT_IN_EVENT',
        userid: '5709650278',
        text: 'Have new comment',
        active: true
    },

    {
        id: '4',
        img: imgposter1,
        date: 'NOV 16',
        // place: 'Gym 5',
        types: 'EVENT_EDIT',
        userid: '5709650278',
        text: 'Freshynight',
        active: true
    },
    {
        id: '5',
        img: imgposter1,
        date: 'NOV 16',
        // place: 'Gym 5',
        types: 'NEW_EVENT_IN_CATEGORY',
        userid: '5709650278',
        text: 'TU',
        active: true
    },


]

class Notificate extends React.Component {

    render() {
        const userid = this.props.navigation.getParam('userid', '');
        let icontype = '';
        let iconname = '';
        let iconcolor = '';
        return (
            <View style={{ flex: 1 }}>
            
                <HeaderText
                    header={"Notification"}
                />

                <View style={{ flexDirection: 'column', height: 55, width: '100%' }}>

                    <Image source={Buttonbar}
                        style={{ position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' }}
                    />

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>

                        </View>
                    </View>
                </View>
                <ScrollView style={{ flexDirection: 'column', backgroundColor: '#FFF8DC', flex: 1 }}>
                    <View style={{ padding: 20 }}>

                        {

                            users.map((user) => {
                                if(user.types === 'NEW_CATEGORY'){
                                    icontype = 'material-community'
                                    iconname = 'format-list-bulleted-type'
                                    iconcolor = '#f50'
                                }
                                else if(user.types === 'EVENT_UPCOMING' ){
                                    icontype = 'material-icons'
                                    iconname = 'event'
                                    iconcolor = '#00FF7F'
                                }
                                else if(user.types === 'COMMENT_IN_EVENT' ){
                                    icontype = 'material-community'
                                    iconname = 'comment-processing-outline'
                                    iconcolor = '#191970'
                                }
                                else if(user.types === 'EVENT_EDIT' ){
                                    icontype = 'font-awesome'
                                    iconname = 'edit'
                                    iconcolor = '#FF0000'
                                }
                                else if(user.types === 'NEW_EVENT_IN_CATEGORY' ){
                                    icontype = 'entypo'
                                    iconname = 'new'
                                    iconcolor = '#FFD700'
                                }
                                
                                
                                return (
                                    <View style={{ paddingBottom: 5 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFF0' }}>

                                            <View>
                                                <Image source={user.img} style={{ alignSelf: 'flex-start', width: 120, height: 120, borderRadius :100 }} />
                                                
                                                <Icon
                                                    raised
                                                    reverse
                                                    name={iconname}
                                                    type={icontype}
                                                    color={iconcolor}
                                                    size={17}
                                                    containerStyle={{ position: 'absolute' , left:70 ,top:70, zIndex: 20}} />
                                            </View>

                                            <View style={{ paddingLeft: 15 }}>
                                                <Text style={{ fontSize: 15 }}>{user.text}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={calendar} style={{ alignSelf: 'flex-start', width: 15, height: 20 }} />
                                                    <Text style={{ fontSize: 15 }}>  {user.date} </Text>
                                                </View>
                                                {/* <View style={{ flexDirection: 'row', paddingLeft: 15 }}>
                                                    <Image source={location} style={{ alignSelf: 'flex-start', width: 15, height: 20 }} />
                                                    <Text style={{ fontSize: 15 }}>{user.place}</Text>
                                                </View> */}
                                            </View>
                                        </View>
                                        {/* <Text style={{ fontSize: 5 }}>            </Text> */}
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

                    <View>
                        <Footer
                             navigator={this.props.navigator}
                            pm={userid}
                            
                            // navigate={this.props.navigation.navigate}
                            // pm={(this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.userid) ? this.props.navigation.state.params.userid : null}
                        // const { eventid } = this.props.navigation.state.params;
                        />
                    </View>
                </View>
            </View >


        )
    }

}
export default Notificate;