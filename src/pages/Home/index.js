import React from 'react';
import idx from 'idx';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, FlatList, AsyncStorage, StyleSheet } from 'react-native';
import imgposter1 from '../../Images/poster1.jpg'
import imgposter2 from '../../Images/poster2.jpg'
import location from '../../Images/location.png'
import line from '../../Images/line.png'
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
// import { Actions } from "react-native-router-flux";
import Footer from "../../components/Footer";
import SearchHeader from "../../components/SearchHeader";
import SearchBox from "../../components/SearchBox";
import { API_URL } from "../../config/api";
import ListCategory from '../../components/ListCategory';
import { Transition } from 'react-navigation-fluid-transitions';
import HeaderText from "../../components/HeaderText";
import { Button, Divider } from 'react-native-elements';

const ROW_HEIGHT = 650;
const COLS = 2;

// import posterframe from '../../Images/posterframe.jpg'
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
//   },
//   {
//     id: '12345556',
//     imgposter: imgposter2,
//     name: 'Life Dream Journey',
//     month: 'AUG',
//     date: '1',
//     img: location,
//     place: 'ศูนย์ประชุม',
//   },
//   {
//     id: '12345557',
//     imgposter: imgposter2,
//     name: 'Life Dream Journey',
//     month: 'AUG',
//     date: '1',
//     img: location,
//     place: 'ศูนย์ประชุม',
//   },
//   {
//     id: '12345557',
//     imgposter: imgposter2,
//     name: 'Life Dream Journey',
//     month: 'AUG',
//     date: '1',
//     img: location,
//     place: 'ศูนย์ประชุม',
//   }
// ]


class Home extends React.Component {

  static navigatorOptions = {
    header: {
      visible: false
    }
  };

  state = {
    user: {
      userid: "",
      firstname: "",
      lastname: ""
    },
    searchword: "",
    words: [],
    isSelectCategory: 0,
    maxSize: 0,
    event: [],
    loader: false,
  };


  filterCategory(id) {
    //alert(id)
    this.setState(
      { isSelectCategory: id },
      () => { this.searchEvent() }
    )
  }

  setEventAll(data) {
    return data.map((d) => {
      return {
        ...d,
        // posterpic: { uri: d.posterpic },
        posterpic: {uri : d.posterpic},
        eventstdate: new Date(d.eventstdate)
      };
    });
  }

  getAllEventActive() {
    console.log('get all Event')
    // alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
    //192.168.1.4
    fetch(API_URL + 'event')
      // fetch('http://172.25.79.95:8000/api/event')

      .then((response) => response.json())
      .then((data) => {
        console.log('get eventid', data)
        this.setState({
          event: this.setEventAll(data),
          loader: false

        }, () => { console.log("test state", this.state) });
        //console.log(this.props.eventid)
      })
      .catch((error) => {
        console.error(error);
        alert("Fail");
      });
  }


  getUserByID() {
    return new Promise((resolve, reject) => {
      const userid = this.props.navigation.getParam('userid', '');
      // alert(userid)   
      return fetch(API_URL + 'user/' + userid)
        .then((response) => response.json())
        .then((data) => {
          console.log("fixbug getUserByID then 1")
          // this.setState({ category: this.setCategoriesWithSelect(data) });
          return AsyncStorage.setItem('CURRENT_USER', JSON.stringify({
            ...data,
            userpic: data.userpic,
          }));
          // console.log(this.props.navigation.state.params.userid)                      
        })
        .then(() => {
          console.log("fixbug getUserByID then 2")
          this.getAllEventActive();

          resolve();
        })
        .catch((error) => {
          console.log("fixbug getUserByID catch", error)
          reject()
        });
    })
  }

  componentWillMount() {
    console.log("fixbug ComponentWillMount jaaaaa")
    if (this.isFromLoginPage()) {
      console.log("if jaaaaaaaaaaaaaaaaaaaaaa")
      this.getUserByID();
      const userid = this.props.navigation.getParam('userid', '');

      console.log("fixbug ComponentWillMount if", userid)
    }
    else {
      console.log("else jaaaaaaaaaaaaaaaaaaaaaaaa")
      this.getCurrentUser();
      console.log("fixbug ComponentWillMount else")
    }
  }

