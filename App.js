/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView} from 'react-native';
import hash from './src/store';
import {try_login_pioneerweb, Login} from './src/login';
import {WebView} from 'react-native-webview';

const instructions = Platform.select({
  ios: 'Press Cmd+R to potato reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component {
    render() {
        //return (
                //<WebView source={{uri: "https://pioneerweb.grinnell.edu"}} />
        //);
        return (
                <View style={styles.container}>
                  <WebView source={{uri: "https://example.com"}}
                           style={{height:100, padding: '50%'}}
                           />
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <Login/>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
