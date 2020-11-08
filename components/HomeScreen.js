import { StyleSheet, Text, View, Button, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, {Component, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';
import ListModal from './ListModal';
import pathFinderTitle from "../assets/PathFinder.png";
import cogs from "../assets/cogs.png";
import salmonHeader from "../assets/salmonHeader.png";
import locationIcon from "../assets/locationicon.png";
import timeRectangle from "../assets/timerectangle.png";

export default class HomeScreen extends React.Component {

    state = {
        list : []
    }

    logout = () => {
        this.props.navigation.navigate('LoginScreen')
    }

    render() {
        const { navigation, route } = this.props;
        
        if (route.params != null && typeof route.params !== 'undefined') {
            // console.log("Params list: " + route.params.list);

            this.setState({
                list : route.params.list
            })
            route.params = null;
        }

        console.log("Gay: " + this.state.list);

        return (
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
                    />
                    </MapView> 
                    <ImageBackground source={salmonHeader} style = {styles.header}/>
                <Image source={cogs} style = {styles.cogs}/>
                <Image source={locationIcon} style = {styles.locationIcon}/>
                <Image source={pathFinderTitle} style = {styles.pathFinderTitle}/>

                   <View style={styles.logout}> 
                   <TouchableOpacity title="logout" 
                     onPress={this.logout
                    }
                    >
                <Text styles ={styles.logout}></Text>
                    </TouchableOpacity>

                        {/* <Button title="logout" 
                        onPress={this.logout}
                    /> */}
                    </View> 
                    <View hide={true} style = {styles.openModal}>
                    <TouchableOpacity title="openModal" 
                     onPress={() =>
                        this.props.navigation.navigate('ListModal')}
                    >
                <Text styles ={styles.openModal}></Text>
                    </TouchableOpacity>
                    
                </View> 
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
    mapStyle: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    logout:{
        flex: 1,
        width: 100/2,
        height: 100/2,
        marginTop: 30,
        position: "absolute",
            top: 0,
            bottom: 0,
            left: 340,
            right: 0,
    },

    header: {
        flex: 10,
        width: 1500/3,
        height: 300/3,
        marginTop: 0,
        position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
    },

    pathFinderTitle: {
        flex: 5,
        width: 740/3,
        height: 190/3,
        marginTop: 25,
        position: "absolute",
            top: 0,
            bottom: 0,
            left: 85,
            right: 0,
    },

    cogs: {
        flex: 1,
        width: 100/2,
        height: 100/2,
        marginTop: 30,
        position: "absolute",
            top: 0,
            bottom: 0,
            left: 340,
            right: 0,
    },

    locationIcon: {
        flex: 1,
        width: 100/2,
        height: 100/2,
        marginTop: 30,
        position: "absolute",
            top: 0,
            bottom: 0,
            left: 20,
            right: 0,
    },

    openModal: {
        flex: 1,
        width: 100/2,
        height: 100/2,
        marginTop: 30,
        position: "absolute",
            top: 0,
            bottom: 0,
            left: 20,
            right: 0,
    },
  });

