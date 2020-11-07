import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class HomeScreen extends React.Component {
    render () {
        return(
            <View style={styles.container}>
                <Text>home</Text>
                    <Button title="logout" 
                    onPress={() =>
                        this.props.navigation.navigate('LoginScreen')
                    }
                />
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