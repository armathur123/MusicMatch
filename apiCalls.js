import React, {useState, useEffect} from 'react';
import { StyleSheet} from 'react-native';
import axios from 'axios';
import { Credentials } from './Credentials';
import {decode as atob, encode as btoa} from 'base-64'
import {trackPromise} from 'react-promise-tracker';

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
export const playlistFetch = async(userID) => {
    let usergrab = await axios(`https://api.spotify.com/v1/users/${userID}/playlists`, { 
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token} //requires auth token (tokenresponse)
      });
    return usergrab;
}

//get profile info based on a spotify username
export const userFetch = async(userID) => {
    let getUserProfile = await axios(`https://api.spotify.com/v1/users/${userID}`, { 
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token} //requires auth token (tokenresponse)
      })
    return getUserProfile;
} 


//regular api call to get songs
export const getSongs = (token, playlistID, setSongList, currentCount, total, offset, songlistLocal) => {
    const request = axios(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?offset=${offset}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    });
    //track promise helps run loading animation as long as function continues
    trackPromise(request
      .then (songsRaw => {
        total = songsRaw?.data?.total; //set total number of songs (api iterations)
        let count = songsRaw?.data?.items.length;
        currentCount += count; //set current songcount
        songlistLocal = songlistLocal.concat(songsRaw?.data?.items);
        if (currentCount < total){ //recursively calls until entire playlist has been gotten
          getSongs(token, playlistID, setSongList, currentCount, total, currentCount, songlistLocal)
        }
        else { //all songs have been caught, sets songlist
          setSongList(songlistLocal);
          return request;
        }
      })
      .catch(err => {
        console.log("getsongs error");
        console.log(err);
      }));
  }


//recursive call to get all songs
export const getAllSongs = (token, playlistID, setSongList) => {
    let songlistLocal = [];
    return getSongs(token, playlistID, setSongList, 0, 0, 0, songlistLocal); //current count, total, and offset start at 0
}