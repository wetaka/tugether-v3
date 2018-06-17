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
import kaimook from '../../Images/userdefault.png'
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
import { Button, Divider } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

// const posters = [
//   {
//     id: '12345555',
//     imgposter: imgposter1,
//     name: 'TU Freshynight',
//     month: 'NOV',
//     date: '16',
//     img: location,
//     place: 'Gym 5',
//   }
// ]


class Main extends React.Component {


  state = {
    user: {
      userid: "",
      firstname: "",
      lastname: "",
      userpic: kaimook
    },
    maxSize: 0,
    event: [],
    post: true,
    isselectap: true,
    isselectwt: false,
    mp: true,
    uc: false,
    hr: false,
    loader: true


  };



  static navigatorOptions = {
    header: {
      visible: false
    }
  };

  // renderPost(item) {
  //   // console.log('--------- tert')
  //   // console.log('===> ', item.eventid)
  //   // console.log(item)
  //   return (


  //     <View style={styles.btnItem}>
  //       <TouchableOpacity
  //         onPress={() => {
  //           //   String a = "test1";
  //           //   String b = "test b";
  //           //   System.out.print('a is:' + a);
  //           // alert(this.state.userid)

  //           // Actions.Description({ eventid: item.id });

  //           // this.props.navigator.push({
  //           //   screen: 'Description',
  //           //   passProps: {
  //           //     eventid: item.id,
  //           //   },
  //           // });



  //           this.props.navigation.navigate('Description',{
  //             eventid: item.id
  //           })
  //         }}>
  //         <Transition shared='circle'>
  //           <Image source={imgposter1} style={styles.posterImg} />
  //         </Transition>
  //         <Text style={styles.topicStyle}>{item.topic}</Text>
  //         <Text style={{ fontSize: 20 }}>___________________</Text>
  //         <View style={styles.desStyle}>
  //           <View style={styles.stdStyle}>
  //             <Text style={{ fontSize: 15 }}>{item.startdate}</Text>
  //             {/* <Text style={{ fontSize: 15 }}>{item.date}</Text> */}
  //           </View>
  //           <View style={styles.imgLine}>
  //             <Image source={line} style={{ alignSelf: 'flex-start' }} />
  //             <View>
  //               <Image source={location} style={styles.imgLocation} />
  //               <Text style={{ fontSize: 15 }}>{item.location}</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //     </View>

  //   )
  // }

  reload = () => {
    this.getCurrentUser();
  }

  setEventAll(data) {
    return data.map((d) => {
      return {
        ...d,
        // posterpic: { uri: d.posterpic },
        posterpic: { uri: d.posterpic },
        eventstdate: new Date(d.eventstdate)
      };
    });
  }

