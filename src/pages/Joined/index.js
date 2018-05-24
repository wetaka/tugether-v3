import React from 'react';
import idx from 'idx';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import kaimook from '../../Images/mook.jpg'
import wi from '../../Images/wi.jpg'
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import { API_URL } from "../../config/api";
import Footer from "../../components/Footer";
// import SearchHeader from "../../components/SearchHeader";
import HeaderBack from "../../components/HeaderBack";



const { width, height } = Dimensions.get('window');

// const users = [
//     {
//         id: '5709650179',
//         fullname: 'พัชต์วรินทรา วงศ์ฉัตรทอง',
//         img: kaimook,
//     },
//     {
//         id: '5709650278',
//         fullname: 'เวธกา วศกรขจรยศ',
//         img: wi,
//     },
// ]

class Joined extends React.Component {

    state = {
        users: []
    };

    getEvent() {
        // alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
        fetch(API_URL + 'get-join/2')
            .then((response) => response.json())
            .then((data) => {
                console.log('get userid', data)
                this.setState({
                    users: data
                });
                //console.log(this.props.eventid)
            })
            .catch((error) => {
                console.error(error);
                alert("Fail");
            });
    }

    componentWillMount() {
        this.getEvent();
    }

    render() {
        const userid = this.props.navigation.getParam('userid', '');
        
        alert(this.state.users.length)
        
        return (
            <View style={{ flex: 1 }}>
                <HeaderBack
                    header={"Joined List"}
                    navigator={this.props.navigator}
                />

                <View style={styles.searchView}>
                    <SearchHeader />
                </View>



                <ScrollView style={styles.scrollStyle}>
                    <View style={{ padding: 20 }}>
                        {
                            this.state.users.map((user) => {
                                return (
                                    <View>
                                        <View style={styles.viewStyle}>
                                            <Image source={kaimook} style={styles.userStyle} />
                                            <View>
                                                <Text style={{ fontSize: 15 }}>{user.userid}</Text>
                                                <Text style={{ fontSize: 15 }}>{user.firstname}  {user.lastname}</Text>
                                            </View>
                                        </View>
                                        <Text style={{ fontSize: 25 }}>____________________________</Text>
                                    </View>
                                );
                            })
                        }
                    </View>
                </ScrollView>

                <View style={styles.buttonView}>

                    <Image source={Buttonbar}
                        style={styles.buttonBar}
                    />

                    <View>
                        <Footer

                            navigator={this.props.navigator}
                            pm={userid}

                        // navigate ={this.props.navigation.navigate}
                        // pm={(this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.userid) ? this.props.navigation.state.params.userid : null}
                        />
                    </View>
                </View>
            </View >


        )
    }

}

const styles = StyleSheet.create({
    buttonBar: { position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' },
    // posterImg: { alignSelf: 'flex-start', width: '100%', height: 300 },
    // topicStyle: {fontSize: 20, alignSelf: 'center'},
    // desStyle:{flexDirection: 'row', alignItems: 'center' },
    // stdStyle:{flex: 1, justifyContent: 'center', alignItems: 'center'},
    // imgLine:{flex: 1, flexDirection: 'row', alignItems: 'center' },
    // imgLocation:{alignSelf: 'center', width: 30, height: 30 },
    // posterStyle:{borderWidth: 2, borderColor: 'gray', width: '50%' },
    searchView: { flexDirection: 'column', height: 55, width: '100%' },
    buttonView: { flexDirection: 'column', height: 55 },
    scrollStyle: { flexDirection: 'column', backgroundColor: "white", flex: 1 },
    viewStyle: { flexDirection: 'row', alignItems: 'center' },
    userStyle: { alignSelf: 'flex-start', width: 50, height: 50 },



})

export default Joined;
