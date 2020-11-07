import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListModal from './ListModal';



export default class HomeScreen extends React.Component {

    state = {
        isAddMode: false,
        addressList: [],
    }
    
    modalHandler = () => {
        this.setState({
            isAddMode: true,
        })
    }

    // print = () => {
        
    //     this.setState({
    //         addressList : [...this.state.addressList, { id: Math.random().toString(), value: 'pp'}],
    //     },() => {
    //         console.log(this.state.addressList)
    //     });
        
    // }


    saveModal = (list) => {
        this.setState({
            addressList: list, //this doesnt work somehow
            isAddMode: false,
        },() => {
           console.log(this.state.addressList)
        });
        
    }

    render () {
        return(
            <View style={styles.container}>
                <Text>home</Text>
                    <Button title="logout" 
                    onPress={() =>
                        this.props.navigation.navigate('LoginScreen')
                    }
                />
                <Button title="openModal" onPress={this.modalHandler}/>
                <ListModal insertlist={this.state.addressList} visibility={this.state.isAddMode} save = {this.saveModal}/>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });