import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import DraggableFlatList from "react-native-draggable-flatlist";
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Modal, Image, ImageBackground } from 'react-native';
import locationsLogo from "../assets/Locations.png";
import home from "../assets/home.png";
import salmonHeader from "../assets/salmonHeader.png";


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
        <ImageBackground source={salmonHeader} style = {styles.header}/>
                <Image source={locationsLogo} style = {styles.locationsLogo}/>
                <Image source={home} style = {styles.home}/>
                <TouchableOpacity title="back to home" onPress={() =>
                this.props.navigation.navigate('HomeScreen')  
                } style={styles.home} >
                <Text style={styles.text}></Text>
                </TouchableOpacity>
        <View style={styles.row}>
  

          <TextInput
            style={styles.textstyle}
            placeholder="Enter Address"
            value={this.state.enteredText}
            editable={true}
            onChangeText={this.inputHandler}
          />
          <View style={styles.button}>
            <TouchableOpacity style={styles.buttons}
              title="Add!"
              onPress={this.clearInput}>
                <Text style={styles.text}>ADD</Text>
              </TouchableOpacity>
          </View>
        </View>

        <View style={styles.liststyle}>

          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            onDragEnd={({ data }) => this.setState({ data })}
          />

        </View>

        <View style={styles.row}>

          <TouchableOpacity title="Save" onPress={() =>
            this.props.navigation.navigate('HomeScreen')  
          } style={[styles.buttons, styles.save]} >
            <Text style={styles.text}>SAVE</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            title="Sort"
            style={[styles.buttons, styles.button]} >
            <Text style={styles.text}>SORT</Text>
          </TouchableOpacity>


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
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 30,
    width: '100%',
    height: '60%',
    marginTop: 170,
    position: "absolute",
  },

  save: {
    flex: 10,
    paddingHorizontal: 30,
    width: 100,
    height: 40,
    marginTop: 230,
    position: "absolute",
    top: 0,
  },
  textstyle: {
    borderRadius: 20,
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
      marginVertical: 120,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    width: 100,
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  buttons:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#F19C79',
    borderRadius: 15,
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

locationsLogo: {
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

home: {
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

});

