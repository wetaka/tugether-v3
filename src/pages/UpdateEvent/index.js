import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, CheckBox, TextInput, ScrollView, AsyncStorage, DatePickerAndroid, TimePickerAndroid, StyleSheet } from 'react-native';
import Search from 'react-native-search-box';
import posterFrame from '../../Images/addposter.jpg';
import ImagePicker from 'react-native-image-picker';
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import { API_URL, FB_FUNCTION_URL } from "../../config/api";
import { TextField } from 'react-native-material-textfield';
import { Button, Divider, Icon } from 'react-native-elements';
import moment from 'moment';
import HeaderBack from "../../components/HeaderBack";
import { BallIndicator } from 'react-native-indicators';


const { width, height } = Dimensions.get('window');

const options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }

};

class UpdateEvent extends React.Component {

    static navigatorOptions = {
        header: {
            visible: false
        }
    };

    state = {
        category: [],
        event: {
            posterpic: posterFrame,
            topic: '',
            eventstdate: null,
            eventenddate: null,
            location: '',
            facebook: '',
            line: '',
            web: '',
            phone: '',
            hashtag: '',
            description: '',
            categoryid: [],
            createdate: '',
            limited: 0
        },

        user: {
            userid: "",
            firstname: "",
            lastname: ""
        },
        loader: true,

    }


    getCategories() {
        this.setState({
            loader: true
        })
        return new Promise((resolve, reject) => {
            return fetch(API_URL + 'category')
                .then((response) => response.json())
                .then((data) => {
                    console.log('get categories', data)
                    this.setState(
                        { category: data },
                        () => {
                            this.getCurrentUser();

                            resolve();
                        }
                    );

                })
                .catch((error) => {
                    console.error(error);
                    alert("Fail");
                    reject();
                });
        });
    }

    getCurrentUser() {
        console.log("getCurrentUser")

        return AsyncStorage.getItem('CURRENT_USER')
            .then(value => {
                value = JSON.parse(value);
                console.log('value   ', value);
                if (value) {
                    // We have data!!

                    this.setState({
                        user: {
                            userid: value.userid,
                            firstname: value.firstname,
                            lastname: value.lastname
                        }
                    },()=>{
                        this.setState({
                            loader: false
                        })
                    }
                );
                }
                else {
                    // Actions.Login();
                    this.props.navigation.navigate('Login')
                    // this.props.navigator.push({
                    //     screen: 'Login'
                    //   });

                }
            })
            .catch(() => { console.log('eiei error') })
    }

    getEvent() {
        // alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
        // fetch(API_URL + 'event/' + this.props.navigation.state.params.eventid)
        fetch(API_URL + 'event/' + this.props.navigation.state.params.eventid)
            .then((response) => response.json())
            .then((data) => {
                console.log('get eventid', data)
                if (data.posterpic !== posterFrame) {
                    this.setState({
                        event: {
                            eventid: data.eventid,
                            topic: data.topic,
                            createby: data.createby,
                            categoryid: [...data.categoryid],
                            location: data.location,
                            approve: data.approve,
                            description: data.description,
                            facebook: data.facebook,
                            line: data.line,
                            web: data.web,
                            phone: data.phone,
                            hashtag: data.hashtag,
                            bcapprove: data.bcapprove,
                            posterpic: { uri: data.posterpic },
                            createdate: new Date(data.createdate),
                            updatedate: data.updatedate,
                            eventstdate: new Date(data.eventstdate),
                            eventenddate: new Date(data.eventenddate),
                            active: data.active,
                            limited: data.limited
                        }
                    })
                }
                else {
                    this.setState({
                        event: {
                            eventid: data.eventid,
                            topic: data.topic,
                            createby: data.createby,
                            categoryid: [...data.categoryid],
                            location: data.location,
                            approve: data.approve,
                            description: data.description,
                            facebook: data.facebook,
                            line: data.line,
                            web: data.web,
                            phone: data.phone,
                            hashtag: data.hashtag,
                            bcapprove: data.bcapprove,
                            posterpic: posterFrame,
                            createdate: new Date(data.createdate),
                            updatedate: data.updatedate,
                            eventstdate: new Date(data.eventstdate),
                            eventenddate: new Date(data.eventenddate),
                            active: data.active,
                            limited: data.limited
                        }
                    })
                }
             
                // console.log(this.props.eventid)
            })

            .catch((error) => {
                console.error(error);
                alert("Fail");
            });
    }


