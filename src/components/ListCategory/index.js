import React from 'react';
import { View , FlatList, TouchableOpacity, Text , Image, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { API_URL } from "../../config/api";
import HomeIcon from '../../Images/homeicon.png';


const icons = {
    0: { iconName: 'check-all', iconType: 'material-community' },
    1: { iconName: 'pencil', iconType: 'entypo' },
    2: { iconName: 'sports-club', iconType: 'entypo' },
    3: { iconName: 'music', iconType: 'font-awesome' },
    4: { iconName: 'movie', iconType: 'material-community' },
    5: { iconName: 'activity', iconType: 'feather' },
    6: { iconName: 'social-skillshare', iconType: 'foundation' },
    7: { iconName: 'artist', iconType: 'material-community' },
    8: { iconName: 'nature-people', iconType: 'material-icons' },
    9: { iconName: 'adjust', iconType: 'entypo' },
    10: { iconName: 'eyeglass', iconType: 'simple-line-icon' },
    11: { iconName: 'smile-o', iconType: 'font-awesome' },
    12: { iconName: 'hour-glass', iconType: 'entypo' },
}


class ListCategory extends React.PureComponent {

    state = {
        category: [],
        iconName: 'HomeIcon',
        iconType: ''
    }

    componentDidMount() {
        this.getCategories()
        console.log('ListCategory: componentDidMount')
    }


    getCategories() {
        return new Promise((resolve, reject) => {
            return fetch(API_URL + 'category')
                .then((response) => response.json())
                .then((data) => {
                    console.log('ListCategory: get categories', data)
                    this.setState({
                        category: [
                            { categoryname: 'All', id: 0 },
                            ...data
                        ]
                    }, () => {
                        console.log('ListCategory: state', this.state)
                        resolve();
                    });
                    console.log(this.props.userid)
                })
                .catch((error) => {
                    console.error(error);
                    reject();
                });
        });
    }

    limitCategoryText(text){
        if(text.length > 12){
            return text.substring(12, 0) + "...";
        }
        else{
            return text
        }
    }


    renderCategories(item) {
        // console.log('--------- tert')
        // console.log('===> ', item)
        // console.log(item)

        const icon = icons[item.id]
        return (
            <TouchableOpacity
            style={styles.iconStyle}
              onPress={() => {
                // this.setState({ isSelect: item.id })
                this.props.filterCategory(item.id)
                // Actions.Description({ eventid: item.id });
              }}>
              {/* <Image source={HomeIcon} style={{ width: 20, height: 20, backgroundColor: (this.state.isSelect === item.id) ? 'green' : 'white' }} */}
          {/* /> */}
          <Icon name={icon.iconName} type={icon.iconType} size={20}  color={(this.props.isSelectCategory === item.id) ? 'green' : 'white'}
            />          
              <Text style={{fontSize: 15, alignSelf: 'center', color: (this.props.isSelectCategory === item.id) ? 'green' : 'white'}}>
                { this.limitCategoryText(item.categoryname) }
            </Text>
    
              
            </TouchableOpacity>
        )
      }


    render() {
        return (


            <FlatList
                data={this.state.category}
                renderItem={({ item }) => this.renderCategories(item)}
                extraData={this.props}
                keyExtractor={({ id }) => id}
                horizontal={true}
            />

        );
    }
}


const styles = StyleSheet.create({
    iconStyle:{padding:10, paddingTop: 15, width:140 ,backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'column' },
    textStyle:{fontSize: 15, alignSelf: 'center' },

  })

export default ListCategory;