import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import DraggableFlatList from "react-native-draggable-flatlist";
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Modal } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import HomeScreen from './HomeScreen';

export default class ListModal extends Component {

  state = {
    enteredText: '',
    data: [],
    count: 0,
    location: 0,
    latitude: 0,
    longitude: 0,
  }

  UNSAFE_componentWillMount = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
				this.setState({ latitude, longitude});
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};


  inputHandler = (input) => {
    this.setState({
      enteredText: input,
    })
  }



  clearInput = () => {
    if (this.state.enteredText == "My Location"){
      this.setState({
        data: [...this.state.data, { id: this.state.count, value: "Your location", latitude: this.state.latitude, longitude: this.state.longitude, key: `item-${Math.random()}` }],
        count: this.state.count + 1,
        enteredText : '',
      })
    }

    else if (this.state.enteredText != "") {
      post("https://nominatim.openstreetmap.org/search?q=" + this.state.enteredText + "&format=json&limit=1", this.updateList);
    }
  }

  updateList = (json, index) => {
    this.setState({
      data: [...this.state.data, { id: this.state.count, value: json[0].display_name, latitude: parseFloat(json[0].lat), longitude: parseFloat(json[0].lon), key: `item-${Math.random()}` }],
      enteredText: '',
      count: this.state.count + 1,
    }, () => {
      // this.print();
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

          backgroundColor: isActive ? "transparent" : item.backgroundColor,
          alignItems: "center",
          justifyContent: "center"
        }}
        onLongPress={drag}
      >
        <View style={styles.listItem}>
          <Text style={styles.listText}>{item.value}</Text>

        </View>
      </TouchableOpacity>

    );
  };

  sortHandler = () => {
    var coords = {"coordinates": []}

    var size = this.state.data.length
    for (var i = 0; i < size; i++) {
      var element = this.state.data[i]
      // console.log(element);
      coords.coordinates.push({"latitude": element.latitude, "longitude": element.longitude})
    }

    // console.log(coords)

    postJson("http://70608e58fa4f.ngrok.io/calculate.php", coords, this.thenSort);
  }

  thenSort = (html) => {
    var params = html.split("|");

    // console.log(params)
    
    var total = parseInt(params[0])
    var totalTime = parseInt(params[1])
    
    for (var i = 1; i < total; i++) {
      // console.log(params[1 + i])
    }

    var copy = []

    var indexes = params[total + 1].split("");
    // console.log(indexes)
    for (var i = 0; i < total; i++) {
      var index = parseInt(indexes[i])
      copy[i] = this.state.data[index];
    }

    this.setState({
      data : copy
    })
  }

  render() {


  const { navigation, route } = this.props;
        
        // if (route.params != null && typeof route.params !== 'undefined') {
        //     // console.log("Params list: " + route.params.list);

        //     this.setState({
        //         data : route.params.list
        //     })
        //     route.params = null;
        // }

    return (
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <TextInput
            style={styles.textstyle}
            placeholder="Enter Address"
            value={this.state.enteredText}
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

        <View style={{ flex: 1 }}>

          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            onDragEnd={({ data }) => this.setState({ data })}
          />

        </View>

        <View style={styles.row}>

          

          <TouchableOpacity title="Save" onPress={() => {
            this.props.navigation.navigate('HomeScreen', {list : this.state.data});
          }    
          } style={[styles.buttons, styles.button]} >
            <Text style={styles.text}>SAVE</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            title="Sort"
            style={[styles.buttons, styles.button]}
            onPress={this.sortHandler} >
            <Text style={styles.text}>SORT</Text>
          </TouchableOpacity>


          {/* Doesnt actually save it */}
        </View>
        {/* <HomeScreen ref={ref => (this._HomeScreen = ref)} /> */}
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

async function postJson(url, json, then) {
  // const url = 'https://www.compcs.codes';
  const response = await fetch(url, {
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  });

  const html = await response.text();

  then(html);

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
      marginVertical: 30,
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

listText: {
  color: 'white'
}


});
