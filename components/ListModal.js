import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import {render} from 'react-dom';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Modal } from 'react-native';
;

export default class ListModal extends Component {

    state = {
        enteredText: '',
        list: this.props.insertlist,
    }


    inputHandler = (input) => {
        this.setState({
            enteredText : input,
        })
    }

    print = () => {
        // console.log(this.state.list)
    }

    clearInput = () =>{
        this.setState({
            list: [...this.state.list, { id: Math.random().toString(), value: this.state.enteredText}],
            enteredText: '',
        }, () => {
            this.print();
        });
    }


    removeGoalHandler = (goalID) => {
        this.setState({
            list : this.state.list.filter((goal) => goal.id !== goalID),
        })
        this.print()
      }
  
  render(){
    return (
      <View style={styles.inputContainer}>
          <Modal visible={this.props.visibility}>
          <View style={styles.row}>
                <TextInput
                    style = {styles.textstyle}
                    placeholder="Enter Address"
                    value = {this.state.enteredText}  
                    editable = {true}
                    onChangeText={this.inputHandler}   
                />
                <View style={styles.button}>
                    <Button 
                    title="Add!" 
                    onPress={this.clearInput}/>
                </View>
            </View>
            <FlatList
                data={this.state.list} 
                renderItem= {itemData =>
                <TouchableOpacity onPress={this.removeGoalHandler.bind(this, itemData.item.id)}>
                    <View style={styles.listItem}>
                    <Text>{itemData.item.value}</Text>
                    </View>
                </TouchableOpacity>
            }/> 
            <View style={styles.row}>
                <Button title="Save" onPress={this.props.save.bind(this, this.state.list)} style={styles.button}/>
            </View>
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
        alignContent: "center",
        paddingTop: 300,
        flex: 1,
      },

  liststyle:{
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 30,
    flex: 1,
  },
  row:{
      flexDirection: 'row',
      justifyContent: "space-between",
      height: 35,
      alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
      width: '90%',
  },
  button:{
      width: 100,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10,
    width: 250,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },
  
});

