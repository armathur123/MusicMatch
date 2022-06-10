import React, {useState, useEffect} from 'react';
import { StyleSheet} from 'react-native';
import axios from 'axios';
import { Credentials } from './Credentials';
import {decode as atob, encode as btoa} from 'base-64'
import {trackPromise} from 'react-promise-tracker';

// const userID = '12176356166'; my personal spotify
const spotify = Credentials(); //grabs preset credentials: clientID and secret from my personal profile

export const tokenFetch = async() => {
    let token = await axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
    });
    return token;
}

//gets users public spotify playlists based on spotify username
export const playlistFetch = async(userID, tokenResponse) => {
    let usergrab = await axios(`https://api.spotify.com/v1/users/${userID}/playlists`, { 
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token} //requires auth token (tokenresponse)
      });
    return usergrab;
}

//get profile info based on a spotify username
export const userFetch = async(userID, tokenResponse) => {
    let getUserProfile = await axios(`https://api.spotify.com/v1/users/${userID}`, { 
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token} //requires auth token (tokenresponse)
      })
    return getUserProfile;
} 