    validateNull(text) {
        console.log("Trim ???? ", text)
        if (text === null || text === undefined || text.trim() === "") {
            return false
        }
        else {
            return true
        }
    }

    validateNotZero(text) {

        if (typeof text === 'number' && text <= 0) {
            return false
        }
        else {
            return true
        }
    }

    validateMoreThan10000(text) {
        if (text > 10000) {
            return false
        }
        else {
            return true
        }
    }

    // validateSpace(text){
    //    return text.indexOf(' ') >= 0;
    // }

    validateSpace(text) {
        let res = text.split("#");
        // console.log(res)
        if (res.some((r) => r.trim().indexOf(' ') >= 0)) {
            console.log("have space")
            return false
        }
        else {
            console.log("not have space")
            return true
        }

    }

    validateHashTag(text) {
        if (text.substring(text.length - 1, text.length) === '#') {
            return false
        }
        else {
            return true
        }
    }

    saveEvent(image) {

        this.setState({
            loader: true
        })
        if (!this.validateNull(this.state.event.topic)) {
            this.setState({
                loader: false
            }, () => {
                alert("Please enter Topic")
                return;
            })

        }
        if (!this.validateNull(this.state.event.location)) {
            this.setState({
                loader: false
            }, () => {
                alert("Please enter location")
                return;
            })
        }
        if (!this.validateNotZero(this.state.event.limited)) {
            this.setState({
                loader: false
            }, () => {
                alert("Please enter limited")
                return;
            })
        }
        if (!this.validateMoreThan10000(this.state.event.limited)) {
            this.setState({
                loader: false
            }, () => {
                alert("Limited can not more than 10000")
                return;
            })
        }
        if (!this.validateHashTag(this.state.event.hashtag)) {
            this.setState({
                loader: false
            }, () => {
                alert("Last words cannot have #")
                return;
            })
        }
        if (!this.validateSpace(this.state.event.hashtag)) {
            this.setState({
                loader: false
            }, () => {
                alert("Cannot have white spaces!")
                return;
            })
        }
        if (this.state.event.categoryid === []) {
            this.setState({
                loader: false
            }, () => {
                alert("Category is null")
                return;
            })
        }

        // if (!this.validateNull(this.state.event.topic)) {
        //     alert("Please enter Topic")
        //     return;
        // }
        // if (!this.validateNull(this.state.event.location)) {
        //     alert("Please enter location")
        //     return;
        // }
        // if (!this.validateNotZero(this.state.event.limited)) {
        //     alert("Please enter limited")
        //     return;
        // }
        // if (!this.validateMoreThan10000(this.state.event.limited)) {
        //     alert("Limited can not more than 10000")
        //     return;
        // }
        // if (!this.validateHashTag(this.state.event.hashtag)) {
        //     alert("Last words cannot have #")
        //     return;
        // }
        // if (!this.validateSpace(this.state.event.hashtag)) {
        //     alert("Cannot have white spaces!")
        //     return;
        // }
        // if (this.state.event.categoryid === []) {
        //     alert("Category is null")
        //     return;
        // }

        const date_now = new Date()
        let c = moment([this.state.event.eventstdate.getFullYear(), this.state.event.eventstdate.getMonth(), this.state.event.eventstdate.getDate()]);
        let d = moment([date_now.getFullYear(), date_now.getMonth(), date_now.getDate()]);

        if (c.diff(d, 'days') <= 0) {
            this.setState({
                loader: false
            })
            alert("Start Date cannot less than Today")
            
            return;
        } // 1

        let e = moment([this.state.event.eventenddate.getFullYear(), this.state.event.eventenddate.getMonth(), this.state.event.eventenddate.getDate()]);
        let f = moment([this.state.event.eventstdate.getFullYear(), this.state.event.eventstdate.getMonth(), this.state.event.eventstdate.getDate()]);

        if (e.diff(f, 'days') < 0) {
            this.setState({
                loader: false
            })
            alert("End Date cannot less than Start Date")
            return;
        } // 1

        fetch(API_URL + 'event/' + this.props.navigation.state.params.eventid, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...this.state.event,
                posterpic: (image) ? image : this.state.event.posterpic.uri
            }
            ),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('vinaja', responseJson)
                this.setState({
                    loader: false
                },() => {
                    alert("Succesful")
                }
            )
            })
            .catch((error) => {
                console.error(error);
            });
    }


    setStartDate = async () => {
        try {
            // alert("Start Date")
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: this.state.event.eventstdate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                console.log('Day ', day)
                console.log('Month ', month)
                console.log('Year ', year)
                console.log('Action ', action)

                const date_now = new Date()
                let a = moment([year, month, day]);
                let b = moment([date_now.getFullYear(), date_now.getMonth(), date_now.getDate()]);
                console.log("Moment", a.diff(b, 'days'))
                if (a.diff(b, 'days') >= 1) {
                    this.setState({
                        event: {
                            ...this.state.event,
                            eventstdate: new Date(year, month, day, this.state.event.eventstdate.getHours(), this.state.event.eventstdate.getMinutes(), this.state.event.eventstdate.getMilliseconds())
                        }
                    })
                } // 1
                else {
                    alert("Start Date cannot less than Today")
                }

                console.log(this.state.event.eventstdate)
            }


        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    setEndDate = async () => {
        try {
            // alert("End Date")
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: this.state.event.eventenddate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                console.log('Day ', day)
                console.log('Month ', month)
                console.log('Year ', year)
                console.log('Action ', action)
                console.log('Action ', action)


                let a = moment([year, month, day]);
                let b = moment([this.state.event.eventstdate.getFullYear(), this.state.event.eventstdate.getMonth(), this.state.event.eventstdate.getDate()]);
                console.log("Moment End date", a.diff(b, 'days'))

                if (a.diff(b, 'days') >= 0) {
                    this.setState({
                        event: {
                            ...this.state.event,
                            eventenddate: new Date(year, month, day, this.state.event.eventenddate.getHours(), this.state.event.eventenddate.getMinutes(), this.state.event.eventstdate.getMilliseconds())
                        }
                    })
                } // 1
                else {
                    alert("End Date cannot less than Start Date")
                }

                console.log(this.state.event.eventenddate)
            }


        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }


    setTime = async () => {

        try {

            const dateNow = new Date()
            const { action, hour, minute } = await TimePickerAndroid.open({

                hour: this.state.event.eventstdate.getHours(),
                minute: this.state.event.eventstdate.getMinutes(),
                is24Hour: false, // Will display '2 PM',
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                console.log(hour)
                console.log(minute)
                this.setState({
                    event: {
                        ...this.state.event,
                        eventstdate: new Date(this.state.event.eventstdate.getFullYear(), this.state.event.eventstdate.getMonth(), this.state.event.eventstdate.getDate(), hour, minute)
                    }
                })

                console.log(this.state.event.eventstdate)

            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }


    componentDidMount() {
        this.getCategories()
        this.getEvent()

    }

    uploadImage = (img) => {
        this.setState({
            loader: true
        })
        return fetch(FB_FUNCTION_URL + 'storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: img,
            })
        })
            .then(res => res.json())
            .then(async (imageRes) => {
                console.log('Success pic', imageRes)

                await this.saveEvent(imageRes.imageUrl)
                // await AsyncStorage.setItem('CURRENT_USER', JSON.stringify(
                //     {
                //         ...this.state.user,
                //         userpic: imageRes.imageUrl
                //     })
                // )

                await this.setState({
                    event: {
                        ...this.state.event,
                        posterpic: { uri: imageRes.imageUrl },
                    },
                    loader: false
                });

            })
            .catch((error) => {
                console.error(error);
                alert("Not Succes !!!!!!!!!!!!!")
            })
    }


    chooseImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {
                    uri: response.uri, // present in <Image />
                };
                console.log(source);
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                // this.setState({
                //     user: {
                //         ...this.state.user,
                //         userpic: source //TODO remove ******************************************************
                //         // avatarSource: source
                //     }
                // }, () => {
                
                this.uploadImage(response.data);
                // });
            }
        });
    }

    checkValue(cid) {
        if (this.state.event.categoryid.find((id) => cid === id)) {
            this.setState({
                event: {
                    ...this.state.event,
                    // userpic: kaimook, //TODO remove ******************************************************      
                    categoryid: this.state.event.categoryid.filter((id) => id !== cid)
                }
            })
        }
        else {
            this.setState({
                event: {
                    ...this.state.event,
                    // userpic: kaimook //TODO remove ******************************************************
                    categoryid: [...this.state.event.categoryid, cid]
                }
            })
        }
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


    checkDate(chk) {
        if (chk) {
            return this.setFormatDate(chk.getDate(), chk.getMonth() + 1, chk.getFullYear())
        }
        else {
            return ""
        }
    }

    checkTime(chk) {
        if (chk) {
            return this.setFormatTime(this.state.event.eventstdate.getHours(), this.state.event.eventstdate.getMinutes())

        }
        else {
            return ""
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    (this.state.loader)
                        ? (
                            <View style={{ flex: 1 }}>
                                <HeaderBack

                                    header={"Edit Event"}
                                    navigator={this.props.navigation}
                                />
                                <BallIndicator color='grey' size={40} count={8} />
                            </View>
                        )
                        : (
                            <View style={{ flex: 1 }}>
                                <HeaderBack

                                    header={"Edit Event"}
                                    navigator={this.props.navigation}
                                />
                                <ScrollView style={styles.scrollStyle}>
                                    <View style={{ padding: 20 }}>
                                        <View style={styles.viewChooseImg}>
                                            <TouchableOpacity onPress={() => { this.chooseImage() }}>
                                                <Image
                                                    source={this.state.event.posterpic}
                                                    style={styles.imgStyle}
                                                />
                                            </TouchableOpacity>
                                        </View>


                                        <View style={{}}>
                                            <TextField
                                                autoFocus={true}
                                                label='Topic'
                                                value={this.state.event.topic}
                                                onChangeText={text => this.setState({
                                                    event: {
                                                        ...this.state.event,
                                                        topic: text
                                                    }
                                                })}
                                            />


                                            <TouchableOpacity

                                                onPress={() => {
                                                    this.setStartDate()
                                                }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 1 }}>
                                                        <TextField
                                                            label='Start Event Date'
                                                            editable={false}
                                                            value={this.checkDate(this.state.event.eventstdate)}

                                                        />
                                                    </View>
                                                    <View style={{ alignSelf: 'flex-end', paddingBottom: 3 }}>
                                                        <Icon name='date-range' type='material-icons' size={50} color='#e1654a'
                                                        />
                                                    </View>

                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity

                                                onPress={() => {

                                                    this.setEndDate()
                                                }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 1 }}>
                                                        <TextField
                                                            label='End Event Date'
                                                            editable={false}
                                                            value={this.checkDate(this.state.event.eventenddate)}
                                                        />
                                                    </View>
                                                    <View style={{ alignSelf: 'flex-end', paddingBottom: 3 }}>
                                                        <Icon name='date-range' type='material-icons' size={50} color='#e1654a'
                                                        />
                                                    </View>

                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity

                                                onPress={() => {

                                                    this.setTime()
                                                }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 1 }}>
                                                        <TextField
                                                            label='Start Event Time'
                                                            // disabled={true}
                                                            editable={false}
                                                            value={this.checkTime(this.state.event.eventstdate)}
                                                        />
                                                    </View>
                                                    <View style={{ alignSelf: 'flex-end', paddingBottom: 3 }}>
                                                        <Icon name='access-time' type='material-icons' size={50} color='#e1654a'
                                                        />
                                                    </View>

                                                </View>
                                            </TouchableOpacity>

                                            <TextField
                                                label='Location'
                                                value={this.state.event.location}
                                                onChangeText={text => this.setState({
                                                    event: {
                                                        ...this.state.event,
                                                        location: text
                                                    }
                                                })}
                                            />

                                            <TextField
                                                label='Limited'
                                                keyboardType="numeric"
                                                value={"" + this.state.event.limited}
                                                onChangeText={text => this.setState({
                                                    event: {
                                                        ...this.state.event,
                                                        limited: text
                                                    }
                                                })}
                                            />
                                            <TextField
                                                label='Facebook'
                                                value={this.state.event.facebook}
                                                onChangeText={text => this.setState({
                                                    event: {
                                                        ...this.state.event,
                                                        facebook: text
                                                    }
                                                })}
                                            />

                                            <TextField
                                                label='Line'
                                                value={this.state.event.line}
                                                onChangeText={text => this.setState({
                                                    event: {
                                                        ...this.state.event,
                                                        line: text
                                                    }
                                                })}
                                            />
                                            <TextField
                                                label='Website'
                                                value={this.state.event.website}
                                                onChangeText={text => this.setState({
                                                    event: {
                                                        ...this.state.event,
                                                        website: text
                                                    }
                                                })}
                                            />

                                            <TextField
                                                label='Phone number'
                                                keyboardType="numeric"
                                                value={this.state.event.phone}
                                                onChangeText={text => this.setState({
                                                    event: {
                                                        ...this.state.event,
                                                        phone: text
                                                    }
                                                })}
                                            />

                                            <TextField
                                                label='#Hashtag'
                                                value={this.state.event.hashtag}
                                                onChangeText={text => this.setState({
                                                    event: {
                                                        ...this.state.event,
                                                        hashtag: text
                                                    }
                                                })}
                                            />


                                            <TextField
                                                label='Description'
                                                value={this.state.event.description}
                                                onChangeText={text => this.setState({
                                                    event: {
                                                        ...this.state.event,
                                                        description: text
                                                    }
                                                })}
                                            />


                                            <Text style={styles.desStyle}>Category :   </Text>

                                            {this.state.category
                                                .map((c) => {

                                                    return (
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <CheckBox
                                                                value={(this.state.event.categoryid.find((id) => c.id === id)) ? true : false}
                                                                onValueChange={() => this.checkValue(c.id)}

                                                            />
                                                            <Text style={{ marginTop: 5 }}> {c.categoryname} </Text>
                                                        </View>
                                                    )
                                                })}

                                            <View style={{ paddingVertical: 10 }}>
                                                <TouchableOpacity
                                                    style={styles.setBtnStyle}
                                                    onPress={() => { this.saveEvent() }}
                                                >
                                                    <Text style={styles.setTextStyle}>
                                                        SAVE
                                            </Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        )
                }
            </View >
        )
    }

}



const styles = StyleSheet.create({
    buttonBar: { position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' },
    scrollStyle: { flexDirection: 'column', backgroundColor: "white", flex: 1 },
    viewChooseImg: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    imgStyle: { alignSelf: 'flex-start', width: 200, height: 200 },
    desStyle: { marginBottom: 16, fontSize: 20 },
    viewBtn: { flexDirection: 'column', height: 55, width: '100%' },
    topicStyle: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
    setBtnStyle: { backgroundColor: '#ae5945', padding: 15, borderRadius: 15, alignItems: 'center' },
    setTextStyle: { color: 'white', fontSize: 20 },
    setTxtIn: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
})

export default UpdateEvent;