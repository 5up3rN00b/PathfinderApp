import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import{Router, Scene} from 'react-native-router-flux';
import LoadingScene from '../scenes/LoadingScene';
import AuthScene from '../scenes/AuthScene';

class SplashScreen extends React.Component {
    constructor(props){
      super(props);
      setTimeout(() => {
        this.props.navigation.navigate('LoginScreen');
      }, 5000);
    }
    render () {
        return(
            <View style={styles.container}>
                <Router>
                <Scene key = "root">
                  <Scene key ={"loading"} component={LoadingScene} initial={true} hideNavBar={true}></Scene>
                  <Scene key ={"auth"} component={AuthScene} hideNavBar></Scene>
                </Scene>
                </Router>
                
                
                

                
                {/* <Text>splash</Text>
                    <Button title="to register" 
                    onPress={() =>
                        this.props.navigation.navigate('RegisterScreen')
                    }
                /> */}
            </View>
          );
    }
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
      flex: 1,  
      backgroundColor: '#F19C79',
    },
  });