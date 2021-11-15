import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { Credentials } from './Credentials';
import {decode as atob, encode as btoa} from 'base-64'
import Textfield from './components/textfield';


export default function App() {
  //set atob and btoa as global variables on React Native
  if (!global.btoa) {
      global.btoa = btoa;
  }
  if (!global.atob) {
      global.atob = atob;
  }
  
  const spotify = Credentials(); //grabs preset credentials
  const [token, setToken] = useState('');
  const [playlistData, setPlaylistData] = useState('');
  const [username, setUsername] = useState('');  
  const [chosenPlaylist1, setChosenPlaylist1] = useState();

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
      const userID = '12176356166';
      // const userID = 'wxdd0utbytkuddlgj17cep92f'
      axios(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (playlistRaw => {      
        setPlaylistData(playlistRaw);
        });
      });
  },[username]);
  console.log(playlistData.data);
  // console.log(playlistData.data?.items[0].owner.display_name);

  const playlistPressHandler = (playlistID) => {
    setChosenPlaylist1(playlistID);
  }

  return (
    <View style={styles.container}>
      <Textfield setUser = {setUsername}></Textfield>
      {(playlistData.data?.items[0] === undefined) ? <Text>User not found!</Text> : 
      <View>
        <Text>User: {playlistData.data?.items[0]?.owner?.display_name}</Text>
        <FlatList style={styles.flatlistContainer}
          keyExtractor={(item) => item.id}
          data={playlistData.data?.items}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => playlistPressHandler(item.id)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <Text>{chosenPlaylist1}</Text>
      </View>}
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
  flatlistContainer: {
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: "5px",
    padding: 8,
  }
});