import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DraggableFlatList from "react-native-draggable-flatlist";

const exampleData = [...Array(5)].map((d, index) => ({
    key: `item-${index}`, // For example only -- don't use index as your key!
    label: index,
    backgroundColor: "red",
  }));

  

export default class LoginScreen extends React.Component {

    state = {
        data : exampleData,
    }


    renderItem = ({ item, index, drag, isActive }) => {
        return (
          <TouchableOpacity
            style={{
              height: 100,
              marginVertical: 10,
              backgroundColor: isActive ? "blue" : item.backgroundColor,
              alignItems: "center",
              justifyContent: "center"
            }}
            onLongPress={drag}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: 32
              }}
            >
              {item.label}
              {}
            </Text>
          </TouchableOpacity>
        );
      };

    render () {
        return(
            <View style={styles.container}>
                <Text>login</Text>
                    <Button title="to home" 
                    onPress={() =>
                        this.props.navigation.navigate('HomeScreen')
                    }
                />
            </View>

        //     <View style={{ flex: 1 }}>
        // <DraggableFlatList
        //   data={this.state.data}
        //   renderItem={this.renderItem}
        //   keyExtractor={(item, index) => `draggable-item-${item.key}`}
        //   onDragEnd={({ data }) => this.setState({ data })}
        // />
        // </View>
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