import { StyleSheet, Text, View, Button, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, {Component, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import * as Permission from 'expo-permissions';
import * as Location from 'expo-location';
import ListModal from './ListModal';
import pathFinderTitle from "../assets/PathFinder.png";
import cogs from "../assets/cogs.png";
import salmonHeader from "../assets/salmonHeader.png";
import locationIcon from "../assets/locationicon.png";
import timeRectangle from "../assets/timerectangle.png";



export default class HomeScreen extends React.Component {
    

    state = {
        list : [],
        location: 0,
        latitude: 0,
        longitude: 0,
        latdel: 0.5,
        longdel: 0.5,
        latmax: -90,
        latmin: 90,
        longmax: -180,
        longmin: 180,
        error: null
    }

    print = () => {
        
    }
    
    logout = () => {
        this.props.navigation.navigate('LoginScreen')        
    }
    

    findmaxmin = (obj) => {
        // if (obj.latitude>this.state.latmax){
        //     this.setState({
        //         latmax : obj.latitude
        //     }), () => {
        //         this.print();
        //       };
        // }
        // if (obj.latitude<this.state.latmin){
        //     this.setState({
        //         latmin : obj.latitude
        //     })
        // }
        // if (obj.longitude>this.state.longmax){
        //     this.setState({
        //         longmax : obj.longitude
        //     })
        // }
        // if (obj.longitude<this.state.longmin){
        //     this.setState({
        //         longmin : obj.longitude
        //     })
        // }
        
        // if (this.state.longmax-this.state.longmin > 1){
        //     this.setState({
        //         longdel: this.state.longmax-this.state.longmin
        //     }), () => {
        //         this.print();
        //       };
        // }
        // if (this.state.latmax-this.state.latmin > 1){
        //     this.setState({
        //         latdel: this.state.latmax-this.state.latmin
        //     }), () => {
        //         this.print();
        //       };
        // }
        // this.setState({
        //     longitude: obj.longitude,
        //     latitude: obj.latitude
        // }), () => {
        //     this.print();
        //   };
            
        
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

        const obj = this.state.list
        console.log(this.state.latdel + " " + this.state.longdel)

        // this.state.list.forEach(this.findmaxmin)




        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                    initialRegion={{
                        latitude: 37.6219983,
                        longitude: -122.084,
                        latitudeDelta: this.state.latdel,
                        longitudeDelta: this.state.longdel
                    }}>



                    {this.state.list.map((object, index) => {
                        return(<Marker
                            key={index}
                            coordinate={{
                              latitude: parseFloat(object.latitude),
                              longitude: parseFloat(object.longitude)
                            }}
                            title={object.value}
                            pinColor={"#ffd1dc"}
                          />)
                    })}

                    </MapView> 
                    <ImageBackground source={salmonHeader} style = {styles.header}/>
                <Image source={cogs} style = {styles.cogs}/>
                <Image source={locationIcon} style = {styles.locationIcon}/>
                <Image source={pathFinderTitle} style = {styles.pathFinderTitle}/>
                <View style={styles.totaltime}>
                        <Text style={styles.totaltimetext}>Total Time: </Text>
                </View>

                <View style={styles.nextTime}>
                        <Text style={styles.nextTimetext}>Time Until Next Stop: </Text>
                </View>
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
                        this.props.navigation.navigate('ListModal', {list : this.state.list}, )}
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

    totaltime: {
        flex: 1,
        marginTop: 550,
        marginLeft: 25,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: "absolute",
    },

    totaltimetext:{
        fontSize: 15,
        textAlign: 'left',
    },

    nextTime: {
        flex: 1,
        marginTop: 600,
        marginLeft: 25,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: "absolute",
    }, 

    nextTimetext:{
        fontSize: 15,
        textAlign: 'left',
    },
  });