  getCurrentUser() {
    this.setState({
      loader: true
    })
    return AsyncStorage.getItem('CURRENT_USER')
      .then(value => {
        if (value) {
          // We have data!!
          console.log(value);
          this.getAllEventActive();
          ////////////////////WIP////////////////

        }
        else {
          // Actions.Login();
          this.props.navigation.navigate('Login')

          // this.props.navigator.push({
          //   screen: 'Login'
          // });

        }
      })
  }

  isFromLoginPage = () => {
    console.log('isFromLoginPage', this.props)
    console.log(this.props)

    const userid = this.props.navigation.getParam('userid', '');
    console.log('get user => ', userid);

    return !!(userid)
  }


  componentWillReceiveProps(nextProps) {
    // this.getUser();
    // console.log("fixbug componentWillReceiveProps Home", )
    if (
      nextProps.navigation.getParam('userid', '')
      && !this.props.navigation.getParam('userid', '')
    ) {
    
      console.log('============================= componentWillReceiveProps Home return', nextProps)
      return;
    }


    if (this.isFromLoginPage()) {
      console.log("if jaaaaaaaaaaaaaaaaaaaaaa")
      this.getUserByID();
      const userid = this.props.navigation.getParam('userid', '');

      console.log("fixbug ComponentWillMount if", userid)
    }
    else {
      console.log("else jaaaaaaaaaaaaaaaaaaaaaaaa")
      this.getCurrentUser();
      console.log("fixbug ComponentWillMount else")
    }
  }


  searchEvent() {
    let { searchword } = this.state
    return new Promise((resolve, reject) => {
      let text = ""
      if (searchword != null) {
        text = "?searchword=" + searchword
      }
      else {
        text = ""
      }
      return fetch(API_URL + 'search-event/' + this.state.isSelectCategory + "" + text)
        .then((response) => response.json())
        .then((data) => {
          console.log("fixbug Search then 1")
          console.log(data)

          this.setState({
            event: this.setEventAll(data.data),
            maxSize: data.max_size,
          }, () => {
            console.log("test search", this.state)
            resolve()
          });

        })
        .catch((error) => {
          console.log("fixbug Search catch", error)
          reject()
        });
    })

  }

  //****************************************************************************** */

  // onAssetPress = (image, key) => {
  //   this.props.navigator.push({
  //     screen: 'example.Transitions.SharedElementTransitions.Masonry.Item',
  //     sharedElements: [key],
  //     passProps: {
  //       image,
  //       sharedImageId: key,
  //     },
  //   });
  // };

  // renderAsset = (asset, row, column, index) => {
  //   // const key = `row_${row}_column_${column}_asset_${index}`;

  //   return (
  //     <TouchableHighlight
  //       // key={key}
  //       // onPress={() => {
  //       //   this.onAssetPress(asset.source, key);
  //       // }}
  //       onPress={() => {

  //         this.props.navigator.push({
  //           screen: 'Description',
  //           sharedElements: [item.id],
  //           passProps: {
  //             eventid: item.id,
  //           },
  //         });

  //       }}

  //       style={[styles.assetContainer, { flex: asset.weight }]}
  //     >
  //       <View style={{ flex: 1 }}>
  //         <SharedElementTransition
  //           style={{ flex: 1 }}
  //           // sharedElementId={key}
  //           sharedElementId={"" + item.id}

  //         >
  //           <Image
  //             // source={asset.source}
  //             source={item.posterpic}

  //             resizeMode={'cover'}
  //             style={styles.asset}
  //           />
  //         </SharedElementTransition>
  //       </View>

  //       <Text style={styles.topicStyle}>{item.topic}</Text>
  //       <Text style={{ fontSize: 20 }}>___________________</Text>
  //       <View style={styles.desStyle}>
  //         <View style={styles.stdStyle}>
  //           <Text style={{ fontSize: 15 }}>{item.eventstdate}</Text>
  //         </View>
  //         <View style={styles.imgLine}>
  //           <Image source={line} style={{ alignSelf: 'flex-start' }} />
  //           <View>
  //             <Image source={location} style={styles.imgLocation} />
  //             <Text style={{ fontSize: 15 }}>{item.location}</Text>
  //           </View>
  //         </View>
  //       </View>
  //     </TouchableHighlight>
  //   );
  // };

