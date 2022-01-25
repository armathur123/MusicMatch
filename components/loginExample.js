import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeRedirectUri, useAuthRequest, exchangeCodeAsync} from 'expo-auth-session';
import { View, Button, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {AuthSession} from 'expo';



const loginExample = ({spotify, navigation, navPage, AuthCode, setAuthCode}) => {

    const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read']; //scopes for l8er :) 

    WebBrowser.maybeCompleteAuthSession();
    const redirectURI = makeRedirectUri(); //remember to use tunnel instead of lan
    // Endpoint
    const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
    };


    const [request, response, promptAsync] = useAuthRequest(
        {
        clientId: spotify.ClientId,
        scopes: ['user-read-email', 'playlist-modify-public', 'app-remote-control'],
        // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        redirectUri: redirectURI,
    },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            // axios('https://accounts.spotify.com/api/token', { //consider the authdocs way to exchange the code for a token
            //     headers: {
            //       'Content-Type' : 'application/x-www-form-urlencoded',
            //       'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
            //     },
            //     data: `grant_type=authorization_code&code=${response?.params?.code}&redirect_uri=${response?.url}`,
            //     method: 'POST'
            //   }).then((tokenResponse) => {
            //     console.log("axios" + tokenResponse.data.access_token);
            //   }).catch((err) => {
            //       console.log("token error");
            //       console.log(err);
            //   });
            console.log(response);
            exchangeCodeAsync(  {
                code: response?.params?.code,
                clientId: spotify.ClientId,
                clientSecret: spotify.ClientSecret,
                redirectUri: redirectURI,
                extraParams: {
                    code_verifier: request.codeVerifier || "",
                  },
              },
              discovery).then((tokenResponse) => {
                  console.log(tokenResponse);
              })
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
            {AuthCode && <Text>{AuthCode}</Text>}
        </View>
    );
}
export default loginExample;