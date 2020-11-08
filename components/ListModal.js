import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import DraggableFlatList from "react-native-draggable-flatlist";
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Modal } from 'react-native';

export default class ListModal extends Component {

  state = {
    enteredText: '',
    data: [],
    count: 0,
  }


  inputHandler = (input) => {
    this.setState({
      enteredText: input,
    })
  }

  print = () => {
    // console.log(this.state.list)
  }


  clearInput = () => {
    if (this.state.enteredText != "") {
      post("https://nominatim.openstreetmap.org/search?q=" + this.state.enteredText + "&format=json&limit=1", this.updateList);
    }
  }

  updateList = (json, index) => {
    this.setState({
      data: [...this.state.data, { id: this.state.count, value: json[0].display_name, latitude: json[0].lat, longitude: json[0].lon, key: `item-${this.state.count}` }],
      enteredText: '',
      count: this.state.count + 1,
    }, () => {
      this.print();
    });

  }


  removeGoalHandler = (goalID) => {
    this.setState({
      data: this.state.data.filter((goal) => goal.id !== goalID),
    })
    // console.log("removed")
  }

  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        onPress={this.removeGoalHandler.bind(this, item.id)}
        style={{

          backgroundColor: isActive ? "blue" : item.backgroundColor,
          alignItems: "center",
          justifyContent: "center"
        }}
        onLongPress={drag}
      >
        <View style={styles.listItem}>
          <Text>{item.value}</Text>

        </View>
      </TouchableOpacity>

    );
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <TextInput
            style={styles.textstyle}
            placeholder="Enter Address"
            value={this.state.enteredText}
            editable={true}
            onChangeText={this.inputHandler}
          />
          <View style={styles.button}>
            <Button
              title="Add!"
              onPress={this.clearInput} />
          </View>
        </View>

        <View style={{ flex: 1 }}>

          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            onDragEnd={({ data }) => this.setState({ data })}
          />

        </View>

        <View style={styles.row}>
          <Button title="Save" onPress={() =>
            this.props.navigation.navigate('HomeScreen', {list : this.state.data})  
          } style={styles.button} />

          {/* Doesnt actually save it */}
        </View>
      </View>

    )

  }
}

async function post(url, then) {
  // const url = 'https://www.compcs.codes';
  const response = await fetch(url, {
    method: 'POST'
  });

  const json = await response.json();

  then(json);

  // console.log(html);
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  liststyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 30,
  },
  textstyle: {
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
      height: 20,
      alignContent: "center",
        alignSelf: "center",
     alignItems: "center",
      width: '90%',
      marginVertical: 30,
  },
  button: {
    width: 100,
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  listItem: {
  
    padding: 15,
    borderRadius: 30,
    backgroundColor: '#F19C79',
    borderColor: '#F19C79',
    borderWidth: 1,
    marginVertical: 10,
    width: 350,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },

});

