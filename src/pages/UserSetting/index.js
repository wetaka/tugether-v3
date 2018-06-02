import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, StyleSheet, CheckBox, AsyncStorage } from 'react-native';
import kaimook from '../../Images/userdefault.png'
import { API_URL, FB_FUNCTION_URL } from "../../config/api";
import { Button, Divider } from 'react-native-elements';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from '../../config/firebase';
import ImagePicker from 'react-native-image-picker';
import HeaderBack from "../../components/HeaderBack";
import HeaderMain from "../../components/HeaderMain";
import HeaderText from "../../components/HeaderText";
import { Icon } from 'react-native-elements';
import { BallIndicator } from 'react-native-indicators';

// import { CheckBox } from 'react-native-elements'
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

const storage = firebase.storage();

// Prepare Blob support
// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob

// window.XMLHttpRequest = window.XMLHttpRequest


class UserSetting extends React.Component {

    state = {
        category: [],
        user: {
            categoryid: [],
            userpic: kaimook,

        },
        loader: true
    };

    static navigatorOptions = {
        header: {
            visible: false
        }
    };


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

                await this.updateUser(imageRes.imageUrl)
                await AsyncStorage.setItem('CURRENT_USER', JSON.stringify(
                    {
                        ...this.state.user,
                        userpic: imageRes.imageUrl
                    })
                )

