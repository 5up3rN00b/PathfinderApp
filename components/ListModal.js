import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import {render} from 'react-dom';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, Modal } from 'react-native';
;

export default class App extends Component {

   

  
  render(){
    return (
      <View style={styles.inputContainer}>
          <Modal visible={this.props.visibility}>
              <Text>Test</Text>
              <Button title="go back" onPress={this.props.cancel}/>
          </Modal>
      </View>
            
    )
    
  }
}

const styles = StyleSheet.create({
  inputContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between', 
    alignItems: "center",
    padding: 50,
  },
  
});

