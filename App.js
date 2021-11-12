import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { Credentials } from './Credentials';
import {decode as atob, encode as btoa} from 'base-64'


export default function App() {
  //set atob and btoa as global variables on React Native
  if (!global.btoa) {
      global.btoa = btoa;
  }
  if (!global.atob) {
      global.atob = atob;
  }
  
  const spotify = Credentials();
  const [token, setToken] = useState('');  
  const [playlistData, setPlaylistData] = useState('');

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);
      // const userID = '12176356166';
      const userID = 'wxddOutbykuddlgj17cep92f'
      axios(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (playlistRaw => {      
        setPlaylistData(playlistRaw);
        });
      });
  },[spotify.ClientId, spotify.ClientSecret]);
  console.log(playlistData);

  return (
    <View style={styles.container}>
      <Text></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