                await this.setState({
                    user: {
                        ...this.state.user,
                        userpic: { uri: imageRes.imageUrl },
                    },
                    loader: false
                });

            })
            .catch((error) => {
                console.error(error);
                alert("Not Succes !!!!!!!!!!!!!")
            })
    }


    // uploadImage = (uri, mime = 'application/octet-stream') => {
    //     // Prepare Blob support

    //     const fs = RNFetchBlob.fs;
    //     const XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    //     const Blob = RNFetchBlob.polyfill.Blob;
    //     return new Promise((resolve, reject) => {
    //         const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    //         const sessionId = new Date().getTime()
    //         let uploadBlob = null
    //         const imageRef = storage.ref('images').child(`${sessionId}`)

    //         fs.readFile(uploadUri, 'base64')
    //             .then((data) => {
    //                 return Blob.build(data, { type: `${mime};BASE64` })
    //             })
    //             .then((blob) => {
    //                 uploadBlob = blob
    //                 return imageRef.put(blob, { contentType: mime })
    //             })
    //             .then(() => {
    //                 uploadBlob.close()
    //                 return imageRef.getDownloadURL()
    //             })
    //             .then((url) => {
    //                 resolve(url)
    //             })
    //             .catch((error) => {
    //                 reject(error)
    //             })
    //     })
    // }


    componentDidMount() {
        console.log(' componentDidMount get props => ', this.props)
        this.getCategories()


    }

    componentWillReceiveProps() {
        console.log(' componentDidMount get props => ', this.props)
        this.getCategories()
    }

    getCurrentUser() {
        console.log("getCurrentUser")


        return AsyncStorage.getItem('CURRENT_USER')
            .then(value => {
                // alert('get Value')
                value = JSON.parse(value);
                if (value && value.userid) {
                    // this.setState({
                    //     user: { ...value }
                    // }
                    // );
                    this.getUserByID(value.userid)

                }
                else {

                    // Actions.Login();
                    // this.props.navigation.navigate('Login')

                    this.props.navigation.replace('Login');

                    // TODO
                    // this.props.navigator.push({
                    //     screen: 'Login'
                    //   });

                }
            })

            .catch(() => { console.log('eiei error') })
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

    updateUser(image) {
        this.setState({
            loader: true
        })
        return fetch(API_URL + 'user/' + this.state.user.userid, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    ...this.state.user,
                    userpic: (image) ? image : this.state.user.userpic.uri
                }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('vinaja', responseJson)
                // this.getidofuser()
                // this.addfirstcategory()
                return AsyncStorage.setItem(
                    'CURRENT_USER',
                    JSON.stringify({
                        ...this.state.user,
                        userpic: this.state.user.userpic.uri,
                    })
                )

            })
            .then(() =>
                this.setState({
                    loader: false
                }
                    , () => {
                        if (!image) {
                            alert("Successful")
                        }

                    }
                )
            )
            .catch((error) => {
                console.error(error);
                alert("Not Success")

            });
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
                            // alert('before get user')
                            this.getCurrentUser();

                            resolve();
                        }
                    );
                    // const { userid } = this.props.navigation.state.params;
                    // console.log(userid)
                })
                .catch((error) => {
                    console.error(error);
                    alert("Fail");
                    reject();
                });
        });
    }


    getUserByID(userid) {
        return new Promise((resolve, reject) => {
            return fetch(API_URL + 'user/' + userid)
                .then((response) => response.json())
                .then((data) => {
                    console.log("fixbug getUserByID then ", data)

                    // this.setState({ user: data });
                    if (data.userpic) {
                        this.setState({
                            user: {
                                ...data,
                                // userpic: kaimook,
                                userpic: { uri: data.userpic } //TODO remove ******************************************************
                            }
                        })
                    }
                    else {
                        this.setState({
                            user: {
                                ...data,
                                userpic: kaimook,
                                // userpic: { uri: data.userpic } //TODO remove ******************************************************
                            }
                        })
                    }

                    return AsyncStorage.setItem('CURRENT_USER', JSON.stringify(data));
                    // console.log(this.props.navigation.state.params.userid)                      
                })
                .then(() => {
                    console.log("fixbug getUserByID then 2")
                    //   this.getAllEventActive();
                    this.setState({
                        loader: false
                    }, () => {
                        resolve();
                    })
                    // resolve();
                })
                .catch((error) => {
                    console.log("fixbug getUserByID catch", error)
                    reject()
                });
        })
    }



    checkValue(cid) {
        if (this.state.user.categoryid.find((id) => cid === id)) {
            this.setState({
                user: {
                    ...this.state.user,
                    // userpic: kaimook, //TODO remove ******************************************************      
                    categoryid: this.state.user.categoryid.filter((id) => id !== cid)
                }
            })
        }
        else {
            this.setState({
                user: {
                    ...this.state.user,
                    // userpic: kaimook //TODO remove ******************************************************
                    // ,
                    categoryid: [...this.state.user.categoryid, cid]
                }
            })
        }
    }


    render() {
        console.log('render state UserSetting user ', this.state)
        console.log(' render get props => ', this.props)
        const mainReload = this.props.navigation.getParam('mainReload', () => {});
        console.log('Reload in UserSetting', this.props, mainReload)

        if (this.state.user.userid) {
            return (
                <View style={{ flex: 1 }}>

                    {
                        (this.state.loader)
                            ? (
                                <View style={{ flex: 1 }}>

                                    <HeaderBack
                                        header={"Setting"}
                                        navigator={this.props.navigation}
                                        optionalFn={mainReload}
                                    />
                                    <BallIndicator color='grey' size={40} count={8} />
                                </View>
                            )
                            : (
                                <View style={{ flex: 1 }}>

                                    <HeaderBack
                                        header={"Setting"}
                                        navigator={this.props.navigation}
                                        optionalFn={mainReload}
                                    />

                                    <View style={{ width: '100%', height: '30%', flexDirection: 'column' }}>
                                        <Image source={this.state.user.userpic} style={{ width: '100%', height: '100%' }} />
                                        <View style={{ opacity: 0.7, backgroundColor: 'white', position: 'absolute', bottom: 0, right: 0, left: 0, top: 0 }} />
                                        <View style={{ opacity: 0.4, backgroundColor: 'black', position: 'absolute', bottom: 0, right: 0, left: 0, top: 0 }} />
                                        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0, right: 0, left: 0, top: 0 }}>
                                            {/* <Text style={styles.desStyle}> </Text> */}
                                            <TouchableOpacity onPress={() => { this.chooseImage() }}>

                                                <Image source={this.state.user.userpic} style={styles.imgStyle} />
                                                <Icon
                                                    raised
                                                    // reverse
                                                    name={'edit'}
                                                    type={'font-awesome'}
                                                    color={'grey'}
                                                    size={15}
                                                    containerStyle={{ position: 'absolute', left: 140, top: 155, zIndex: 40 }} />

                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <ScrollView style={{ flexDirection: 'column', backgroundColor: "white", flex: 1 }}>


                                        <View style={{ padding: 20 }}>
                                            {/* <View style={styles.viewChooseImg}>
                                <TouchableOpacity onPress={() => { this.chooseImage() }}>
                                    <Image source={this.state.user.userpic} style={styles.imgStyle} />
                                </TouchableOpacity>
                            </View> */}
                                            <View style={{}}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ alignItems: 'flex-start' }}>
                                                        <Text style={styles.desStyle}>ID : {this.state.user.userid} </Text>
                                                        <Text style={styles.desStyle}>Firstname : {this.state.user.firstname}</Text>
                                                        <Text style={styles.desStyle}>Lastname : {this.state.user.lastname} </Text>
                                                    </View>

                                                </View>
                                                <Divider />
                                                <Text style={styles.desStyle}>Category :   </Text>

                                                {this.state.category
                                                    .map((c) => {

                                                        return (
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <CheckBox
                                                                    value={(this.state.user.categoryid.find((id) => c.id === id)) ? true : false}
                                                                    onValueChange={() => this.checkValue(c.id)}

                                                                />
                                                                <Text style={{ marginTop: 5 }}> {c.categoryname} </Text>
                                                            </View>
                                                        )
                                                    })}
                                            </View>


                                            <Button
                                                large
                                                icon={{ name: 'edit-2', type: 'feather' }}
                                                title='Edit profile'
                                                buttonStyle={{ borderRadius: 10, marginVertical: 5, backgroundColor: '#efcb53' }}

                                                onPress={async () => {
                                                    this.updateUser()
                                                    // const url = await this.uploadImage(this.state.user.userpic)
                                                    alert(url);
                                                }}

                                            />
                                            <Divider />
                                            <Button
                                                large
                                                icon={{ name: 'logout', type: 'material-community' }}
                                                title='Log Out'
                                                buttonStyle={{ borderRadius: 10, marginVertical: 5, backgroundColor: '#e1654a' }}

                                                onPress={() => {
                                                    AsyncStorage.setItem('CURRENT_USER', "").then(() => {

                                                        // this.props.navigation.navigate('Login')

                                                        // TODO
                                                        // this.props.navigator.push({
                                                        //   screen: 'Login'
                                                        // });
                                                        this.props.navigation.replace('Login');

                                                    });
                                                }}
                                            />

                                        </View>
                                    </ScrollView >
                                </View>
                            )
                    }
                </View>

            )
        }
        else {
            return <View />
        }
    }
}

const styles = StyleSheet.create({
    buttonBar: { position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' },
    scrollStyle: { flexDirection: 'column', backgroundColor: "white", flex: 1 },
    viewChooseImg: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    imgStyle: { alignSelf: 'flex-start', width: 200, height: 200, borderRadius: 100 },
    desStyle: { marginBottom: 16, fontSize: 16 },
    viewBtn: { flexDirection: 'column', height: 55, width: '100%' },
    topicStyle: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
    setBtnStyle: { backgroundColor: '#ae5945', padding: 15, borderRadius: 15, alignItems: 'center' },
    setTextStyle: { color: 'white', fontSize: 20 },
    setTxtIn: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
})

export default UserSetting;