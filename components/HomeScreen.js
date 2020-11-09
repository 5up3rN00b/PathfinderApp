import { Linking, StyleSheet, Text, View, Button, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, {Component, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Polyline, Marker, AnimatedRegion } from 'react-native-maps';
import * as Permission from 'expo-permissions';
import * as Location from 'expo-location';
import ListModal from './ListModal';
import pathFinderTitle from "../assets/PathFinder.png";
import cogs from "../assets/cogs.png";
import salmonHeader from "../assets/salmonHeader.png";
import locationIcon from "../assets/locationicon.png";
import timeRectangle from "../assets/timerectangle.png";



export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.list = [];
        this.totalTime = 0;
        this.updateList = this.updateList.bind(this)
    }
    
    state = {
        list : [],
        location: 0,
        latitude: 37.5019983,
        longitude: -122.014,
        latdel: 0.35,
        longdel: 0.35,
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
    

    // findmaxmin = (obj) => {
    //     if (obj.latitude>this.state.latmax){
    //         this.setState({
    //             latmax : obj.latitude
    //         }), () => {
    //             this.print();
    //           };
    //     }
    //     if (obj.latitude<this.state.latmin){
    //         this.setState({ 
    //             latmin : obj.latitude
    //         })
    //     }
    //     if (obj.longitude>this.state.longmax){
    //         this.setState({
    //             longmax : obj.longitude
    //         })
    //     }
    //     if (obj.longitude<this.state.longmin){
    //         this.setState({
    //             longmin : obj.longitude
    //         })
    //     }
        
    //     if (this.state.longmax-this.state.longmin > 1){
    //         this.setState({
    //             longdel: this.state.longmax-this.state.longmin
    //         }), () => {
    //             this.print();
    //           };
    //     }
    //     if (this.state.latmax-this.state.latmin > 1){
    //         this.setState({
    //             latdel: this.state.latmax-this.state.latmin
    //         }), () => {
    //             this.print();
    //           };
    //     }
    //     this.setState({
    //         longitude: obj.longitude,
    //         latitude: obj.latitude
    //     })

    //     if (this.state.longdel>4){
    //         this.setState({
    //             longdel : 4
    //         })
    //     }
            
    //     console.log(this.state.latmax + " " + this.state.latmin)
    // }


    updateList = (l) => {
        console.log(l)
        this.setState({
            list : l
        })
        // console.log(this.state.list)
    }

    getGoogleMaps = () => {
        // console.log(this.list);
        
        var len = this.list.length;

        if (len <= 2) return;

        var url = "https://www.google.com/maps/dir/?api=1";
        url += "&origin=" + this.list[0].latitude + "," + this.list[0].longitude;
        url += "&destination=" + this.list[len - 1].latitude + "," + this.list[len - 1].longitude;
        url += "&waypoints=";

        for (var i = 1; i < len - 2; i++) {
            url += this.list[i].latitude + "," + this.list[i].longitude + "|";
        }
        url += this.list[len - 2].latitude + "," + this.list[len - 2].longitude;

        // var url = "https://www.google.com/maps/dir/?api=1&origin=37.564548450000004,-122.01633445935691&destination=37.5248864,-121.96684212858435&waypoints=37.5446746,-121.93565211664193|37.55336735,-121.99381504909599"
        Linking.canOpenURL(url).then(supported => {
          if (!supported) {
            console.log("Cannot open");
          } else {
            return Linking.openURL(url);
          }
        }).catch(err => console.error("An error occurred", error));
      }

    render() {
        const { navigation, route } = this.props;
        
        if (typeof this.props.route.params !== 'undefined') {
            this.list = this.props.route.params.list;
            this.totalTime = this.props.route.params.totalTime;
        } else {
            this.list = []
            this.totalTime = 0;
        }

        console.log(this.totalTime);

        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: this.state.latdel,
                        longitudeDelta: this.state.longdel
                    }}>
                        {this.list != [] &&
                <MapView.Polyline
                    coordinates={this.list}
                    strokeColor="#7EC0EE"
                    strokeWidth={7}
                    />
                        }
                    {this.list.map((object, index) => {
                        var color = "#ffd1dc";
                        if (index == 0) {
                            color = "#7EC0EE";
                        }

                        return(

                        <Marker
                            key={index}
                            coordinate={{
                              latitude: parseFloat(object.latitude),
                              longitude: parseFloat(object.longitude)
                            }}
                            title={object.value}
                             pinColor={color}
                          />)
                    })}

                    </MapView> 
                    <ImageBackground source={salmonHeader} style = {styles.header}/>
                <Image source={cogs} style = {styles.cogs}/>
                <Image source={locationIcon} style = {styles.locationIcon}/>
                
                <Image source={pathFinderTitle} style = {styles.pathFinderTitle}/>

                   <View style={styles.logout}> 
                   <TouchableOpacity title="logout" 
                     onPress={this.getGoogleMaps
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