import React from "react";
import idx from 'idx';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import TULogo from "../../Images/Logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Bg from "../../Images/bg.jpg";
const { width } = Dimensions.get("window");
import { API_URL } from "../../config/api";
import HeaderText from "../../components/HeaderText";


const categories = [
    { text: 'Sport1' },
    { text: 'Sport2' },
    { text: 'Sport3' },
    { text: 'Sport4' },
    { text: 'Sport5' },
    { text: 'Sport6' },
    { text: 'Sport7' },
    { text: 'Sport8' },
    { text: 'Sport9' },
    { text: 'Sport10' },
    { text: 'Sport11' },
    { text: 'Sport12' },
]

const firstname = "Piyawadee"
const lastname = "Ekkukkararungroj"
const major = "Computer Science"
const department = "Science and Technology"
const nation = "Thai"
const title = "Miss"
const year = "4"
const age = 21
const active = true

class Category extends React.Component {
    state = {
        category: [],
    }

    static navigatorOptions = {
        header: {
            visible: false
        }
    };
    
    componentDidMount() {
        this.getCategories()
    }


    setCategoriesWithSelect(data) {
        return data.map((d) => {
            return {
                ...d,
                isSelect: false,
            };
        });
    }


    getCategories() {
        return new Promise((resolve, reject) => {
            return fetch(API_URL + 'category')
                .then((response) => response.json())
                .then((data) => {
                    console.log('get categories', data)
                    this.setState(
                        { category: this.setCategoriesWithSelect(data) },
                        () => { resolve(); }
                    );
                    const userid = this.props.navigation.getParam('userid', '');
                    // const { userid } = this.props;
                    console.log(userid)
                })
                .catch((error) => {
                    console.error(error);
                    alert("Fail");
                    reject();
                });
        });
    }


    addUser() {
        return new Promise((resolve, reject) => {
            // console.log("+++++++++++++++++++++++++++++")
            // console.log(this.state.category)
            // console.log("----------------------------------------------")
            let result = this.state.category.filter(e => e.isSelect === true)
            let resultid= result.map(e => e.id)
            console.log(resultid)
            console.log(...resultid)
            const userid = this.props.navigation.getParam('userid', '');
            const body = {
                userid: "" + userid,
                firstname: "" + firstname,
                lastname: "" + lastname,
                major: "" + major,
                department: "" + department,
                nation: "" + nation,
                title: "" + title,
                year: "" + year,
                age: age,
                active: active,
                categoryid: resultid,
                userpic: null

            };

            return fetch(API_URL + 'user', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('vinaja', responseJson)
                    // this.getidofuser()
                    // this.addfirstcategory()

                    resolve();
                })
                .catch((error) => {
                    console.error(error);
                    reject();
                });
        }

        );
    }

    // addFavCategory(category) {
    //     return new Promise((resolve, reject) => {

    //         if (category.isSelect === true) {

    //             const body = {
    //                 categoryname: "" + category.categoryname,
    //                 categorydetails: "" + category.categorydetails,
    //                 // userid: [
    //                 //     ...category.userid,
    //                 //     "" + this.props.navigation.state.params.userid
    //                 // ],
    //                 active: category.active

    //             };

    //             // if (category.eventid.length !== 0) {
    //             //     body.eventid = [...category.eventid];
    //             // }

    //             fetch(API_URL + 'category/' + category.id, {
    //                 method: 'PUT',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(body),

    //             })

    //                 .then((response) => response.json())
    //                 .then((responseJson) => {
    //                     console.log('vinaja', responseJson)

    //                     resolve()
    //                 })
    //                 .catch((error) => {
    //                     console.error(error);

    //                     reject()
    //                 });
    //         }
    //         else {
    //             resolve()
    //         }
    //     })
    // }


    toggleSelect(index) {
        let newCate = [...this.state.category];
        // let newCate = this.state.category;


        newCate[index] = {
            ...newCate[index],
            isSelect: !newCate[index].isSelect
        };

        this.setState({
            category: newCate,
        });
    }


    render() {

        return (
            <View style={{ flex: 1 }}>
                <HeaderText
                    header={"Favorite Category"}
                />

                <ScrollView style={styles.scrollStyle}>
                    <View>

                        {this.state.category.map((c, index) => (
                            <View style={{ paddingVertical: 10 }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: (c.isSelect) ? '#E1B899' : '#E79E6D',
                                        padding: 15,
                                        borderRadius: 15,
                                        alignItems: "center"
                                    }}
                                    onPress={() => {
                                        this.toggleSelect(index)
                                    }}
                                >
                                    <Text style={styles.categoryStyle}>
                                        {c.categoryname}
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        ))}


                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ paddingVertical: 10 }}>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={() => {

                                        this.addUser()
                                            // .then(() => {
                                            //     // const actions = this.state.category.map(c => this.addFavCategory(c));
                                            //     // const actions = this.state.category.map(c => 5);
                                            //     // console.log(actions);
                                            //     return Promise.all(this.state.category.map(c => this.addFavCategory(c)));
                                            // })
                                            .then(() => {
                                                alert('All Success');
                                                // Actions.Home({userid: this.props.userid});
                                                // this.props.navigator.push({
                                                //     screen: 'Home',
                                                //     passProps: {
                                                //         userid: this.props.userid
                                                //     },
                                                //   });
                                                const userid = this.props.navigation.getParam('userid', '');
                                                
                                                this.props.navigation.navigate('Home', {
                                                    userid
                                                });

                                            })
                                            .catch((error) => {
                                                console.error(error);
                                                alert('Not Success');

                                            });



                                    }}
                                >
                                    <Text style={{ color: "white", fontSize: 20 }}>
                                        OK
                                     </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    //flexDirection: 'column', backgroundColor: "white", flex: 1 
    scrollStyle: { flexDirection: 'column', backgroundColor: '#FFDFC4', flex: 1 },
    buttonStyle: { backgroundColor: "#ae5945", padding: 15, borderRadius: 15, alignItems: "center" },
    categoryStyle: { color: "white", fontSize: 20 }
})



export default Category;
