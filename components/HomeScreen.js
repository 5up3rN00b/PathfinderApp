import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListModal from './ListModal';



export default class HomeScreen extends React.Component {

    state = {
        isAddMode: false,
    }
    
    modalHandler = () => {
        this.setState({
            isAddMode: true,
        })
    }

    cancelModal = () => {
        this.setState({
            isAddMode: false,
        })
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
                <ListModal visibility={this.state.isAddMode} cancel={this.cancelModal}/>
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