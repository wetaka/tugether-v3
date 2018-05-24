import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';


export default class ButtonBasics extends Component {
    render() {
      return (
        <TouchableOpacity
          style={{ backgroundColor: 'pink', padding: 15, borderRadius: 15 , alignItems: 'center' }}
          onPress={this.props.onPressBtn}
        >
            <Text style={{color:'white', fontSize: 30}}>
                {this.props.btnName}
            </Text>
        </TouchableOpacity>
      );
    }
  }


