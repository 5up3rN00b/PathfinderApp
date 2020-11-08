import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import {render} from 'react-dom';
import DraggableFlatList from "react-native-draggable-flatlist";
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Modal } from 'react-native';
;


export default class ListModal extends Component {

    state = {
        enteredText: '',
        list: this.props.insertlist,
        count:0,
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
            list: [...this.state.list, { id: this.state.count, value: this.state.enteredText}],
            enteredText: '',
            count: this.state.count+1,
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
                renderItem= {({item, index, separators}) =>
                <TouchableOpacity onPress={this.removeGoalHandler.bind(this, item.id)}  key = {item.id}>
                   
                    <View style={styles.listItem}>
                    <Text>{item.value}</Text>
                    <Text>{index}</Text>
                    </View>
                </TouchableOpacity>
            }
            /> 
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
        flex: 1,
        backgroundColor: '#fff',
      },

  liststyle:{
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 30,
  },
  textstyle:{
    height: 40,
    width: 260,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  row:{
      flexDirection: 'row',
      justifyContent: "space-between",
      height: 45,
      alignContent: "center",
        alignSelf: "center",
     alignItems: "center",
      width: '90%',
      marginVertical: 30,
  },
  button:{
      width: 100,
      height: 40,
      paddingHorizontal: 10,
      marginVertical: 10,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10,
    width: 200,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },
  
});

