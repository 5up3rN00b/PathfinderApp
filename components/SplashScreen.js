import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class Login extends React.Component {
    render () {
        return(
            <View style={styles.container}>
                <Text>splash</Text>
                    <Button title="to register" 
                    onPress={() =>
                        this.props.navigation.navigate('RegisterScreen')
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