  getCurrentUser() {
    console.log("getCurrentUser Main page")

    return AsyncStorage.getItem('CURRENT_USER')
      .then(value => {
        console.log('get Value ,,,', value)
        value = JSON.parse(value);
        console.log('value   ', value);
        if (value) {
          // We have data!!
          // TODO hotfix
          if (!!value.userpic) {
            console.log('====== value.userpic have value ======', value.userpic);

            this.setState({
              user: {
                userid: value.userid,
                firstname: value.firstname,
                lastname: value.lastname,
                userpic: { uri: value.userpic }
              }
            }, () => { this.getYourEventApprove() });
          }
          else{
            this.setState({
              user: {
                userid: value.userid,
                firstname: value.firstname,
                lastname: value.lastname,
                userpic: kaimook
              }
            }, () => { this.getYourEventApprove() });
          }

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
          event: this.setEventAll(data.data),
          maxSize: data.max_size,
          post: false,
          mp: false,
          uc: true,
          hr: false
        }, () => { console.log("test state upcoming", this.state) });
        //console.log(this.props.eventid)
      })
      .catch((error) => {
        console.error(error);
        alert("Fail");
      });
  }


  getYourEventApprove() {
    // alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
    fetch(API_URL + 'get-your-event-approve/' + this.state.user.userid)
      .then((response) => response.json())
      .then((data) => {
        console.log('get your eventid', data)
        this.setState({
          event: this.setEventAll(data.data),
          maxSize: data.max_size,
          post: true,
          isselectap: true,
          isselectwt: false,
          mp: true,
          uc: false,
          hr: false
        }, () => { console.log("test state get your event", this.state) });
        //console.log(this.props.eventid)
      })
      .catch((error) => {
        console.error(error);
        alert("Fail");
      });
  }

  getYourEventWaitApprove() {
    // alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
    fetch(API_URL + 'get-your-event-waitapprove/' + this.state.user.userid)
      .then((response) => response.json())
      .then((data) => {
        console.log('get your eventid', data)
        this.setState({
          event: this.setEventAll(data.data),
          maxSize: data.max_size,
          post: true,
          isselectap: false,
          isselectwt: true,
          mp: true,
          uc: false,
          hr: false
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
          event: this.setEventAll(data.data),
          maxSize: data.max_size,
          post: false,
          mp: false,
          uc: false,
          hr: true
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

  componentWillReceiveProps() {
    this.getCurrentUser();
  }


  render() {
    console.log('render Main Props => ', this.props.navigation.navigate)
    const userid = this.props.navigation.getParam('userid', '');
    const { user } = this.state;
    console.log("This.state    : ", user)
    console.log("Main push...", this.props)

    return (

      <View style={{ flex: 1 }}>

        <HeaderMain
          navigator={this.props.navigation.navigate}
          mainReload={this.reload}
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
            <Image source={user.userpic} style={styles.imgUser} />
          </View>
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity
              style={{
                backgroundColor: (this.state.mp) ? '#ad2e00' : '#ae5945',
                paddingVertical: 10,
                flex: 1,
                alignItems: 'center'
              }}
              onPress={() => {
                //   String a = "test1";
                //   String b = "test b";
                //   System.out.print('a is:' + a);
                // alert(this.state.userid)
                this.getYourEventApprove()
              }}
            >
              <Text style={{ color: 'white' }}>
                My Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: (this.state.uc) ? '#ad2e00' : '#ae5945',
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
              style={{
                backgroundColor: (this.state.hr) ? '#ad2e00' : '#ae5945',
                paddingVertical: 10,
                flex: 1,
                alignItems: 'center'
              }}
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

        < ScrollView >

          {
            (this.state.post)
              ? (
                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: (this.state.isselectap) ? '#f4bc44' : '#ae5945',
                      paddingVertical: 10,
                      flex: 1,
                      alignItems: 'center'
                    }}
                    onPress={() => {
                      //   String a = "test1";
                      //   String b = "test b";
                      //   System.out.print('a is:' + a);
                      // alert(this.state.userid)
                      this.getYourEventApprove()
                    }}
                  >
                    <Text style={{ color: 'white' }}>
                      Approved
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: (this.state.isselectwt) ? '#f4bc44' : '#ae5945',
                      paddingVertical: 10,
                      flex: 1,
                      alignItems: 'center'
                    }}
                    onPress={() => {
                      //   String a = "test1";
                      //   String b = "test b";
                      //   System.out.print('a is:' + a);
                      // alert(this.state.userid)
                      this.getYourEventWaitApprove()
                    }}
                  >
                    <Text style={{ color: 'white' }}>
                      Proceed
                      </Text>
                  </TouchableOpacity>
                </View>
              )
              : null
          }
          <View style={{ flex: 1, borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              {this.state.event
                .filter((c, index) => index % 2 === 0)
                .map((c) => (

                  <View key={c.id} style={[styles.assetContainer, { backgroundColor: '#ffffff' }]}>
                    <TouchableOpacity
                      onPress={() => {

                        // this.props.navigator.push({
                        //   screen: 'Description',
                        //   sharedElements: ["55"],
                        //   passProps: {
                        //     eventid: "55",
                        //     image: c.posterpic
                        //   },
                        // });
                        this.props.navigation.navigate('Description', {
                          eventid: c.id,
                          image: c.posterpic,
                        });

                      }}>

                      <View>
                        {/* <View style={{ flex: 1 }}> */}
                        <Transition shared={c.id}>
                          <Image source={c.posterpic}
                            resizeMode={'cover'}
                            style={styles.posterImg} />
                        </Transition>

                      </View>

                      <Text style={styles.topicStyle}>{c.topic}</Text>
                      <Divider style={{ backgroundColor: '#4c4a45' }} />
                      {/* <Text style={{ fontSize: 20 }}>________________________________</Text> */}
                      <View style={styles.desStyle}>
                        <View style={styles.stdStyle}>
                          {/* <Text style={{ fontSize: 15, alignSelf: 'center' }}>{c.eventstdate}</Text> */}
                          <Text style={{ fontSize: 15, alignSelf: 'center' }}>{this.setFormatDate(c.eventstdate.getDate(), c.eventstdate.getMonth() + 1, c.eventstdate.getFullYear())}</Text>

                        </View>
                        <View style={styles.imgLine}>
                          <Image source={line} style={{ alignSelf: 'flex-start' }} />
                          <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Image source={location} style={styles.imgLocation} />
                            <Text style={{ fontSize: 15, alignSelf: 'center' }}>{c.location}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  // <View>
                  //   <Image source={c.posterpic}
                  //     style={styles.posterImg} />
                  //   <Text>
                  //     Hello Boy {c.topic}
                  //   </Text>
                  // </View>
                ))}

            </View>
            <View style={{ flex: 1 }}>
              {this.state.event
                .filter((c, index) => index % 2 !== 0)
                .map((c) => (

                  <View key={c.id} style={[styles.assetContainer, { backgroundColor: '#ffffff' }]}>
                    <TouchableOpacity
                      onPress={() => {

                        // this.props.navigator.push({
                        //   screen: 'Description',
                        //   // sharedElements: ["test"],
                        //   passProps: {
                        //     eventid: "" + c.id,
                        //     image: c.posterpic
                        //   },
                        // });

                        this.props.navigation.navigate('Description', {
                          eventid: c.id,
                          image: c.posterpic,
                        });

                      }}>

                      <View>
                        {/* <View style={{ flex: 1 }}> */}


                        {/* <SharedElementTransition
                          style={{ flex: 1 }}
                          sharedElementId={"test"}
                        > */}
                        <Transition shared={c.id}>
                          <Image source={c.posterpic}
                            resizeMode={'cover'}
                            style={styles.posterImg} />
                        </Transition>

                        {/* </SharedElementTransition> */}
                      </View>


                      <Text style={styles.topicStyle}>{c.topic}</Text>
                      <Divider style={{ backgroundColor: '#4c4a45' }} />
                      {/* <Text style={{ fontSize: 20 }}>________________________________</Text> */}
                      <View style={styles.desStyle}>
                        <View style={styles.stdStyle}>
                          <Text style={{ fontSize: 15, alignSelf: 'center' }}>{this.setFormatDate(c.eventstdate.getDate(), c.eventstdate.getMonth() + 1, c.eventstdate.getFullYear())}</Text>

                          {/* <Text style={{ fontSize: 15, alignSelf: 'center' }}>{c.eventstdate}</Text> */}
                        </View>
                        <View style={styles.imgLine}>
                          <Image source={line} style={{ alignSelf: 'flex-start' }} />
                          <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Image source={location} style={styles.imgLocation} />
                            <Text style={{ fontSize: 15, alignSelf: 'center' }}>{c.location}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  // <View>
                  //   <Image source={imgposter2}
                  //     style={styles.posterImg} />
                  //   <Text>
                  //     Hello girl {c.topic}
                  //   </Text>
                  // </View>
                ))}

            </View>
            {/* <View>
                            {this.posters.map((c) => (<Image source={(c.id % 2 !== 0) ? imgposter1 : imgposter2}
                                style={styles.posterImg} />
                            ))}
                        </View> */}



          </View>
        </ScrollView >

        {/* <FlatList
          data={this.state.event}
          renderItem={({ item }) => this.renderPost(item)}
          numColumns={2}
        /> */}
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
              navigator={this.props.navigation.navigate}
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

  posterImg: { alignSelf: 'flex-start', width: '100%', height: height, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  topicStyle: { fontSize: 20, alignSelf: 'center', paddingVertical: 7 },
  desStyle: { flexDirection: 'row', alignItems: 'center' },
  stdStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imgLine: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  imgLocation: { alignSelf: 'center', width: 20, height: 20 },
  posterStyle: { borderWidth: 2, borderColor: 'gray', width: '50%' },

  searchView: { flexDirection: 'column', height: 55, width: '100%' },
  buttonView: { flexDirection: 'column', height: 55 },
  userStyle: { paddingVertical: 7, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white' },
  userIDsty: { fontSize: 25, fontWeight: 'bold' },
  imgUser: { alignSelf: 'flex-start', width: 150, height: 150, borderRadius: 100 },
  btnEvent: { backgroundColor: '#ae5945', paddingVertical: 10, flex: 1, alignItems: 'center' },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
  },
  assetContainer: {
    margin: 5,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  asset: {
    flex: 1,
    borderRadius: 6,
  },

})


export default Main;
