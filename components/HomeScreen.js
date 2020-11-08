import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import React, { Component, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';
import ListModal from './ListModal';

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
                <View style={styles.logout}>
                    <Button title="logout"
                        onPress={this.logout}
                    />
                    <Button title="openModal" onPress={() =>
                        this.props.navigation.navigate('ListModal')
                    } />
                </View>
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

    logout: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingTop: 20,
    }
});
