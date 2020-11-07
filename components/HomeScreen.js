import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import React, {Component, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  MapView, { Marker } from 'react-native-maps';

import ListModal from './ListModal';

export default class HomeScreen extends React.Component {
    logout = () =>{
        this.props.navigation.navigate('LoginScreen')
    }

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
                

            <MapView style={styles.mapStyle}
                initialRegion={{
                latitude: 51.5078788,
                longitude: -0.0877321,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009
            }}>
                <Marker
                    coordinate=
                    {{
                        latitude: 51.5078788,
                        longitude: -0.0877321
                    }}
                    title={'Title'}
                    description={'Describe this is cool'}
                />
            </MapView>
            <View style={styles.logout}>
                        <Button title="logout" 
                        onPress={this.logout}
                    />
                     <Button title="openModal" onPress={this.modalHandler}/>
                </View>
               
                <ListModal insertlist={this.state.addressList} visibility={this.state.isAddMode} save = {this.saveModal}/>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    mapStyle: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },

    logout:{
        position: 'absolute',
        alignSelf:'flex-end',
    }
  });