import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PathFinderLogin from "../assets/PathFinderlogin.png";
import LoginImage from "../assets/Group1.png";
import PeachLoginText from "../assets/Login-1.png";
import LoginColon from "../assets/Login.png";
import UsernameText from "../assets/Username.png";
import PasswordText from "../assets/Password.png";
import PersonIcon from "../assets/person.png";
import UnlockIcon from "../assets/unlock.png";
import PinkButton from "../assets/pinkbutton.png";
import LoginInputField from "../assets/logininputfield.png";
import DraggableFlatList from "react-native-draggable-flatlist";


export default class LoginScreen extends React.Component {

  state = {
    usernameInput: '',
    passwordInput: '',
  }

  setUsername = (input) => {
    this.setState({
      usernameInput: input,
    })
  }

  setPassword = (input) => {
    this.setState({
      passwordInput: input,
    })
  }

  signin = () => {
    console.log(this.state.usernameInput + " " + this.state.passwordInput)
    postLogin("https://192.168.1.26/login.php", this.state.usernameInput, this.state.passwordInput, this.thenLogin);
  }

  thenLogin = (html) => {
    if (html == "Logged in") {
      this.props.navigation.navigate('HomeScreen')
    } else {

    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Image source={PathFinderLogin} style={styles.logoImage} />
        <Image source={LoginImage} style={styles.loginImage} />
        <Image source={LoginColon} style={styles.loginColon} />

        <Image source={UsernameText} style={styles.textUsernameImage} />

        <Image source={LoginInputField} style={styles.inputUsername} />
        <Image source={PersonIcon} style={styles.personIconImage} />

        <TextInput
          style={styles.inputUsernameText}
          placeholder="Username"
          editable={true}
          onChangeText={this.setUsername}
        />

        <Image source={PasswordText} style={styles.textPasswordImage} />
        <Image source={LoginInputField} style={styles.inputPassword} />

        <TextInput
          style={styles.inputPasswordText}
          placeholder="Password"
          editable={true}
          onChangeText={this.setPassword}
        />

        <Image source={UnlockIcon} style={styles.unlockIconImage} />
        <Image source={PinkButton} style={styles.pinkButton} />
        <Image source={PeachLoginText} style={styles.peachLoginText} />


        <View style={styles.bottom}>

          <TouchableOpacity title="to home" style={styles.actualButton}
            //  onPress={() =>
            //     this.props.navigation.navigate('RegisterScreen')
            // }
            onPress={this.signin}
          >
          </TouchableOpacity>

        </View>

      </View>


    );
  }


}

async function postLogin(url, email, password, then) {
  // const url = 'https://www.compcs.codes';
  const response = await fetch(url, {
    method: 'POST',
    body: "email=" + email + "&password=" + password
  });

  const html = await response.html();

  then(html);

  // console.log(html);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actualButton: {
    width: 600 / 4,
    height: 200 / 4,
    borderColor: 'black'
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },

  image: {
    flex: 1,
    width: 50,
    height: 50,
  },

  textPasswordImage: {
    width: 260 / 2.5,
    height: 90 / 2.5,
    position: "absolute",
    top: 520,
    bottom: 0,
    left: 50,
    right: 0,
  },

  inputPassword: {
    width: 900 / 3,
    height: 100 / 3,
    position: "absolute",
    top: 550,
    bottom: 0,
    left: 50,
    right: 0,
  },

  inputPasswordText: {
    width: 250,
    height: 100 / 3,
    position: "absolute",
    top: 550,
    bottom: 0,
    left: 90,
    right: 0,
  },

  textUsernameImage: {
    width: 250 / 3,
    height: 60 / 3,
    position: "absolute",
    top: 450,
    bottom: 0,
    left: 50,
    right: 0,
  },



  inputUsername: {
    width: 900 / 3,
    height: 100 / 3,
    position: "absolute",
    top: 480,
    bottom: 0,
    left: 50,
    right: 0,
  },

  inputUsernameText: {
    width: 250,
    height: 100 / 3,
    position: "absolute",
    top: 480,
    bottom: 0,
    left: 90,
    right: 0,
  },

  loginImage: {
    flex: 10,
    width: 400,
    height: 300,
    position: "absolute",
    top: 90,
    bottom: 100,
    left: 0,
    right: 0,
  },

  logoImage: {
    flex: 3,
    width: 380,
    height: 150,
    marginTop: 30,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 15,
    right: 0,
  },

  personIconImage: {
    flex: 1,
    width: 75 / 4,
    height: 90 / 4,
    position: "absolute",
    top: 485,
    bottom: 0,
    left: 60,
    right: 0,
  },

  unlockIconImage: {
    flex: 1,
    width: 75 / 4,
    height: 90 / 4,
    position: "absolute",
    top: 555,
    bottom: 0,
    left: 60,
    right: 0,
  },

  loginColon: {
    flex: 10,
    width: 100,
    height: 50,
    position: "absolute",
    top: 400,
    bottom: 0,
    left: 160,
    right: 0,
  },

  pinkButton: {
    width: 600 / 4,
    height: 200 / 4,
    position: "absolute",
    top: 600,
    bottom: 0,
    left: 130,
    right: 0,
  },

  peachLoginText: {
    width: 100,
    height: 50,
    position: "absolute",
    top: 602.5,
    bottom: 0,
    left: 160,
    right: 0,
  }

});