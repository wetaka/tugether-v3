import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, FlatList, StyleSheet, AsyncStorage } from 'react-native';
import poster from '../../Images/poster1.jpg'
import facebook from '../../Images/facebook.png'
import CustomInput from '../../components/CustomInput';
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import Footer from "../../components/Footer";
const { width, height } = Dimensions.get('window');
import SearchHeader from "../../components/SearchHeader";
import imgposter1 from '../../Images/poster1.jpg'
import { API_URL } from "../../config/api";
import { Transition } from 'react-navigation-fluid-transitions';
import HeaderBack from "../../components/HeaderBack";

import { Icon } from 'react-native-elements';

const SHOW_DURATION = 240;
const HIDE_DURATION = 200;


class Description extends React.Component {

    static navigatorOptions = {
        header: {
            visible: false
        }
    };

    state = {
        event: {
            eventid: "",
            topic: "",
            createby: "",
            categoryid: [],
            location: "",
            approve: "",
            description: "",
            facebook: "",
            line: "",
            web: "",
            phone: "",
            hashtag: "",
            bcapprove: "",
            posterpic: "",
            createdate: "",
            updatedate: "",
            posterpic: "555555555",
            // startdate: "",
            // enddate: "",
            eventstdate: new Date(),
            eventenddate: "",
            active: true,
            limited: 0,
            join: []
        },
        user: {
            userid: "",
            firstname: "",
            lastname: ""
        },
        commentstr: "",
        comment: [],
        joinbtn: "Join"
    };

    getEvent() {
        return new Promise((resolve, reject) => {
            // alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
            // fetch(API_URL + 'event/' + this.props.navigation.state.params.eventid)
            console.log("Desc null jing mai ?", this.props.navigation.state.params.eventid)
            return fetch(API_URL + 'event/' + this.props.navigation.state.params.eventid)
                .then((response) => response.json())
                .then((data) => {
                    console.log('get eventid Description :', data)
                    this.setState({
                        event: {
                            eventid: data.eventid,
                            topic: "" + data.topic,
                            createby: "" + data.createby,
                            categoryid: [...data.categoryid],
                            location: "" + data.location,
                            approve: "" + data.approve,
                            description: "" + data.description,
                            facebook: "" + data.facebook,
                            line: "" + data.line,
                            web: "" + data.web,
                            phone: "" + data.phone,
                            hashtag: "" + data.hashtag,
                            bcapprove: "" + data.bcapprove,
                            // posterpic: { uri: data.posterpic },
                            posterpic: "555555555" + data.posterpic,
                            createdate: "" + data.createdate,
                            updatedate: "" + data.updatedate,
                            eventstdate: new Date(data.eventstdate),
                            eventenddate: "" + data.eventenddate,
                            active: data.active,
                            limited: data.limited,
                            join: [...data.join]
                        }

                    }, () => {
                        this.checkjoin()
                        resolve();
                    }
                    );
                    //console.log(this.props.eventid)
                })
                .catch((error) => {
                    console.error(error);
                    alert("Fail");
                    reject()
                });
        });
    }

    getCurrentUser() {
        return AsyncStorage.getItem('CURRENT_USER')
            .then(value => {
                value = JSON.parse(value);
                if (value) {
                    // We have data!!
                    console.log(value);
                    // this.getAllEventActive();
                    this.setState({
                        user: {
                            userid: value.userid,
                            firstname: value.firstname,
                            lastname: value.lastname
                        }
                    })
                    ////////////////////WIP////////////////
                    console.log("Test CurrentUser")
                    console.log(this.state.user.userid)
                }
                else {
                    // Actions.Login();
                    this.props.navigation.navigate('Login')
                    // this.props.navigator.push({
                    //     screen: 'Login'
                    // });

                }
            })
    }

    addjoin() {
        console.log("Add join")
        fetch(API_URL + 'event/' + this.props.navigation.state.params.eventid, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...this.state.event,
                join: [...this.state.event.join, this.state.user.userid]
            }
                // , () => {

                //     this.checkjoin()
                // }
            ),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Add join ======================', responseJson)
                console.log('Now who join ', this.state.event.join)

