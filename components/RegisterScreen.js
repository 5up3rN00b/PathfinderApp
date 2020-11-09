import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import registerHere from "../assets/registerhere.png";
import registerImage from "../assets/Group2.png";
import lock from "../assets/lock.png";
import restaurantIcon from "../assets/businessicon.png";
import restaurantText from "../assets/business.png";
import UsernameText from "../assets/Username.png";
import PasswordText from "../assets/Password.png";
import PersonIcon from "../assets/person.png";
import PinkButton from "../assets/pinkbutton.png";
import PeachLoginText from "../assets/Login-1.png";
import registerPeachText from "../assets/register.png";
import RegisterInputField from "../assets/logininputfield.png";
import alreadyHaveAccount from "../assets/alreadyhaveaccount.png";

export default class RegisterScreen extends React.Component {

    state = {
        usernameInput: '',
        passwordInput: '',
        restaurantInput: '',
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

    setRestaurant = (input) => {
        this.setState({
            restaurantInput: input,
        })
    }

    toHome = () => {
        console.log(this.state.usernameInput + " " + this.state.passwordInput + " " + this.state.restaurantInput)
        postRegister("http://70608e58fa4f.ngrok.io/register.php", this.state.usernameInput, this.state.passwordInput, this.state.restaurantInput, this.thenRegister);
        this.props.navigation.navigate('HomeScreen')
    }
    thenRegister = (html) => {
        if (html == "Created user") {
            this.props.navigation.navigate("LoginScreen");
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={registerImage} style={styles.registerImage}>
                </ImageBackground>
                <Image source={registerHere} style={styles.registerHere} />


                <Image source={UsernameText} style={styles.textUsernameImage} />
                <Image source={RegisterInputField} style={styles.inputUsername} />
                <Image source={PersonIcon} style={styles.personIconImage} />
                <TextInput
                    style={styles.inputUsernameText}
                    placeholder="Username"
                    onChangeText={this.setUsername}
                    editable={true}
                />

                <Image source={PasswordText} style={styles.textPasswordImage} />
                <Image source={RegisterInputField} style={styles.inputPassword} />
                <Image source={lock} style={styles.lockIconImage} />
                <TextInput
                    style={styles.inputPasswordText}
                    placeholder="Password"
                    onChangeText={this.setPassword}
                    editable={true}
                />

                <Image source={restaurantText} style={styles.restaurantText} />
                <Image source={RegisterInputField} style={styles.inputRestaurant} />
                <Image source={restaurantIcon} style={styles.restaurantIcon} />
                <TextInput
                    style={styles.inputRestaurantText}
                    placeholder="Business"
                    onChangeText={this.setRestaurant}
                    editable={true}
                />

                <ImageBackground source={PinkButton} style={styles.pinkButtonOne}>
                </ImageBackground>
                <Image source={registerPeachText} style={styles.registerPeachText} />
                <Image source={alreadyHaveAccount} style={styles.alreadyHaveAccount} />

                <Image source={PinkButton} style={styles.pinkButtonTwo} />
                <Image source={PeachLoginText} style={styles.peachLoginText} />

                <TouchableOpacity
                    style={styles.registerButton}
                    // onPress={() =>
                    //     this.props.navigation.navigate('HomeScreen')}
                    // >
                    onPress={this.toHome}>
                </TouchableOpacity>

                <View style={styles.bottomRight}>
                    <TouchableOpacity title="to login" style={styles.actualButton}
                        onPress={() =>
                            this.props.navigation.navigate('LoginScreen')
                        }
                    >
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

async function postRegister(url, email, password, org, then) {
    // const url = 'https://www.compcs.codes';
    const response = await fetch(url, {
      method: 'POST',
      body: "email=" + email + "&password=" + password + "&org=" + org
    });
  
    const html = await response.text();
  
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

    registerButton: {
        alignItems: "center",
        padding: 10,
        width: 500 / 4,
        height: 200 / 4,
        position: "absolute",
        top: 600,
        bottom: 0,
        left: 50,
        right: 0,
    },

    actualButton: {
        width: 500 / 4,
        height: 200 / 4,
    },

    bottomRight: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        marginLeft: 170,
    },

    registerImage: {
        flex: 10,
        width: 400,
        height: 200,
        position: "absolute",
        top: 180,
        bottom: 100,
        left: 5,
        right: 0,
    },

    registerHere: {
        flex: 3,
        width: 380 / 1.2,
        height: 250 / 1.2,
        marginTop: 15,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 55,
        right: 0,
    },

    registerText: {
        flex: 10,
        width: 100,
        height: 50,
        position: "absolute",
        top: 400,
        bottom: 0,
        left: 160,
        right: 0,
    },

    pinkButtonTwo: {
        width: 600 / 5,
        height: 200 / 5,
        position: "absolute",
        top: 600,
        bottom: 0,
        left: 230,
        right: 0,
    },

    pinkButtonOne: {
        width: 600 / 5,
        height: 200 / 5,
        position: "absolute",
        top: 600,
        bottom: 0,
        left: 50,
        right: 0,
    },

    registerPeachText: {
        width: 300 / 3,
        height: 100 / 3,
        position: "absolute",
        top: 605,
        bottom: 0,
        left: 60,
        right: 0,
    },

    peachLoginText: {
        width: 100 / 1.5,
        height: 50 / 1.5,
        position: "absolute",
        top: 605,
        bottom: 0,
        left: 260,
        right: 0,
    },

    alreadyHaveAccount: {
        width: 680 / 4,
        height: 90 / 4,
        position: "absolute",
        top: 570,
        bottom: 0,
        left: 212.5,
        right: 0,
    },

    textPasswordImage: {
        width: 260 / 2.5,
        height: 90 / 2.5,
        position: "absolute",
        top: 445,
        bottom: 0,
        left: 50,
        right: 0,
    },

    inputPassword: {
        width: 900 / 3,
        height: 100 / 3,
        position: "absolute",
        top: 470,
        bottom: 0,
        left: 50,
        right: 0,
    },

    inputPasswordText: {
        width: 250,
        height: 100 / 3,
        position: "absolute",
        top: 470,
        bottom: 0,
        left: 90,
        right: 0,
    },

    lockIconImage: {
        flex: 1,
        width: 75 / 4,
        height: 90 / 4,
        position: "absolute",
        top: 475,
        bottom: 0,
        left: 60,
        right: 0,
    },

    restaurantText: {
        width:  213 / 3,
        height: 90 / 3,
        position: "absolute",
        top: 505,
        bottom: 0,
        left: 50,
        right: 0,
    },

    inputRestaurant: {
        width: 900 / 3,
        height: 100 / 3,
        position: "absolute",
        top: 530,
        bottom: 0,
        left: 50,
        right: 0,
    },

    inputRestaurantText: {
        width: 250,
        height: 100 / 3,
        position: "absolute",
        top: 530,
        bottom: 0,
        left: 90,
        right: 0,
    },

    restaurantIcon: {
        flex: 1,
        width: 75 / 4,
        height: 90 / 4,
        position: "absolute",
        top: 535,
        bottom: 0,
        left: 60,
        right: 0,
    },

    textUsernameImage: {
        width: 250 / 3,
        height: 60 / 3,
        position: "absolute",
        top: 385,
        bottom: 0,
        left: 50,
        right: 0,
    },

    inputUsername: {
        width: 900 / 3,
        height: 100 / 3,
        position: "absolute",
        top: 410,
        bottom: 0,
        left: 50,
        right: 0,
    },

    inputUsernameText: {
        width: 250,
        height: 100 / 3,
        position: "absolute",
        top: 410,
        bottom: 0,
        left: 90,
        right: 0,
    },

    personIconImage: {
        flex: 1,
        width: 75 / 4,
        height: 90 / 4,
        position: "absolute",
        top: 415,
        bottom: 0,
        left: 60,
        right: 0,
    },

});