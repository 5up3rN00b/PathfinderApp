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
import Geolocation from 'react-native-geolocation-service';


export default class HomeScreen extends React.Component {
    

    state = {
        list : [],
        location: 0,
        latitude: 0,
        longitude: 0,
        error: null
    }

    UNSAFE_componentWillMount = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const location = position;
				this.setState({ location });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};
    logout = () => {
        this.props.navigation.navigate('LoginScreen')
       //console.log(this.state.list)
        
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

        
        // console.log("Gay: " + this.state.list);
        // Geolocation.setRNConfiguration(config);
        // Geolocation.getCurrentPosition(info => console.log(info));
        // console.log(this.state.latitude + " " + this.state.longitude);
        const obj = this.state.location.coords;
        console.log(obj);
        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009
                    }}>
                      <Marker
            coordinate=
            {{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            title={'Title'}
            description={'Describe this is cool'}
          />
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
                        this.props.navigation.navigate('ListModal', {list : this.state.list})}
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

