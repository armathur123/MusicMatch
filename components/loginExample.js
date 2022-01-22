import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { View, Button, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {AuthSession} from 'expo';



const loginExample = ({spotify}) => {

    WebBrowser.maybeCompleteAuthSession();
    // Endpoint
    const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
    };


    const [request, response, promptAsync] = useAuthRequest(
        {
        clientId: spotify.ClientId,
        scopes: ['user-read-email', 'playlist-modify-public'],
        // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        redirectUri: makeRedirectUri(),
    },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            console.log(response)
        }
    }, [response]);

    return (
        <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: "center", alignContent: 'center'}}>  
        <Button
        //disabled={!request}
        title="Login to Spotify"
        onPress={() => {
            promptAsync();
            }}
        />
        {response === true && <Text>Success?</Text>}
        </View>
    );
}
export default loginExample;