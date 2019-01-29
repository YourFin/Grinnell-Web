import React, {Component} from 'react';
import {Text, View, Button, TextInput} from 'react-native';

function assert(val, message) {
    if(!val) {
        throw new Error(message);
    }
}

async function post(url, body, cookies) {
    const request =
          new Request(url, {
              method: 'POST',
          }
                     );
    return fetch(request);
}

function gen_pioneerweb_body(username,password) {
    //return 'user_id=nuckolls&password=wmblit%2Cwm143&login=Login&action=login&new_loc=';
    username = encodeURIComponent(username);
    password = encodeURIComponent(password);
    return `?user_id=${username}&password=${password}&login=Login&action=login&new_loc=`;
}

export async function try_login_pioneerweb(username, password) {
    //const WA3_COOKIE_URL = 'https://wa3.grinnell.edu/WAPRFA/WebAdvisor?TYPE=M&PID=CORE-WBMAIN&TOKENIDX=';
    const PIONEERWEB_LOGIN_URL = 'https://pioneerweb.grinnell.edu/webapps/login/';
    let resp1 = null;
    //try {
        resp1 = await post(PIONEERWEB_LOGIN_URL + gen_pioneerweb_body(username,password), null);
    //} catch (err) {
    //    return JSON.stringify(err);
    //}
    if(!resp1.headers.has('Set-Cookie')) throw new Error("No set-cookie headers");
    let cookieString = '';
    for (var pair of resp1.headers.entries()) {
        if(pair[0] == 'set-cookie') {
            //Gives array containing key & value (hopefully)
            cookieString += pair[1];
        }
    }
    const body = await resp1.text();
    const start_success = /^<HTML dir='ltr'><HEAD>/;
    return {
        success: !!body.match(start_success),
        cookies: cookieString
    };
}

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            result: null
        };
    }

    updatePassword = (text) => {
        this.setState({password: text});
    }

    updateUsername = (text) => {
        this.setState({username: text});
    }

    login = () => {
        try_login_pioneerweb(this.state.username, this.state.password).then(res => this.setState({result: res}));
    }

    render() {
        return (
            <View>
              <Text>Username:</Text>
              <TextInput
                onChangeText={this.updateUsername}
                value={this.state.username}
                multiline={false}
                autoFocus
                autoComplete='username'
                autoCorrect={false}
                autoCapitalize='none'
                />
              <Text>Password:</Text>
              <TextInput
                onChangeText={this.updatePassword}
                value={this.state.password}
                multiline={false}
                autoComplete='Password'
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry
                />
              <Button
                title='Submit'
                onPress={this.login}
                />
              <Text>{JSON.stringify(this.state.result)}</Text>
            </View>
        );
    }
}
