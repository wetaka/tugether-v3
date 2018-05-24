import React from "react";
import { Actions } from "react-native-router-flux";
import { View, Text, Image, Dimensions, TouchableOpacity, AsyncStorage, StyleSheet, Linking, WebView } from "react-native";
import TULogo from "../../Images/Logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Bg from "../../Images/bg.jpg";
import { API_URL } from "../../config/api";
import {
  ANIMATIONS_SLIDE,
  ANIMATIONS_FADE,
  CustomTabs
} from 'react-native-custom-tabs';

const { width } = Dimensions.get("window");

// Wi Login an
class Login extends React.Component {
  state = {
    userid: "5709650278",
    password: "",
    linkdjango: { url: 'http://192.168.1.10:8000/oauth/login/tu/' }
  };

  // static linkdjango = { url: 'http://192.168.1.10:8000/oauth/login/tu/' };

  // handleClick = () => {
  //   Linking.canOpenURL('http://192.168.1.10:8000/oauth/login/tu/').then(supported => {
  //     if (supported) {
  //       Linking.openURL('http://192.168.1.10:8000/oauth/login/tu/');
  //     } else {
  //       console.log("Don't know how to open URI: " + this.state.linkdjango);
  //     }() => {
  //       // alert('before get user')
  //       this.login();
  //     }
  //   });
  // };

  handleClick = () => {
    CustomTabs.openURL('http://172.25.79.42:8000/oauth/login/tu/').then((launched) => {
      console.log(`Launched custom tabs: ${launched}`);
    }).catch(err => {
      console.error(err)
    });
    
  };



  login() {
    alert('http://192.168.1.11:8000/api/chk-first-login/' + this.state.userid)
    // fetch('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
    fetch(API_URL + 'chk-first-login')


      .then((response) => {
        if (response.ok) {
          alert("Not First Login");

          // this.props.navigator.push({
          //   screen: 'Home',
          //   passProps: {
          //     userid: this.state.userid
          //     // eventid: item.id,
          //   },
          // });
          // alert(this.state.userid)
          this.props.navigation.navigate('Home', {
            userid: this.state.userid,
          });
          // Actions.Home({ userid: this.state.userid });


        } else {
          alert("First Login");
          // Actions.Category({ userid: this.state.userid });

          this.props.navigation.navigate('Category', {
            userid: this.state.userid
          })

          // this.props.navigator.push({
          //   screen: 'Category',
          //   passProps: {
          //     userid: this.state.userid
          //   },
          // });
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Fail")
      });
  }


  // onClick = () => {
  //   console.log('Button Clicked');
  // }

  // renderView() {

  //   console.log('555555555555555555555')

  //   return (
      
  //     <View>
  //       <Text>
  //         lllllllllllllllllllllllllllllllllllllllll
  //       </Text>
  //     <WebView
  //       source={{ uri: 'http://192.168.1.10:8000/oauth/login/tu/' }}
  //       style={{ marginTop: 20 }}
  //       javaScriptEnabled={true}
  //     // onMessage={m => this.onMessage(m)} 

  //     />
  //     </View>

     
  //   )
  // }

  render() {

    return (
      <View
        style={styles.viewStyle}
      >
        <Image
          source={Bg}
          style={styles.bgStyle}
        />
        <View style={{ padding: 30, paddingTop: 0 }}>
          <Image
            source={TULogo}
            style={styles.tulogo}
            ImageResizeMode="repeat"
          />
          <View style={{ paddingVertical: 10 }}>
            <CustomInput
              placeholder="Username"
              keyboardType="numeric"
              secureTextEntry={false}
              onChangeText={text => {
                this.setState({ userid: text });
              }}
              value={this.state.userid}
            />
          </View>

          <View style={{ paddingVertical: 10 }}>
            <CustomInput
              placeholder="Password"
              keyboardType="numeric"
              secureTextEntry={true}
              onChangeText={text => {

                this.setState({ password: text });
              }}
              value={this.state.password}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => {
                //   String a = "test1";
                //   String b = "test b";
                //   System.out.print('a is:' + a);
                // alert(this.state.userid)
                this.login()
              }}
            >
              <Text style={styles.loginText}>
                Login via authen app
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => {
                this.renderView()
                console.log('click here !!!')

              }}
            >
              <Text style={styles.loginText}>
                Click
              </Text>
            </TouchableOpacity> */}

            {/* <WebView
              source={{ uri: 'http://192.168.1.10:8000/oauth/login/tu/' }}
              style={{ marginTop: 20 }}
            // onMessage={m => this.onMessage(m)} 
            /> */}


            <TouchableOpacity onPress={this.handleClick}>

              <View style={styles.button}>
                <Text style={styles.text}>Open</Text>
              </View>

            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  bgStyle: { flexDirection: "column", position: "absolute", width: "100%", height: "100%", resizeMode: "stretch" },
  tulogo: { maxWidth: width - 100, alignSelf: "center" },
  btnLogin: { backgroundColor: "#ae5945", padding: 15, borderRadius: 15, alignItems: "center" },
  loginText: { color: "white", fontSize: 20 },
  viewStyle: { flexDirection: "column", backgroundColor: "white", flex: 1 }
  // scrollStyle: {flexDirection: 'column', backgroundColor: "white", flex: 1},
  // viewChooseImg: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
  // imgStyle: {alignSelf: 'flex-start', width: 200, height: 200 },
  // desStyle: {marginBottom: 16, fontSize: 20},
  // viewBtn: {flexDirection: 'column', height: 55, width: '100%' },
  // topicStyle: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
  // setBtnStyle: {backgroundColor: '#ae5945', padding: 15, borderRadius: 15, alignItems: 'center'},
  // setTextStyle: { color: 'white', fontSize: 20 },
  // setTxtIn: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
})

export default Login;