  // renderItem = ({ item, index }) => {
  //   return (
  //     <View style={[styles.item]}>
  //       {[...new Array(COLS)].map((column, columnIndex) => (
  //         <View
  //           // key={`row_${index}_column_${columnIndex}`}
  //           style={{ flex: 1 }}
  //         >
  //           {item[columnIndex].map((asset, assetIndex) => this.renderAsset(asset, index, columnIndex, assetIndex))}
  //         </View>
  //       ))}
  //     </View>
  //   );
  // };

  // renderPost(item) {
  //   // console.log('--------- tert')
  //   // console.log('===> ', item)
  //   console.log(item)
  //   return (
  //     <View style={styles.posterStyle} >
  //       <TouchableOpacity
  //         onPress={() => {

  //           this.props.navigator.push({
  //             screen: 'Description',
  //             sharedElements: [item.id],
  //             passProps: {
  //               eventid: item.id,
  //             },
  //           });

  //         }}>

  //         <View style={{ flex: 1 }}>
  //           <SharedElementTransition
  //             style={{ flex: 1 }}
  //             sharedElementId={"" + item.id}
  //           >
  //             <Image source={item.posterpic}
  //               resizeMode={'cover'}
  //               style={styles.posterImg} />

  //           </SharedElementTransition>
  //         </View>


  //         <Text style={styles.topicStyle}>{item.topic}</Text>
  //         <Text style={{ fontSize: 20 }}>___________________</Text>
  //         <View style={styles.desStyle}>
  //           <View style={styles.stdStyle}>
  //             <Text style={{ fontSize: 15 }}>{item.eventstdate}</Text>
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

  render() {
    const userid = this.props.navigation.getParam('userid', '');
    console.log('get user in render', userid);
    return (
      <View style={{ flex: 1 }}>

        {/* search */}
        <HeaderText
          header={"Home"}
        />


        {/* <View style={styles.searchView}>
          <SearchHeader />
        </View> */}

        <SearchBox
          ref='search_box'
          onSearch={() => this.searchEvent()}
          autoCompleteWords={this.state.words}
          isSelectCategory={this.state.isSelectCategory}
          onChangeText={text => {
            this.setState(
              { searchword: text }
            )
          }}
          onCancel={() => this.setState({ searchword: '' })}
          onDelete={() => this.setState({ searchword: '' })}
        />

        <ListCategory
          isSelectCategory={this.state.isSelectCategory}
          filterCategory={(id) => { this.filterCategory(id) }}
        />

        < ScrollView >
          <View style={{  flex: 1,  borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>

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
                      <Divider style={{ backgroundColor: '#4c4a45' }}/>
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
                      {/* <Text style={{ fontSize: 20 }}>________________________________</Text> */}
                      <Divider style={{ backgroundColor: '#4c4a45' }} />
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


        {/* <View style={styles.container}>
          <FlatList
            data={this.state.event}
            renderItem={this.renderItem}
            getItemLayout={(layout, index) => ({ length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index })}
            extraData={this.state}

            keyExtractor={item => item.id}
          />
        </View> */}

        {/* <FlatList
          data={this.state.event}
          renderItem={({ item }) => this.renderPost(item)}
          numColumns={2}
          extraData={this.state}
          keyExtractor={item => item.id} */}
        {/* // getItemLayout={(layout, index) => ({length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index})} */}
        {/* /> */}


        <View style={styles.buttonView}>

          <Image source={Buttonbar}
            style={styles.buttonBar}
          />


          <View>
            <Footer
              navigator={this.props.navigation.navigate}
              pm={userid}

            // navigate={this.props.navigation.navigate}

            // pm={(this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.userid) ? this.props.navigation.state.params.userid : null}
            // const { eventid } = this.props.navigation.state.params;
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonBar: { position: 'absolute', width: '100%', height: 55 },
  
  //edit height 
  posterImg: { alignSelf: 'flex-start', width: '100%', height:height,borderTopLeftRadius: 10, borderTopRightRadius: 10  },
  topicStyle: { fontSize: 20, alignSelf: 'center',paddingVertical: 7 },
  desStyle: { flexDirection: 'row', alignItems: 'center' },
  stdStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imgLine: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  imgLocation: { alignSelf: 'center', width: 20, height: 20 },
  posterStyle: { borderWidth: 2, borderColor: 'gray', width: '50%' },
  searchView: { flexDirection: 'column', height: 55, width: '100%' },
  buttonView: { flexDirection: 'column', height: 55 },
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

export default Home;