                this.setState({
                    event: {
                        ...this.state.event,
                        join: [...this.state.event.join, this.state.user.userid]
                    }
                }, () => {
                    this.checkjoin()
                }
                )
            })
            .catch((error) => {
                console.error(error);
            });
    }

    deljoin() {
        return new Promise((resolve, reject) => {
            console.log("Delete Join")
            this.getEvent()
                .then(() => {
                    // console.log("Delete Join")
                    // console.log("New Join", newjoin)
                    let newjoin = this.state.event.join.filter(uid => uid !== this.state.user.userid)
                    // console.log("New Join", newjoin)
                    console.log("New Join", newjoin)
                    console.log("Event before save", this.state.event)
                    fetch(API_URL + 'event/' + this.props.navigation.state.params.eventid, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...this.state.event,
                            join: newjoin
                        }
                            // , () => {
                            //     this.checkjoin()
                            // }
                        ),
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log('vinaja', responseJson)
                            this.setState({
                                event: {
                                    ...this.state.event,
                                    join: newjoin
                                }
                            }, () => {
                                this.checkjoin()
                            }
                            )

                        })
                        .catch((error) => {
                            console.error(error);
                        });

                })
            // .then(() => {
            //     fetch(API_URL + 'event/' + this.props.navigation.state.params.eventid, {
            //         method: 'PUT',
            //         headers: {
            //             Accept: 'application/json',
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             ...this.state.event,
            //             join: newjoin
            //         }, () => {
            //             this.checkjoin()
            //         }
            //         ),
            //     })
            //         .then((response) => response.json())
            //         .then((responseJson) => {
            //             console.log('vinaja', responseJson)

            //         })
            //         .catch((error) => {
            //             console.error(error);
            //         });
            // }
            // )
        })

    }



    addComment(commentstr) {
        fetch(API_URL + 'comment', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventid: 1,
                createby: this.state.user.userid,
                details: "" + this.state.commentstr

            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('vinaja', responseJson)

            })
            .catch((error) => {
                console.error(error);
            });
    }

    // if (this.isFromLoginPage()) {
    //     console.log("if jaaaaaaaaaaaaaaaaaaaaaa")
    //     this.getUserByID();
    //     const userid = this.props.navigation.getParam('userid', '');      

    //     console.log("fixbug ComponentWillMount if", userid)
    //   }
    //   else {
    //     console.log("else jaaaaaaaaaaaaaaaaaaaaaaaa")
    //     this.getCurrentUser();
    //     console.log("fixbug ComponentWillMount else")
    //   }

    componentWillMount() {
        if (this.props.navigation.state.params.eventid) {
            this.getCurrentUser();
            this.getEvent();
            this.getAllComment();
        }

    }

    componentWillReceiveProps(){
        if (this.props.navigation.state.params.eventid) {
            this.getCurrentUser();
            this.getEvent();
            this.getAllComment();
        }
    }

    getAllComment() {
        fetch(API_URL + 'comment-event/1')
            .then((response) => response.json())
            .then((data) => {
                console.log('get comment All', data)
                this.setState({
                    comment: data,
                });

                console.log(this.state.comment)
            })
            .catch((error) => {
                console.error(error);
                alert("Fail");
            });
    }

    setFormatDate(date, month, year) {
        date = "0" + date
        month = "0" + month
        return date.substring(date.length - 2, date.length) + "-" + month.substring(month.length - 2, month.length) + "-" + year
    }

    setFormatTime(hours, minutes) {
        hours = "0" + hours
        minutes = "0" + minutes
        return hours.substring(hours.length - 2, hours.length) + ":" + minutes.substring(minutes.length - 2, minutes.length)
    }


    renderPost(item) {
        console.log(item)
        const dayitem = new Date(item.createdate)

        return (

            <View style={{ borderWidth: 2, borderColor: '#e1dbdb', width: '100%', paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>

                <View style={styles.desStyle}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.createby}    </Text>
                    <Text style={{ fontSize: 15 }}>{dayitem.getDate()}/{dayitem.getMonth()}/{dayitem.getFullYear()} {dayitem.getHours()}:{dayitem.getMinutes()}:{dayitem.getMilliseconds()}</Text>
                </View>
                <Text style={{ fontSize: 15 }}>{item.details}</Text>

                {/* <Text style={{ fontSize: 20 }}>__________________________________</Text> */}


            </View>
        )
    }

    checkjoin() {
        if (this.state.event.join.find((id) => this.state.user.userid === id)) {
            // this.setState({
            //     event: {
            //         ...this.state.event,
            //         // userpic: kaimook, //TODO remove ******************************************************      
            //         categoryid: this.state.event.categoryid.filter((id) => id !== cid)
            //     }
            // })

            console.log("Foundddd!!!!!!!", this.state.user.userid)
            this.setState({
                joinbtn: "Joined"
            })

            // return true
        }
        else {
            // this.setState({
            //     event: {
            //         ...this.state.event,
            //         // userpic: kaimook //TODO remove ******************************************************
            //         categoryid: [...this.state.event.categoryid, cid]
            //     }
            // })
            this.setState({
                joinbtn: "Join"
            })
            // console.log("Not Found")
            // return false
        }
    }

    render() {

        const { event } = this.state
        return (
            <View style={{ flex: 1 }}>

                <HeaderBack
                    header={"Description"}
                    navigator={this.props.navigation}
                />



                <ScrollView style={styles.scrollStyle}>
                    <View style={{ flex: 1 }}>
                        <View>

                            <TouchableOpacity
                                style={{ backgroundColor: 'grey', padding: 15, borderRadius: 5, alignItems: 'center' }}
                                onPress={() => {
                                    // console.log('Before press btn ',this.state.joinbtn)
                                    (this.state.joinbtn === "Join") ? this.addjoin() : this.deljoin()
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 30 }}>
                                    {this.state.joinbtn}
                                </Text>
                            </TouchableOpacity>


                            {
                                (this.state.event.createby === this.state.user.userid)
                                    ? (
                                        <TouchableOpacity
                                            style={{ backgroundColor: 'grey', padding: 15, borderRadius: 5, alignItems: 'center' }}
                                            onPress={() => {
                                                // Actions.CreateEvent();
                                                this.props.navigation.navigate('UpdateEvent', {
                                                    eventid: this.props.navigation.state.params.eventid,
                                                })
                                            }}

                                        >
                                            <Text style={{ color: 'white', fontSize: 30 }}>
                                                Edit
                                        </Text>
                                        </TouchableOpacity>
                                    )
                                    : null
                            }

                            {
                                (this.state.event.createby === this.state.user.userid)
                                    ? (
                                        <TouchableOpacity
                                            style={{ backgroundColor: 'grey', padding: 15, borderRadius: 5, alignItems: 'center' }}
                                            onPress={() => {
                                                // this.props.navigate('UserSetting')
                                                this.props.navigation.navigate('Joined', {
                                                    eventid: this.props.navigation.state.params.eventid,
                                                })
                                            }}

                                        >
                                            <Text style={{ color: 'white', fontSize: 30 }}>
                                                All Join
                                        </Text>
                                        </TouchableOpacity>
                                    )
                                    : null
                            }

                        </View>

                        {/* <Transition shared='circle'> */}
                        {/* <Transition shared={this.props.navigation.state.params.eventid}> */}
                        {/* <Image source={imgposter1}
                                style={styles.posterImg} /> */}
                        {/* <Image source={poster} style={styles.posterStyle} ImageResizeMode="repeat" />
                        </Transition> */}
                        <Image
                            style={styles.posterStyle}
                            // source={this.props.image}
                            source={event.posterpic}
                        // source={imgposter1}

                        />
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontSize: 23 }}>{event.topic}</Text>
                            {/* <Text style={{ fontSize: 15 }}>Date    : {event.eventstdate}</Text> */}
                            <Text style={{ fontSize: 15 }}>Date    : {this.setFormatDate(event.eventstdate.getDate(), event.eventstdate.getMonth() + 1, event.eventstdate.getFullYear())}</Text>
                            <Text style={{ fontSize: 15 }}>time    : {this.setFormatTime(event.eventstdate.getHours(), event.eventstdate.getMinutes())} </Text>
                            <Text style={{ fontSize: 15 }}>Place   : {event.location}</Text>
                            <Text style={{ fontSize: 15 }}>Contact : </Text>
                            <View style={styles.iconView}>
                                <Image source={facebook} style={styles.fb} />
                                <Text style={{ fontSize: 15 }}>{event.facebook}</Text>
                            </View>
                            <Text style={{ fontSize: 15 }}>Description : </Text>
                            <Text style={{ fontSize: 15 }}>{event.description}</Text>

                        </View>
                    </View>

                    <View style={{ paddingLeft: 10, width: '100%', resizeMode: 'stretch', backgroundColor: '#e1dbdb', paddingVertical: 15, flexDirection: 'row' }}  >
                        <Icon name='comment-processing' type='material-community' />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Comments ({this.state.comment.length})</Text>
                    </View>

                    <FlatList
                        data={this.state.comment}
                        renderItem={({ item }) => this.renderPost(item)}
                    />

                </ScrollView>


                <View style={{ flexDirection: 'column', height: 55 }}>

                    <Image source={Buttonbar}
                        style={styles.buttonBar}
                    />

                    <View >
                        <View style={styles.txtStyle}>
                            {/* Input */}
                            <TextInput
                                secureTextEntry={false}
                                placeholder="Type your Question here to comment!"
                                keyboardType="default"
                                style={styles.commentStyle}
                                onChangeText={text => {
                                    this.setState(
                                        { commentstr: text }
                                    )
                                    console.log(text)
                                }}
                            />
                            {/* Button */}
                            <TouchableOpacity
                                style={{ backgroundColor: 'grey', padding: 15, borderRadius: 5, alignItems: 'center' }}
                                onPress={() => { this.addComment() }}
                            >
                                <Text style={{ color: 'white', fontSize: 30 }}>
                                    OK
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    posterStyle: { width: width, flex: 1, alignSelf: 'center' },
    scrollStyle: { flexDirection: 'column', backgroundColor: "white", flex: 1 },
    searchStyle: { flexDirection: 'column', height: 55, width: '100%' },
    fb: { alignSelf: 'flex-start', width: 50, height: 50 },
    txtStyle: { flexDirection: 'row', alignItems: 'center' },
    commentStyle: { height: 70, borderColor: '#e1dbdb', borderWidth: 2, flex: 1, height: 70, margin: 5 },
    buttonBar: { position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' },
    iconView: { flexDirection: 'row', alignItems: 'center' },
    // scrollStyle: {flexDirection: 'column', backgroundColor: "white", flex: 1},
    // viewChooseImg: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
    // imgStyle: {alignSelf: 'flex-start', width: 200, height: 200 },
    // desStyle: {marginBottom: 16, fontSize: 20},
    // viewBtn: {flexDirection: 'column', height: 55, width: '100%' },
    // topicStyle: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
    // setBtnStyle: {backgroundColor: '#ae5945', padding: 15, borderRadius: 15, alignItems: 'center'},
    // setTextStyle: { color: 'white', fontSize: 20 },
    // setTxtIn: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
    // buttonBar: { position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' },
    // posterImg: { alignSelf: 'flex-start', width: '100%', height: 300 },
    topicStyle: { fontSize: 20, alignSelf: 'center' },
    desStyle: { flexDirection: 'row' },
    stdStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imgLine: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    imgLocation: { alignSelf: 'center', width: 30, height: 30 },
    // posterStyle: { borderWidth: 2, borderColor: 'gray', width: '50%' },
    searchView: { flexDirection: 'column', height: 55, width: '100%' },
    buttonView: { flexDirection: 'column', height: 55 },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    image: {
        width: 400,
        height: 400,
    }

})


export default Description;