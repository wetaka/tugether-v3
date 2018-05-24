import React from 'react';
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
import { Navigation, SharedElementTransition } from 'react-native-navigation';
import { Row, Column as Col, ScreenInfo, Grid } from 'react-native-responsive-grid'


// import posterframe from '../../Images/posterframe.jpg'
const { width, height } = Dimensions.get('window');
const sizes = { sm: 100, md: 50, lg: 25, xl: 20 }


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



class MasonryPage extends React.Component {


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
    height: 0,
    width: 0
  };

  Item = (key,id, posterpic,height,width,topic,month,date,location,margin,colWidth,state) => {
    console.log(props)
    console.log("-------------------------------------------------")
    console.log(props.imgposter)

      if (!colWidth) return null

      return (
        <Row
          style={{
            backgroundColor: 'white',
            margin: props.margin, borderRadius: 15, borderWidth: 1, borderColor: 'black'
          }}
        >
          <Col fullWidth>
            {console.log('Img Poster ===============================')}
            <View>
              <ImageBackground
                source={posterpic}
                style={{
                  width: colWidth,
                  height: height + ((colWidth - width) * height / width),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}

              >
              </ImageBackground>
              {/* ---------------------------------------------------------- */}
              <Text style={styles.topicStyle}>{topic}</Text>
              <Text style={{ fontSize: 20 }}> _____________________________</Text>
              <View style={styles.desStyle}>
                <View style={styles.stdStyle}>
                  <Text style={{ fontSize: 15 }}>10-02-2018</Text>
                </View>
                <View style={styles.imgLine}>
                  <Image source={line} style={{ alignSelf: 'flex-start' }} />
                  <View style={styles.stdStyle}>
                    <Image source={location} style={styles.imgLocation} />
                    <Text style={{ fontSize: 15 }}>{location}</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* add description */}
          </Col>
        </Row>
      )
    
  }



  layout = (state) => {

    const numCols = Math.floor(100 / sizes[ScreenInfo().mediaSize])
    const numRows = Math.ceil(this.state.event.length / numCols)
    const colWidth = state.layout.grid ? state.layout.grid.width / numCols : 0

    let layoutMatrix = [], layoutCols = []

    for (let col = 0; col < numCols; col++) {
      layoutMatrix.push([])
      for (let row = 0, i = col; row < numRows; row++ , i += numCols) {
        if (this.state.event[i])
          // Image.getSize(this.state.event[i].posterpic.uri, (width, height) => { this.setState({ width, height }) });
          Image.getSize(imgposter1, (width, height) => { this.setState({ width, height }) });
          
        layoutMatrix[col].push(() => {
          this.item(key={i},id={i},
            // url={data[i].url}
            // posterpic=this.state.event[i].posterpic.uri
            posterpic={imgposter1}
            ,height=this.state.height
            ,width=this.state.width
            ,topic=this.state.event[i].topic
            ,month=6
            ,date=10
            ,place=this.state.event[i].location
            // ,location=this.state.event[i].location
            ,margin=15
            ,cwidth=colWidth
            ,state=state)
          // <Item
          //   key={i}
          //   id={i}
          //   // url={data[i].url}
          //   posterpic={this.state.event[i].posterpic.uri}

          //   height={this.state.height}
          //   width={this.state.width}
          //   topic={this.state.event[i].topic}
          //   month={6}
          //   date={10}
          //   location={this.state.event[i].location}
          //   margin={15}
          //   colWidth={colWidth}
          //   state={state}
          // />
        })
        console.log("***************************************")
        // console.log(data[i].imgposter)
        // console.log(data[i].url)
      }
      layoutCols.push(
        <Col
          key={col}
          smSize={state.layout.grid ? sizes.sm : 0}
          mdSize={state.layout.grid ? sizes.md : 0}
          lgSize={state.layout.grid ? sizes.lg : 0}
          xlSize={state.layout.grid ? sizes.xl : 0}
        >
          {layoutMatrix[col]}
        </Col>
      )
    }

    return layoutCols
  }


  // Home = () => (
  //   <Grid>{({ state, setState }) => (
  //     <Row fullHeight style={{ backgroundColor: 'lightgray' }}>
  //       <ScrollView removeClippedSubviews={true} >
  //         <Row >
  //           {layout(state)}
  //         </Row>
  //       </ScrollView>
  //     </Row>
  //   )}
  //   </Grid>)


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
        posterpic: { uri: d.posterpic },
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
          event: this.setEventAll(data)

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
      return fetch(API_URL + 'user/' + this.props.userid)
        .then((response) => response.json())
        .then((data) => {
          console.log("fixbug getUserByID then 1")
          // this.setState({ category: this.setCategoriesWithSelect(data) });
          return AsyncStorage.setItem('CURRENT_USER', JSON.stringify(data));
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

      console.log("fixbug ComponentWillMount if", this.props.userid)
    }
    else {
      console.log("else jaaaaaaaaaaaaaaaaaaaaaaaa")
      this.getCurrentUser();
      console.log("fixbug ComponentWillMount else")
    }
  }

  getCurrentUser() {
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
          // this.props.navigation.navigate('Login')

          this.props.navigator.push({
            screen: 'Login'
          });

        }
      })
  }

  isFromLoginPage() {
    console.log('isFromLoginPage', this.props)
    return !!(this.props.userid)
  }


  componentDidMount() {
    // this.getUser();


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
            event: [...data.data],
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


  renderPost(item) {
    // console.log('--------- tert')
    // console.log('===> ', item)
    console.log(item)
    return (
      <View style={styles.posterStyle} >
        <TouchableOpacity
          onPress={() => {

            this.props.navigator.push({
              screen: 'Description',
              sharedElements: [item.id],
              passProps: {
                eventid: item.id,
              },
            });

          }}>

          <View style={{ flex: 1 }}>
            <SharedElementTransition
              style={{ flex: 1 }}
              sharedElementId={"" + item.id}
            >
              <Image source={item.posterpic}
                resizeMode={'cover'}
                style={styles.posterImg} />

            </SharedElementTransition>
          </View>


          <Text style={styles.topicStyle}>{item.topic}</Text>
          <Text style={{ fontSize: 20 }}>___________________</Text>
          <View style={styles.desStyle}>
            <View style={styles.stdStyle}>
              <Text style={{ fontSize: 15 }}>{item.eventstdate}</Text>
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

  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* search */}
        <HeaderText
          header={"MasonnyPage"}
        />


        {/* // <View style={styles.searchView}>
        //   <SearchHeader />
        // </View> */}

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


        <Grid>{({ state, setState }) => (
          <Row fullHeight style={{ backgroundColor: 'lightgray' }}>
            <ScrollView removeClippedSubviews={true} >
              <Row >
                {this.layout(state)}
              </Row>
            </ScrollView>
          </Row>
        )}
        </Grid>


        {/* <FlatList
          data={this.state.event}
          renderItem={({ item }) => this.renderPost(item)}
          numColumns={2}
          extraData={this.state}
          keyExtractor={item => item.id}
          // getItemLayout={(layout, index) => ({length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index})}
        /> */}


        <View style={styles.buttonView}>

          <Image source={Buttonbar}
            style={styles.buttonBar}
          />


          <View>
            <Footer
              navigator={this.props.navigator}
              pm={this.props.userid}

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
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
  },
  asset: {
    flex: 1,
    borderRadius: 6,
  },
})

export default MasonryPage;
