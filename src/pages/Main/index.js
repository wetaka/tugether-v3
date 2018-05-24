import React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import idx from 'idx';
import imgposter1 from '../../Images/poster1.jpg'
import imgposter2 from '../../Images/poster2.jpg'
import location from '../../Images/location.png'
import line from '../../Images/line.png'
import Kaimook from '../../Images/mook.jpg'
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import Footer from "../../components/Footer";
// import { Actions } from "react-native-router-flux";
import SearchHeader from "../../components/SearchHeader";
import { API_URL } from "../../config/api";
import { Transition } from 'react-navigation-fluid-transitions';
import HeaderMain from "../../components/HeaderMain";


const { width, height } = Dimensions.get('window');

const posters = [
  {
    id: '12345555',
    imgposter: imgposter1,
    name: 'TU Freshynight',
    month: 'NOV',
    date: '16',
    img: location,
    place: 'Gym 5',
  }
]


class Main extends React.Component {


  state = {
    user: {
      userid: "",
      firstname: "",
      lastname: ""
    },
    maxSize: 0,
    event: []
  };



  renderPost(item) {
    // console.log('--------- tert')
    // console.log('===> ', item.eventid)
    // console.log(item)
    return (


      <View style={styles.btnItem}>
        <TouchableOpacity
          onPress={() => {
            //   String a = "test1";
            //   String b = "test b";
            //   System.out.print('a is:' + a);
            // alert(this.state.userid)

            // Actions.Description({ eventid: item.id });

            // this.props.navigator.push({
            //   screen: 'Description',
            //   passProps: {
            //     eventid: item.id,
            //   },
            // });

            

            this.props.navigation.navigate('Description',{
              eventid: item.id
            })
          }}>
          <Transition shared='circle'>
            <Image source={imgposter1} style={styles.posterImg} />
          </Transition>
          <Text style={styles.topicStyle}>{item.topic}</Text>
          <Text style={{ fontSize: 20 }}>___________________</Text>
          <View style={styles.desStyle}>
            <View style={styles.stdStyle}>
              <Text style={{ fontSize: 15 }}>{item.startdate}</Text>
              {/* <Text style={{ fontSize: 15 }}>{item.date}</Text> */}
            </View>
            <View style={styles.imgLine}>
              <Image source={line} style={{ alignSelf: 'flex-start' }} />
              <View>
                <Image source={location} style={styles.imgLocation} />
                <Text style={{ fontSize: 15 }}>{item.location}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

    )
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
          }, () => { this.getYourEvent() });
          ////////////////////WIP////////////////

        }
        else {
          // this.props.navigator.push({
          //   screen: 'Login'
          // });
          this.props.navigation.replace('Login')
          // Actions.Login();
          // this.props.navigation.navigate('Login')
        }
      })
      .catch(() => { console.log('eiei error') })
  }


  getUpcomingEvent() {
    // alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
    fetch(API_URL + 'upcoming-event/' + this.state.user.userid)
      // fetch('http://192.168.1.4:8000/api/upcoming-event/' + this.state.user.userid)


      // 'upcoming-event/<str:userid>'

      .then((response) => response.json())
      .then((data) => {
        console.log('get eventid from upcoming event', data)
        this.setState({
          event: [...data.data],
          maxSize: data.max_size,
        }, () => { console.log("test state upcoming", this.state) });
        //console.log(this.props.eventid)
      })
      .catch((error) => {
        console.error(error);
        alert("Fail");
      });
  }


  getYourEvent() {
    // alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
    fetch(API_URL + 'get-your-event/' + this.state.user.userid)
      .then((response) => response.json())
      .then((data) => {
        console.log('get your eventid', data)
        this.setState({
          event: [...data.data],
          maxSize: data.max_size,

        }, () => { console.log("test state get your event", this.state) });
        //console.log(this.props.eventid)
      })
      .catch((error) => {
        console.error(error);
        alert("Fail");
      });
  }


  getPastEvent() {
    // alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
    fetch(API_URL + 'past-event/' + this.state.user.userid)

      // 'upcoming-event/<str:userid>'

      .then((response) => response.json())
      .then((data) => {
        console.log('get eventid from past event', data)
        this.setState({
          event: [...data.data],
          maxSize: data.max_size,

        }, () => { console.log("test state past", this.state) });
        //console.log(this.props.eventid)
      })
      .catch((error) => {
        console.error(error);
        alert("Fail");
      });
  }

  // fordateDate() {

  // }


  componentDidMount() {
    this.getCurrentUser();

    // console.log("componentWillMount Main");

  }

  render() {
    const userid = this.props.navigation.getParam('userid', '');
    const { user } = this.state;

    console.log("Main push...", this.props)

    return (

      <View style={{ flex: 1 }}>

        <HeaderMain
          navigator={this.props.navigator}
        />
        {/* <View style={styles.searchView}>
          <SearchHeader
            isMainPage={true}
            navigate ={this.props.navigation.navigate}
          /> */}
        {/* </View> */}

        <View>
          <View style={styles.userStyle}>
            <View>
              <Text style={styles.userIDsty}> {user.userid} </Text>
              <Text style={{ fontSize: 20 }}> {user.firstname} {user.lastname} </Text>
            </View>
            <Image source={Kaimook} style={styles.imgUser} />
          </View>
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity
              style={styles.btnEvent}
              onPress={() => {
                //   String a = "test1";
                //   String b = "test b";
                //   System.out.print('a is:' + a);
                // alert(this.state.userid)
                this.getYourEvent()
              }}
            >
              <Text style={{ color: 'white' }}>
                My Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#ae5945',
                paddingVertical: 10,
                flex: 1,
                alignItems: 'center'
              }}
              onPress={() => {
                //   String a = "test1";
                //   String b = "test b";
                //   System.out.print('a is:' + a);
                // alert(this.state.userid)
                this.getUpcomingEvent()
              }}
            >
              <Text style={{ color: 'white' }}>
                Up Coming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnEvent}
              onPress={() => {
                //   String a = "test1";
                //   String b = "test b";
                //   System.out.print('a is:' + a);
                // alert(this.state.userid)
                this.getPastEvent()
              }}
            >
              <Text style={{ color: 'white' }}>
                History
              </Text>
            </TouchableOpacity>
          </View>
        </View>


        <FlatList
          data={this.state.event}
          renderItem={({ item }) => this.renderPost(item)}
          numColumns={2}
        />
        <View style={styles.buttonView}>

          <Image source={Buttonbar}
            style={styles.buttonBar}
          />

          <View >
            {/* <Footer
              navigate ={this.props.navigation.navigate}
              pm={(this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.userid) ? this.props.navigation.state.params.userid : null}
             */}
            <Footer
              navigator={this.props.navigator}
              pm={userid}

            />
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  btnItem: { borderWidth: 2, borderColor: 'gray', width: '50%' },
  buttonBar: { position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' },
  posterImg: { alignSelf: 'flex-start', width: '100%', height: 300 },
  topicStyle: { fontSize: 20, alignSelf: 'center' },
  desStyle: { flexDirection: 'row', alignItems: 'center' },
  stdStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imgLine: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  imgLocation: { alignSelf: 'center', width: 30, height: 30 },
  posterStyle: { borderWidth: 2, borderColor: 'gray', width: '50%' },
  searchView: { flexDirection: 'column', height: 55, width: '100%' },
  buttonView: { flexDirection: 'column', height: 55 },
  userStyle: { paddingVertical: 7, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white' },
  userIDsty: { fontSize: 25, fontWeight: 'bold' },
  imgUser: { alignSelf: 'flex-start', width: 90, height: 90 },
  btnEvent: { backgroundColor: '#ae5945', paddingVertical: 10, flex: 1, alignItems: 'center' },


})


export default Main;
