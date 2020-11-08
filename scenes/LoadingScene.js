import React, {Component, useState} from 'react'
import {View, Text, StyleSheet, Animated, Image} from 'react-native'
import Logo from '../images/logo.png';
import LogoText from '../images/logoText.png';


export default class LoadingScene extends Component{
    state = {
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false,
    }

    componentDidMount(){
        const{LogoAnime, LogoText} = this.state;
        Animated.parallel([
            Animated.spring(LogoAnime, {
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 1000,
            }).start(),

            Animated.timing(LogoText, {
                toValue :1,
                duration: 1200,
            }),
        ]).start(() => 
            this.setState({
                loadingSpinner: true,
            })
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <Animated.View style={{
                    opacity: this.state.LogoAnime,
                    top: this.state.LogoAnime.interpolate({
                        inputRange: [0, 1],
                        outputRange: [80, 0],
                    }),
                }}>
                    <Image source={Logo}/>
                </Animated.View>
                <Animated.View style={{
                    opacity: this.state.LogoText
                }}>
                    <Image source={LogoText}/>
                </Animated.View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,  
      backgroundColor: '#F19C79',
      justifyContent: 'center',
      alignItems: 'center'
    },

    logoText:{
        color: '#FFFFFF',
        fontSize: 30,
        marginTop: 29.1,
        fontWeight: '700',
    }
  });
